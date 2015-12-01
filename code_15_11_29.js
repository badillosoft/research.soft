// Alan Badillo Salas | badillo.soft@hotmail.com
// Javascript - Números de Fibonacci menores a 1000 

var a = 1, b = 1;

while (a <= 1000) {
	console.log(a);
	
	var c = b;
	
	b = a + b; a = c;
}