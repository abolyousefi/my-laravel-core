<th
    id="{{ $elementId }}"
    class="core-table-column text-{{ $align }} {{ $sortable ? 'is-sortable' : '' }} {{ $pinned ? 'is-pinned-' . $pinned : '' }} {{ $class }}"
    data-column="{{ $name }}"
    @if($sortable) data-sortable="true" data-sort-dir="{{ $sortDirection }}" @endif
    @if($width) style="width: {{ $width }};" @endif
    @if($hidden) hidden @endif
>
    <span class="core-table-column-label">{{ $label ?: $slot }}</span>
    @if($sortable)
        <span class="core-table-sort-icon">{{ $sortDirection === 'asc' ? '↑' : ($sortDirection === 'desc' ? '↓' : '↕') }}</span>
    @endif
</th>
