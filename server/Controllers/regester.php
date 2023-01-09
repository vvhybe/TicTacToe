<?php
require_once 'connection.php';
require '../Utils/Ranumid.php';

$playerId = ranumid();
$firstname = $_POST["firstname"];
$lastname = $_POST["lastname"];
$username = $_POST["username"];
$password = hash('sha256', $_POST["password"]);

$u_sql = "SELECT is_username_reserved('$username') AS is_username_reserved;";
$DB_username_check = intval(mysqli_fetch_array(mysqli_query($connection, $u_sql))["is_username_reserved"]);

if($DB_username_check == 0){

    $id_sql = "SELECT is_id_reserved('$playerId') AS is_id_reserved;";
    $DB_id_check = intval(mysqli_fetch_array(mysqli_query($connection, $id_sql))["is_id_reserved"]);

    while ($DB_id_check == 1) {
        $playerId = ranumid();
        $id_sql = "SELECT is_id_reserved('$playerId') AS is_id_reserved;";
        $DB_id_check = intval(mysqli_fetch_array(mysqli_query($connection, $id_sql))["is_id_reserved"]);
    }

    $insert_sql = "CALL add_player('$playerId','$username', '$firstname', '$lastname', '$password');";
    $result = mysqli_query($connection, $insert_sql);

    if($result){
        $_SESSION["playerId"] = $playerId;
        $_SESSION["username"] = $username;
        $_SESSION["firstName"] = $firstname;
        $_SESSION["lastName"] = $lastname;

        echo json_encode(["ok"=>true, "error"=>null]);

    }else{
        echo json_encode(["ok"=>false,  "error"=>null]);
    }
}else{
    echo json_encode(["ok"=>false, "error"=>"The username:'$username', Already taken."]);
}