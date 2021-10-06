<html>
<head>
	<title>Source Code</title>
	<style>
	textarea {
		border: 2px solid #765942;
		border-radius: 10px;
		font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
	     font-size: 14px;
	     color:#920E00;
	     background-color: #EBFFFF;
	     width:600px; height:600px;
	     padding-left:10px;
	}
	</style>
</head>	
<body>
<?php

$path = $_GET['file'];
$path = str_replace("..", "", $path);
$path=basename($path);

echo '<b>'.$path.'</b>';
echo '<p></p>';
echo "<textarea  readonly='readonly' cols='80' rows='60'>";
if (file_exists($path)) {
	echo htmlspecialchars(file_get_contents($path));
}
echo "</textarea>";

?>
</body>
</html>
