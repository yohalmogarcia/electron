//se agrega datatables y sus dependencias
const $ = require('jquery');
const dt = require('datatables.net')();

//al cargar el archivo se muestra la tabla
$(document).ready(function(){
	$('#example').DataTable( {
		responsive:true,
        data: dataSet,
        columns: [
            { data: 'codigo' },
            { data: 'nombre' },
            { data: 'continente' },
            { data: 'poblacion' }            
        ]
    } );

});

//json
//var dataSet=$.getJSON('./datos.json')
	 
	  var dataSet = [
                {"codigo": "USA", "nombre": "Estados Unidos", "continente": "NorteAmerica", "poblacion": "259800000000"},
                {"codigo": "ESA", "nombre": "El Salvador", "continente": "CentroAmerica", "poblacion": "800000000"},
                {"codigo": "BRA", "nombre": "Brasil", "continente": "Suramerica", "poblacion": "19065400000"},
                {"codigo": "RCA", "nombre": "Costa Rica", "continente": "CentroAmerica", "poblacion": "9065400000"}
            ];   
	 
            
	


