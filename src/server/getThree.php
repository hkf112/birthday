<?php 

$one = $_GET['cat_one'];
$two = $_GET['cat_two'];

$link = mysqli_connect('localhost','root','root','bk2004');
$sql = "SELECT `cat_three_id` FROM `goods` WHERE `cat_one_id`='$one' AND `cat_two_id`='$two' GROUP BY `cat_three_id`";
$res = mysqli_query($link,$sql);
$data = mysqli_fetch_all($res,MYSQLI_ASSOC);



echo json_encode(array(
    "massage"=>"请i求成功",
    "code"=>1,
    "list"=>$data
));


?>