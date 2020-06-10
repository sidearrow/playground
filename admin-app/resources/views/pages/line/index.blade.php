@extends('layout')

@section('main')
<h1>路線一覧</h1>
<section>
  <div class="row">
    @foreach ($lines as $line)
    <div class="col-md-4 col-6">
      <a href="{{ url('/line/' . $line['lineId']) }}">{{ $line['lineNameAlias'] }}</a>
      <span>（{{ $line['company']['companyNameAlias'] }}）</span>
    </div>
    @endforeach
  </div>
</section>
@endsection
