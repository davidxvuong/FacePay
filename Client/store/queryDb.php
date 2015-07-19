<?php
$servername = 'localhost';
$username = 'davidvuo_adrian';
$password = 'Password123';
$dbname = 'davidvuo_Battlehack';

$uid = $_POST["uid"];

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "SELECT * from fpdb";//'".$uid."'
    // use exec() because no results are returned
    $result = $conn->query($sql);
    echo "records obtained";
	echo "herro";
	echo $uid;
	echo $result;
    }
catch(PDOException $e)
    {
    echo $sql . "<br>" . $e->getMessage();
    }

$conn = null;

?>