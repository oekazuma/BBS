<?php
require_once dirname(__FILE__).'/conf/config.php';
require_once dirname(__FILE__).'/conf/functions.php';

$dbh = db_connect( );

$sql = "UPDATE bbs SET disp = 0 WHERE id = :id";
$stmt = $dbh->prepare($sql);
$stmt->execute(array(":id"=>$_POST['id']));
