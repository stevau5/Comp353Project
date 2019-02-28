<?php

require_once __DIR__.'/../app/core/web_service.php';
require_once __DIR__.'/../app/models/m_employee.php';

class WSExample extends WebService
{
    protected function serviceRequest($request)
    {
        $m_employee = new EmployeeModel;

        if($request->method == 'GET')
            $this->answer($m_employee->readAll());
    }
}

new WSExample;

?>
