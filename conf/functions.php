<?php

function db_connect( ){

  try{
    return new PDO(DSN,DB_USER,DB_PASSWORD); 
  }catch(PDOException $e){
    echo $e->getMessage( );
    echo "<br><strong>すいません。データベースが不調です。</strong>";
    exit;
  }
}
function h($s){
  return htmlspecialchars($s, ENT_QUOTES, "UTF-8");
}
