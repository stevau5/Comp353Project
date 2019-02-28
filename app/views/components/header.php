<header>
    <nav class="navbar navbar-expand-lg fixed-top navbar-dark">
        <button class="navbar-toggler p-0 border-0 mr-3" type="button">
            <i class="fas fa-bars"></i>
        </button>
        <a class="navbar-brand" href="<?php echo SERVER_GLOBALS::ROOT_DIR; ?>/">COMP 353</a>

        <div class="sidenav">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item <?php if($view && $view == 'home') echo 'active' ?>">
                    <a class="nav-link" href="<?php echo SERVER_GLOBALS::ROOT_DIR; ?>/">Home</a>
                </li>
            </ul>
        </div>
        <div class="sidenav-overlay"></div>

        <ul id="ul-account-options" class="navbar-nav navbar-nav-right ml-auto">
            <li class="nav-item display-none">
                <a class="nav-link" href="<?php echo SERVER_GLOBALS::ROOT_DIR; ?>/"><i class="fas fa-sign-in-alt"></i>&nbsp; Sign In</a>
            </li>
            <li class="nav-item display-none">
                <a class="nav-link" href="<?php echo SERVER_GLOBALS::ROOT_DIR; ?>/"><i class="fas fa-user-plus"></i>&nbsp; Sign Up</a>
            </li>
            <li class="nav-item display-none">
                <a class="nav-link" href="<?php echo SERVER_GLOBALS::ROOT_DIR; ?>/"><i class="fas fa-sign-out-alt"></i>&nbsp; Sign Out</a>
            </li>
        </ul>
    </nav>
</header>
<script type="text/javascript" src="./public/js/components/header.js"></script>
