<?php
$server = 'localhost';
$user = 'davidvuo_battleh';
$pass = 'test123';
$dbname = 'davidvuo_BattleHack';

$name = $_GET["name"];
$email = $_GET["email"];
$address = $_GET["address"];
$phone = $_GET["phone"];
$creditCardNumber = $_GET["card_number"];
$expDate = $_GET["date"];
$secureCode = $_GET["code"];
$uid = $_GET["uid"];

$con = mysql_connect($server, $user, $pass) or die("Can't connect");
mysql_select_db($dbname);
echo "It worked";

$sql = 'INSERT INTO fpdb  (userName, email, adrs, pn, ccn, exp, cvn, uid) 
VALUES ('.$name.', '.$email.', '.$address.', '.$phone.', '.$creditCardNumber.', '.$expDate.', '.$secureCode.', '.$uid.')';
$conn->query($sql);
?>