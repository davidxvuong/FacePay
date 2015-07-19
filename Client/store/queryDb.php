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
    $stmt = $conn->prepare("SELECT * from fpdb where uid = '".$uid."'"); 
    $stmt->execute();

    // set the resulting array to associative
    $result = $stmt->setFetchMode(PDO::FETCH_ASSOC); 
	
	
	echo json_encode($stmt->fetchAll());
    }
catch(PDOException $e)
    {
    echo $sql . "<br>" . $e->getMessage();
    }

$conn = null;

?>