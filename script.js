function prostCas(value, row){				
	var today = new Date();				
	var ura = today.getHours();				
	var danes = today.getDay();								
	var teden = new Array(7);				
	teden[0] = "Ned";				
	teden[1] = "Pon";				
	teden[2] = "Tor";				
	teden[3] = "Sre";				
	teden[4] = "Cet";				
	teden[5] = "Pet";				
	teden[6] = "Sob";																
	return row.Tor;			
}						

function bold(value){				
	return "<b>"+value+"</b>";			
}						

function cena(value){			
	if (value == "0.5"){					
		return "0,5 €";				
	}else{				
		return value+" €";				
	}			
}