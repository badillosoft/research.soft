<center>
# Diferencias entre Ruby, Python y Javascript
# Parte I
</center>

### Por Alan Badillo Salas

## Introducción

Estas notas tienen como fin el motivar a los programadores de _Ruby_, _Python_ o _Javascript_ en aventurarse en los otros lenguajes para tener una visión más amplia de programación. Estos tres lenguajes forman parte de mis favoritos por lo que son muy útiles conocerlos a profundidad para resolver distintas situaciones en la programación que realicemos día a día.

Siéntete libre de compartir estas notas, pero no olvides promocionar mi página de facebook: [research.soft](https://www.facebook.com/research.soft)

## Variables

En los tres lenguaes las variables se comportan casi igual, recordemos que son lenguajes no tipados. Sin embargo, en _ruby_ todo son objetos, hasta los números, por lo que los números tienen métodos, por ejemplo:

> Ruby

~~~rb
1.upto(9) do |i|
	p i
end
~~~

> Python

~~~py
for i in range(1, 10):
	print i
~~~

> Javascript

~~~js
for (var i = 1; i <= 9; i += 1) {
	console.log(i);
}
~~~

Observa que en _javascript_ al asignar variables (aunque es no tipado) requiere anteponer la palabra reservada _var_ en la declaración.

## Bloques

La diferencia entre los bloques de _ruby_ y _python_ es que en _python_ los bloques son agrupaciones de sentencias indentadas, mientras que en _ruby_ un bloque puede envolver (clausurar) variables, como en el ejemplo anterior, donde el bloque _do-end_ permite pasar como parámetro la variable _i_.

Existe un bloque alternativo en _ruby_ donde en lugar de usar _do-end_ utilizamos _{ }_.

> Ruby

~~~rb
a = [1, 2, 3, 4, 5]

a.each { |x|
	p x
}
~~~

> Python

~~~py
a = [1, 2, 3, 4, 5]

for x in a:
	print x
~~~

> Javascript

~~~js
var a = [1, 2, 3, 4, 5];

a.forEach(function (i) {
	console.log(i);
});
~~~

Observe que la asignación literal de arreglos es similar a _python_. Algo importante a notar, es el proceso estilo _callback_ que hace _ruby_ al estilo _javascript_, en realidad, _each_ no es un método especial, como veremos adelante, el método _each_ recibe simplemente un bloque externo y le envía parámetros mediante la palabra reservada _yield_ (*Parte II*).

El manejo de bloques en _ruby_ es un poco más complejo debido a esto, sin embargo, con un poco de práctica es fácil de dominar.

En _javascript_ se sigue el concepto de _callback_ donde el método recibe una función (en este caso usamos una función anónima [sin nombre]).

## Diccionarios funcionales (objetos anónimos)

Los diccionarios no sólo nos sirven para almacenar valores, sino que podemos guardar en ellos funciones, lo que nos permite invocarlos.

El siguiente programa crea un método nombrado el cual es guardado en el diccionario, un método anónimo (expresión lambda) es creado directamente en el diccionario. Estas dos formas permiten observar la flexibilidad de cada lenguaje para crear _diccionarios funcionales_.

> Ruby

~~~rb
def sum(a, b)
	a + b
end

op = {
	:+ => self.method(:sum),
	:* => Proc.new {|a, b| a * b}
}

p op[:+].call(1, 2)
p op[:*].call(1, 2)
~~~

> Python

~~~py
def sum(a, b):
	return a + b

op = {
	"+" : sum,
	"*" : lambda a, b : a * b
}

print op['+'](1, 2)
print op['*'](1, 2)
~~~

> Javascript

~~~js
function sum(a, b) {
	return a + b;
};

// var sum = function (a, b) { return a + b; };

op = {
	"+": sum,
	"*": function (a, b) {
		return a * b;
	}
};

console.log(op["+"](1, 2));
console.log(op['*'](1, 2));
~~~

Observe que las funciones anónimas en _ruby_ se llaman _procedimientos_, en _python_ son _expresiones lambda_ y en _javascript_ simplemente son _métodos anónimos_. _Javascript_ tiene mayor ventaja en el lenguaje al momento de crear _métodos anónimos_.

Un detalle importante en _ruby_ es el como obtener el método tal cual, si nosotros hubieramos hecho: _:+ => sum_ entonces, estaríamos intentanto evaluar la función sum sin parámetros, esto se debe a que las invocaciones en _ruby_ no requieren paréntiesis:

> Ruby

~~~rb
def sum(a, b) a + b end

p sum 1, 2 # sum(1, 2)
~~~

Por lo tanto, debemos obtener el método mediante _self.method(:sum)_. En ruby, se utilizan los símbolos, los cuales son _:nombre_ y se utilizan como llaves o nombres especiales.

## Ejemplo

Se requiere un programa que defina una función filtro la cual reciba un arreglo de números y regrese un arreglo con los números filtrados por una condición aplicada sobre cada número. Dicha condición debe ser una función que tome un número y devuelva un _booleano_ que determina si ese número pasa el filtro.

> Ruby

~~~rb
def es_par(x)
	x % 2 == 0
end

def filtro(a, condicion)
	b = []
	a.each do |x|
		if condicion.call(x)
			b << x # b.push(x)
		end
	end
	return b
end

p filtro([1, 2, 3, 4, 5], self.method(:es_par))
~~~

> Python

~~~py
def es_par(x):
	return x % 2 == 0

def filtro(a, condicion):
	b = []
	for x in a:
		if condicion(x):
			b.append(x)
	return b

print filtro([1, 2, 3, 4, 5], es_par)
~~~

> Javascript

~~~js
function es_par(x) {
	return x % 2 == 0;
}

function filtro(a, condicion) {
	var b = [];
	a.forEach(function (x) {
		if (condicion(x)) {
			b.push(x);
		}
	});
	return b;
}	

console.log(filtro([1, 2, 3, 4, 5], es_par));
~~~

## Ejecicio

Del ejemplo anterior, intente enviar la condición como un procedimiento, una expresión lambda o una función anónima según el lenguaje.