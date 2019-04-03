function prostCas(value, row, index){				
	var today = new Date();				
	var ura = today.getHours();				
	var danes = today.getDay();
	var minute = 60-today.getMinutes();
	console.log(minute);
	
	var teden = new Array(7);				
	teden[0] = "Ned";				
	teden[1] = "Pon";				
	teden[2] = "Tor";				
	teden[3] = "Sre";				
	teden[4] = "Cet";				
	teden[5] = "Pet";				
	teden[6] = "Sob";
	
	var dan = row[teden[danes]];
	var mesec = today.getMonth()+1;
	var minUra = dan.slice(0, 2);
	var maxUra = dan.slice(3, 5);
		
	//console.log(dan.slice(0, 2));
	//console.log(maxUra);
	if (row.Type == "1" || (String(row.Type).charAt(5) == "0" && (mesec >= 10 || mesec <= 4)) || (String(row.Type).charAt(5) == "1" && (mesec >= 5 && mesec <= 9))){
		if (ura > maxUra){
			var ostanek = (parseInt(minUra)+23)-parseInt(ura);
			//console.log("ostanek: "+ostanek);
			return "<b class='text-success'>Brezplačno še "+ostanek+" ur in "+minute+" minut</b><br />"+dan;
		}else if (ura < minUra){
			var ostanek = parseInt(minUra)-parseInt(ura)-1;
			return "<b class='text-success'>Brezplačno še "+ostanek+" ur in "+minute+" minut</b><br />"+dan;		
		}else if(maxUra < 24){
			var ostanek = parseInt(maxUra) - parseInt(ura);
			return "<b class='text-danger'>Za plačat ostane še "+ostanek+"ur in "+minute+" minut</b><br />"+dan;
		}else{
			var i = danes+1;
			var ostanek = 23-ura;

			while (row[teden[i]] == "00-24"){
				ostanek += 24;
				i++;
			}

			return "<b class='text-danger'>Za plačat ostane še "+ostanek+"ur in "+minute+" minut</b><br />"+dan;
		}
	}else if (row.Type == "2"){
		//za plačat 1€ na dan, ki traja samo do 23:59
		var ostanek = 23-ura;
		return "<b class='text-danger'>Za plačat 1€, ki traja do konca dneva; trenutno ostane še "+ostanek+" ur in "+minute+" minut</b><br />"+dan;

	}else if (row.Type == "3"){
		if (dan == "0"){
			var ostanek = 23 - ura;
			if (danes == "6"){
				 ostanek += 24;
			}
			return "<b class='text-success'>Brezplačno še "+ostanek+" ur in "+minute+" minut</b><br />"+dan;
		}else{
			return "<b class='text-danger'>Za plačat 1€ za 24ur</b><br />"+dan;
		}
	}else if (row.Type == "4"){
		return "<b class='text-danger'>Vedno je za plačat!</b><br />"+dan;
	}
	else{
		return "<b class='text-warning'>Ne obratuje trenutno</b><br />"+dan;
		/*$('#table').bootstrapTable('remove', {
	        field: 'Parking',
	        values: ["6"]
	      });*/
	}

}						

function bold(value){				
	return "<b>"+value+"</b>";			
}						

function cena(value){
	if (value == "0.5"){					
		return "0,5€";				
	}else if(value == "0"){
		return "<t class='text-success'>Brezplačno</t>";
	}else if(value == "NA"){
		return "/";
	}else{				
		return value+"€";				
	}			
}