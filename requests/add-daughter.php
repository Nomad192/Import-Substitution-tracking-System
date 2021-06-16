<?php
	shell_exec ('chcp 1251');
	echo shell_exec('%JAVA_HOME% tree/Main 0 ' . $_GET['id'] . ' ' . iconv('windows-1251', 'UTF-8', $_GET['name']) . ' ' . $_GET['parent']);
?>
