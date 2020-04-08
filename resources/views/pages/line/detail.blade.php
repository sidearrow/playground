@extends('layouts.main')

@section('content')
<h1>{{ $lineName }}</h1>
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#bulkUpdateModal">一括更新</button>
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
<div class="modal fade" id="bulkUpdateModal">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">一括更新</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <textarea class="form-control" rows="20"></textarea>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">キャンセル</button>
        <button type="button" class="btn btn-primary">更新</button>
      </div>
    </div>
  </div>
</div>
@endsection

@section('script')
@endsection
