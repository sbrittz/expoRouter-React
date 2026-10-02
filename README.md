# Comedor IPF

Aplicación móvil para consultar el menú del comedor, armar pedidos y administrar la cola de cocina. Está construida con Expo SDK 57, React Native, TypeScript y Expo Router.

## Requisitos

- Node.js compatible con Expo SDK 57
- npm
- Expo Go o un emulador/dispositivo con una development build

## Instalación y ejecución

Desde la carpeta del proyecto:

```bash
npm install
npx expo start
```

Para abrir directamente en una plataforma:

```bash
npx expo start --android
npx expo start --ios
npx expo start --web
```

Las dependencias nativas se agregan con `npx expo install <paquete>` para conservar compatibilidad con el SDK.

## Verificaciones

```bash
npx tsc --noEmit
npx expo lint
npx expo-doctor
```

Expo Router genera los tipos de rutas a partir de `src/app`. El proyecto habilita `experiments.typedRoutes` en `app.json`.

## Rutas

| URL                       | Pantalla                                              |
| ------------------------- | ----------------------------------------------------- |
| `/`                       | Inicio y accesos a las funciones principales          |
| `/menu`                   | Menú agrupado por categoría                           |
| `/menu/[id]`              | Detalle de un plato                                   |
| `/categorias/[categoria]` | Platos de una categoría válida                        |
| `/buscar?q=&categoria=`   | Búsqueda y filtro con estado en la URL                |
| `/carrito`                | Pedido actual y acciones del carrito                  |
| `/carrito/nota`           | Nota para cocina, dentro de un stack anidado          |
| `/confirmar`              | Resumen modal del pedido                              |
| `/turno/[numero]`         | Número de turno y estimación de espera                |
| `/ayuda`                  | Índice de ayuda                                       |
| `/ayuda/[...slug]`        | Artículo según segmentos variables                    |
| `/login`                  | Acceso modal para cocina                              |
| `/cocina`                 | Cola de pedidos pendientes; requiere sesión de cocina |
| `/cocina/atendidos`       | Historial de pedidos atendidos                        |
| `/pedido`                 | Redirección de compatibilidad a `/carrito`            |

Las pantallas restantes se resuelven con `+not-found.tsx`. Los grupos entre paréntesis, como `(tabs)`, organizan layouts sin formar parte de la URL.

## Navegación

El layout raíz usa un `Stack` para las rutas generales y protege el área de cocina según la sesión. Dentro de `(tabs)` hay pestañas para inicio, menú y carrito. El carrito tiene su propio `Stack` para abrir la pantalla de nota sin perder el contexto de la pestaña, y cocina usa un `Drawer` para alternar entre pedidos pendientes e historial.

Se usa `router.push` para avanzar a la confirmación conservando el carrito en el historial. Al confirmar, `router.replace` cambia la confirmación por el turno para que el botón Atrás no permita enviar de nuevo el mismo pedido. El inicio de sesión también reemplaza la pantalla de acceso al entrar a cocina. `/pedido` usa `<Redirect>` para conservar una URL anterior.

El esquema de deep links es `comedoripf`. Por ejemplo:

```text
comedoripf://buscar?q=mate&categoria=bebidas
comedoripf://menu/1
comedoripf://turno/1
```

En `/buscar`, `useLocalSearchParams()` lee `q` y `categoria`, y `router.setParams()` actualiza esos parámetros mientras se busca.

## Estado y estructuras

- `src/context/AppContext.tsx` contiene sesión, carrito, nota, pedidos y acciones compartidas.
- `src/estructuras/Pila.ts` implementa una pila genérica usada para deshacer altas al carrito y conservar el historial LIFO de atendidos.
- `src/estructuras/Cola.ts` implementa la cola FIFO de pedidos con un índice de frente; desencolar no usa `Array.shift()`.
- `src/data/platos.ts` contiene el menú de ejemplo y `src/types/index.ts` los tipos del dominio.
- `src/components` contiene componentes reutilizables; `src/app` se reserva para rutas y layouts.

Al confirmar, el pedido se encola y el carrito se limpia. Cocina atiende siempre el frente de la cola y cada pedido atendido se agrega a la pila de historial.

## Acceso de demostración

La pantalla de cocina acepta `cocina` como usuario y `1234` como contraseña. Son credenciales locales de demostración; no deben usarse para proteger datos reales ni sustituyen autenticación de servidor.
