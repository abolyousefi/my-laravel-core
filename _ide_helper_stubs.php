<?php

/**
 * MyLaravelCore - Constructor-Only IDE Stubs.
 * Auto-generated file providing full IDE autocompletion for classes and components.
 * Implementation details are completely hidden.
 */

namespace MyLaravelCore\Commands;

/**
 * Stub definition for DocsServeCommand.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class DocsServeCommand extends \Illuminate\Console\Command implements \Symfony\Component\Console\Command\SignalableCommandInterface
{
    /**
     * handle signature.
     */
    public function handle(): int {
        // Protected implementation
    }

}

namespace MyLaravelCore\Commands;

/**
 * Stub definition for IdeHelperCommand.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class IdeHelperCommand extends \Illuminate\Console\Command implements \Symfony\Component\Console\Command\SignalableCommandInterface
{
    /**
     * handle signature.
     */
    public function handle(): int {
        // Protected implementation
    }

}

namespace MyLaravelCore\Commands;

/**
 * Stub definition for InstallCommand.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class InstallCommand extends \Illuminate\Console\Command implements \Symfony\Component\Console\Command\SignalableCommandInterface
{
    /**
     * handle signature.
     */
    public function handle(): int {
        // Protected implementation
    }

}

namespace MyLaravelCore\Commands;

/**
 * Stub definition for MakeCrudCommand.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class MakeCrudCommand extends \Illuminate\Console\Command implements \Symfony\Component\Console\Command\SignalableCommandInterface
{
    /**
     * handle signature.
     */
    public function handle(): int {
        // Protected implementation
    }

}

namespace MyLaravelCore\Commands;

/**
 * Stub definition for MakeServiceCommand.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class MakeServiceCommand extends \Illuminate\Console\Command implements \Symfony\Component\Console\Command\SignalableCommandInterface
{
    /**
     * handle signature.
     */
    public function handle(): int {
        // Protected implementation
    }

}

namespace MyLaravelCore\Commands;

/**
 * Stub definition for MakeTraitCommand.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class MakeTraitCommand extends \Illuminate\Console\Command implements \Symfony\Component\Console\Command\SignalableCommandInterface
{
    /**
     * handle signature.
     */
    public function handle(): int {
        // Protected implementation
    }

}

namespace MyLaravelCore\Commands;

/**
 * Stub definition for ProtectCommand.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class ProtectCommand extends \Illuminate\Console\Command implements \Symfony\Component\Console\Command\SignalableCommandInterface
{
    /**
     * handle signature.
     */
    public function handle(MyLaravelCore\Services\CodeProtector $protector, MyLaravelCore\Services\StubGenerator $stubGen): int {
        // Protected implementation
    }

}

namespace MyLaravelCore\Commands;

/**
 * Stub definition for StubsCommand.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class StubsCommand extends \Illuminate\Console\Command implements \Symfony\Component\Console\Command\SignalableCommandInterface
{
    /**
     * handle signature.
     */
    public function handle(MyLaravelCore\Services\StubGenerator $generator): int {
        // Protected implementation
    }

}

namespace MyLaravelCore\Components;

/**
 * Stub definition for BaseComponent.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
abstract class BaseComponent extends \Illuminate\View\Component
{
    /**
     * Constructor signature.
     */
    public function __construct(
        ?string $id = null,
        ?string $class = null,
        ?string $error = null
    ) {
        // Protected implementation
    }

    /**
     * resolveId signature.
     */
    public function resolveId(?string $name = null): string {
        // Protected implementation
    }

    /**
     * resolveError signature.
     */
    public function resolveError(?string $name = null): ?string {
        // Protected implementation
    }

}

namespace MyLaravelCore\Components\Design;

