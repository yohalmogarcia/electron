const fs = require('fs');
const $ = require('jquery');
const dt= require('datatables.net')();

//para poder leer el archivo data.json
const path = require('path');

const fileDataJson="data.json";// se asigna el archivo a leer= data.json
const filepathDataJson=`${path.resolve('.')}/${fileDataJson}`;//se completa la url con el nombre del archivo
//const dataDataJson = fs.readFileSync(filepathDataJson,'utf-8');//se obtiene el archivo data.json




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

//sucede cuando el documento carga
$(document).ready(function(){

	//tablaModelos();
	
	$("#form-modelos").submit(function(e){
		e.preventDefault();
	});


    //formulario
	$('#guardar').click(function(e){
				
	});

	//al hacer clic en el boton se carga la tabla
	$('#btn').click(function(e){
		verTabla();
	});

	$("#btn-modelo").click(function(e){
		reescribirJSON();
	});

	//ver tabla modelos
	$("#btn-tabla-modelos").click(function(e){
		tablaModelos();
	});


    
});//fin de document.ready


//funcion para mostrar la tabla de marcas
function verTabla(){
	var miTabla =  $('#example').DataTable( {
		"ajax":"marcas.json",		
        "columns"     :     [  
                {     "data"     :     "cod"     },  
                {     "data"     :     "nombre_marca"}                 
           ]  
    } );

    $("#example").on('click','tbody td', function(){
    	miTabla.cell(this).edit();
    });
}

//funcion para mostrar la tabla de modelos
function tablaModelos(){
	const path = require('path');

	const fileName="modelos.json";
	const filepath=`${path.resolve('.')}/${fileName}`;
	const data = fs.readFileSync(filepath,'utf-8');

	var items=[];
	items=JSON.parse(data);
	if(items.length>0){
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
			codigo_modelo=datoUltimo+1;
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


/*
function agregarAJSON(){
	var jsonData;
	fs.readFileSync('modelos.json','utf-8',function(err,data){
		alert("Hola");
		if(err){
			console.log(err);
		}else{

			var codigo_modelo=document.getElementById("codigo-modelo").value;
			var nombre_modelo = document.getElementById("nombre-modelo").value;

			jsonData=JSON.parse(data);
			console.log("jsonData: "+jsonData);
			var modelos = {
				"codigo":codigo_modelo,
				"nombreModelo":nombre_modelo
			}
			jsonData.push(modelos);
			console.log("jsonData 2: "+jsonData);
			var newdata = JSON.stringify(jsonData);
			fs.writeFile('modelos.json', newdata,'utf-8', function(err){
				if(err) throw err;
				console.log("Exito!");
			});
		}
	});//se adquieren los datos hexadecimales del archivo  

*/
/*


	var jsonObj = JSON.parse(rawdata);  //se convierten los datos hexadecimales a json
	var mod = jsonObj.data;
	console.log("mod: "+mod);

	var codigo_modelo=document.getElementById("codigo-modelo").value;
	var nombre_modelo = document.getElementById("nombre-modelo").value;
	var modelos = {
		"codigo":codigo_modelo,
		"nombreModelo":nombre_modelo
	}

	jsonObj.push(modelos);
	var data = JSON.stringify(jsonObj);

	console.log("data: "+data)

	data+=mod;
	console.log("data+modelos: "+data);
	//fs.writeFileSync('modelos.json',data);

	
}
*/



