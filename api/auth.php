<?php

require_once __DIR__.'/../app/core/web_service.php';
require_once __DIR__.'/../app/models/m_user.php';

class WSUser extends WebService
{
    protected function serviceRequest($request)
    {
        if($request->method == 'POST')
        {
            $m_user = new UserModel;
            $users = $m_user->find(['email'=>'example1@example.com']);
            if(count($users) != 1)
                $this->answer("Unauthorized", false, 401);
            else
            {
                // compare password hash with hashed $_POST['pass']
                // generate access token and serve it in the response along with expiration
            }
        }
    }
}

new WSUser;

?>
