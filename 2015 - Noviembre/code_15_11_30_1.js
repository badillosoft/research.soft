// Alan Badillo Salas | badillo.soft@hotmail.com
// Javascript - Calcular el número e recursivamente

var e = function (n) {
	return n <= 0 ? 1 :
		e(n - 1) + 1 / (function (n) {
			return n <= 1 ? 1 : n * arguments.callee(n - 1);
		})(n);
};

console.log(e(100));