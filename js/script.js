//コナミコマンドでipアドレス表示
var input = [];
konami = [38,38,40,40,37,39,37,39,66,65];

$(window).keyup(function(e){
  input.push(e.keyCode);

  if (input.toString().indexOf(konami) >= 0)
  {
    $("p#konami").css("display","block")
       input = [];
  }
});

//ロード画面
$(function(){
    $('a[href ^= "http://oe-bbs.precs.jp/"]' + 'a[target != "_blank"]').click(function(){
        var url = $(this).attr('href');
        $('#js-loader').fadeIn(600);
        setTimeout(function(){ location.href = url; }, 800);
    });
});
 
$(window).load(function(){
  $('#js-loader').delay(300).fadeOut(800);
});
 
$(function(){ setTimeout('stopload()', 10000); });
function stopload(){
  $('#js-loader').delay(300).fadeOut(800);
}

//現在の日付取得
function get_current_timestamp(){
  var weeks = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat');
  var d = new Date();

  var month = d.getMonth() +1;
  var day = d.getDate();
  var week = weeks[d.getDay()];
  var hour = d.getHours();
  var minute = d.getMinutes();
  var second = d.getSeconds();

  if(month < 10){month = "0" + month;}
  if(day < 10){day = "0" + day;}
  if(hour < 10){hour = "0" + hour;}
  if(minute < 10){minute = "0" + minute;}
  if(second < 10){second = "0" + second;}

  return d.getFullYear() + "/" + month + "/" + day + "("+ week +")" + hour + ":" + minute + ":" + second;
}

