@extends('layout')

@section('main')
<h1>出力</h1>
@foreach ($data as $v)
<div class="row mt-4">
  <div class="col-md-3">
    <div class="card">
      <div class="card-body">
        <p class="font-weight-bold">{{ $v['title'] }}</p>
        <form method="GET">
          @foreach ($v['columns'] as $column)
          <div class="form-check">
            <input type="checkbox" name="columns[]" class="form-check-input" value="{{ $column }}"
              id="{{ $v['title'] . '_' . $column }}" />
            <label class="form-check-label" for="{{ $v['title'] . '_' . $column }}">{{ $column }}</label>
          </div>
          @endforeach
          <div class="mt-3 form-row">
            <div class="col">
              <button class="btn btn-block btn-primary output-textarea-btn" type="button"
                data-url="{{ url('/export/text-tsv-company') }}">表示</button>
            </div>
            <div class="col">
              <button class="btn btn-block btn-primary" type="submit">出力</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
<section class="mt-4">
  <textarea id="outputTextarea" class="form-control text-monospace" readonly></textarea>
</section>
@endforeach
@endsection

@section('script')
<script>
  const elOutpurTextarea = document.getElementById('outputTextarea');
  $('.output-textarea-btn').click(function (el) {
    const url = el.target.getAttribute('data-url') + '?'+ $(this).closest('form').serialize();
    $.ajax({url: url}).done(function (data) {
      elOutpurTextarea.value = data;
    });
  });
</script>
@endsection
