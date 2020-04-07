@extends('layouts.main')

@section('content')
<h1>{{ $lineName }}</h1>
<div>
  <table>
    <tbody>
      @foreach ($stationData as $station)
      <tr>
        <td>{{ $station['stationId'] }}</td>
        <td>{{ $station['stationName'] }}</td>
        <td>{{ $station['stationNameKana'] }}</td>
        <td>{{ $station['stationNameWiki'] }}</td>
      </tr>
      @endforeach
    </tbody>
  </table>
</div>
@endsection

@section('script')
@endsection
