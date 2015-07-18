<?php
$server = 'localhost';
$user = 'root';
$pass = '';
$dbname = 'fpdb';
$con = mysql_connect($server, $user, $pass) or die("Can't connect");
mysql_select_db($dbname);
echo "It worked";
?>