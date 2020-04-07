@extends('layouts.main')

@section('content')
<div>
  <table class="table table-sm table-bordered">
    <thead>
      <tr>
        <th>会社名</th>
        <th>会社名（カナ）</th>
      </tr>
    </thead>
    <tbody>
      @foreach ($companies as $company)
      <tr>
        <td>{{ $company['companyName'] }}</td>
        <td>{{ $company['companyNameKana'] }}</td>
      </tr>
      @endforeach
    </tbody>
  </table>
</div>
@endsection
