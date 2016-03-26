# IO Robot

## Introducción

Este proyecto tratará sobre construir un sistema para un robot basado en comandos
utilizando el lenguaje ruby en el fondo, pero superficialmente sólo recibirá
instrucciones y datos en formato _json_.

El objetivo principal de este proyecto es crear una incubadora de ideas para construir
software evolutivo partiendo de lo más sencillo que son comandos. El proyecto
como tal no tiene una visón a futuro por lo que se irá consolidando conforme se anvance
en la codificación.

## Lista de tareas

* 1.0.0 Leer un conjunto de lineas en formato _json_ y responda
con otro _json_ que contenga un arreglo con las claves del _json_ de entrada.

> Ejemplo de entrada

~~~bash
$ ruby script.rb <<EOF
{
	"a": 1,
	"b": 10,
	"c": "hola",
	"d": true
}
EOF
~~~

> Salida

~~~json
["a", "b", "c", "d"]
~~~

* 1.0.1 Leer un conjunto de lineas en formato _json_ y responda
con otro _json_ que contenga el valor incrementado de las variables que sean
de tipo numérico.

> Ejemplo de entrada

~~~bash
$ ruby script.rb <<EOF
{
	"a": 1,
	"b": 10,
	"c": "hola",
	"d": true
}
EOF
~~~

> Salida

~~~json
{
	"a": 2,
	"b": 11,
	"c": "hola",
	"d": true
}
~~~

* 1.0.2 Mapear el argumento -i o --input según la función del argumento -m o --map
con el parámetro $i que contiene la entrada.

> Ejemplo de entrada

~~~bash
$ ruby script.rb -i 10 -m "i ** 2 + 1"
~~~

> Salida

~~~bash
> 101.0
~~~

* 1.0.3 Crear un robot con posición en _x_, _y_ y un ángulo de rotación a partir
de un _json_, moverlo en la dirección del ángulo según el comando mover tomando
la distancia del parámetro dado.

> Ejemplo de entrada

~~~json
{
	"robot": {
		"position": {
			"x": 10,
			"y": 20
		},
		"angle": 45
	},
	"do": {
		"command": "move",
		"distance": 10 
	}
}
~~~

> Salida

~~~json
{
	"robot": {
		"position": {
			"x": 17.071067811865476,
			"y": 27.071067811865476
		},
		"angle":45
	}
}
~~~