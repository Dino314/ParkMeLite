$(document).ready(function() {
	
});

function prostCas(value, row, index){				
	var today = new Date();				
	var ura = today.getHours();
	//ura = 20;
	var danes = today.getDay();
	//danes = 0;
	var minute = 60-today.getMinutes();
	var text = "";
	
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
		if (dan == "0"){
			var i = danes+1;
			var ostanek = 23-ura;
			
			while (row[teden[i%7]] == "0"){
				ostanek += 24;
				i++;
			}
			
			ostanek += parseInt((row[teden[i%7]]+1).slice(0, 2));
			
			text += "<t class='text-success'>Brezplačno še ";
			if (ostanek != 0){
				text += "<b>"+ostanek+"ur</b> in ";
			}
			text += "<b>"+minute+" minut</b></t><br />";
			return text;
		}else if (ura >= maxUra){
			var ostanek = (parseInt(minUra)+23)-parseInt(ura);
			
			
			text += "<t class='text-success'>Brezplačno še ";
			if (ostanek != 0){
				text += "<b>"+ostanek+"ur</b> in ";
			}
			text += "<b>"+minute+" minut</b></t><br />";
			return text;
		}else if (ura < minUra){
			var ostanek = parseInt(minUra)-parseInt(ura)-1;
			
			text += "<t class='text-success'>Brezplačno še ";
			if (ostanek != 0){
				text += "<b>"+ostanek+"ur</b> in ";
			}
			text += "<b>"+minute+" minut</b></t><br />";
			return text;
		}else if(maxUra < 24){
			var ostanek = parseInt(maxUra) - parseInt(ura)-1;
			//console.log("ostanek: "+ostanek);
			
			text += "<t class='text-danger'>Za plačat ostane še ";
			if (ostanek != 0){
				text += "<b>"+ostanek+"ur</b> in ";
			}
			text += "<b>"+minute+" minut</b></t><br />";
			return text;
		}else{
			var i = danes+1;
			var ostanek = 23-ura;

			while (row[teden[i]] == "00-24"){
				ostanek += 24;
				i++;
			}

			text += "<t class='text-danger'>Za plačat ostane še ";
			if (ostanek != 0){
				text += "<b>"+ostanek+"ur</b> in ";
			}
			text += "<b>"+minute+" minut</b></t><br />";
			return text;
		}
	}else if (row.Type == "2"){
		//za plačat 1€ na dan, ki traja samo do 23:59
		var ostanek = 23-ura;
		
		text += "<t class='text-danger'>Za plačat 1€, ki traja do konca dneva,<br/>trenutno ostane še ";
		if (ostanek != 0){
			text += "<b>"+ostanek+"ur</b> in ";
		}
		text += "<b>"+minute+" minut</b></t><br />";
		return text;

	}else if (row.Type == "3"){
		if (dan == "0"){
			var ostanek = 23 - ura;
			if (danes == "6"){
				 ostanek += 24;
			}
			
			text += "<t class='text-success'>Brezplačno še ";
			if (ostanek != 0){
				text += "<b>"+ostanek+"ur</b> in ";
			}
			text += "<b>"+minute+" minut</b></t><br />";
			return text;
		}else{
			return "<b class='text-danger'>Za plačat 1€ za 24ur,<br />sobota in nedelja brezplačno</b><br />";
		}
	}else if (row.Type == "4"){
		return "<b class='text-danger'>Vedno je za plačat!</b><br />";
	}
	else{
		return "<b class='text-warning'>Ne obratuje trenutno</b><br />";
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

function cenePodatki(value, row){
	return "<b>Prva ura:</b> "+cena(row.PrvaUra)+"<br /><b>Vsaka naslednja:</b> "+cena(row.NovaUra);
}