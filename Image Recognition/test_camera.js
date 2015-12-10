// Alan Badillo Salas | badillo.soft@hotmail.com
// Javascript - Tomar una foto cada 5 segundos
// usando Node.js e imagesnap

var shell = require('shelljs');
var fs = require('fs');
var imagesnap = require('imagesnap');

var count = 1;

var version = shell.exec('node -v').output;

function take_photo() {
  if (count > 3) {
    return;
  }
  
  console.log('Tomando foto ' + count);
  
  var imageStream = fs.createWriteStream('capture_' + count + '.jpg');
  
  imageStream.on('finish', function () {
    console.log('Foto tomada: capture.jpg');
    
    count += 1;
    
    setTimeout(take_photo, 5000);
  });
  
  imagesnap().pipe(imageStream);
};

take_photo();