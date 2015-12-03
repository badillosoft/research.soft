var shell = require('shelljs');

//var result = shell.exec('imagesnap capture_1.png').output;

shell.exec('imagesnap -t 0.50 & sleep 3; kill $!');
console.log('Fotos tomadas durante 3 segundos');

var list = shell.exec('ls *.jpg').output.split('\n');

console.log(list);