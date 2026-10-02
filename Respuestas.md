Parte A · Estructuras de datos: la pila y la cola
A1. Conceptos

a) ¿Qué significan LIFO y FIFO? ¿Cuál corresponde a la pila y cuál a la cola?
LIFO significa Last In, First Out, o sea que el último elemento que entra es el primero que sale. Este comportamiento corresponde a una pila.
FIFO significa First In, First Out, es decir que el primer elemento que entra es el primero que sale. Este comportamiento corresponde a una cola.
Por ejemplo, en una pila si agrego primero A, después B y por último C, el primero que voy a sacar es C. En cambio, en una cola, el primero que saldría sería A.

b) ¿Por qué extremo entra y por qué extremo sale un elemento en cada estructura?
En una pila, los elementos entran y salen por el mismo lado, que sería el tope. Por eso el último elemento agregado siempre queda arriba de los demás.
En una cola funciona distinto. Los elementos nuevos se agregan al final, pero se sacan desde el frente. De esa forma se respeta el orden en el que fueron llegando.

c) Ejemplo de la vida real y de una aplicación móvil
Un ejemplo de una pila en la vida real puede ser una pila de platos. Cuando se coloca un plato nuevo, se pone arriba, y normalmente también se saca primero el que está arriba.
En una aplicación móvil se puede comparar con las pantallas de navegación. Si estoy en Inicio, después entro a Productos y después al detalle de un producto, al tocar “atrás” vuelvo a Productos, porque se quita la última pantalla que se había abierto.
Un ejemplo de una cola en la vida real es la fila de personas esperando en una caja. La primera persona que llegó debería ser la primera en ser atendida.
En una aplicación se puede ver, por ejemplo, en una lista de pedidos. El primer pedido que se hizo debería ser el primero que se procesa.

A2. Seguimiento de una pila
El código primero agrega "Inicio", "Productos" y "Detalle 3" a la pila.
Después se ejecuta un pop(), por lo que se elimina "Detalle 3".
Luego se agrega "Perfil".

En ese momento la pila queda así:
[Inicio, Productos, Perfil]

Entonces:
console.log(p.tope());

muestra:
Perfil

Después:
console.log(p.pop());

también muestra:
Perfil

porque pop() devuelve el elemento que elimina.
Luego la pila queda:
[Inicio, Productos]

Por eso:
console.log(p.tope());

muestra:
Productos

Finalmente:
console.log(p.vacia);

muestra:
false

porque todavía quedan elementos en la pila.
Resultado
(1) Perfil
(2) Perfil
(3) Productos
(4) false

La pila termina así, de base a tope:
[Inicio, Productos]


A3. Seguimiento de una cola
Primero se encola "Ana" y después "Beto".
La cola queda:
[Ana, Beto]

Luego se hace:
c.desencolar();

Como una cola trabaja con FIFO, sale "Ana" porque fue la primera en entrar.
Queda:
[Beto]

Después se agregan "Caro" y "Dani":
[Beto, Caro, Dani]

Por eso:
console.log(c.frente());

muestra:
Beto

Después:
console.log(c.desencolar());

también muestra:
Beto

y lo elimina.
La cola queda:
[Caro, Dani]

Finalmente:
console.log(c.vacia);

muestra:
false

porque todavía quedan elementos.
Resultado
(1) Beto
(2) Beto
(3) false

Estado final de la cola:
[Caro, Dani]



A4. Análisis de la implementación
a) ¿Qué significa el # de #items?
El # indica que items es un atributo privado de la clase.
Eso significa que no se puede acceder directamente desde afuera de la clase, sino solamente desde sus propios métodos.
Por ejemplo, si tengo:
class Pila {
  #items = [];
}

no debería poder hacer algo como:
pila.#items

Esto sirve para proteger los datos internos de la clase y evitar que otra parte del programa los modifique de una forma que no corresponde.
b) ¿Qué problema tiene shift() en una cola muy grande?
shift() elimina el primer elemento de un array.
El problema es que cuando se elimina ese elemento, los demás elementos del array tienen que cambiar de posición.
Por ejemplo:
[Ana, Beto, Caro, Dani]

si se elimina "Ana", los demás quedan:
[Beto, Caro, Dani]

En una cola pequeña no es un problema importante, pero si hay muchísimos elementos y se hace constantemente, puede terminar siendo poco eficiente.
Una forma de evitarlo es no borrar físicamente el primer elemento cada vez, sino guardar un índice que indique cuál es el elemento que está actualmente al frente.
Ese es justamente el enfoque que pide el ejercicio A5.    

c) ¿Qué método usa la pila y cuál usa la cola?
La pila usa pop() porque necesita eliminar el último elemento que fue agregado.
En una implementación básica de cola se podría usar shift(), porque se necesita eliminar el primer elemento.
No pueden usar el mismo método porque la pila y la cola siguen órdenes diferentes. La pila trabaja con LIFO y la cola con FIFO.
A5. Programación: una cola eficiente
Una posible implementación es esta:
class ColaEficiente {
  #items = [];
  #frente = 0;

  encolar(x) {
    this.#items.push(x);
  }

  desencolar() {
    if (this.vacia) {
      return undefined;
    }

    const elemento = this.#items[this.#frente];
    this.#frente++;

    return elemento;
  }

  frente() {
    if (this.vacia) {
      return undefined;
    }

    return this.#items[this.#frente];
  }

  get vacia() {
    return this.#frente >= this.#items.length;
  }

  get tamanio() {
    return this.#items.length - this.#frente;
  }
}

En este caso no se usa shift().
La idea es que #frente indique en qué posición empieza realmente la cola. Cada vez que se desencola un elemento simplemente se aumenta ese índice.
Por ejemplo, si tengo:
[Ana, Beto, Caro]

y #frente vale 0, el frente es "Ana".
Después de desencolar, #frente pasa a valer 1, entonces el nuevo frente es "Beto".
A6. Pila y cola dentro de Expo Router

a) ¿Qué estructura describe el historial de pantallas de un Stack?
El historial de un Stack funciona de manera parecida a una pila.
Por ejemplo, si hago este recorrido:
Inicio
Productos
Detalle

se podría pensar como:
[Inicio, Productos, Detalle]

La pantalla que se ve es la última, en este caso Detalle.
Cuando el usuario toca “atrás”, se saca esa pantalla y vuelve a mostrarse Productos.
Por eso la navegación de tipo Stack se relaciona con una estructura LIFO.
,git 
b) ¿Qué estructura usa Expo Router para las acciones de navegación?
Las acciones de navegación se pueden pensar como una cola.
Si el usuario realiza dos acciones muy rápido, se procesan respetando el orden en el que fueron generadas.
Por ejemplo:
1. Abrir producto
2. Ir al carrito

Primero se procesa la primera acción y después la segunda.
Eso corresponde al comportamiento FIFO de una cola. La consigna relaciona justamente la pila con el historial del Stack y la cola con las acciones de navegación.