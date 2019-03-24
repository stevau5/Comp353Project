<?php

final class SERVER_GLOBALS
{
    public const ENV = [
        'name' => 'dev',
        'host' => 'localhost',
        'secret_key' => 'shh__its_a_secret'
    ];
    public const ROOT_DIR = SERVER_GLOBALS::ENV['name'] == "dev" ? "/Comp353Project" : "";
}

?>
