const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow,Menu}=electron;

let mainWindow;
let addWindow;

//saber cuando la aplicacion este lista
app.on('ready',function(){
  //crear una nueva ventana
  mainWindow=new BrowserWindow({});
  //cargar el html dentro de la ventana
  mainWindow.loadURL(url.format({
    pathname:path.join(__dirname,'index.html'),
    protocol:'file:',
    slashes:true
  }));

  //quitar todas las ventanas cuando la aplicacion se cierra
  mainWindow.on('closed',function(){
    app.quit();
  });

  //Construyendo el menu
  const mainMenu=Menu.buildFromTemplate(mainMenuTemplate);

  //insertando el menu
  Menu.setApplicationMenu(mainMenu);

});



//agregando una nueva pantalla
function createAddWindow(){
//crear una nueva ventana
  addWindow=new BrowserWindow({
    width:300,
    height:200,
    title:'Agregar un nuevo Item'
  });
  //cargar el html dentro de la ventana
  addWindow.loadURL(url.format({
    pathname:path.join(__dirname,'addWindow.html'),
    protocol:'file:',
    slashes:true
  }));
  //recolector de basura
  addWindow.on('close',function(){
    addWindow=null;
  });
}

function cambiarPagina(pagina){
  mainWindow.loadURL(url.format({
    pathname:path.join(__dirname,pagina),
    protocol:'file:',
    slashes:true
  }));
}

//creando la plantilla del menu
const mainMenuTemplate=[
  {
    label:'Mantenimientos',
    submenu:[
      {
        label:'Marcas',
        click(){
          cambiarPagina("marcas.html");
        }
      },
      {
        label:'Modelos',
        click(){
          cambiarPagina("modelos.html");
        }
      },
      {
        label:'Salir',
        accelerator:process.platform=='darwin'?'Command+Q':'Ctrl+Q',
        click(){          
          app.quit();
        }
      }
    ]
  }
];

//si es mac, agregar un objeto vacio al menu
if(process.platform=='darwin'){
  mainMenuTemplate.unshift({});
}

//agregar herramientas para desarrollador si no esta en produccion la app
if(process.env.NODE_ENV !== 'production'){
  mainMenuTemplate.push({
    label:'Herramientas de Desarrollador',
    submenu:[
      {
        label:'Consola',
        accelerator:process.platform=='darwin' ?'Command+I':'Ctrl+I',
        click(item,focusedWindow){
          focusedWindow.toggleDevTools();
        }
      },
      {
        role:'reload'
      }
    ]
  });
}