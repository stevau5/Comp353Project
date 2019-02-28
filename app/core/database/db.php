<?php

class DB
{
    private $conn;

    public function connect()
    {
        $db_config = parse_ini_file(__DIR__.'/db_config.ini');
        $this->conn = null;
        try
        {
            $this->conn = new PDO('mysql:host=' . $db_config['host'] . ';dbname=' . $db_config['name'], $db_config['user'], $db_config['pass']);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        catch(PDOException $e)
        {
            echo 'DB Error: ' . $e->getMessage();
        }

        return $this->conn;
    }
}

?>