/**
 * Stub definition for Accordion.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class Accordion extends \MyLaravelCore\Components\BaseComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        public string $type = 'single',
        public ?int $activeIndex = null,
        ?string $id = null,
        ?string $class = null
    ) {
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}

namespace MyLaravelCore\Components\Design;

/**
 * Stub definition for AccordionItem.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class AccordionItem extends \MyLaravelCore\Components\BaseComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        public string $title,
        public ?string $icon = null,
        public bool $expanded = false,
        ?string $id = null,
        ?string $class = null
    ) {
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}

namespace MyLaravelCore\Components\Design;

/**
 * Stub definition for Alert.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class Alert extends \MyLaravelCore\Components\BaseComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        public string $type = 'info',
        public ?string $title = null,
        public ?string $message = null,
        public ?string $icon = null,
        public bool $dismissible = false,
        public bool $outline = false,
        public string $size = 'md',
        ?string $id = null,
        ?string $class = null
    ) {
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}

namespace MyLaravelCore\Components\Design;

/**
 * Stub definition for Badge.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class Badge extends \MyLaravelCore\Components\BaseComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        public string $variant = 'primary',
        public string $size = 'md',
        public bool $pill = false,
        public bool $outline = false,
        public bool $dot = false,
        public ?string $icon = null,
        ?string $id = null,
        ?string $class = null
    ) {
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}

namespace MyLaravelCore\Components\Design;

/**
 * Stub definition for Banner.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class Banner extends \MyLaravelCore\Components\BaseComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        public string $type = 'info',
        public ?string $title = null,
        public ?string $description = null,
        public ?string $icon = null,
        public array $actions = [],
        public bool $dismissible = false,
        public ?string $illustration = null,
        ?string $id = null,
        ?string $class = null
    ) {
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}

namespace MyLaravelCore\Components\Design;

/**
 * Stub definition for Button.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class Button extends \MyLaravelCore\Components\BaseComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        public string $variant = 'primary',
        public string $size = 'md',
        public ?string $icon = null,
        public string $iconPosition = 'left',
        public string $type = 'button',
        public bool $outline = false,
        public bool $pill = false,
        public bool $block = false,
        public bool $disabled = false,
        public bool $loading = false,
        public ?string $href = null,
        public ?string $target = null,
        public ?string $confirm = null,
        ?string $id = null,
        ?string $class = null
    ) {
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}

namespace MyLaravelCore\Components\Design;

/**
 * Stub definition for Card.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class Card extends \MyLaravelCore\Components\BaseComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        public ?string $title = null,
        public ?string $subtitle = null,
        public ?string $icon = null,
        public string $iconColor = 'warning',
        public ?string $badge = null,
        public string $badgeVariant = 'warning',
        public bool $collapsible = false,
        public bool $collapsed = false,
        public bool $bordered = false,
        public string $shadow = 'sm',
        public string $rounded = '4',
        public string|int $padding = '4',
        public string $bg = 'white',
        public bool $hover = false,
        public bool $headerBorder = true,
        public ?string $image = null,
        public ?string $imageAlt = null,
        public string $imageHeight = '200px',
        public array $headerActions = [],
        ?string $id = null,
        ?string $class = null
    ) {
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}

namespace MyLaravelCore\Components\Design;

/**
 * Stub definition for DataCard.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class DataCard extends \MyLaravelCore\Components\BaseComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        public string $title,
        public mixed $value,
        public ?string $icon = null,
        public string $color = 'primary',
        public int|float|null $trend = null,
        public string $trendDirection = 'up',
        public ?string $trendLabel = null,
        public ?string $link = null,
        public bool $loading = false,
        ?string $id = null,
        ?string $class = null
    ) {
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}

namespace MyLaravelCore\Components\Design;

/**
 * Stub definition for DropdownButton.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class DropdownButton extends \MyLaravelCore\Components\BaseComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        public string $label = 'عملیات',
        public string $variant = 'primary',
        public string $size = 'md',
        public array $items = [],
        public string $align = 'end',
        public bool $split = false,
        ?string $id = null,
        ?string $class = null
    ) {
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}

namespace MyLaravelCore\Components\Design;

/**
 * Stub definition for FileView.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class FileView extends \MyLaravelCore\Components\BaseComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        public string $name,
        public string $url,
        public ?int $size = null,
        public ?string $type = null,
        public ?string $icon = 'auto',
        public bool $downloadable = true,
        public bool $deletable = false,
        ?string $id = null,
        ?string $class = null
    ) {
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}

namespace MyLaravelCore\Components\Design;

/**
 * Stub definition for Icon.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class Icon extends \MyLaravelCore\Components\BaseComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        public string $name,
        public string $size = 'md',
        public ?string $color = null,
        public bool $spin = false,
        public ?string $flip = null,
        public ?int $rotate = null,
        public bool $fixedWidth = false,
        ?string $id = null,
        ?string $class = null
    ) {
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}

namespace MyLaravelCore\Components\Design;

/**
 * Stub definition for ImageView.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class ImageView extends \MyLaravelCore\Components\BaseComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        public string $src,
        public string $alt = '',
        public string|int|null $width = null,
        public string|int|null $height = null,
        public ?string $ratio = null,
        public bool $rounded = false,
        public bool $circle = false,
        public bool $thumbnail = false,
        public bool $lazy = true,
        public ?string $placeholder = null,
        public bool $lightbox = false,
        ?string $id = null,
        ?string $class = null
    ) {
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}

namespace MyLaravelCore\Components\Design;

/**
 * Stub definition for Link.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class Link extends \MyLaravelCore\Components\BaseComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        public string $href,
        public ?string $label = null,
        public ?string $icon = null,
        public string $iconPosition = 'left',
        public string $variant = 'primary',
        public bool $underline = true,
        public bool $external = false,
        public ?string $target = null,
        ?string $id = null,
        ?string $class = null
    ) {
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}

namespace MyLaravelCore\Components\Design;

/**
 * Stub definition for Modal.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class Modal extends \MyLaravelCore\Components\BaseComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        public ?string $title = null,
        public string $size = 'md',
        public bool $centered = true,
        public bool $scrollable = false,
        public bool $closeOnBackdrop = true,
        public bool $closeOnEsc = true,
        public bool $showCloseButton = true,
        public bool $static = false,
        ?string $id = null,
        ?string $class = null
    ) {
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}

namespace MyLaravelCore\Components\Design;

/**
 * Stub definition for Table.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class Table extends \MyLaravelCore\Components\BaseComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        public array $columns = [],
        public mixed $rows = [],
        public ?string $title = null,
        public ?string $subtitle = null,
        public ?string $icon = null,
        public bool $searchable = true,
        public string $searchField = 'search',
        public string $searchPlaceholder = 'جستجو در اطلاعات...',
        public ?string $searchAction = null,
        public bool $striped = false,
        public bool $hover = true,
        public bool $bordered = false,
        public bool $card = true,
        public bool $pagination = true,
        public string $emptyMessage = 'هیچ رکوردی برای نمایش یافت نشد.',
        public string $emptyIcon = 'fa-folder-open',
        ?string $id = null,
        ?string $class = null
    ) {
        // Protected implementation
    }

    /**
     * resolveValue signature.
     */
    public function resolveValue(mixed $row, string $key): mixed {
        // Protected implementation
    }

    /**
     * isPaginator signature.
     */
    public function isPaginator(): bool {
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}

