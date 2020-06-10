<html>

<head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous">
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
        integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous">
    </script>
    <style>
        html {
            font-size: 13px
        }

        table {
            font-size: 0.9rem
        }

        h1 {
            font-size: 2rem;
            margin-bottom: 2rem;
        }
    </style>
</head>

<body>
    <!--nobanner-->
    <header>
        <nav class="navbar navbar-light border-bottom">
            <div class="container">
                <a class="navbar-brand" href="{{ url('/') }}">鉄道統計情報 管理画面</a>
            </div>
            @if (($nav ?? true) === true)
            <!--
            <button class="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#navbarContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        -->
            <div class="container d-block" id="navbarContent">
                <a href="{{ url('/line') }}">路線一覧</a>
                <a href="{{ url('/station') }}">駅検索</a>
                <a href="{{ url('/station-group') }}">グループ駅編集</a>
                <a href="{{ url('/import') }}">一括取込</a>
                <a href="{{ url('/export') }}">出力</a>
            </div>
            @endif
        </nav>
    </header>
    <div class="text-center mt-3">
        <script type="text/javascript" src="https://cache1.value-domain.com/xa.j?site=railwaystatistics.s1010.xrea.com">
        </script>
    </div>
    <main class="container py-5">@yield('main')</main>
    @yield('script')
</body>

</html>
