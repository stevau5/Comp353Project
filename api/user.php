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
            $m_user->fields['id'] = $request->body['id'];
            $m_user->fields['email'] = $request->body['email'];
            $m_user->fields['password'] = $request->body['pass'];

            if($m_user->create())
                $this->answer("User created successfully.");
            else
                $this->answer("Unauthorized", false, 401);
        }
    }
}

new WSUser;

?>
