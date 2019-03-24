<?php

require_once __DIR__.'/../core/model.php';

class UserModel extends Model
{
    private $table_name = 'users';

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

    public function create()
    {
        $this->fields['email'] = htmlspecialchars(strip_tags($this->fields['email']));

        $users = $this->find(['email'=>$this->fields['email']], 1);
        if(count($users) != 1)
            $this->answer("Unauthorized", false, 401); // user already exists
        else
        {
            $this->fields['password'] = htmlspecialchars(strip_tags($this->fields['password']));

            $query = 'INSERT INTO ' . $this->table_name . ' SET ' . '
                email = ' . $this->fields['email'] . ' ';

            // hash the password before saving to database
            $this->fields['password'] = password_hash($this->fields['password'], PASSWORD_BCRYPT);
            $query .= 'pass = ' . $this->fields['password'];

            $stmt = Model::$db->prepare($query);
            if($stmt->execute())
                return true;
            else
                return false;
        }

        return false;
    }

    public function find($fields = $this->fields, $limit = -1)
    {
        $query = 'SELECT id, email, password FROM ' . $this->table_name;

        $where = '';
        foreach ($fields as $key => $value)
        {
            $where .= empty($where) ? ' WHERE ' : ' AND ';
            $where .= $key . ' = ' . $value;
        }

        if($limit >= 0)
            $query .= ' LIMIT ' . $limit;

        $stmt = Model::$db->prepare($query);
        $stmt->execute();

        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $rows;
    }
}

?>
