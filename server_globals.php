<?php

final class SERVER_GLOBALS
{
    public const ENV = "dev";
    public const ROOT_DIR = SERVER_GLOBALS::ENV == "dev" ? "/Comp353Project" : "";
}

?>
