<?php
session_start();
$hostname = "localhost";
$DB = "tictactoe";
$user = "root";
$password = "";
$connection = mysqli_connect($hostname, $user, $password, $DB);