<?php 
require_once "connection.php";
unset($_SESSION["playerId"]);
session_destroy();
if(!isset($_SESSION["playerId"])){
    echo json_encode(["isdestroyed"=>true]);
}else{
    echo json_encode(["isdestroyed"=>false]);
};
