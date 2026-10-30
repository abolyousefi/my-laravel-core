<?php

namespace MyLaravelCore\Controllers;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

abstract class CrudController extends BaseController
{
    /**
     * Eloquent model class name (e.g. App\Models\Product::class).
     *
     * @var class-string<Model>
     */
    protected string $modelClass;

    /**
     * Table class name (e.g. App\Tables\ProductTable::class).
     *
     * @var class-string|null
     */
    protected ?string $tableClass = null;

    /**
     * Base view directory (e.g. 'admin.products').
     */
    protected string $viewPath = '';

    /**
     * Base route prefix (e.g. 'admin.products').
     */
    protected string $routePrefix = '';

    /**
     * Resource singular title in Persian (e.g. 'محصول').
     */
    protected string $resourceTitle = 'آیتم';

    /**
     * Default per page pagination count.
     */
    protected int $perPage = 15;

    /**
     * Searchable database columns.
     *
     * @var array<string>
     */
    protected array $searchableColumns = [];

    /**
     * File upload fields with configurations.
     * e.g. ['image' => ['directory' => 'products', 'resize' => [800, 600]]]
     *
     * @var array<string, array>
     */
    protected array $uploadFields = [];

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): View|JsonResponse
    {
        $this->setTitle('مدیریت ' . $this->resourceTitle);
        $this->addBreadcrumb('مدیریت ' . $this->resourceTitle);

        // If a dedicated Table class is defined
        if ($this->tableClass && class_exists($this->tableClass)) {
            $table = app($this->tableClass);
            $query = $this->getQuery();
            $table->query($query);

            if ($request->ajax() && $request->wantsJson()) {
                return response()->json([
                    'html' => $table->render(),
                ]);
            }

            return view($this->getView('index'), [
                'table' => $table,
                'resourceTitle' => $this->resourceTitle,
                'routePrefix' => $this->routePrefix,
            ]);
        }

        // Standard index with query & pagination
        $query = $this->getQuery();
        $this->applySearch($query, $request);
        $this->applyFilters($query, $request);

        $records = $query->paginate($this->perPage)->withQueryString();

        if ($request->wantsJson()) {
            return $this->successResponse($records);
        }

        return view($this->getView('index'), [
            'records' => $records,
            'resourceTitle' => $this->resourceTitle,
            'routePrefix' => $this->routePrefix,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): View
    {
        $this->setTitle('افزودن ' . $this->resourceTitle . ' جدید');
        $this->addBreadcrumb('مدیریت ' . $this->resourceTitle, $this->route('index'));
        $this->addBreadcrumb('افزودن ' . $this->resourceTitle);

        return view($this->getView('create'), array_merge([
            'resourceTitle' => $this->resourceTitle,
            'routePrefix' => $this->routePrefix,
        ], $this->formViewData()));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse|JsonResponse
    {
        $validated = $this->validate($request, $this->rules($request, 'store'));
        $validated = $this->beforeStore($validated, $request);

        // Handle configured file uploads
        $validated = $this->handleUploads($request, $validated);

        /** @var Model $model */
        $model = $this->modelClass::create($validated);

        $this->afterStore($model, $request);

        $this->flashSuccess($this->resourceTitle . ' با موفقیت ثبت شد.');

        if ($request->wantsJson()) {
            return $this->createdResponse($model, $this->resourceTitle . ' با موفقیت ثبت شد.');
        }

        return redirect()->route($this->routePrefix . '.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(int|string $id): View|JsonResponse
    {
        $model = $this->findModel($id);

        $this->setTitle('نمایش ' . $this->resourceTitle);
        $this->addBreadcrumb('مدیریت ' . $this->resourceTitle, $this->route('index'));
        $this->addBreadcrumb('جزئیات');

        if (request()->wantsJson()) {
            return $this->successResponse($model);
        }

        return view($this->getView('show'), [
            'record' => $model,
            'resourceTitle' => $this->resourceTitle,
            'routePrefix' => $this->routePrefix,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int|string $id): View
    {
        $model = $this->findModel($id);

        $this->setTitle('ویرایش ' . $this->resourceTitle);
        $this->addBreadcrumb('مدیریت ' . $this->resourceTitle, $this->route('index'));
        $this->addBreadcrumb('ویرایش');

        return view($this->getView('edit'), array_merge([
            'record' => $model,
            'resourceTitle' => $this->resourceTitle,
            'routePrefix' => $this->routePrefix,
        ], $this->formViewData($model)));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int|string $id): RedirectResponse|JsonResponse
    {
        $model = $this->findModel($id);

        $validated = $this->validate($request, $this->rules($request, 'update', $model));
        $validated = $this->beforeUpdate($model, $validated, $request);

        // Handle configured file uploads with replacement
        $validated = $this->handleUploads($request, $validated, $model);

        $model->update($validated);

        $this->afterUpdate($model, $request);

        $this->flashSuccess($this->resourceTitle . ' با موفقیت به‌روزرسانی شد.');

        if ($request->wantsJson()) {
            return $this->successResponse($model, $this->resourceTitle . ' با موفقیت به‌روزرسانی شد.');
        }

        return redirect()->route($this->routePrefix . '.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int|string $id): RedirectResponse|JsonResponse
    {
        $model = $this->findModel($id);

        $this->beforeDelete($model);
        $model->delete();
        $this->afterDelete($model);

        $this->flashSuccess($this->resourceTitle . ' با موفقیت حذف شد.');

        if (request()->wantsJson() || request()->ajax()) {
            return $this->successResponse(null, $this->resourceTitle . ' با موفقیت حذف شد.');
        }

        return redirect()->route($this->routePrefix . '.index');
    }

    /**
     * Bulk destroy multiple resources.
     */
    public function bulkDestroy(Request $request): JsonResponse|RedirectResponse
    {
        $ids = $request->input('ids', []);
        if (empty($ids)) {
            return $this->errorResponse('هیچ آیتمی برای حذف انتخاب نشده است.');
        }

        $this->modelClass::whereIn('id', $ids)->delete();

        $this->flashSuccess(count($ids) . ' ' . $this->resourceTitle . ' با موفقیت حذف شدند.');

        if ($request->wantsJson() || $request->ajax()) {
            return $this->successResponse(['count' => count($ids)], 'آیتم‌های انتخابی حذف شدند.');
        }

        return redirect()->back();
    }

    /**
     * Toggle a boolean attribute status.
     */
    public function toggleStatus(Request $request, int|string $id): JsonResponse
    {
        $field = $request->input('field', 'is_active');
        $model = $this->findModel($id);

        $model->{$field} = !$model->{$field};
        $model->save();

        return $this->successResponse([
            'field' => $field,
            'value' => (bool) $model->{$field},
        ], 'وضعیت با موفقیت تغییر یافت.');
    }

    /**
     * Get base Eloquent query.
     */
    protected function getQuery(): Builder
    {
        return $this->modelClass::query()->latest();
    }

    /**
     * Find model by primary key or fail.
     */
    protected function findModel(int|string $id): Model
    {
        return $this->modelClass::findOrFail($id);
    }

    /**
     * Search filter logic.
     */
    protected function applySearch(Builder $query, Request $request): void
    {
        $search = $request->input('search');
        if ($search && !empty($this->searchableColumns)) {
            $query->where(function ($q) use ($search) {
                foreach ($this->searchableColumns as $col) {
                    $q->orWhere($col, 'like', "%{$search}%");
                }
            });
        }
    }

    /**
     * Custom filters logic hook.
     */
    protected function applyFilters(Builder $query, Request $request): void
    {
        // Hook for subclasses
    }

    /**
     * Validation rules for store/update.
     */
    protected function rules(Request $request, string $action = 'store', ?Model $model = null): array
    {
        return [];
    }

    /**
     * View data hook for create/edit forms.
     */
    protected function formViewData(?Model $model = null): array
    {
        return [];
    }

    /**
     * Lifecycle hooks.
     */
    protected function beforeStore(array $data, Request $request): array
    {
        return $data;
    }

    protected function afterStore(Model $model, Request $request): void
    {
    }

    protected function beforeUpdate(Model $model, array $data, Request $request): array
    {
        return $data;
    }

    protected function afterUpdate(Model $model, Request $request): void
    {
    }

    protected function beforeDelete(Model $model): void
    {
    }

    protected function afterDelete(Model $model): void
    {
    }

    /**
     * Handle file uploads configured in uploadFields.
     */
    protected function handleUploads(Request $request, array $data, ?Model $model = null): array
    {
        foreach ($this->uploadFields as $field => $config) {
            if ($request->hasFile($field)) {
                $dir = $config['directory'] ?? 'uploads';
                // Delete previous file if updating
                if ($model && $model->{$field}) {
                    $this->uploader()->delete($model->{$field});
                }
                $data[$field] = $this->uploader()->upload($request->file($field), $dir);
            }
        }

        return $data;
    }

    /**
     * Get view path helper.
     */
    protected function getView(string $action): string
    {
        return $this->viewPath ? $this->viewPath . '.' . $action : $action;
    }

    /**
     * Get route path helper.
     */
    protected function route(string $action, mixed $params = []): string
    {
        return route($this->routePrefix . '.' . $action, $params);
    }
}