namespace MyLaravelCore\Components\Design;

/**
 * Stub definition for Timeline.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class Timeline extends \MyLaravelCore\Components\BaseComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        public array $items = [],
        public string $direction = 'vertical',
        public string $color = 'primary',
        public bool $animated = false,
        ?string $id = null,
        ?string $class = null
    ) {
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}

namespace MyLaravelCore\Components\Design;

/**
 * Stub definition for TimelineItem.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class TimelineItem extends \MyLaravelCore\Components\BaseComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        public string $title,
        public ?string $description = null,
        public ?string $time = null,
        public ?string $icon = 'fa-circle',
        public string $color = 'primary',
        ?string $id = null,
        ?string $class = null
    ) {
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}

namespace MyLaravelCore\Components\Design;

/**
 * Stub definition for Tooltip.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class Tooltip extends \MyLaravelCore\Components\BaseComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        public string $text,
        public string $placement = 'top',
        public string $variant = 'dark',
        public string $trigger = 'hover',
        public int $delay = 200,
        public bool $html = false,
        ?string $id = null,
        ?string $class = null
    ) {
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}

namespace MyLaravelCore\Components\Form;

/**
 * Stub definition for BaseFormComponent.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
abstract class BaseFormComponent extends \MyLaravelCore\Components\BaseComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        string $name,
        ?string $label = null,
        mixed $value = null,
        bool $required = false,
        bool $disabled = false,
        bool $readonly = false,
        ?string $hint = null,
        string $dir = 'auto',
        ?string $id = null,
        ?string $class = null,
        ?string $error = null
    ) {
        // Protected implementation
    }

}

namespace MyLaravelCore\Components\Form;

/**
 * Stub definition for Checkbox.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class Checkbox extends \MyLaravelCore\Components\Form\BaseFormComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        string $name,
        ?string $label = null,
        mixed $value = 1,
        public bool $checked = false,
        public string $size = 'md',
        public string $variant = 'primary',
        bool $disabled = false,
        ?string $hint = null,
        ?string $id = null,
        ?string $class = null,
        ?string $error = null
    ) {
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}

namespace MyLaravelCore\Components\Form;

/**
 * Stub definition for CheckboxGroup.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class CheckboxGroup extends \MyLaravelCore\Components\Form\BaseFormComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        string $name,
        ?string $label = null,
        public array $options = [],
        mixed $value = [],
        public int $columns = 2,
        public string $direction = 'rtl',
        public bool $selectAll = true,
        public ?int $min = null,
        public ?int $max = null,
        bool $required = false,
        bool $disabled = false,
        ?string $hint = null,
        ?string $id = null,
        ?string $class = null,
        ?string $error = null
    ) {
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}

namespace MyLaravelCore\Components\Form;

/**
 * Stub definition for DatetimePicker.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class DatetimePicker extends \MyLaravelCore\Components\Form\BaseFormComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        string $name,
        ?string $label = null,
        mixed $value = null,
        public string $mode = 'date',
        public string $calendar = 'jalali',
        public string $format = 'YYYY/MM/DD',
        public string $outputFormat = 'YYYY-MM-DD',
        public ?string $minDate = null,
        public ?string $maxDate = null,
        public bool $disablePast = false,
        public bool $disableFuture = false,
        public bool $inline = false,
        public bool $withTime = false,
        public int $timeStep = 15,
        public ?string $placeholder = null,
        bool $required = false,
        bool $disabled = false,
        bool $readonly = false,
        ?string $hint = null,
        string $dir = 'ltr',
        ?string $id = null,
        ?string $class = null,
        ?string $error = null
    ) {
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}

namespace MyLaravelCore\Components\Form;

/**
 * Stub definition for DatetimeRangePicker.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class DatetimeRangePicker extends \MyLaravelCore\Components\Form\BaseFormComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        string $name,
        ?string $label = null,
        public ?string $startName = null,
        public ?string $endName = null,
        public mixed $startValue = null,
        public mixed $endValue = null,
        public string $mode = 'date',
        public string $calendar = 'jalali',
        public string $format = 'YYYY/MM/DD',
        public string $outputFormat = 'YYYY-MM-DD',
        public array|bool $presets = true,
        bool $required = false,
        bool $disabled = false,
        ?string $hint = null,
        string $dir = 'ltr',
        ?string $id = null,
        ?string $class = null,
        ?string $error = null
    ) {
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}

namespace MyLaravelCore\Components\Form;

/**
 * Stub definition for Editor.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class Editor extends \MyLaravelCore\Components\Form\BaseFormComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        string $name,
        ?string $label = null,
        mixed $value = null,
        public int $height = 300,
        public array|string $toolbar = 'full',
        public string $direction = 'rtl',
        public ?string $placeholder = null,
        public ?string $uploadRoute = null,
        public ?int $maxLength = null,
        bool $required = false,
        bool $disabled = false,
        bool $readonly = false,
        ?string $hint = null,
        ?string $id = null,
        ?string $class = null,
        ?string $error = null
    ) {
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}

namespace MyLaravelCore\Components\Form;

/**
 * Stub definition for FilePicker.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class FilePicker extends \MyLaravelCore\Components\Form\BaseFormComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        string $name,
        ?string $label = null,
        mixed $value = null,
        public string $accept = '*',
        public int $maxSize = 10240,
        public bool $multiple = false,
        public string $disk = 'public',
        public string $directory = 'uploads',
        public bool $preview = true,
        public bool $dropzone = true,
        public bool $sortable = false,
        bool $required = false,
        bool $disabled = false,
        ?string $hint = null,
        ?string $id = null,
        ?string $class = null,
        ?string $error = null
    ) {
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}

namespace MyLaravelCore\Components\Form;

/**
 * Stub definition for IconPicker.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class IconPicker extends \MyLaravelCore\Components\Form\BaseFormComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        string $name,
        ?string $label = null,
        mixed $value = null,
        public string $iconSet = 'fontawesome',
        public bool $searchable = true,
        public bool $categories = true,
        public bool $preview = true,
        bool $required = false,
        bool $disabled = false,
        ?string $hint = null,
        ?string $id = null,
        ?string $class = null,
        ?string $error = null
    ) {
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}

namespace MyLaravelCore\Components\Form;

/**
 * Stub definition for ItemCollector.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class ItemCollector extends \MyLaravelCore\Components\Form\BaseFormComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        string $name,
        ?string $label = null,
        public array $items = [],
        public array $fields = [],
        public int $minItems = 0,
        public ?int $maxItems = null,
        public bool $sortable = true,
        public bool $removable = true,
        public string $addLabel = 'افزودن آیتم',
        public ?string $template = null,
        bool $required = false,
        bool $disabled = false,
        ?string $hint = null,
        ?string $id = null,
        ?string $class = null,
        ?string $error = null
    ) {
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}

namespace MyLaravelCore\Components\Form;

/**
 * Stub definition for NestedSelects.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class NestedSelects extends \MyLaravelCore\Components\Form\BaseFormComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        string $name,
        ?string $label = null,
        mixed $value = null,
        public ?string $source = null,
        public ?string $routeName = null,
        public string $labelColumn = 'title',
        public string $parentColumn = 'parent_id',
        public string $placeholder = 'انتخاب کنید',
        bool $required = false,
        bool $disabled = false,
        ?string $hint = null,
        ?string $id = null,
        ?string $class = null,
        ?string $error = null
    ) {
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}

namespace MyLaravelCore\Components\Form;

/**
 * Stub definition for NumberInput.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class NumberInput extends \MyLaravelCore\Components\Form\BaseFormComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        string $name,
        ?string $label = null,
        mixed $value = null,
        public int|float|null $min = null,
        public int|float|null $max = null,
        public int|float $step = 1,
        public int $decimals = 0,
        public bool $thousandSeparator = true,
        public string $separator = ',',
        public bool $showButtons = true,
        public bool $persianDigits = true,
        public ?string $unit = null,
        public ?string $placeholder = null,
        bool $required = false,
        bool $disabled = false,
        bool $readonly = false,
        ?string $hint = null,
        string $dir = 'ltr',
        ?string $id = null,
        ?string $class = null,
        ?string $error = null
    ) {
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}

namespace MyLaravelCore\Components\Form;

/**
 * Stub definition for RadioGroup.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class RadioGroup extends \MyLaravelCore\Components\Form\BaseFormComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        string $name,
        ?string $label = null,
        public array $options = [],
        mixed $value = null,
        public int $columns = 1,
        public bool $inline = false,
        public string $variant = 'primary',
        bool $required = false,
        bool $disabled = false,
        ?string $hint = null,
        ?string $id = null,
        ?string $class = null,
        ?string $error = null
    ) {
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}

namespace MyLaravelCore\Components\Form;

/**
 * Stub definition for SelectInput.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class SelectInput extends \MyLaravelCore\Components\Form\BaseFormComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        string $name,
        ?string $label = null,
        mixed $value = null,
        public array $options = [],
        public bool $multiple = false,
        public bool $searchable = true,
        public string $placeholder = 'انتخاب کنید',
        public bool $clearable = true,
        public ?string $ajaxRoute = null,
        public ?string $parentField = null,
        public ?string $parentRoute = null,
        public bool $tags = false,
        public ?int $maxSelections = null,
        bool $required = false,
        bool $disabled = false,
        bool $readonly = false,
        ?string $hint = null,
        string $dir = 'auto',
        ?string $id = null,
        ?string $class = null,
        ?string $error = null
    ) {
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}

namespace MyLaravelCore\Components\Form;

/**
 * Stub definition for TagCollector.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class TagCollector extends \MyLaravelCore\Components\Form\BaseFormComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        string $name,
        ?string $label = null,
        public array $tags = [],
        public string $keyLabel = 'کلید',
        public string $valueLabel = 'مقدار',
        public array $suggestions = [],
        public bool $allowCustom = true,
        bool $required = false,
        bool $disabled = false,
        ?string $hint = null,
        ?string $id = null,
        ?string $class = null,
        ?string $error = null
    ) {
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}

namespace MyLaravelCore\Components\Form;

/**
 * Stub definition for TagInput.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class TagInput extends \MyLaravelCore\Components\Form\BaseFormComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        string $name,
        ?string $label = null,
        mixed $value = [],
        public array $suggestions = [],
        public ?int $maxTags = null,
        public bool $allowCustom = true,
        public string $separator = ',',
        bool $required = false,
        bool $disabled = false,
        ?string $hint = null,
        ?string $id = null,
        ?string $class = null,
        ?string $error = null
    ) {
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}

namespace MyLaravelCore\Components\Form;

/**
 * Stub definition for Textarea.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class Textarea extends \MyLaravelCore\Components\Form\BaseFormComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        string $name,
        ?string $label = null,
        mixed $value = null,
        public int $rows = 4,
        public ?int $maxlength = null,
        public bool $showCounter = true,
        public bool $autoResize = false,
        public ?string $placeholder = null,
        bool $required = false,
        bool $disabled = false,
        bool $readonly = false,
        ?string $hint = null,
        string $dir = 'auto',
        ?string $id = null,
        ?string $class = null,
        ?string $error = null
    ) {
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}

namespace MyLaravelCore\Components\Form;

/**
 * Stub definition for TextInput.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class TextInput extends \MyLaravelCore\Components\Form\BaseFormComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        string $name,
        ?string $label = null,
        mixed $value = null,
        public string $type = 'text',
        public ?string $placeholder = null,
        bool $required = false,
        bool $disabled = false,
        bool $readonly = false,
        ?string $hint = null,
        public ?string $icon = null,
        public string $iconPosition = 'right',
        public string $size = 'md',
        public ?int $maxlength = null,
        public ?int $minlength = null,
        public ?string $pattern = null,
        public ?string $autocomplete = null,
        string $dir = 'auto',
        public ?string $addon = null,
        public string $addonPosition = 'left',
        ?string $id = null,
        ?string $class = null,
        ?string $error = null
    ) {
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}

namespace MyLaravelCore\Components\Layout;

/**
 * Stub definition for DefaultLayout.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class DefaultLayout extends \MyLaravelCore\Components\BaseComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        public ?string $title = null,
        public string $dir = 'rtl',
        public bool $navbar = true,
        public bool $sidebar = false,
        public string|bool $container = 'container',
        public bool $footer = true,
        public bool $alerts = true,
        public string $theme = 'light',
        public ?string $brand = null,
        public ?string $brandUrl = null,
        ?string $id = null,
        ?string $class = null
    ) {
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}

namespace MyLaravelCore\Contracts;

/**
 * Stub definition for FilterableInterface.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
interface FilterableInterface
{
    /**
     * scopeFilter signature.
     */
    public function scopeFilter(Illuminate\Database\Eloquent\Builder $builder, array $filters = []): Illuminate\Database\Eloquent\Builder {
        // Protected implementation
    }

}

