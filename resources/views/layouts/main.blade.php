<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Laravel</title>
    <link rel="stylesheet" href="{{ mix('css/app.css') }}" />
</head>

<body class="container">
    <div class="content">@yield('content')</div>
    @yield('script')
</body>

</html>
