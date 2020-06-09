@extends('layout')

@section('main')
<div class="row justify-content-center">
  <div class="col-md-4">
    <div class="card">
      <div class="card-body">
        <form method="POST">
          @csrf
          <label>パスワード</label>
          <input type="password" class="form-control" name="password" />
          <div class="mt-3">
            <button type="submit" class="btn btn-block btn-primary">ログイン</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
@endsection