namespace MyLaravelCore\Contracts;

/**
 * Stub definition for PaymentGatewayInterface.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
interface PaymentGatewayInterface
{
    /**
     * amount signature.
     */
    public function amount(int|float $amount): static {
        // Protected implementation
    }

    /**
     * callbackUrl signature.
     */
    public function callbackUrl(string $url): static {
        // Protected implementation
    }

    /**
     * description signature.
     */
    public function description(string $description): static {
        // Protected implementation
    }

    /**
     * payer signature.
     */
    public function payer(string $mobile, ?string $email = null): static {
        // Protected implementation
    }

    /**
     * request signature.
     */
    public function request(): array {
        // Protected implementation
    }

    /**
     * verify signature.
     */
    public function verify(string $authority, int|float|null $expectedAmount = null): array {
        // Protected implementation
    }

}

namespace MyLaravelCore\Contracts;

/**
 * Stub definition for SmsDriverInterface.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
interface SmsDriverInterface
{
    /**
     * send signature.
     */
    public function send(
        array|string $receptor,
        string $message,
        ?string $sender = null
    ): array {
        // Protected implementation
    }

    /**
     * sendPattern signature.
     */
    public function sendPattern(
        string $receptor,
        string $template,
        array $tokens = []
    ): array {
        // Protected implementation
    }

}

