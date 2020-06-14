@extends('layout')

@section('main')
<h1>一括取込</h1>
<section>
  <form method="POST" action="{{ url('import') }}">
    @csrf
    <div class="card">
      <div class="card-body">
        @foreach ($tables as $table)
        <div class="form-check form-check-inline">
          <input type="radio" name="table" class="form-check-input" value="{{ $table }}" id="radio{{ $table }}" />
          <label for="radio{{ $table }}" class="form-check-label">{{ $table }}</label>
        </div>
        @endforeach
      </div>
    </div>
    <div class="mt-3">
      <textarea class="form-control text-monospace" rows="10" name="data"></textarea>
    </div>
    <div class="row justify-content-center mt-3">
      <div class="col-md-4">
        <button type="submit" class="btn btn-block btn-primary">取込</button>
      </div>
    </div>
  </form>
</section>
@endsection