// 追加ボタンを押した時
$(function(){

$('#name').focus();

  $('#add').click(function(){
    if ($("#name").val() === "") {
      var name = "No Name";
    } else {
      var name = $("#name").val().replace(/&/g, '&amp;')
                                　.replace(/</g, '&lt;')
                                　.replace(/>/g, '&gt;')
                                　.replace(/"/g, '&quot;')
                                 .replace(/'/g, '&#39;');
    }
    
    var comment = $("#comment").val().replace(/&/g, '&amp;')
                                　    .replace(/</g, '&lt;')
                                　    .replace(/>/g, '&gt;')
                                　    .replace(/"/g, '&quot;')
                                    　.replace(/'/g, '&#39;');

    var time = get_current_timestamp();
    var ip = $("#ip").val();

    console.log(ip);

  $.post('add.php',
  {
  name:name, 
  comment:comment,
  time:time,
  ip:ip
  },function(rs){
     if ($("#name").val() === "") {
      var name = "No Name";
    } else {
      var name = $("#name").val().replace(/&/g, '&amp;')
                                　.replace(/</g, '&lt;')
                                　.replace(/>/g, '&gt;')
                                　.replace(/"/g, '&quot;')
                                 .replace(/'/g, '&#39;');
    }
    var comment = $("#comment").val().replace(/&/g, '&amp;')
                                　    .replace(/</g, '&lt;')
                                　    .replace(/>/g, '&gt;')
                                　    .replace(/"/g, '&quot;')
                                    　.replace(/'/g, '&#39;');

    var time = get_current_timestamp();
    var onText = new Array('<span id="name_'+rs+'"><span class="red2">Name：</span>','</span><br><span id="comment_'+rs+'"><span class="blue2">Comment</span><br>','</span><br>');
    var inputText = new Array(name, comment, time);


    var e = $('<li id="task_'+rs+'"data-id="'+rs+'"><span></span><br><button class="edit sysNextSubmit">Edit</button>&nbsp;<button class="delete sysNextSubmit">Delete</button></li><hr>');

    showtext = "";
    for(i = 0; i < inputText.length; i++){
      showtext += onText[i] + inputText[i];
    }

    $('#tasks').prepend(e).find('li:first span:eq(0)').prepend(showtext); 
    $('#name').val('').focus();
    $('#comment').val('');
    });
  });


// 削除ボタンを押した時

  $(function(){

    $(document).on('click','.delete',function(){

      if(swal("Deleted!!", "I deleted it.", "success")){

        var id = $(this).parent().data('id');

        $.post('delete.php',
        {
        id:id
        },function(rs){

        $('#task_'+id).fadeOut(800);
        });
      }
    });
 });


// 編集ボタンを押した時

  $(document).on('click','.edit',function(){

    var id = $(this).parent().data('id');

    var name = $('#name_'+id).text().replace(/&/g, '&amp;')
                                　   .replace(/</g, '&lt;')
                                　   .replace(/>/g, '&gt;')
                                　   .replace(/"/g, '&quot;')
                                    .replace(/'/g, '&#39;');

    var comment = $('#comment_'+id).text().replace(/&/g, '&amp;')
                                      　  　.replace(/</g, '&lt;')
                                      　   .replace(/>/g, '&gt;')
                                      　   .replace(/"/g, '&quot;')
                                      　   .replace(/'/g, '&#39;');

    var time = get_current_timestamp();

    var onTexts = new Array('<span class="red">Name</span><br><input type="text" id="name_'+id+' " class="name_'+id+'" size="30" value="'+name+'">','<br><span class="blue">Comment</span><br><textarea id="comment_'+id+' " class="comment_'+id+' " cols="40" rows="15">'+comment+'</textarea>');

    showtexts = '';
    for(i = 0; i < onTexts.length; i++){
      showtexts += onTexts[i];
    }

    $('#task_'+id).empty().append(showtexts).append('<br><input type="button" value="update" class="update sysNextSubmit" style="padding:2% 42%;"><hr>').find('#name').focus();
  });


// 更新ボタンを押した時

  $(document).on('click', '.update', function(){

    var id = $(this).parent().data('id');

    if ($('.name_'+id).val() === "") {
      var name = "No Name";
    } else {
      var name = $('.name_'+id).val().replace(/&/g, '&amp;')
                                　    .replace(/</g, '&lt;')
                                　    .replace(/>/g, '&gt;')
                                　    .replace(/"/g, '&quot;')
                                    　.replace(/'/g, '&#39;'); 
    }
    
    var comment = $('.comment_'+id).val().replace(/&/g, '&amp;')
                                　        .replace(/</g, '&lt;')
                                　        .replace(/>/g, '&gt;')
                                　        .replace(/"/g, '&quot;')
                                    　    .replace(/'/g, '&#39;');

    var time = get_current_timestamp(); 

    $.post('update.php',
    {
    id:id,
    name:name,
    comment:comment,
    time:time
    },function(rs){
    var e = $('<span></span><br><button class="edit sysNextSubmit">Edit</button>&nbsp;<button class="delete sysNextSubmit">Delete</button><hr>');

    if ($('.name_'+id).val() === "") {
      var name = "No Name";
    } else {
      var name = $('.name_'+id).val().replace(/&/g, '&amp;')
                                　    .replace(/</g, '&lt;')
                                　    .replace(/>/g, '&gt;')
                                　    .replace(/"/g, '&quot;')
                                    　.replace(/'/g, '&#39;');
    }

    var comment = $('.comment_'+id).val().replace(/&/g, '&amp;')
                                　        .replace(/</g, '&lt;')
                                　        .replace(/>/g, '&gt;')
                                　        .replace(/"/g, '&quot;')
                                    　    .replace(/'/g, '&#39;');

    var time = get_current_timestamp();

    var onTexts = new Array('<span id="name_'+rs+'"><span class="red2">Name：</span>','</span><br><span id="comment_'+rs+'"><span class="blue2">Comment</span><br>','</span><br>'); 
    var inputTexts = new Array(name,comment,time);
    showtext = '';
    for(i = 0; i < inputTexts.length; i++){
      showtext += onTexts[i] + inputTexts[i];
    }

    $('#task_'+id).empty().append(showtext).append(e).find('span:eq(0)');
    });
  });

});

