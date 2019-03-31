<head>
    <?php include 'components/head.php' ?>
    <link rel="stylesheet" href="./public/css/lib/highlight/obsidian.css" />
    <script type="text/javascript" src="./public/js/lib/highlight/highlight.pack.js"></script>
    <script type="text/javascript" src="./public/js/lib/axios/axios.min.js"></script>
    <?php include 'components/view_includes.php' ?>
    <title>home</title>
</head>
<body>
    <?php include 'components/header.php' ?>
    <main>
        <section>
            <div class="container">
                <h1><i class="fas fa-database"></i> DB Test</h1>
                <div id="div-user-query">
                    <div class="position-relative">
                        <pre><code contenteditable="true" class="sql"></code></pre>
                        <button id="btn-execute-query" class="btn btn-primary button text-uppercase">Run</button>
                    </div>
                    <div class="results table-responsive shadow"></div>
                    <br />
                </div>
                <div id="div-queries"></div>
            </div>
        </section>
    </main>
    <?php include 'components/footer.php' ?>
</body>
