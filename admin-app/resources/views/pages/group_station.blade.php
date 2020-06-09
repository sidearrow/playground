@extends('layout')

@section('main')
<h1>グループ駅編集</h1>
<section class="mt-4">
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col-md-4">
          <form>
            <div class="input-group">
              <input class="form-control" name="stationName" placeholder="駅名" />
              <div class="input-group-append">
                <button class="btn btn-primary" type="submit">検索</button>
              </div>
            </div>
          </form>
        </div>
        <div class="col-md-4">
          <form method="POST" action="{{ url('station-group/create') }}">
            @csrf
            <div class="input-group">
              <input class="form-control" name="stationId" placeholder="駅 ID" />
              <div class="input-group-append">
                <button class="btn btn-primary" type="submit">新規追加</button>
              </div>
            </div>
          </form>
        </div>
      </div>
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
          <div class="mb-1">
            <form method="POST" action="{{ url('station-group/delete') }}">
              @csrf
              <input type="hidden" name="stationGroupId" value="{{ $stationGroup['stationGroupId'] }}" />
              <input type="hidden" name="stationId" value="{{ $station['stationId'] }}" />
              <button class="btn btn-sm py-0 btn-danger">削除</button>
              <span>{{ $station['stationName'] }}</span>
              <span>（{{ $station['stationId'] }}）</span>
            </form>
          </div>
          @endforeach
          <div class="mt-3">
            <form method="POST" action="{{ url('station-group/update') }}">
              @csrf
              <input type="hidden" name="stationGroupId" value="{{ $stationGroup['stationGroupId'] }}" />
              <input type="hidden" name="stationId" value="{{ $station['stationId'] }}" />
              <div class="input-group">
                <input type="text" class="form-control" name="stationId" />
                <div class="input-group-append">
                  <button type="submit" class="btn btn-primary">追加</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    @endforeach
  </div>
</section>
@endsection
