@extends('layout')

@section('main')
<h1>駅検索</h1>
<section>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col-md-4">
          <form method="GET">
            <div class="input-group">
              <input type="text" name="stationName" class="form-control" />
              <div class="input-group-append">
                <button class="btn btn-sm btn-primary">検索</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
<section>
  @foreach ($stations as $station)
  <div class="mb-2">
    <div>
      <span>{{ $station['stationName'] }}</span>
      <span>（{{ $station['stationId'] }}）</span>
      <span>（{{ $station['company']['companyNameAlias'] }}）</span>
    </div>
    <div class="ml-2">
      @foreach ($station['groupStations'] as $gStation)
      <div>
        <span>{{ $gStation['stationName'] }}</span>
        <span>（{{ $gStation['stationId'] }}）</span>
        <span>（{{ $gStation['company']['companyNameAlias'] }}）</span>
      </div>
      @endforeach
    </div>
  </div>
  @endforeach
</section>
@endsection
