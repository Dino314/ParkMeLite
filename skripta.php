<?php
	$podatki = file_get_contents("ParkirnaMesta.json");
	$array = json_decode($podatki, true);
	$čas = date("H")*60 + date("i");
	$mesec = date("m");
	$dnevi = array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
	$danNum = date("N");
	$dan = $dnevi[$danNum];

	//foreach, pregled če rabi odstraniti obdobja ki ne obratujejo
	foreach($array as $vrstica){
		if($vrstica["Obdobje"] != 0){
			$min = substr($vrstica["Obdobje"], 0, 2);
			$max = substr($vrstica["Obdobje"], 3);
			$mesecTemp = $mesec;

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
	
	$i = -1;
	//foreach, izračun časa
	foreach($array as $vrstica){
		$i++;
		$type = $vrstica["Type"];
		
		if ($type == 3){
			$array[$i]["Stanje"] = "<t class='text-danger'>Vedno je za plačat!</t>";
			$array[$i]["Sort"] = 4;
			continue;
		}
		
		$od = substr($vrstica[$dan], 0, 2)*60;//od v minutah
		$do = substr($vrstica[$dan], 3)*60;//do v minutah
		
		$minuta = ($do - $čas) % 60;
		$ura = ($do - $čas - $minuta) / 60;
		
		//echo $minuta."<br /><br />";
		
		if ($type == 2){
			$array[$i]["Stanje"] = "<t class='text-danger'>Za plačat 1€, ki traja do konca dneva,<br/>trenutno ostane še <b>".$ura." ur</b> in <b>".$minuta." minut</b></t>";
			$array[$i]["Sort"] = 2;
			continue;
		}
		
		//type == 1 onward
		//če je čas med plačanjem
		if ($čas >= $od && $čas < $do){
			if ($do == 24*60){
				$ostane = 24*60 - $čas;
				$j = 1;
				while ($vrstica[$dnevi[($danNum+$j)%7]] == "00-24"){
					$ostane += 24*60;
					$j++;
				}
				$ostane += substr($vrstica[$dnevi[($danNum+$j)%7]], 0, 2) * 60;
				$minuta = $ostane % 60;
				$ura = ($ostane - $minuta) / 60;
			}
			
			
			$array[$i]["Stanje"] = "<t class='text-danger'>Za plačat ostane še <b>".$ura." ur</b> in <b>".$minuta." minut</b></t>";
			$array[$i]["Sort"] = 3;
		}else if ($čas < $od){	//če je ura preden se začne plačat
			$minuta = ($od - $čas) % 60;
			$ura = ($od - $čas - $minuta) / 60;
			
			$array[$i]["Stanje"] = "<t class='text-success'>Brezplačno še <b>".$ura." ur</b> in <b>".$minuta." minut</b></t>";
			$array[$i]["Sort"] = 1;
			
		}else if ($čas > $do || $vrstica[$dan] == "0"){			
			$ostane = 24*60 - $čas;
			$j = 1;
			//echo $ostane.", ".$vrstica;
			while ($vrstica[$dnevi[($danNum+$j)%7]] == "0"){
				$ostane += 24*60;
				//echo "while".$ostane.", ";
				$j++;
			}
			//echo $ostane.", ";
			$ostane += substr($vrstica[$dnevi[($danNum+$j)%7]], 0, 2) * 60;
			//echo $ostane.", ";
			$minuta = $ostane % 60;
			$ura = ($ostane - $minuta) / 60;
			
			$array[$i]["Stanje"] = "<t class='text-success'>Brezplačno še <b>".$ura." ur</b> in <b>".$minuta." minut</b></t>";
			$array[$i]["Sort"] = 1;
			//$array[$i]["Stanje"] = "<t class='text-success'>".($ostane/60)."</t>";
		}
		
		
	}
	
	//foreach, sortiranje
	/*foreach($array as $vrstica){
		
	}*/
	
	
	
	
	
	
	
	
	
	
	
	//echo $čas;
	//print_r([json_encode($array[0])]);
	
	//echo $podatki;
	
	//print_r("<br /><br />");
	//echo("[".json_encode($array[0])."]");	//izpis ene vrstice
	
	echo json_encode($array);
?>