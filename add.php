<?php 
require_once dirname(__FILE__).'/conf/config.php';
require_once dirname(__FILE__).'/conf/functions.php';

$dbh = db_connect();

$_POST['name'];
$_POST['comment'];
$_POST['time'];
$_POST['ip'];

$sql = "INSERT INTO bbs(name, comment, time, disp, ip) values(:name, :comment, :time, 1, :ip)";
$stmt = $dbh->prepare($sql);
$stmt->execute(array(

    ":name"=>$_POST['name'],

    ":comment"=>$_POST['comment'], 

    ":time"=>$_POST['time'],

    ":ip"=>$_POST['ip']

  ));
echo $dbh->lastInsertId( );
