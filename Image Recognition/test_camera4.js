// Alan Badillo Salas | badillo.soft@hotmail.com
// Javascript - Tomar una foto cada 0.5 segundos
// durante 3 segundos usando Node.js e shelljs
// Procesar la imagen: Crea una nueva imagen
// a partir de la última foto tomada.
// Esta imagen será la imagen ya procesada.
// terpix - Obtiene un pixel y sus vecinos
//		izquierdo, derecho, arriba y abajo
// diff - Procesa un terpix y devuelve un nuevo
//		pixel según una lógica establecida con sus
//		vecinos, la lógica usada es que devuelva un
//		pixel blanco si la variación con sus vecinos es
//		alta.

var shell = require('shelljs');
var lwip = require('lwip');

//var result = shell.exec('imagesnap capture_1.png').output;

shell.exec('imagesnap -t 0.50 & sleep 3; kill $!');
console.log('Fotos tomadas durante 3 segundos');

var list = shell.exec('ls *.jpg').output.split('\n');

list.pop();

for (var i = 0; i < list.length - 1; i += 1) {
	shell.exec('mv ' + list[i] + ' temp/' + list[i]);
}

var image_name = list.slice(-1)[0];

console.log('Procesando la imagen: ' + image_name);

function terpix(image, w, h, i, j) {
	var c, r, l, u, d;

	c = image.getPixel(j, i);

	l = j > 0 ? image.getPixel(j - 1, i) : c;
	r = j + 1 < w ? image.getPixel(j + 1, i) : c;
	u = i > 0 ? image.getPixel(j, i - 1) : c;
	d = i + 1 > h ? image.getPixel(j, i + 1) : c;

	return { c: c, l: l, r: r, u: u, d: d };
}

function diff(tpix) {
	var r = Math.max(tpix.c.r, tpix.l.r, tpix.r.r, tpix.u.r, tpix.d.r) -
		Math.min(tpix.c.r, tpix.l.r, tpix.r.r, tpix.u.r, tpix.d.r);
	var g = Math.max(tpix.c.g, tpix.l.g, tpix.r.g, tpix.u.g, tpix.d.g) -
		Math.min(tpix.c.g, tpix.l.g, tpix.r.g, tpix.u.g, tpix.d.g);
	var b = Math.max(tpix.c.b, tpix.l.b, tpix.r.b, tpix.u.b, tpix.d.b) -
		Math.min(tpix.c.b, tpix.l.b, tpix.r.b, tpix.u.b, tpix.d.b);

	r = Math.min(10 * r, 255);
	g = Math.min(10 * g, 255);
	b = Math.min(10 * b, 255);

	var h = r >= 100 && g < 30 && b < 30;

	return {
		r: 255,
		g: g,
		b: b,
		a: 100
	};
}

//var w, h, arr = [];

lwip.open(image_name, function (err, image) {
	var w = image.width();
	var h = image.height();

	var arr = [];

	console.log('Width: ' + w + '\tHeight: ' + h);

	for (var i = 0; i < h; i += 1) {
		for (var j = 0; j < w; j += 1) {
			/*if (i % 100 != 0 || j % 100 != 0) {
				continue;
			}*/

			var pix = terpix(image, w, h, i, j);

			if (pix.c.g > 40 && pix.c.r < 100 && pix.c.b < 100) {
				arr.push({i: i, j: j, c: {r: 255, g: 255, b: 0, a: 0}});
			} else {
				arr.push({i: i, j: j, c: pix.c});
			}

			//console.log('Pixel (' + i + ',' + j + '): ');
			//console.log(pix);
		}
	}

	console.log('Guardando imagen. ' + arr.length + ' pixeles encontrados');
	//console.log(arr);

	lwip.create(w, h, 'black', function(err, img) {
		var setPix = function(g, arr, pos) {
			/*while (pos < arr.length && arr[pos].c.r < 255) {
				pos += 1;
			}*/

			if (pos >= arr.length) {
				g.writeFile('output.jpg', function () {
					console.log('Imagen guardada: output.jpg');
				});
				return;
			}

			g.setPixel(arr[pos].j, arr[pos].i, arr[pos].c, function (e, ig) {
				setPix(g, arr, pos + 1)
			});
		}

		setPix(img, arr, 0);
	});
});
