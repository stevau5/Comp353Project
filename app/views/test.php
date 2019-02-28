
<head>
    <?php include 'components/head.php' ?>
    <link rel="stylesheet" href="./public/css/lib/highlight/custom.css" />
    <script type="text/javascript" src="./public/js/lib/highlight/highlight.pack.js"></script>
    <script type="text/javascript" src="./public/js/lib/axios/axios.min.js"></script>
    <?php include 'components/view_includes.php' ?>
    <title>test</title>
</head>
<body>
    <?php include 'components/header.php' ?>
    <main>
        <div class="container">
            <h1>It Works! <i class="far fa-smile"></i></h1>
            <pre><code class="php"><?php echo "\$view = '" . $view . "'\n" . "\$data = "; print_r($data); ?></code></pre>
            <h4>API request to '/api/example.php'</h4>
            <pre><code id="output" class="php"></code></pre>
            <button class="button bg-primary mt-2" type="button">Button</button>
        </div>
    </main>
    <?php include 'components/footer.php' ?>
</body>
