<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');

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
            $qstr = $url && (strpos($url, '?') !== false) ? explode('?', $url)[1] : [];
            parse_str($qstr, $params);
            $body = json_decode(file_get_contents("php://input"), true);
        }
        else if($method == 'PUT')
        {
            $qstr = $url && (strpos($url, '?') !== false) ? explode('?', $url)[1] : [];
            parse_str($qstr, $params);
            $body = json_decode(file_get_contents("php://input"), true);
        }
        else if($method == 'DELETE')
        {
            $qstr = $url && (strpos($url, '?') !== false) ? explode('?', $url)[1] : [];
            parse_str($qstr, $params);
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
        {
            http_response_code(200);
            echo json_encode((object)['status' => 200, 'data' => $data]);
        }
        else
        {
            http_response_code($http_status_code);
            echo json_encode((object)['status' => $http_status_code, 'msg' => $data]);
        }
    }
}

?>
