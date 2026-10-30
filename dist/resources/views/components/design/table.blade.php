@php
    $actionUrl = $searchAction ?: url()->current();
    $searchValue = request($searchField, '');
    $hasRows = is_countable($rows) ? count($rows) > 0 : !empty($rows);
@endphp

<div class="core-data-table {{ $class }}" id="{{ $id }}">
    @if($card)
        <div class="card core-card border-0 shadow-sm rounded-4 bg-white p-4">
    @endif

    {{-- Table Header & Toolbar --}}
    @if($title || $searchable || isset($toolbar) || isset($filters))
        <div class="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
            {{-- Title / Subtitle --}}
            @if($title)
                <div>
                    <h5 class="fw-bold mb-0 d-flex align-items-center gap-2">
                        @if($icon)
                            <i class="fa {{ $icon }} text-warning"></i>
                        @endif
                        <span>{{ $title }}</span>
                    </h5>
                    @if($subtitle)
                        <small class="text-muted">{{ $subtitle }}</small>
                    @endif
                </div>
            @else
                <div></div>
            @endif

            {{-- Actions / Toolbar Buttons --}}
            @if(isset($toolbar))
                <div class="d-flex align-items-center gap-2">
                    {{ $toolbar }}
                </div>
            @endif
        </div>

        {{-- Filter Bar --}}
        @if($searchable || isset($filters))
            <div class="p-3 bg-light rounded-4 border mb-4">
                <form action="{{ $actionUrl }}" method="GET" class="row g-2 align-items-center">
                    @if($searchable)
                        <div class="{{ isset($filters) ? 'col-md-5' : 'col-md-8' }}">
                            <div class="input-group">
                                <span class="input-group-text bg-white border-end-0">
                                    <i class="fa fa-search text-muted"></i>
                                </span>
                                <input type="text" 
                                       name="{{ $searchField }}" 
                                       value="{{ $searchValue }}" 
                                       class="form-control border-start-0 ps-0" 
                                       placeholder="{{ $searchPlaceholder }}">
                            </div>
                        </div>
                    @endif

                    @if(isset($filters))
                        <div class="col-md">
                            {{ $filters }}
                        </div>
                    @endif

                    <div class="col-auto d-flex gap-2">
                        <button type="submit" class="btn btn-warning text-dark fw-bold rounded-pill px-4">
                            <i class="fa fa-filter me-1"></i> فیلتر
                        </button>
                        @if($searchValue || request()->hasAny(array_keys(request()->except(['page']))))
                            <a href="{{ $actionUrl }}" class="btn btn-outline-secondary rounded-pill px-3" title="پاک‌سازی فیلترها">
                                <i class="fa fa-times"></i>
                            </a>
                        @endif
                    </div>
                </form>
            </div>
        @endif
    @endif

    {{-- Main Table --}}
    <div class="table-responsive">
        <table class="table align-middle {{ $striped ? 'table-striped' : '' }} {{ $hover ? 'table-hover' : '' }} {{ $bordered ? 'table-bordered' : '' }}">
            <thead class="table-light">
                <tr>
                    @foreach($columns as $col)
                        @php
                            $colAlign = $col['align'] ?? 'start';
                            $colWidth = $col['width'] ?? null;
                        @endphp
                        <th class="text-{{ $colAlign }} py-3" style="{{ $colWidth ? 'width: ' . $colWidth . ';' : '' }}">
                            {{ $col['label'] ?? '' }}
                        </th>
                    @endforeach
                </tr>
            </thead>
            <tbody>
                @if(!$hasRows)
                    <tr>
                        <td colspan="{{ count($columns) }}" class="text-center py-5 text-muted">
                            <div class="py-4">
                                <i class="fa {{ $emptyIcon }} fa-3x text-secondary opacity-50 mb-3 d-block"></i>
                                <h6 class="fw-bold mb-1">{{ $emptyMessage }}</h6>
                                <p class="small text-muted mb-0">با تغییر عبارات جستجو یا فیلترها دوباره تلاش نمایید.</p>
                            </div>
                        </td>
                    </tr>
                @else
                    @foreach($rows as $rowIndex => $row)
                        <tr>
                            @foreach($columns as $col)
                                @php
                                    $key = $col['key'] ?? '';
                                    $colAlign = $col['align'] ?? 'start';
                                    $colType = $col['type'] ?? $col['format'] ?? 'text';
                                    $val = $key && $key !== 'actions' ? $resolveValue($row, $key) : null;
                                    $subVal = !empty($col['sub']) ? $resolveValue($row, $col['sub']) : null;
                                    $badgeVal = !empty($col['badge']) ? $resolveValue($row, $col['badge']) : null;
                                @endphp
                                <td class="text-{{ $colAlign }}">
                                    {{-- Actions Column --}}
                                    @if($key === 'actions')
                                        <div class="d-flex justify-content-{{ $colAlign === 'center' ? 'center' : ($colAlign === 'end' ? 'end' : 'start') }} gap-1">
                                            @if(isset($col['view']))
                                                @php $viewUrl = is_callable($col['view']) ? $col['view']($row) : $col['view']; @endphp
                                                <a href="{{ $viewUrl }}" class="btn btn-sm btn-outline-info rounded-pill px-3" title="مشاهده">
                                                    <i class="fa fa-eye me-1"></i> {{ $col['viewLabel'] ?? '' }}
                                                </a>
                                            @endif
                                            @if(isset($col['edit']))
                                                @php $editUrl = is_callable($col['edit']) ? $col['edit']($row) : $col['edit']; @endphp
                                                <a href="{{ $editUrl }}" class="btn btn-sm btn-outline-warning text-dark rounded-pill" title="ویرایش">
                                                    <i class="fa fa-edit"></i>
                                                </a>
                                            @endif
                                            @if(isset($col['delete']))
                                                @php $deleteUrl = is_callable($col['delete']) ? $col['delete']($row) : $col['delete']; @endphp
                                                <form action="{{ $deleteUrl }}" method="POST" onsubmit="return confirm('آیا از حذف این مورد اطمینان دارید؟')">
                                                    @csrf
                                                    @method('DELETE')
                                                    <button type="submit" class="btn btn-sm btn-outline-danger rounded-pill" title="حذف">
                                                        <i class="fa fa-trash"></i>
                                                    </button>
                                                </form>
                                            @endif
                                        </div>

                                    {{-- Image Column --}}
                                    @elseif($colType === 'image')
                                        <img src="{{ $val ?: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100' }}" 
                                             alt="" 
                                             class="rounded-3 shadow-sm" 
                                             style="width: 50px; height: 50px; object-fit: cover;">

                                    {{-- Money (Toman) --}}
                                    @elseif($colType === 'toman')
                                        <strong class="text-success">{{ toman($val) }}</strong>

                                    {{-- Rial --}}
                                    @elseif($colType === 'rial')
                                        <span>{{ rial($val) }}</span>

                                    {{-- Number with Persian Digits --}}
                                    @elseif($colType === 'number')
                                        <span>{{ persian_number($val) }}</span>

                                    {{-- Date / Jalali --}}
                                    @elseif($colType === 'date')
                                        <span class="small">{{ $val ? jdate('Y/m/d', $val) : '—' }}</span>

                                    {{-- Datetime --}}
                                    @elseif($colType === 'datetime')
                                        <span class="small">{{ $val ? jdate('Y/m/d H:i', $val) : '—' }}</span>

                                    {{-- Code / Monospace --}}
                                    @elseif($colType === 'code')
                                        <strong class="font-monospace text-primary">{{ $val }}</strong>

                                    {{-- Status Active / Inactive --}}
                                    @elseif($colType === 'status')
                                        @if($val == 1 || $val === true || $val === 'active')
                                            <span class="badge bg-success">فعال</span>
                                        @else
                                            <span class="badge bg-secondary">غیرفعال</span>
                                        @endif

                                    {{-- Payment Status --}}
                                    @elseif($colType === 'payment_status')
                                        @if($val === 'paid')
                                            <span class="badge bg-success-subtle text-success">پرداخت شده</span>
                                        @elseif($val === 'pending')
                                            <span class="badge bg-warning-subtle text-dark">در انتظار پرداخت</span>
                                        @else
                                            <span class="badge bg-danger-subtle text-danger">ناموفق</span>
                                        @endif

                                    {{-- Order Status --}}
                                    @elseif($colType === 'order_status')
                                        @switch($val)
                                            @case('registered')
                                                <span class="badge bg-primary">نوبت پخت</span>
                                                @break
                                            @case('baking')
                                                <span class="badge bg-warning text-dark">در کارگاه</span>
                                                @break
                                            @case('out_for_delivery')
                                                <span class="badge bg-info text-dark">ارسال پیک</span>
                                                @break
                                            @case('delivered')
                                                <span class="badge bg-success">تحویل شد</span>
                                                @break
                                            @case('cancelled')
                                                <span class="badge bg-danger">لغو</span>
                                                @break
                                            @default
                                                <span class="badge bg-secondary">{{ $val }}</span>
                                        @endswitch

                                    {{-- Generic Badge --}}
                                    @elseif($colType === 'badge')
                                        <span class="badge bg-{{ $col['variant'] ?? 'warning' }}-subtle text-{{ $col['variant'] ?? 'warning' }}">
                                            {{ $val }}
                                        </span>

                                    {{-- Default Text with Subtitle & Badge Support --}}
                                    @else
                                        <span class="fw-bold d-block text-dark">{{ $val ?? '—' }}</span>
                                    @endif

                                    {{-- Optional Subtitle under value --}}
                                    @if($subVal)
                                        <span class="text-muted small d-block">{{ $subVal }}</span>
                                    @endif

                                    {{-- Optional Badge next to or below value --}}
                                    @if($badgeVal)
                                        @if(is_bool($badgeVal) || $badgeVal === 1)
                                            <span class="badge bg-{{ $col['badgeVariant'] ?? 'danger' }} ms-1" style="font-size: 0.7rem;">
                                                {{ $col['badgeLabel'] ?? 'ویژه' }}
                                            </span>
                                        @else
                                            <span class="badge bg-light text-secondary d-block mt-1">{{ $badgeVal }}</span>
                                        @endif
                                    @endif
                                </td>
                            @endforeach
                        </tr>
                    @endforeach
                @endif
            </tbody>
        </table>
    </div>

    {{-- Automated Pagination --}}
    @if($pagination && $isPaginator() && $rows->hasPages())
        <div class="d-flex justify-content-center pt-3 border-top mt-3">
            {{ $rows->links('pagination::bootstrap-5') }}
        </div>
    @endif

    @if($card)
        </div>
    @endif
</div>
