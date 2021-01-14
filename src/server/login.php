<?php 

    $username = $_POST['username'];
    $password = $_POST['password'];


    $link = mysqli_connect('localhost','root','root','bk2004');
    $sql = "SELECT * FROM `users` WHERE `username`='$username' AND `password`='$password'";
    $res = mysqli_query($link,$sql);
    $data = mysqli_fetch_all($res,MYSQLI_ASSOC);

    if (count($data)){
        echo json_encode(array(
            "massage"=>"恭喜你登陆成功",
            "code"=>1,
            "data"=>$data[0]['user']
        )) ;
    }
    else{
        echo json_encode(array(
            "massage"=>"登录失败",
            "code"=>0
        ));
    }
?>