<?php

namespace MyLaravelCore\Controllers;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Collection;
use MyLaravelCore\Enums\IsActive;
use MyLaravelCore\Enums\SystemMessage;
use ReflectionMethod;

abstract class SelectController extends Controller
{
    protected const int PER_PAGE = 15;
    protected const string QUERY_RESULT_MODE = 'paginate';
    protected const bool VALUES_ARE_IDENTIFIERS = true;

    protected string $labelColumn = 'name';
    protected ?string $search = null;
    protected mixed $parentSelected = null;
    protected array $selectedItems = [];
    protected mixed $selectedItem = null;
    protected array $tableGenerators = [];

    public function data(): mixed
    {
        return null;
    }

    public function query(): ?Builder
    {
        return null;
    }

    public function selected(): array
    {
        return [];
    }

    public function __invoke(Request $request): JsonResponse
    {
        $this->search = $request->input('search');
        $this->parentSelected = $request->input('parentSelected', $request->input('parent_selected'));

        $hasData = $this->isMethodOverridden('data');
        $hasQuery = $this->isMethodOverridden('query');

        if ((!$hasData && !$hasQuery) || ($hasData && $hasQuery)) {
            return response()->json([
                'status' => false,
                'code' => SystemMessage::SELECT_INVALID_FILTER_CONFIGURATION->value,
                'message' => 'Exactly one of data() or query() must be implemented in SelectController.',
            ], 422);
        }

        $selectedIds = $this->resolveSelectedIds($request);
        $rawItems = $hasQuery ? $this->executeQuery($request) : $this->data();

        $collection = $rawItems instanceof LengthAwarePaginator
            ? collect($rawItems->items())
            : collect($rawItems);

        $formatted = [];
        foreach ($collection as $item) {
            $arr = is_array($item) ? $item : (method_exists($item, 'toArray') ? $item->toArray() : (array) $item);
            if (!array_key_exists($this->labelColumn, $arr)) {
                throw new \RuntimeException("The label column '{$this->labelColumn}' does not exist in the returned data.");
            }

            $rawId = $arr['id'] ?? null;
            $idOut = (static::VALUES_ARE_IDENTIFIERS && function_exists('encryptStaticValue'))
                ? encryptStaticValue($rawId)
                : $rawId;

            $formatted[] = [
                'id' => $idOut,
                'name' => $arr[$this->labelColumn],
                'label' => $arr[$this->labelColumn],
                'is_active' => (bool) ($arr['is_active'] ?? IsActive::YES->value),
                'selected' => in_array((string) $rawId, $selectedIds, true),
            ];
        }

        return response()->json([
            'status' => true,
            'code' => SystemMessage::SUCCESS->value,
            'data' => $formatted,
        ]);
    }

    /**
     * Resolve labels for given IDs using the controller's query() or data() source.
     *
     * @return array<string, string|null>
     */
    public function resolveLabelsForIds(array $ids, mixed $parentSelected = null): array
    {
        $this->parentSelected = $parentSelected;
        $out = [];
        foreach ($ids as $id) {
            $out[(string) $id] = null;
        }

        if ($this->isMethodOverridden('query')) {
            $builder = $this->query();
            if ($builder) {
                $rows = $builder->whereIn($builder->getModel()->getKeyName(), $ids)->get();
                foreach ($rows as $row) {
                    $out[(string) $row->getKey()] = data_get($row, $this->labelColumn);
                }
            }
            return $out;
        }

        $items = collect($this->data());
        foreach ($items as $item) {
            $id = (string) data_get($item, 'id');
            if (array_key_exists($id, $out)) {
                $out[$id] = data_get($item, $this->labelColumn);
            }
        }

        return $out;
    }

    protected function executeQuery(Request $request): mixed
    {
        $builder = $this->query();
        if (!$builder) {
            return collect();
        }

        $perPage = (int) $request->input('pagination.pageSize', static::PER_PAGE);

        return match (static::QUERY_RESULT_MODE) {
            'get' => $builder->get(),
            default => $builder->paginate($perPage),
        };
    }

    /**
     * @return array<int, string>
     */
    protected function resolveSelectedIds(Request $request): array
    {
        $ids = [];
        foreach ($this->selected() as $s) {
            $ids[] = (string) (is_array($s) ? ($s['id'] ?? '') : $s);
        }
        foreach ((array) $request->input('selected', []) as $reqSel) {
            $ids[] = (string) $reqSel;
        }
        return array_values(array_unique(array_filter($ids, fn ($v) => $v !== '')));
    }

    protected function isMethodOverridden(string $method): bool
    {
        $ref = new ReflectionMethod($this, $method);
        return $ref->getDeclaringClass()->getName() !== self::class;
    }
}