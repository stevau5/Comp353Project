
<?php
    if(file_exists(__DIR__.'/../../../public/css/'.$view.'.css'))
        echo '<link rel="stylesheet" href="./public/css/' . $view. '.css?r=' . filemtime(__DIR__.'/../../../public/css/'.$view.'.css') . '" />';
?>

<?php
    if(file_exists(__DIR__.'/../../../public/js/'.$view.'.js'))
        echo '<script type="text/javascript" src="./public/js/' . $view. '.js?r=' . filemtime(__DIR__.'/../../../public/js/'.$view.'.js') . '"></script>';
?>
