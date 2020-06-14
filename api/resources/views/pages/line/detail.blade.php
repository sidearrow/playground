@extends('layout')

@section('main')
<h1>{{ $line['lineNameAlias'] }}</h1>
<section>
  @foreach ($line['lineSections'] as $lineSection)
  <div class="table-responsive">
    <table class="table table-sm table-bordered">
      <thead class="alert-info">
        <tr>
          <th>駅名</th>
          <th>接続路線</th>
          <th colspan="2">接続駅</th>
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
            <button class="btn btn-sm btn-primary py-0" data-toggle="modal"
              data-target="#stationGroupModal{{ $station['stationId'] }}">追加</button>
            <div class="modal fade" id="stationGroupModal{{ $station['stationId'] }}">
              <div class="modal-dialog modal-sm">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">接続駅追加 - {{ $station['stationName'] }}</h5>
                    <button type="button" class="close" data-dismiss="modal">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form method="POST" action="{{ url("/station/{$station['stationId']}/station-group/update") }}">
                      @csrf
                      <div class="input-group">
                        <input type="text" class="form-control" name="stationId" />
                        <div class="input-group-append">
                          <button class="btn btn-primary">追加</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </td>
          <td>
            @foreach ($station['groupStations'] as $groupStation)
            <div>
              <div class="mb-1">
                <span>
                  <button class="btn btn-sm btn-danger py-0" data-toggle="modal"
                    data-target="#groupStationDeleteModal{{ $groupStation['stationId'] }}">削除</button>
                  <div class="modal fade" id="groupStationDeleteModal{{ $groupStation['stationId'] }}">
                    <div class="modal-dialog modal-sm">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title">接続駅削除 - {{ $groupStation['stationName'] }}</h5>
                          <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <form method="POST"
                            action="{{ url("/station/{$groupStation['stationId']}/station-group/delete") }}">
                            @csrf
                            <button class="btn btn-block btn-danger" type="submit">削除</button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </span>
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
  </div>
  @endforeach
</section>
@endsection
