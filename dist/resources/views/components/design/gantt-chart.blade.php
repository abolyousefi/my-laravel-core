<div class="core-gantt-chart {{ $class }}" id="{{ $elementId }}" data-component="gantt-chart" data-component-id="{{ $elementId }}" data-view-mode="{{ $viewMode }}" data-tasks="{{ json_encode($tasks) }}">
    @if($title)
        <div class="core-gantt-header">
            <h5 class="core-gantt-title">{{ $title }}</h5>
        </div>
    @endif
    <div class="core-gantt-canvas" style="min-height: {{ $height }};">
        @foreach($tasks as $task)
            @php
                $tName = $task['name'] ?? $task['title'] ?? 'Task';
                $tProgress = (int) ($task['progress'] ?? 0);
                $tStart = $task['start'] ?? '';
                $tEnd = $task['end'] ?? '';
            @endphp
            <div class="core-gantt-row">
                <div class="core-gantt-task-info">
                    <strong>{{ $tName }}</strong>
                    @if($tStart || $tEnd)<small>({{ $tStart }} - {{ $tEnd }})</small>@endif
                </div>
                <div class="core-gantt-bar-track">
                    <div class="core-gantt-bar-fill" style="width: {{ min(100, max(0, $tProgress)) }}%;">{{ $tProgress }}%</div>
                </div>
            </div>
        @endforeach
        {{ $slot }}
    </div>
</div>
