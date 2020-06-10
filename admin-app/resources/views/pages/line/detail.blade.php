@extends('layout')

@section('main')
<h1>{{ $line['lineNameAlias'] }}</h1>
<section>
  @foreach ($line['lineSections'] as $lineSection)
  <table class="table table-sm table-bordered">
    <thead class="alert-info">
      <tr>
        <th>駅名</th>
        <th>接続路線</th>
        <th>接続駅</th>
      </tr>
    </thead>
    <tbody>
      @foreach ($lineSection['stations'] as $station)
      <tr>
        <td>
          <span>{{ $station['stationName'] }}</span>
          <span>（{{ $station['stationId'] }}）</span>
        </td>
        <td>
          @foreach ($station['lines'] as $line)
          <div>
            <a href="{{ url('/line/' . $line['lineId']) }}">{{ $line['lineNameAlias'] }}</a>
          </div>
          @endforeach
        </td>
        <td>
          @foreach ($station['groupStations'] as $groupStation)
          <div>
            <div>
              <span>{{ $groupStation['stationName'] }}</span>
              <span>（{{ $groupStation['company']['companyNameAlias'] }}）</span>
            </div>
          </div>
          @endforeach
        </td>
      </tr>
      @endforeach
    </tbody>
  </table>
  @endforeach
</section>
@endsection