namespace MyLaravelCore\Contracts;

/**
 * Stub definition for UploaderInterface.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
interface UploaderInterface
{
    /**
     * upload signature.
     */
    public function upload(
        Illuminate\Http\UploadedFile $file,
        ?string $directory = null,
        ?string $disk = null,
        ?string $customName = null
    ): array {
        // Protected implementation
    }

    /**
     * uploadMultiple signature.
     */
    public function uploadMultiple(
        array $files,
        ?string $directory = null,
        ?string $disk = null
    ): array {
        // Protected implementation
    }

    /**
     * delete signature.
     */
    public function delete(string $path, ?string $disk = null): bool {
        // Protected implementation
    }

    /**
     * url signature.
     */
    public function url(
        string $path,
        ?string $disk = null,
        int $expirationMinutes = 60
    ): string {
        // Protected implementation
    }

}

namespace MyLaravelCore;

/**
 * Stub definition for CoreManager.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class CoreManager
{
    /**
     * uploader signature.
     */
    public function uploader(): MyLaravelCore\Contracts\UploaderInterface {
        // Protected implementation
    }

    /**
     * payment signature.
     */
    public function payment(?string $gateway = null): MyLaravelCore\Contracts\PaymentGatewayInterface {
        // Protected implementation
    }

    /**
     * sms signature.
     */
    public function sms(?string $driver = null): MyLaravelCore\Contracts\SmsDriverInterface {
        // Protected implementation
    }

    /**
     * api signature.
     */
    public function api(): MyLaravelCore\Services\ApiResponse {
        // Protected implementation
    }

    /**
     * jdate signature.
     */
    public function jdate(
        string $format = 'Y/m/d H:i',
        mixed $timestamp = null,
        bool $persianDigits = true
    ): string {
        // Protected implementation
    }

    /**
     * toman signature.
     */
    public function toman(mixed $amount, bool $persianDigits = true): string {
        // Protected implementation
    }

    /**
     * rial signature.
     */
    public function rial(mixed $amount, bool $persianDigits = true): string {
        // Protected implementation
    }

    /**
     * persianDigits signature.
     */
    public function persianDigits(mixed $value): string {
        // Protected implementation
    }

    /**
     * englishDigits signature.
     */
    public function englishDigits(mixed $value): string {
        // Protected implementation
    }

}

