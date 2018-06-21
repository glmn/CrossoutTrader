'use strict';

const fs = require('fs');
const electron = require("electron");
const url = require('url');
const path = require('path');

const {app, BrowserWindow} = electron;

let mainWindow;
const itemsFile = 'items.json';
const oldItemsFile = 'old.items.json';

var request = require('request');
request('https://crossoutdb.com/api/v1/items', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.stat(itemsFile, function(err, stat) {
      if(err == null) {
        fs.rename(itemsFile, oldItemsFile, function(err) {
          if(err) throw err;
        });
      } 
      fs.writeFile(itemsFile, body, (err) => {
        if(err) throw err;
      });  
    });
  }
})

app.on('ready', function(){
  mainWindow = new BrowserWindow({title: 'Login', minWidth: 1260, minHeight: 720, frame: false});
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