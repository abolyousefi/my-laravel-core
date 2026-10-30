<div class="btn-group {{ $split ? '' : 'dropdown' }} {{ $class }}" id="{{ $id }}">
    @if($split)
        <button type="button" class="btn btn-{{ $variant }} {{ $size !== 'md' ? 'btn-' . $size : '' }}">
            {{ $label }}
        </button>
        <button type="button" class="btn btn-{{ $variant }} {{ $size !== 'md' ? 'btn-' . $size : '' }} dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
            <span class="visually-hidden">منو</span>
        </button>
    @else
        <button type="button" class="btn btn-{{ $variant }} {{ $size !== 'md' ? 'btn-' . $size : '' }} dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            {{ $label }}
        </button>
    @endif

    <ul class="dropdown-menu dropdown-menu-{{ $align }}">
        @foreach($items as $item)
            @if(!empty($item['divider']))
                <li><hr class="dropdown-divider"></li>
            @else
                <li>
                    <a
                        class="dropdown-item d-flex align-items-center gap-2 {{ isset($item['variant']) ? 'text-' . $item['variant'] : '' }}"
                        href="{{ $item['url'] ?? '#' }}"
                        @if(isset($item['action'])) data-action="{{ $item['action'] }}" @endif
                    >
                        @if(!empty($item['icon']))
                            <i class="fa {{ $item['icon'] }}"></i>
                        @endif
                        <span>{{ $item['label'] ?? '' }}</span>
                    </a>
                </li>
            @endif
        @endforeach
    </ul>
</div>
