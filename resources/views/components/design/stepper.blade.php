<div
    class="core-stepper core-stepper-{{ $orientation }} {{ $class }}"
    id="{{ $elementId }}"
    data-component="stepper"
    data-component-id="{{ $elementId }}"
    data-current-step="{{ $currentStep }}"
    data-clickable="{{ $clickable ? 'true' : 'false' }}"
>
    <div class="core-stepper-list" role="tablist">
        @foreach($steps as $idx => $step)
            @php
                $stepNum = $idx + 1;
                $sTitle = is_array($step) ? ($step['title'] ?? '') : $step;
                $sSubtitle = is_array($step) ? ($step['subtitle'] ?? null) : null;
                $sState = $stepNum < $currentStep ? 'completed' : ($stepNum === $currentStep ? 'active' : 'pending');
            @endphp
            <div class="core-stepper-step is-{{ $sState }}" data-step-index="{{ $stepNum }}">
                <span class="core-stepper-indicator">{{ $stepNum }}</span>
                <div class="core-stepper-label">
                    <strong>{{ $sTitle }}</strong>
                    @if($sSubtitle)<small>{{ $sSubtitle }}</small>@endif
                </div>
            </div>
        @endforeach
        {{ $slot }}
    </div>
</div>
