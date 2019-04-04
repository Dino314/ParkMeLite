<?php
	$podatki = file_get_contents("ParkirnaMesta.json");
	$array = json_decode($podatki, true);
	
	//print_r([json_encode($array[0])]);
	echo $podatki;
	//print_r("<br /><br />");
	//echo("[".json_encode($array[1]["Pon"])."]");	//izpis ene vrstice
?>