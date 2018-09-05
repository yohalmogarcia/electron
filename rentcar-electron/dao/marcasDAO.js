const fs = require('fs'); 
const $ = require('jquery');
const dt= require('datatables.net')();

const path = require('path');
const file="./json/marcas.json";
const filepath=`${path.resolve('.')}/${file}`;
const data = fs.readFileSync(filepath,'utf-8');

var codigoSeleccionado=0;



function mostrarTablaMarcas(){
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
    	});
	}
	
}

function prueba(){
    alert("Estoy desde DAO");
}
