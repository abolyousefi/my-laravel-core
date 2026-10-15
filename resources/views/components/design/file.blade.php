<div class="card core-file-card border shadow-sm p-3 rounded-3 d-flex flex-row align-items-center gap-3 {{ $class }}" id="{{ $id }}">
    <div class="file-icon-box bg-light rounded-3 p-3 text-primary d-flex align-items-center justify-content-center">
        <i class="fa {{ $icon }} fs-3"></i>
    </div>

    <div class="file-details flex-grow-1 overflow-hidden">
        <h6 class="mb-1 text-truncate fw-semibold" title="{{ $name }}">{{ $name }}</h6>
        <div class="text-muted small d-flex align-items-center gap-2">
            @if($size)
                <span>{{ $size > 1024 ? round($size / 1024, 1) . ' MB' : $size . ' KB' }}</span>
            @endif
            @if($type)
                <span class="badge bg-light text-muted border text-uppercase">{{ $type }}</span>
            @endif
        </div>
    </div>

    <div class="file-actions d-flex align-items-center gap-2">
        @if($downloadable)
            <a href="{{ $url }}" class="btn btn-sm btn-outline-primary" download title="دانلود">
                <i class="fa fa-download"></i>
            </a>
        @endif
        @if($deletable)
            <button type="button" class="btn btn-sm btn-outline-danger btn-delete-file" data-url="{{ $url }}" title="حذف">
                <i class="fa fa-trash"></i>
            </button>
        @endif
    </div>
</div>
