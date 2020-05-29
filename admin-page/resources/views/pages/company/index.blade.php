@extends('layout')

@section('main')
<section>
  @foreach ($companies as $company)
  <span class="d-inline-block">{{ $company['companyName'] }}</span>
  @endforeach
</section>
@endsection
