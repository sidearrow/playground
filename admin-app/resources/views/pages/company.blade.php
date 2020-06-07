@extends('layout')

@section('main')
<h1>事業者一覧</h1>
<div class="row">
    <?php foreach ($companies as $company) : ?>
    <div class="col-md-3">
        <a href="<?= url("/company/{$company['companyId']}") ?>"><?= $company['companyNameAlias'] ?>
        </a>
    </div>
    <?php endforeach; ?>
</div>
@endsection
