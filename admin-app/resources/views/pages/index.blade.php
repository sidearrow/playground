@extends('layout')

@section('main')
<div>
    <a href="{{ url('station') }}">駅検索</a>
    <a href="{{ url('station-group') }}">グループ駅編集</a>
</div>
@endsection
