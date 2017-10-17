<?php
require_once dirname(__FILE__).'/conf/config.php';
require_once dirname(__FILE__).'/conf/functions.php';

$dbh = db_connect( );

$_POST['name'];
$_POST['comment'];
$_POST['time'];

$sql = "UPDATE bbs SET name = :name, comment = :comment, time = :time WHERE id = :id";
$stmt = $dbh->prepare($sql);
$stmt->execute(array(

    ":id"=>$_POST['id'],    

    ":name"=>$_POST['name'],

    ":comment"=>$_POST['comment'], 

    ":time"=>$_POST['time']

 ));
