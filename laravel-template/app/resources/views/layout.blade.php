<!doctype html>
<html lang="ja">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Laravel</title>
    <link href="{{ asset('/assets/style.css') }}" rel="stylesheet" />
</head>

<body>
    <header>
        <nav class="navbar">
            <div class="container">Laravel Template</div>
        </nav>
    </header>
    <main class="container">
        @yield("content")
    </main>
</body>

</html>
