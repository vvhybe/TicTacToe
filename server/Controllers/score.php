<?php
require_once 'connection.php';
$json_req = json_decode(file_get_contents("php://input"));
$playerId = $_SESSION["playerId"];
$Xscore = $json_req->Xscore;
$Oscore = $json_req->Oscore;

$sql = "CALL insert_player_score('$playerId', $Xscore, $Oscore);";
$result = mysqli_query($connection, $sql);
print_r($result);
echo "ID:$playerId [O:$Oscore VS $Xscore:X]";
