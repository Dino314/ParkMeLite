//LEAFLET

var mymap = L.map('mapid').setView([45.5581, 13.7415], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZHlub3ZhZXIiLCJhIjoiY2p1YXh3dG1wMDcyMzN5bDQ1dm0xd2hsbiJ9.bc4SXUp1nKc22_Y4XWoPhw'
}).addTo(mymap);

var marker0 = L.marker([45.54327,13.71243]).addTo(mymap);
var marker1 = L.marker([45.58248,13.75617]).addTo(mymap);
marker0.bindPopup("OŠ Anton Ukmar");
marker1.bindPopup("Hrvatini");

//END LEAFLET


var today = new Date();
var dan = today.getDay();
var ura = ("0"+today.getHours()).slice(-2)+":"+("0"+today.getMinutes()).slice(-2);

$(document).ready(function() {
	$("#dan").val(dan);
	$("#ura").val(ura);
	
	//setInterval(reset, 1000 * 60);

	$("#reset").click(function(){
		var today = new Date();
		var dan = today.getDay();
		var ura = ('0'+today.getHours()).slice(-2)+":"+('0'+today.getMinutes()).slice(-2);

		$("#dan").val(dan);
		$("#ura").val(ura);
		
		$('#table').bootstrapTable('refresh', {
			url: 'skripta.php?kraj='+$("#kraj").val()
		});
	});

	$("#set").click(function(){
		var ura = $("#ura").val();
		ura = ura.slice(0, 2) * 60 + parseInt(ura.slice(3, 5));
		
		$('#table').bootstrapTable('refresh', {
			url: 'skripta.php?kraj='+$("#kraj").val()+'&dan='+$("#dan").val()+'&ura='+ura
		});
	});

	$("#map").click(function(){
		$("#tabela, #mapa").toggleClass("d-none");
		$("#tabela, #mapa").toggleClass("d-block");

		mymap.invalidateSize();

	});
});

/*function rowAttributes(row, index) {
	return {
		'data-toggle': 'popover',
		'data-placement': 'bottom',
		'data-trigger': 'hover',
		'data-content': [
			'Koordinate: ' + row.Stanje
			].join(', ')
	}
}

$(function() {
	$('#table').on('post-body.bs.table', function (e) {
		$('[data-toggle="popover"]').popover()
	})
})*/

function bold(value){				
	return "<b>"+value.slice(3)+"</b>";			
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

function Slice(value){
	return value.slice(3);
}

function cenePodatki(value, row){
	return "<b>Prva ura:</b> "+cena(row.PrvaUra)+"<br /><b>Vsaka naslednja:</b> "+cena(row.NovaUra);
}

function urnik(value, row){
	var teden = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	var urnik = row[teden[$("#dan").val()]];
	
	if(urnik == "0"){
		return "<t class='text-success'>Brezplačno</t>";
	}else{
		return urnik;
	}
}

