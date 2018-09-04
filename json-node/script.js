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

function tablaModelos(){
	const path = require('path');

	const fileName="data.json";
	const filepath=`${path.resolve('.')}/${fileName}`;
	const data = fs.readFileSync(filepath,'utf-8');

	$("#tabla-modelos").html("");

	$('#tabla-modelos').DataTable( {
		destroy:true,
		data:JSON.parse(data),
		columns:[
			{data: 'cod'},
			{data: 'nombre'}
		]
    } );
}

//sucede cuando el documento carga
$(document).ready(function(){

	tablaModelos();
	
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


//agregando nuevos registros al json
function reescribirJSON(){
	const path = require('path');

	const fileName="data.json";
	const filepath=`${path.resolve('.')}/${fileName}`;

	var codigo_modelo=document.getElementById("codigo-modelo").value;
	var nombre_modelo = document.getElementById("nombre-modelo").value;

	var items =[];
	var data;

	try{
		//si el fichero existe
		const content = fs.readFileSync(filepath,'utf-8');
		console.log("content: "+content)
		items=JSON.parse(content);				
	}catch(e){
		//si el fichero no existe
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



