<?php
//декодирование JSON-данных
$_POST=json_decode(file_get_contents("php://input"),true);

echo var_dump($_POST);
//$_POST является тем response, который будет нам приходить с сервера 