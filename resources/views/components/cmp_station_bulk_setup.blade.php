<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#bulkUpdateModal">駅データ一括更新</button>
<div class="modal fade" id="bulkUpdateModal" {{ $errors->has('bulkUpdateData') ? 'data-modal-open' : '' }}>
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <form method="POST" action="{{ url('station-bulk-update') }}">
        @csrf
        <div class="modal-header">
          <h5 class="modal-title">駅データ一括更新</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          @if ($errors->has('bulkUpdateData'))
          <div class="alert alert-danger">{{ $errors->first('bulkUpdateData') }}</div>
          @endif
          <textarea class="form-control" rows="20" name="bulkUpdateData"></textarea>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">キャンセル</button>
          <button type="submit" class="btn btn-primary">更新</button>
        </div>
      </form>
    </div>
  </div>
</div>
