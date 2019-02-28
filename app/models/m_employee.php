<?php

require_once __DIR__.'/../core/model.php';

class EmployeeModel extends Model
{
    private $table_name = 'employees';

    public $id;
    public $name;

    public function __construct()
    {
        if(!Model::$db)
            $this->connect();
    }

    public function readAll()
    {
        $query = 'SELECT * FROM ' . $this->table_name;

        $rows = [];
        if($stmt = Model::$db->query($query))
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $rows;
    }
}

?>
