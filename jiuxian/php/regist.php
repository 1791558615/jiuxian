<?php
header('Content-Type:text/html;charset=utf-8');
$name = $_REQUEST['name'];
$pwd = $_REQUEST['pwd'];
$conn = mysqli_connect('localhost', 'root', 'root', 'music');
$sql = "SELECT * FROM `user` WHERE `username` = '$name'";
$res = mysqli_query($conn, $sql);
$login = mysqli_fetch_assoc($res);

if ($login) {
    echo json_encode(['code' => 0, 'message' => '用户已存在！！']);
} else {
    $inst = "INSERT INTO `user`(`username`,`password`)VALUES('$name','$pwd')";
    $info = mysqli_query($conn, $inst);
    echo json_encode(['code' => 1, 'data' => ['name' => '$name']]);
}
mysqli_close($conn);
?>
