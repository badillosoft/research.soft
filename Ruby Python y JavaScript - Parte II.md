# Ruby, Python y Javascript - Parte I

### Por Alan Badillo Salas

## Introducción

Esta segunda parte la dedicaremos a aspectos avanzados y algunos conceptos interesantes
que promueve cada lenguaje.

## Composición de métodos (delegados)

Cuando queremos generalizar la funcionalidad de un métodos, podemos solicitarle
al programador las reglas generalizadas en las que se basa nuestro método. Por ejemplo,
como vimos en la __Parte I__ podemos construir una función llamada filtro, la cual
haga uso de una segunda función que se encargue de determinar si un elemento pasa
el filtro. A este proceso se le conoce como delegamiento, ya que estamos usando
un método como si se tratase de una función.

_Ruby_ toma ventaja fuerte en este sentido, ya que es capaz de hacer clara la sintaxis
al respecto.

Retomemos el ejemplo del filtro utilizando expresiones lamda.

> Ruby

~~~rb
def filtro(a, cond)
	b = []
	a.each do |x|
		if cond.call(x)
			b << x
		end
	end
	return b
end

def es_par(x)
	x % 2 == 0 
end

p filtro([1, 2, 3, 4, 5], self.method(:es_par))

p filtro([1, 2, 3, 4, 5], proc { |x| x % 2 == 1 })
~~~

Sin embargo este proceso no es natural. Por esto mismo _ruby_ puede detectar
si ha recibido un bloque como argumento secundario. Esto nos permite adecuar
nuestra lógica según si se recibe o no un bloque.

> Ruby

~~~rb
def filtro(a)
	b = []
	a.each do |x|
		if block_given?
			if yield x
				b << x
			end
		end
	end
	return b
end

p filtro([1, 2, 3, 4, 5]) do |x|
	x % 2 == 1
end
~~~

Ahora todo se ha vuelto confuso, pero esto bastará con explicar las pequeñas 
diferencias. Lo primero que tenemos que observar es la invocación de la función filtro,
está toma un bloque de código con la condición del filtro. Es decir, que el 
lenguaje nos permite detectar si un método es recibido en la invocación al método.
Entonces, con _block_given?_ detectamos si un bloque ha sido pasado. Lo que sigue es
invocar al método, como podemos observar tenemos _yield x_ esto significa que
mandaremos a llamar al bloque pasando el argumento _x_. Recordemos que el bloque
necesita recibir el elemento y determinar si pasa el filtro mediante un booleano.
Entonces la respuesta (el booleano) será el que lea la condicional _if_. En resumen
tenemos que seguir los siguientes pasos para manejar bloques externos:

* Detectar si se recibió un bloque mediante _block_given?_
* Llamar al bloque pasandole parámetros _yield x_
* El resultado de la llamada será el que siga determinando nuestra lógica

Veamos ahora otros ejemplos para dominar este concepto de _ruby_.

## Ejemplo 1

Crear un método llamado primos, el cual recibe un entero n y le pasa a un bloque
el k-ésimo primo (o lo imprime si no se recibe bloque) hasta el n-ésimo primo.

> Ruby

~~~rb
def primos(n)
	prs = []
	i = 2 ; c = 0
	while c < n
		es_primo = true 
		prs.each do |p|
			if es_primo and i % p == 0
				es_primo = false
			end
		end
		
		if es_primo
			prs << i
			c += 1
			if block_given?
				yield i, c
			else
				print "#{i} "
				puts if c == n
			end
		end
		
		i += 1
	end
end

puts 'Los primeros 100 números primos son:'

primos(100)

s = 0.0

primos(100) do |p, k|
	s += p.to_f / (k * k)
end

puts "La suma ponderada es: #{s}"
~~~

En este caso utilizamos un algoritmo de orden cuadrado usando módulos para determinar
si el siguiente número es primo. Aunque es más eficiente en tiempo (no en espacio)
el algoritmo del _code_15_11_28_.

Podemos observar que si el número cumple ser un primo, entonces se agrega a un arreglo
y se manda como parámetro al bloque o se imprime. En el bloque no sólo recibimos
la información del primo, sino también la de su posición.

## Análisis de delegamiento en Python

En python el procedimiento para crear algo similar es enviar el método delegado
a la condición como un parámetro más.

Imaginemos que tenemos la función filtro que recibe otra para obtener la condición:

