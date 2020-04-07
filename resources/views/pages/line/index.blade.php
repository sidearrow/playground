@extends('layouts.main')

@section('content')
<h1>路線一覧</h1>
<div>
  @foreach ($lineData as $line)
  <div>
    @if ($line['lineDetailUrl'] !== null)
    <a href="{{ $line['lineDetailUrl'] }}">{{ $line['lineName'] }}</a>
    @else
    <span>{{ $line['lineName'] }}</span>
    @endif
    <span>（{{ $line['companyName'] }}）</span>
  </div>
  @endforeach
</div>
@endsection

@section('script')
@endsection
