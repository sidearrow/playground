@extends('layouts.main')

@section('content')
<div>
  <div id="companyTable"></div>
</div>
@endsection

@section('script')
<script src="{{ mix('js/pages/company/index.js') }}"></script>
@endsection
