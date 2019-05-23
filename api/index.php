<?php

$id     = $_GET['ID'] ? : 3510001;
$str    = file_get_contents('http://chelgortrans.ru:33888/boardTest.aspx?id='.$id);
$result = mb_convert_encoding($str, 'utf-8', 'cp1251');

echo $result;

?>
