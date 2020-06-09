@extends('layout')

@section('main')
<h1>出力</h1>
@foreach ($data as $v)
<div class="row mt-4">
  <div class="col-md-3">
    <div class="card">
      <div class="card-body">
        <p class="font-weight-bold">{{ $v['title'] }}</p>
        <form method="GET" action="{{ url('/export/' . $v['title']) }}">
          @foreach ($v['columns'] as $column)
          <div class="form-check">
            <input type="checkbox" name="columns[]" class="form-check-input" value="{{ $column }}"
              id="{{ $v['title'] . '_' . $column }}" />
            <label class="form-check-label" for="{{ $v['title'] . '_' . $column }}">{{ $column }}</label>
          </div>
          @endforeach
          <div class="mt-3">
            <button class="btn btn-block btn-primary" type="submit">出力</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
@endforeach
@endsection
