const fs = require('fs'); 
const $ = require('jquery');
const dt= require('datatables.net')();

const path = require('path');
const file="./json/marcas.json";
const filepath=`${path.resolve('.')}/${file}`;
//const data = fs.readFileSync(filepath,'utf-8');

var codigoSeleccionado=0;

$(document).ready(function(e){
    mostrarTablaMarcas();
});

$("#btn-cancelar").click(function(e){
	var btnGuardar = document.getElementById("btn-guardar");
	document.getElementById("nombre-marca").value="";	
	if(btnGuardar.innerHTML=="Modificar"){
		btnGuardar.innerHTML="Guardar"
	}
});

$("#btn-guardar").click(function(e){
	if(document.getElementById("btn-guardar").innerHTML == 'Guardar'){
			if(document.getElementById("nombre-marca").value==""){
				document.getElementById("mensaje").innerHTML="Debe rellenar el campo MARCA.";
			}else{
				document.getElementById("mensaje").innerHTML="";
				guardarMarca();
				document.getElementById("nombre-marca").value="";
			}
			
		}else{
			// sino se modifica el modelo
			document.getElementById("mensaje").innerHTML="";
			modificarMarca();
			document.getElementById("nombre-marca").value="";
			document.getElementById("btn-guardar").innerHTML = 'Guardar';
		}
});

function mostrarTablaMarcas(){
	const data = fs.readFileSync(filepath,'utf-8');
	console.log("mostrarTabla");
	var items=[];
	items=JSON.parse(data);
	if(items.length>0){//solo si el archivo tiene datos mostrara la tabla		
		$('#tabla-marcas').DataTable( {
			destroy:true,
			data:JSON.parse(data),
			columns:[			
				{data: 'cod'},
				{data: 'nombre'}
			]
    	});
	}
	
}

function guardarMarca(){
	const data = fs.readFileSync(filepath,'utf-8');
	var codigo_marca=0;
	var nombre_marca = document.getElementById("nombre-marca").value;

	var items =[];	

	try{
		//si el fichero existe
		items=JSON.parse(data);	
		if(items.length<=0){
			codigo_marca=1;
		}else{
			var datoUltimo = items[items.length-1].cod;
			codigo_marca=datoUltimo+1;//aqui genero el codigo automaticamente
		}			
	}catch(e){
		//si el fichero no existe
		codigo_marca=1;
		fs.openSync(filepath,'w');
	}

	items.push({
		cod:codigo_marca,
		nombre:nombre_marca
	});

	fs.writeFileSync(filepath,JSON.stringify(items,null,2));

	mostrarTablaMarcas();
}

//al hacer clic en el codigo de la marca
$("#tabla-marcas").on('click','tbody td.sorting_1',function(){
	codigoSeleccionado= this.innerHTML;//guardo el codigo seleccionado desde la tabla
	var nombreMarca;
	const data = fs.readFileSync(filepath,'utf-8');
	var items = JSON.parse(data);
	for(var i=0; i<items.length;i++){
		if(items[i].cod == codigoSeleccionado){//busco el codigo en el json
			nombreMarca=items[i].nombre;//al encontrarlo guardo el nombre del modelo seleccionado
		}
	}
	
	document.getElementById("nombre-marca").value=nombreMarca;// pongo el nombre del modelo en el input
	document.getElementById("btn-guardar").innerHTML="Modificar";//modifico el texto del boton	
});

function modificarMarca(){
	const data = fs.readFileSync(filepath,'utf-8');

	var codigo_marca=0;
	var nombre_marca = document.getElementById("nombre-marca").value;

	var items =[];	

	items=JSON.parse(data);	
	
	for(var i=0; i<items.length; i++){
		if(items[i].cod==codigoSeleccionado){
			items[i].nombre=nombre_marca;
		}		
	}

	fs.writeFileSync(filepath,JSON.stringify(items,null,2));

	mostrarTablaMarcas();
}
