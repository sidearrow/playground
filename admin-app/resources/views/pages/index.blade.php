@extends('layout')

@section('main')
<div>
    <div class="form-row">
        @foreach ($status as $v)
        <div class="col-md-2">
            <div class="card">
                <div class="card-header">{{ $v['title'] }}</div>
                <div class="card-body">{{ $v['value'] }}</div>
            </div>
        </div>
        @endforeach
    </div>
</div>
@endsection
