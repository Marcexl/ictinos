<?php
/*
 * mixed by Marcexl
 * version 06042022
 * 
 */

$data  = new stdClass();
if( (isset($_GET['id'])) and (isset($_GET['proyect'])) )
{
    $proyect = $_GET['proyect'];
    $id      = $_GET['id'];

    $string = file_get_contents("../json/caption.json");
    if ($string === false) 
    {
        $data->success = false;
        $data->msj = 'error get content';
    }
    
    $json_a = json_decode($string, true);
    if ($json_a === null) 
    {
        $data->success = false;
        $data->msj = 'error json parse';
    }
    else
    {
        $data->success = true;
        $data->caption = $json_a[$proyect][$id]['caption'];
    }
    
    echo json_encode($data);
    exit();
}
?>