namespace MyLaravelCore\Facades;

/**
 * Stub definition for Core.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class Core extends \Illuminate\Support\Facades\Facade
{
}

namespace MyLaravelCore\Providers;

/**
 * Stub definition for CoreServiceProvider.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class CoreServiceProvider extends \Illuminate\Support\ServiceProvider
{
    /**
     * register signature.
     */
    public function register(): void {
        // Protected implementation
    }

    /**
     * boot signature.
     */
    public function boot(): void {
        // Protected implementation
    }

}

namespace MyLaravelCore\Services;

/**
 * Stub definition for ApiResponse.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class ApiResponse
{
    /**
     * success signature.
     */
    public function success(
        mixed $data = null,
        string $message = 'Operation successful.',
        int $statusCode = 200,
        array $meta = []
    ): Illuminate\Http\JsonResponse {
        // Protected implementation
    }

    /**
     * created signature.
     */
    public function created(mixed $data = null, string $message = 'Resource created successfully.'): Illuminate\Http\JsonResponse {
        // Protected implementation
    }

    /**
     * error signature.
     */
    public function error(
        string $message = 'An error occurred.',
        int $statusCode = 400,
        mixed $errors = null
    ): Illuminate\Http\JsonResponse {
        // Protected implementation
    }

    /**
     * paginated signature.
     */
    public function paginated(mixed $paginator, string $message = 'Data retrieved successfully.'): Illuminate\Http\JsonResponse {
        // Protected implementation
    }

    /**
     * notFound signature.
     */
    public function notFound(string $message = 'Resource not found.'): Illuminate\Http\JsonResponse {
        // Protected implementation
    }

    /**
     * unauthorized signature.
     */
    public function unauthorized(string $message = 'Unauthorized action.'): Illuminate\Http\JsonResponse {
        // Protected implementation
    }

    /**
     * forbidden signature.
     */
    public function forbidden(string $message = 'Access forbidden.'): Illuminate\Http\JsonResponse {
        // Protected implementation
    }

    /**
     * validationError signature.
     */
    public function validationError(mixed $errors, string $message = 'Validation failed.'): Illuminate\Http\JsonResponse {
        // Protected implementation
    }

}

