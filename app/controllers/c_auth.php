<?php

require_once __DIR__.'/../../server_globals.php';

class AuthController
{
    private const ACCESS_TOKEN_EXPIRES_IN = strtotime("+1 day");

    public function generateAccessToken($data)
    {
        $token = array(
            "iss" => SERVER_GLOBALS::ENV['host'],
            "aud" => SERVER_GLOBALS::ENV['host'],
            "iat" => time(),
            "exp" => ACCESS_TOKEN_EXPIRES_IN,
            "data" => $data
        );

        // generate signed token
        $jwt_token = JWT::encode($token, SERVER_GLOBALS::ENV['secret_key']);

        return $jwt_token;
    }

    public function verifyAccessToken($token)
    {
        if($token)
        {
            try {
                $decoded_token = JWT::decode($token, SERVER_GLOBALS::ENV['secret_key'], array('HS256'));

                return $decoded_token;
            }
            catch(Exception $e)
            {
                return false;
            }
        }

        return false;
    }
}

?>
