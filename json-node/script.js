//todos estos require hay q instalarlos con npm en el proyecto
const fs = require('fs'); 
const $ = require('jquery');
const dt= require('datatables.net')();

//para poder leer el archivo modelos.json
const path = require('path');
const fileDataJson="modelos.json";// se asigna el archivo a leer= data.json
const filepathDataJson=`${path.resolve('.')}/${fileDataJson}`;//se completa la url con el nombre del archivo
//const dataDataJson = fs.readFileSync(filepathDataJson,'utf-8');//se obtiene el archivo data.json

//esta variable la ocupare para modificar el modelo
var codigoSeleccionad=0;

//esto sucede cuando hago clic en el boton de guardar o modificar modelo
$("#btn-modelo").click(function(e){
		//si el boton tiene un texto de Guardar se agrega un nuevo modelo
		if(document.getElementById("btn-modelo").innerHTML == 'Guardar'){
			reescribirJSON();	
		}else{
			// sino se modifica el modelo
			modificarModelo();
		}
		
	});

	//esto sucede al precionar el boton ver tabla
	$("#btn-tabla-modelos").click(function(e){
		tablaModelos();//manda a llamar a la funcion para ver la tabla
	});


//funcion para mostrar la tabla de modelos
function tablaModelos(){
	const path = require('path');

	const fileName="modelos.json";
	const filepath=`${path.resolve('.')}/${fileName}`;
	const data = fs.readFileSync(filepath,'utf-8');

	var items=[];
	items=JSON.parse(data);
	if(items.length>0){//solo si el archivo tiene datos mostrara la tabla		
		$('#tabla-modelos').DataTable( {
		destroy:true,
		data:JSON.parse(data),
		columns:[			
			{data: 'cod'},
			{data: 'nombre'}
		]
    } );
	}
	
}

//para seleccionar un modelo y que se muestre en el input para modificar
$("#tabla-modelos").on('click','tbody td.sorting_1',function(){
	codigoSeleccionado= this.innerHTML;//guardo el codigo seleccionado desde la tabla
	var nombreModelo;
	const dataDataJson = fs.readFileSync(filepathDataJson,'utf-8');
	var items = JSON.parse(dataDataJson);
	for(var i=0; i<items.length;i++){
		if(items[i].cod == codigoSeleccionado){//busco el codigo en el json
			nombreModelo=items[i].nombre;//al encontrarlo guardo el nombre del modelo seleccionado
		}
	}
	
	document.getElementById("nombre-modelo").value=nombreModelo;// pongo el nombre del modelo en el input
	document.getElementById("btn-modelo").innerHTML="Modificar";//modifico el texto del boton
});

//agregando nuevos registros al json
function reescribirJSON(){
	const path = require('path');

	const fileName="modelos.json";
	const filepath=`${path.resolve('.')}/${fileName}`;

	var codigo_modelo=0;
	var nombre_modelo = document.getElementById("nombre-modelo").value;

	var items =[];	

	var data;

	try{
		//si el fichero existe
		const content = fs.readFileSync(filepath,'utf-8');
		items=JSON.parse(content);	
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
		nombre:nombre_modelo
	});

	fs.writeFileSync(filepath,JSON.stringify(items,null,2));

	tablaModelos();
}


//para modificar un elemento
function modificarModelo(){
	const path = require('path');

	const fileName="modelos.json";
	const filepath=`${path.resolve('.')}/${fileName}`;

	var codigo_modelo=0;
	var nombre_modelo = document.getElementById("nombre-modelo").value;

	var items =[];	

	var data;

	const content = fs.readFileSync(filepath,'utf-8');
	items=JSON.parse(content);	
	
	for(var i=0; i<items.length; i++){
		if(items[i].cod==codigoSeleccionado){
			items[i].nombre=nombre_modelo;
		}		
	}

	fs.writeFileSync(filepath,JSON.stringify(items,null,2));

	tablaModelos();
}




