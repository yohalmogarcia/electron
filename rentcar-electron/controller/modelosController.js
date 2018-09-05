const fs = require('fs'); 
const $ = require('jquery');
const dt= require('datatables.net')();

const path = require('path');
const file="./json/modelos.json";
const filepath=`${path.resolve('.')}/${file}`;

var codigoSeleccionado=0;

$(document).ready(function(e){
    mostrarMarcas("");
    mostrarTablaModelos();        
});

$("#btn-cancelar").click(function(e){
	var btnGuardar = document.getElementById("btn-guardar");
	document.getElementById("nombre-modelo").value="";	
	if(btnGuardar.innerHTML=="Modificar"){
		btnGuardar.innerHTML="Guardar"
	}
});

$("#btn-guardar").click(function(e){
	if(document.getElementById("btn-guardar").innerHTML == 'Guardar'){
			if(document.getElementById("nombre-modelo").value==""){
				document.getElementById("mensaje").innerHTML="Debe rellenar el campo MODELO.";
			}else{
				document.getElementById("mensaje").innerHTML="";
				guardarModelo();
				document.getElementById("nombre-modelo").value="";
			}
			
		}else{
			// sino se modifica el modelo
			document.getElementById("mensaje").innerHTML="";
			modificarModelo();
			document.getElementById("nombre-modelo").value="";
			document.getElementById("btn-guardar").innerHTML = 'Guardar';
		}
});

$("#tabla-modelos").on('click','tbody td.sorting_1',function(){
	codigoSeleccionado= this.innerHTML;//guardo el codigo seleccionado desde la tabla
	var nombreModelo;
	var nombreMarca;
	const data = fs.readFileSync(filepath,'utf-8');
	var items = JSON.parse(data);
	for(var i=0; i<items.length;i++){
		if(items[i].cod == codigoSeleccionado){//busco el codigo en el json
			nombreModelo=items[i].nombre;//al encontrarlo guardo el nombre del modelo seleccionado
			nombreMarca=items[i].cod_marca;
		}
	}
	document.getElementById("cod_marca").innerHTML="";
	mostrarMarcas(nombreMarca);
	
	document.getElementById("nombre-modelo").value=nombreModelo;// pongo el nombre del modelo en el input
	document.getElementById("btn-guardar").innerHTML="Modificar";//modifico el texto del boton	
});

function mostrarMarcas(cod_marca){
	var pathMar = require('path');
	var fileMar="./json/marcas.json";
	var filepathMar=`${pathMar.resolve('.')}/${fileMar}`;
	var dataMar = fs.readFileSync(filepathMar,'utf-8');
	var items =[];
	items=JSON.parse(dataMar);

	var select = document.getElementById("cod_marca");

	for(var i=0; i<items.length; i++){
		var option = document.createElement('option');
		option.textContent = items[i].nombre;
		option.setAttribute("value",items[i].nombre);
		if(items[i].nombre==cod_marca){
			option.setAttribute("selected","selected");
		}
		select.appendChild(option);
	}

}

function mostrarTablaModelos(){
	const data = fs.readFileSync(filepath,'utf-8');	
	var items=[];
	var texto="Hola";
	items=JSON.parse(data);
	if(items.length>0){//solo si el archivo tiene datos mostrara la tabla		
		$('#tabla-modelos').DataTable( {
			destroy:true,
			data:JSON.parse(data),
			columns:[			
				{data: 'cod'},
				{data: 'cod_marca'},
				{data: 'nombre'}
			]
    	});
	}
	
}

function guardarModelo(){
	const data = fs.readFileSync(filepath,'utf-8');
	var codigo_modelo=0;
	var nombre_modelo = document.getElementById("nombre-modelo").value;
	var codigo_marca = document.getElementById("cod_marca").value;

	var items =[];	

	try{
		//si el fichero existe
		items=JSON.parse(data);	
		if(items.length<=0){
			codigo_modelo=1;
		}else{
			var datoUltimo = items[items.length-1].cod;
			codigo_modelo=datoUltimo+1;//aqui genero el codigo automaticamente
		}			
	}catch(e){
		//si el fichero no existe
		codigo_modelo=1;
		fs.openSync(filepath,'w');
	}

	items.push({
		cod:codigo_modelo,
		cod_marca:codigo_marca,
		nombre:nombre_modelo
	});

	fs.writeFileSync(filepath,JSON.stringify(items,null,2));

	mostrarTablaModelos();
}

function modificarModelo(){
	const data = fs.readFileSync(filepath,'utf-8');

	var codigo_modelo=0;
	var nombre_modelo = document.getElementById("nombre-modelo").value;
	var codigo_marca = document.getElementById("cod_marca").value;

	var items =[];	

	items=JSON.parse(data);	
	
	for(var i=0; i<items.length; i++){
		if(items[i].cod==codigoSeleccionado){
			items[i].cod_marca=codigo_marca;
			items[i].nombre=nombre_modelo;
		}		
	}

	fs.writeFileSync(filepath,JSON.stringify(items,null,2));

	mostrarTablaModelos();
}
