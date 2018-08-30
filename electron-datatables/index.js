//se agrega datatables y sus dependencias
const $ = require('jquery');
const dt = require('datatables.net')();

//al cargar el archivo se muestra la tabla
$(document).ready(function(){

	
	$('#example').DataTable( {
		"ajax":"datos.json",		
        "columns"     :     [  
                {     "data"     :     "name"     },  
                {     "data"     :     "gender"},  
                {     "data"     :     "designation"}  
           ]  
    } );

});

//json
//var dataSet=$.getJSON('./datos.json');
//alert (dataSet)
	 /*
	  var dataSet = [
                {"codigo": "USA", "nombre": "Estados Unidos", "continente": "NorteAmerica", "poblacion": "259800000000"},
                {"codigo": "ESA", "nombre": "El Salvador", "continente": "CentroAmerica", "poblacion": "800000000"},
                {"codigo": "BRA", "nombre": "Brasil", "continente": "Suramerica", "poblacion": "19065400000"},
                {"codigo": "RCA", "nombre": "Costa Rica", "continente": "CentroAmerica", "poblacion": "9065400000"}
            ];   
	 */
            
	


