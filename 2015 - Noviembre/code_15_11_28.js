// Alan Badillo Salas | badillo.soft@hotmail.com
// Javascript - Números primos menores o iguales a 100

var prs = [];
for (var n = 2; n <= 100; n += 1) {
	if (prs[n] == undefined) {
		prs[n] = true;
	}
	
	for (var k = 2 * n; k <= 100; k += n) {
		prs[k] = false;
	}
	
	console.log(n + "\t" + (prs[n] ? 'primo' : 'no'));
}