<head>
    <?php include 'components/head.php' ?>
    <link rel="stylesheet" href="./public/css/lib/highlight/custom.css" />
    <script type="text/javascript" src="./public/js/lib/highlight/highlight.pack.js"></script>
    <?php include 'components/view_includes.php' ?>
    <title>home</title>
</head>
<body>
    <?php include 'components/header.php' ?>
    <main>
        <div class="container">
            <h1>It Works! <i class="far fa-smile"></i></h1>
            <pre><code class="php"><?php echo "\$view = '" . $view . "'\n" . "\$data = "; print_r($data); ?></code></pre>
        </div>
    </main>
    <?php include 'components/footer.php' ?>
</body>
