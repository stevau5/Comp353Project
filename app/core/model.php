<?php

require_once __DIR__.'/database/db.php';

class Model
{
    public static $db = null;

    protected static final function connect()
    {
        Model::$db = (new DB)->connect();
    }
}

?>
