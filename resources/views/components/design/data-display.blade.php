<div {{ $attributes->merge(['class' => 'card ' . ($bordered ? 'border' : 'border-0') . ' shadow-sm rounded-4 mb-4 x-data-display']) }} data-component="data-display">
    @if($title)
        <div class="card-header bg-white border-bottom py-3">
            <h6 class="m-0 fw-bold">{{ $title }}</h6>
        </div>
    @endif
    <div class="card-body">
        <div class="row g-4 row-cols-1 row-cols-md-{{ $cols }}" data-align-values="{{ $alignValues ? 'true' : 'false' }}">
            {{ $slot }}
        </div>
    </div>
</div>