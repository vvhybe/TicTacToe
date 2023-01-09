<?php
session_start();
if(isset($_SESSION["playerId"])){
    echo json_encode(["ok"=>true, "player"=>["playerId"=>$_SESSION["playerId"], "username"=>$_SESSION["username"], "firstName"=>$_SESSION["firstName"], "lastName"=>$_SESSION["lastName"]]]);
}else{
    echo json_encode(["ok"=>false]);
}
