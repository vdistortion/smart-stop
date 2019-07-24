<?php

$ID = (isset($_GET['ID'])) ? $_GET['ID'] : '3510004';
$str = file_get_contents('http://chelgortrans.ru:33888/boardTest.aspx?id='.$ID);
echo mb_convert_encoding($str, 'utf-8', 'cp1251');
