<?php

require_once dirname(__FILE__).'/conf/config.php';
require_once dirname(__FILE__).'/conf/functions.php';

$dbh = db_connect( );

$tasks = array( );

$sql = "SELECT * FROM bbs WHERE disp = 1 ORDER BY id DESC ";

foreach($dbh->query($sql) as $row){
  array_push($tasks, $row);
}

$ip = $_SERVER["REMOTE_ADDR"];

// $ip = "153.142.239.40";

?>
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=360,initial-scale=1">
<title>BBS</title>
<script src="js/jquery-1.8.2.min.js"></script>
<script src="js/script.js"></script>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
<link rel="stylesheet" href="css/design.css">
<link rel="shortcut icon" href="images/favicon.ico">

</head>
<body>

<p id='konami' style='display:none;'>あなたのipアドレス：<?=$ip?></p>

<h1><img src="images/bbs-logo.gif"></h1>

<div class=parent>

  <div class="child">
    <p class="red">Name</p>
    <input type="text" id="name" size="30">
    <p class="blue">Comment</p>
    <textarea id="comment" cols="40" rows="15"></textarea>
    <br><input type="button" id="add" value="Submit" class="sysNextSubmit">
    <input type="hidden" id="ip" value="<?=$ip ?>">
  </div>

  <div class="child2">
    <ul id="tasks">
      <?php foreach($tasks as $task): ?>
      <li id="task_<?php echo h($task['id']); ?>" data-id="<?php echo h($task['id']); ?>"><span><span class="red2">Name：</span><span id="name_<?php echo h($task['id']); ?>"><?php echo h(htmlspecialchars_decode($task['name'])); ?></span>
      <br><span class="blue2">Comment</span><br><span id="comment_<?php echo h($task['id']); ?>"><?php echo h(htmlspecialchars_decode($task['comment'])); ?></span>
      <br><?php echo h($task['time']); ?></span><br>
      <?php if ($task['ip'] === $ip) {　?>
        <button class="edit sysNextSubmit">Edit</button>&nbsp;<button class="delete sysNextSubmit">Delete</button>
      <?php } ?>
        <hr></li>
      <?php endforeach; ?>

    </ul>
  </div>

</div>

  <div id="js-loader" class="loader">
      <div class="loader-animation"></div>
  </div>

</body>
</html>