namespace MyLaravelCore\Services;

/**
 * Stub definition for CodeProtector.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class CodeProtector
{
    /**
     * protectCode signature.
     */
    public function protectCode(string $phpCode): string {
        // Protected implementation
    }

}

namespace MyLaravelCore\Services\Payment\Drivers;

/**
 * Stub definition for AbstractPaymentDriver.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
abstract class AbstractPaymentDriver implements \MyLaravelCore\Contracts\PaymentGatewayInterface
{
    /**
     * Constructor signature.
     */
    public function __construct(array $config = []) {
        // Protected implementation
    }

    /**
     * amount signature.
     */
    public function amount(int|float $amount): static {
        // Protected implementation
    }

    /**
     * callbackUrl signature.
     */
    public function callbackUrl(string $url): static {
        // Protected implementation
    }

    /**
     * description signature.
     */
    public function description(string $description): static {
        // Protected implementation
    }

    /**
     * payer signature.
     */
    public function payer(string $mobile, ?string $email = null): static {
        // Protected implementation
    }

}

namespace MyLaravelCore\Services\Payment\Drivers;

/**
 * Stub definition for MockPaymentDriver.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class MockPaymentDriver extends \MyLaravelCore\Services\Payment\Drivers\AbstractPaymentDriver implements \MyLaravelCore\Contracts\PaymentGatewayInterface
{
    /**
     * request signature.
     */
    public function request(): array {
        // Protected implementation
    }

    /**
     * verify signature.
     */
    public function verify(string $authority, int|float|null $expectedAmount = null): array {
        // Protected implementation
    }

}

namespace MyLaravelCore\Services\Payment\Drivers;

/**
 * Stub definition for ZarinpalDriver.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class ZarinpalDriver extends \MyLaravelCore\Services\Payment\Drivers\AbstractPaymentDriver implements \MyLaravelCore\Contracts\PaymentGatewayInterface
{
    /**
     * Constructor signature.
     */
    public function __construct(array $config = []) {
        // Protected implementation
    }

    /**
     * request signature.
     */
    public function request(): array {
        // Protected implementation
    }

    /**
     * verify signature.
     */
    public function verify(string $authority, int|float|null $expectedAmount = null): array {
        // Protected implementation
    }

}

namespace MyLaravelCore\Services\Payment;

/**
 * Stub definition for PaymentManager.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class PaymentManager
{
    /**
     * via signature.
     */
    public function via(?string $name = null): MyLaravelCore\Contracts\PaymentGatewayInterface {
        // Protected implementation
    }

    /**
     * __call signature.
     */
    public function __call(string $method, array $parameters): mixed {
        // Protected implementation
    }

}

namespace MyLaravelCore\Services\Sms\Drivers;

/**
 * Stub definition for KavenegarDriver.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class KavenegarDriver implements \MyLaravelCore\Contracts\SmsDriverInterface
{
    /**
     * Constructor signature.
     */
    public function __construct(public array $config = []) {
        // Protected implementation
    }

    /**
     * send signature.
     */
    public function send(
        array|string $receptor,
        string $message,
        ?string $sender = null
    ): array {
        // Protected implementation
    }

    /**
     * sendPattern signature.
     */
    public function sendPattern(
        string $receptor,
        string $template,
        array $tokens = []
    ): array {
        // Protected implementation
    }

}

namespace MyLaravelCore\Services\Sms\Drivers;

/**
 * Stub definition for LogSmsDriver.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class LogSmsDriver implements \MyLaravelCore\Contracts\SmsDriverInterface
{
    /**
     * Constructor signature.
     */
    public function __construct(public array $config = []) {
        // Protected implementation
    }

    /**
     * send signature.
     */
    public function send(
        array|string $receptor,
        string $message,
        ?string $sender = null
    ): array {
        // Protected implementation
    }

    /**
     * sendPattern signature.
     */
    public function sendPattern(
        string $receptor,
        string $template,
        array $tokens = []
    ): array {
        // Protected implementation
    }

}

namespace MyLaravelCore\Services\Sms;

/**
 * Stub definition for SmsManager.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class SmsManager
{
    /**
     * via signature.
     */
    public function via(?string $name = null): MyLaravelCore\Contracts\SmsDriverInterface {
        // Protected implementation
    }

    /**
     * __call signature.
     */
    public function __call(string $method, array $parameters): mixed {
        // Protected implementation
    }

}

namespace MyLaravelCore\Services;

/**
 * Stub definition for StubGenerator.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class StubGenerator
{
    /**
     * generateClassStub signature.
     */
    public function generateClassStub(object|string $class): ?string {
        // Protected implementation
    }

}

namespace MyLaravelCore\Services;