> Python

~~~py
def filtro(a, cond):
	b = []
	for x in a:
		if cond(x):
			b.append(x)
	return b
	
print filtro([1, 2, 3, 4, 5], lambda x: x % 2 == 1)
~~~

Sin embargo, aunque en _python_ ya no se puede mejorar la sintaxis en el lenguaje
como en _ruby_. Lo que nos permite python es un manejo más fluído sobre arreglos.

En _python_ poseemos algunos métodos interesantes que actuan sobre arreglos y
diccionarios que pueden encontrar
[aquí](http://www.u.arizona.edu/~erdmann/mse350/topics/list_comprehensions.html).

Compactaremos el código entonces usando sólo componentes del lenguaje.

> Python

~~~py
print [x for x in [1, 2, 3, 4, 5] if x % 2 == 1]
~~~

También podemos crear mapeos fácilmente:

> Python

~~~py
languages = ["Ruby", "Python", "JavaScript"]

print [languages[x] for x in [2, 0, 1]]
~~~

El siguiente código mapea un arreglo especial compuesto de tuplas
con dos valores a un diccionario:

> Python

~~~py
languages = ["Ruby", "Python", "JavaScript"]
colors = ["Red", "Yellow", "Blue"]

def vec_to_dic(vec):
	dic = {}
	for (k, v) in vec:
		if k in dic:
			dic[k].append(v)
		else:
			dic[k] = [v]
	return dic

vec = [(l, c) for l in languages for c in colors]

print vec
print vec_to_dic(vec)
~~~

Finalmente un algoritmo superior, encontrar los pares de puntos enteros
comprendidos entre -10 <= x <= 10 y -10 <= y <= 10, tales que
la primer coordenada sea menor o igual a la segunda.

> Python

~~~py
print [(x, y) for x in range(-10, 11) for y in range(-10, 11) if x <= y]
~~~

## Análisis de delegamiento en Javascript

En _javascript_ la idea principal es trabjar mediante llamadas externas o _callbacks_,
así como en python, se recibe una función que le envía los argumentos a la
siguiente y así sucesivamente. La ventaja principal de _javascript_ es
poder realizar las llamadas de manera asíncrona, es decir, no una trás otra,
sino en paralelo*.

En el siguiente ejemplo repetimos la construcción de la función filtro.

> Javascript

~~~js
function filtro(a, cond) {
	var b = [];
	a.forEach(function (x) {
		if (cond(x)) {
			b.push(x);
		}
	});
	return b;
}

console.log(
	filtro([1, 2, 3, 4, 5], function (x) { 
			return x % 2 == 1; 
	})
);
~~~

Ahora imaginemos que la condición requiere mucho tiempo para ejecutarse,
entonces si tarda por ejemplo un segundo, para n elementos se tardaría
n-segundos.

~~~js
function filtro(a, cond) {
	var b = [];
	a.forEach(function (x) {
		if (cond(x)) {
			b.push(x);
		}
	});
	return b;
}

var date = new Date();

console.log(
	filtro([1, 2, 3, 4, 5], function (x) { 
			var start = new Date();
			
			while ((new Date()) - start < 1000);
		
			return x % 2 == 1; 
	})
);

var diff = (new Date()) - date;

console.log(diff / 1000.0);
~~~

El código anterior tarda 5 segundos en determinar los elementos que pasan el filtro,
ahora vamos a paralelizar el algoritmo utilizando 
[_Parallel.js_](https://adambom.github.io/parallel.js/):

~~~js
var Parallel = require('paralleljs');

var p = new Parallel([
	1, 2, 3, 4, 5,
	6, 7, 8, 9, 10,
	11, 12, 13, 14, 15,
	16, 17, 18, 19, 20
]);

function es_par(x) {
	var start = new Date();
	
	while (Number(new Date()) - Number(start) < 1000);
	
	return [x, x % 2 == 1]; 
}

var date = new Date();

p.map(es_par).then(function (data) {
	var b = [];
	
	data.forEach(function (d) {
		if (d[1]) {
			b.push(d[0]);
		}
	});
	
	console.log(b);
	
	var diff = Number(new Date()) - Number(date);

	console.log(diff / 1000.0);
});
~~~

Para este ejemplo, el tiempo calculado está entre los 5 segundos, mientras
el tiempo equivalente en la versión síncrona sería de 20 segundos.