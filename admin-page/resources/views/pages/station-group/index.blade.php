@extends('layout')

@section('main')
<h1>駅グループ</h1>
<section>
  @foreach ($stationGroups as $stationGroup)
  <div>
    @foreach ($stationGroup->getStations() as $station)
    <span>{{ $station->getStationName() }}</span>
    @endforeach
  </div>
  @endforeach
</section>
@endsection
