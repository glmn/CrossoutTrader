const electron = require("electron");
const url = require('url');
const path = require('path');

const {app, BrowserWindow} = electron;

let mainWindow;

app.on('ready', function(){
  mainWindow = new BrowserWindow({title: 'Login', minWidth: 450, minHeight: 600, frame: false});
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.on('minimize',function(event){
    event.preventDefault();
    mainWindow.hide();
  });

  mainWindow.on('close', function (event) {
    if(!application.isQuiting){
        event.preventDefault();
        mainWindow.hide();
    }
  });
})