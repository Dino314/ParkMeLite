<?php
	$podatki = file_get_contents("ParkirnaMesta.json");
	$array = json_decode($podatki, true);
	$čas = date("H:i");
	$mesec = date("m");

	foreach($array as $vrstica){
		if($vrstica["Obdobje"] != 0){
			$min = substr($vrstica["Obdobje"], 0, 2);
			$max = substr($vrstica["Obdobje"], 3);
			$mesecTemp = $mesec;
			//10-4, 5-9
			if ($min > $max){
				$min -= $max;
				$mesecTemp = (($mesecTemp - $max) + 12) % 12;
				if($mesecTemp == 0){
					$mesecTemp = 12;
				}
				$max = 12;
			}
			
			if($mesecTemp < $min || $mesecTemp > $max){
				$index = array_search($vrstica, $array);
				array_splice($array, $index, 1);
			}
			
		}
	}
	
	//echo $čas;
	//print_r([json_encode($array[0])]);
	
	//echo $podatki;
	
	//print_r("<br /><br />");
	//echo("[".json_encode($array[0])."]");	//izpis ene vrstice
	
	echo json_encode($array);
?>