<?php

class Router
{
    final protected function view($view, $data = [])
    {
        echo "<!DOCTYPE html><html>";

        require_once __DIR__.'/../views/' . $view . '.php';

        echo "</html>";
    }

    public function route()
    {
        $url = $this->parseUrl();

        if(file_exists(__DIR__.'/../views/' . $url[0] . '.php'))
            $this->view($url[0], $url[1]);
        else
        {
            http_response_code(404);
            $this->view('404', $url[1]);
        }
    }

    private function parseUrl()
    {
        $url = array(0 => 'home', 1 => []);
        if(isset($_GET['url']))
        {
            $url[0] = filter_var(rtrim($_GET['url'], '/'), FILTER_SANITIZE_URL);
            $url[1] = $_GET;
            array_shift($url[1]);
        }
        else
            $url[1] = $_GET;

        return $url;
    }
}

?>
