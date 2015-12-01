// Alan Badillo Salas | badillo.soft@hotmail.com
// Javascript - Obtener un arreglo de números en un rango

var range = function (a, b, c, arr) {
	a = a || 0;
	b = b || a;
	c = c || 1;
	
	(arr = arr || []).push(a);
	
	return c > 0 ? (a + c) > b ? arr : range(a + c, b, c, arr) :
		(a + c) < b ? arr : range(a + c, b, c, arr);
};

console.log(range(1, 5));
console.log(range(1, 5, 2));
console.log(range(5, 1, -1));
console.log(range(5, 1, -2));
console.log(range(1, 5, 0));
console.log(range(5, 1, -1, [10, 9, 8, 7, 6]));