<?php 

$username = $_POST['username'];
$user = $_POST['user'];
$password = $_POST['password'];




$link = mysqli_connect('localhost','root','root','bk2004');


$sql = "SELECT * FROM `users` WHERE `username`='$username'";

$res = mysqli_query($link,$sql);

$data = mysqli_fetch_all($res,MYSQLI_ASSOC);

// echo json_encode($data);



$data = count($data);

if($data === 0){


    $link = mysqli_connect('localhost','root','root','bk2004');

    $sql = "INSERT INTO `users`  VALUES('null','$user', '$username', '$password' )";

    $res = mysqli_query($link,$sql); 

    mysqli_close($link);


    echo json_encode(array(
        "massage" => "你的请求成功",
        "name" => $user,
        "code" => 0
    ));

}else if($data === 1) {
    echo json_encode(array(
        "massage" => "你的请求成功",
        "code" => 1
    ));
}




?>