<?php
$server = '172.17.34.250';
$user = 'root';
$pass = '';
$dbname = 'fpdb';

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
?>