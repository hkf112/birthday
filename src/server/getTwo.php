<?php 

// 接受 一级 分类
$one = $_GET['cat_one'];
// echo json_encode($one);
$link = mysqli_connect('localhost','root','root','bk2004');
$sql = "SELECT `cat_two_id` FROM `goods` WHERE `cat_one_id`='$one' GROUP BY `cat_two_id`";
$res = mysqli_query($link,$sql);
$data = mysqli_fetch_all($res,MYSQLI_ASSOC);

echo json_encode(array(
    "massage"=>"获取成功",
    "code"=> 1,
    "list"=>$data   
));



?>