<?php
$servername = 'localhost';
$username = 'davidvuo_adrian';
$password = 'Password123';
$dbname = 'davidvuo_Battlehack';

$name = $_GET["name"];
$email = $_GET["email"];
$address = $_GET["address"];
$phone = $_GET["phone"];
$creditCardNumber = $_GET["card_number"];
$expDate = $_GET["date"];
$secureCode = $_GET["code"];
$uid = $_GET["uid"];

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "INSERT INTO fpdb (userName, email, adrs, pn, ccn, exp, cvn, uid)
    VALUES ('".$name."', '".$email."', '".$address."', '".$phone."', '".$creditCardNumber."', '".$expDate."', '".$secureCode."', '".$uid."')";
    // use exec() because no results are returned
    $conn->exec($sql);
    echo "New record created successfully";
    }
catch(PDOException $e)
    {
    echo $sql . "<br>" . $e->getMessage();
    }

$conn = null;
?>