<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

class WebService
{
    private $conn;

    public function __construct()
    {
        $this->serviceRequest($this->_createRequestObject());
    }
    private function _createRequestObject()
    {
        $method = $_SERVER['REQUEST_METHOD'];
        $url = $_SERVER['REQUEST_URI'];
        $params = [];
        $body = [];
        
        if($method == 'GET')
            $params = $_GET;
        else if($method == 'POST')
        {
            $body = json_decode(file_get_contents("php://input"), true);
        }
        else if($method == 'PUT')
        {
            $body = json_decode(file_get_contents("php://input"), true);
        }
        else if($method == 'DELETE')
        {
            $qstr = $url && (strpos($url, '?') !== false) ? explode('?', $url)[1] : [];
            $params = parse_str($qstr);
        }
        return (object)['method'=>$method, 'url'=>$url, 'params'=>$params, 'body'=>$body];
    }

    protected function serviceRequest($request)
    {
        // override this method in child class
    }

    final protected function answer($data, $ok = true, $http_status_code = 500)
    {
        if($ok)
            echo json_encode((object)['status' => 200, 'data' => $data]);
        else
            echo json_encode((object)['status' => $http_status_code, 'msg' => $data]);
    }
}

?>
