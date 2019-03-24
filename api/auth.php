<?php

include_once 'lib/php-jwt-master/src/BeforeValidException.php';
include_once 'lib/php-jwt-master/src/ExpiredException.php';
include_once 'lib/php-jwt-master/src/SignatureInvalidException.php';
include_once 'lib/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;

require_once __DIR__.'/../app/controllers/c_auth.php';
require_once __DIR__.'/../app/core/web_service.php';
require_once __DIR__.'/../app/models/m_user.php';

class WSAuth extends WebService
{
    protected function serviceRequest($request)
    {
        // login
        if($request->params['p'] == 'login' && $request->method == 'POST')
        {
            $m_user = new UserModel;
            $users = $m_user->find(['email'=>$request->body['email']], 1);
            if(count($users) == 1 && password_verify($request->body['password'], $users[0]['password']))
            {
                $c_auth = new AuthController;
                $access_token = $c_auth->generateAccessToken(['id'=>$users[0]['id'], 'email'=>$users[0]['email']]);

                $this->answer(['token'=>$access_token]);
            }
            else
                $this->answer('Authentication failed', false, 401);
        }
        // token authentication
        else if($request->method == 'POST')
        {
            $token = isset($request->body['token']) ? $request->body['token'] : "";
            if($token)
            {
                $c_auth = new AuthController;
                if($verified_token = $c_auth->verifyAccessToken($token))
                {
                    $this->answer($verified_token->data, false, 401);
                }
                else
                {
                    $this->answer('Authentication failed', false, 401);
                }
            }
        }
    }
}

new WSAuth;

?>
