<?php
header('Content-Type:text/html;charset=utf-8');
$name = $_REQUEST['name'];
$pwd = $_REQUEST['pwd'];
$conn = mysqli_connect('localhost', 'root', 'root', 'music');
$sql = "SELECT * FROM `user` WHERE `username` = '$name' AND `password` = '$pwd'";
$res = mysqli_query($conn, $sql);
$login = mysqli_fetch_assoc($res);
mysqli_close($conn);
if ($login) {
    echo json_encode(['code' => 1, 'data' => ['name' => $name]]);
} else {
    echo json_encode(['code' => 0, 'message' => '失败']);
}
?>