/**
 * Stub definition for UploaderService.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class UploaderService implements \MyLaravelCore\Contracts\UploaderInterface
{
    /**
     * upload signature.
     */
    public function upload(
        Illuminate\Http\UploadedFile $file,
        ?string $directory = null,
        ?string $disk = null,
        ?string $customName = null
    ): array {
        // Protected implementation
    }

    /**
     * uploadMultiple signature.
     */
    public function uploadMultiple(
        array $files,
        ?string $directory = null,
        ?string $disk = null
    ): array {
        // Protected implementation
    }

    /**
     * delete signature.
     */
    public function delete(string $path, ?string $disk = null): bool {
        // Protected implementation
    }

    /**
     * url signature.
     */
    public function url(
        string $path,
        ?string $disk = null,
        int $expirationMinutes = 60
    ): string {
        // Protected implementation
    }

}

namespace MyLaravelCore\Traits;

/**
 * Stub definition for ApiResponseTrait.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
trait ApiResponseTrait
{
}

namespace MyLaravelCore\Traits;

/**
 * Stub definition for Auditable.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
trait Auditable
{
    /**
     * getAuditUserModel signature.
     */
    public function getAuditUserModel(): string {
        // Protected implementation
    }

    /**
     * creator signature.
     */
    public function creator(): Illuminate\Database\Eloquent\Relations\BelongsTo {
        // Protected implementation
    }

    /**
     * updater signature.
     */
    public function updater(): Illuminate\Database\Eloquent\Relations\BelongsTo {
        // Protected implementation
    }

    /**
     * deleter signature.
     */
    public function deleter(): Illuminate\Database\Eloquent\Relations\BelongsTo {
        // Protected implementation
    }

}

namespace MyLaravelCore\Traits;

/**
 * Stub definition for Filterable.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
trait Filterable
{
    /**
     * scopeFilter signature.
     */
    public function scopeFilter(Illuminate\Database\Eloquent\Builder $query, array $filters = []): Illuminate\Database\Eloquent\Builder {
        // Protected implementation
    }

}

namespace MyLaravelCore\Traits;

/**
 * Stub definition for HasSlug.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
trait HasSlug
{
    /**
     * getSlugSourceColumn signature.
     */
    public function getSlugSourceColumn(): string {
        // Protected implementation
    }

    /**
     * getSlugColumnName signature.
     */
    public function getSlugColumnName(): string {
        // Protected implementation
    }

    /**
     * generateUniqueSlug signature.
     */
    public function generateUniqueSlug(string $value): string {
        // Protected implementation
    }

    /**
     * scopeWhereSlug signature.
     */
    public function scopeWhereSlug(Illuminate\Database\Eloquent\Builder $query, string $slug): Illuminate\Database\Eloquent\Builder {
        // Protected implementation
    }

    /**
     * findBySlug signature.
     */
    public static function findBySlug(string $slug): ?static {
        // Protected implementation
    }

}

namespace MyLaravelCore\Traits;

/**
 * Stub definition for HasStatus.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
trait HasStatus
{
    /**
     * isActive signature.
     */
    public function isActive(): bool {
        // Protected implementation
    }

    /**
     * isStatus signature.
     */
    public function isStatus(mixed $status): bool {
        // Protected implementation
    }

    /**
     * getStatusValue signature.
     */
    public function getStatusValue(): mixed {
        // Protected implementation
    }

    /**
     * getStatusColumnName signature.
     */
    public function getStatusColumnName(): string {
        // Protected implementation
    }

    /**
     * activate signature.
     */
    public function activate(): bool {
        // Protected implementation
    }

    /**
     * deactivate signature.
     */
    public function deactivate(): bool {
        // Protected implementation
    }

    /**
     * toggleStatus signature.
     */
    public function toggleStatus(): bool {
        // Protected implementation
    }

    /**
     * scopeActive signature.
     */
    public function scopeActive(Illuminate\Database\Eloquent\Builder $query): Illuminate\Database\Eloquent\Builder {
        // Protected implementation
    }

    /**
     * scopeInactive signature.
     */
    public function scopeInactive(Illuminate\Database\Eloquent\Builder $query): Illuminate\Database\Eloquent\Builder {
        // Protected implementation
    }

    /**
     * scopeStatus signature.
     */
    public function scopeStatus(Illuminate\Database\Eloquent\Builder $query, mixed $status): Illuminate\Database\Eloquent\Builder {
        // Protected implementation
    }

}

namespace MyLaravelCore\Traits;

/**
 * Stub definition for HasUuid.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
trait HasUuid
{
    /**
     * initializeHasUuid signature.
     */
    public function initializeHasUuid(): void {
        // Protected implementation
    }

    /**
     * getUuidColumnName signature.
     */
    public function getUuidColumnName(): string {
        // Protected implementation
    }

    /**
     * scopeWhereUuid signature.
     */
    public function scopeWhereUuid(Illuminate\Database\Eloquent\Builder $query, string $uuid): Illuminate\Database\Eloquent\Builder {
        // Protected implementation
    }

    /**
     * findByUuid signature.
     */
    public static function findByUuid(string $uuid): ?static {
        // Protected implementation
    }

    /**
     * findByUuidOrFail signature.
     */
    public static function findByUuidOrFail(string $uuid): static {
        // Protected implementation
    }

}

