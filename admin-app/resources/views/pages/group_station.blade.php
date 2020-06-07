@extends('layout')

@section('main')
<h1>グループ駅編集</h1>
<section>
  <div class="card">
    <div class="card-body">
      <form>
        <div class="row">
          <div class="col-md-4">
            <input class="form-control" name="stationName" />
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-4">
            <button class="btn btn-block btn-primary" type="submit">検索</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</section>
<section class="mt-4">
  <div class="form-row">
    @foreach ($stationGroups as $stationGroup)
    <div class="col-md-3 mb-2">
      <div class="card h-100">
        <div class="card-body">
          @foreach ($stationGroup['stations'] as $station)
          <div>{{ $station['stationName'] }}</div>
          @endforeach
        </div>
      </div>
    </div>
    @endforeach
  </div>
</section>
@endsection
