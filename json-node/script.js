const fs = require('fs');
const $ = require('jquery');
const dt= require('datatables.net')();

let rawdata = fs.readFileSync('marcas.json');//se adquieren los datos hexadecimales del archivo  
let jsonObj = JSON.parse(rawdata);  //se convierten los datos hexadecimales a json
var mar = jsonObj.data;

//mostrando las marcas en un select
var select = document.getElementById('marca');

for(var i=0; i< mar.length;i++){
	var option=document.createElement('option');
	option.textContent=mar[i].nombre_marca;
	option.setAttribute("value",mar[i].cod)
	select.appendChild(option);	
}

//funcion para mostrar la tabla
function verTabla(){
	$('#example').DataTable( {
		"ajax":"marcas.json",		
        "columns"     :     [  
                {     "data"     :     "cod"     },  
                {     "data"     :     "nombre_marca"}                 
           ]  
    } );
}

//sucede cuando el documento carga
$(document).ready(function(){
	
    //formulario
	$('#guardar').click(function(e){
				
	});

	//al hacer clic en el boton se carga la tabla
	$('#btn').click(function(e){
		verTabla();
	});
    
});




