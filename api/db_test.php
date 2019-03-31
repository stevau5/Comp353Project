<?php

require_once __DIR__.'/../app/core/database/db.php';
require_once __DIR__.'/../app/core/web_service.php';

class WSDBTest extends WebService
{
    protected function serviceRequest($request)
    {
        if($request->params['p'] == 'query' && $request->method == 'POST')
            $this->query(strip_tags($request->body['query']));
    }

    private function query($query)
    {
        $query = trim($query);
        if(stripos($query, 'DROP') !== false)
            $this->answer('DO NOT DROP!', false, 400);
        else {
            try {
                $db = (new DB)->connect();
                $rows = [];
                $stmt = $db->prepare($query);
                if($stmt->execute())
                {
                    if(stripos($query, 'SELECT') !== false)
                    {
                        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
                        $this->answer((object) ['results' => $rows]);
                    }
                    else
                        $this->answer((object) ['msg' => 'Success!']);
                }
                else
                    $this->answer('Something went wrong...', false);
            }
            catch(Exception $e)
            {
                $this->answer(implode($e->errorInfo, " : "), false);
            }
        }
    }
}

new WSDBTest;

?>
