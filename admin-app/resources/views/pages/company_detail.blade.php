@extends('layout')

@section('main')
<h1><?= $company['companyNameAlias'] ?></h1>
<div>
  <?php foreach ($lines as $line) :?>
  <a href="<?= url("/line/{$line['lineId']}") ?>"><?= $line['lineNameAlias'] ?></a>
  <?php endforeach; ?></div>
@endsection
