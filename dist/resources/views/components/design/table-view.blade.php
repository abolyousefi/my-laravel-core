@props(['table' => null])

@if($table)
    {!! $table->render() !!}
@endif
