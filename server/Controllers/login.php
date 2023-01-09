<?php
require_once 'connection.php';

$username = $_POST["username"];
$password = hash('sha256', $_POST["password"]);

$sql = "CALL get_player('$username', '$password');";
$result = mysqli_query($connection, $sql);
if ($result->num_rows > 0) {
    $DB_player = mysqli_fetch_array($result);
    $_SESSION["playerId"] = $DB_player["player_id"];
    $_SESSION["username"] = $DB_player["username"];
    $_SESSION["firstName"] = $DB_player["firstName"];
    $_SESSION["lastName"] = $DB_player["lastName"];

    echo json_encode(["ok"=>true, "error"=>null]);
}else{
    echo json_encode(["ok"=>false, "error"=>'username or password incorrect.']);
}
