# Criterios de aceptación — Vertical Slice 0.1

## Setup

- El proyecto instala dependencias sin errores.
- Ejecuta en Expo.
- TypeScript estricto sin errores.
- Lint y tests pasan.

## Flujo

El jugador puede:

1. completar las tres anclas;
2. abrir el expediente;
3. navegar entre Caso, Evidencias y Contraste;
4. revisar cinco evidencias;
5. extraer afirmaciones;
6. clasificar visualmente registro, memoria y consecuencia;
7. construir cuatro observaciones;
8. ordenar una secuencia;
9. validar la hipótesis dominante;
10. desbloquear Dictamen;
11. elegir uno de dos cierres;
12. mantener presionado para fijar continuidad;
13. ver la consecuencia elegida;
14. ver la fotografía final;
15. observar el cambio de ancla;
16. reiniciar el caso.

## Comprensión

La UI debe permitir que una persona sin explicación externa entienda:

- qué evidencia está pendiente;
- cómo extraer una afirmación;
- cómo seleccionar afirmaciones;
- cómo contrastarlas;
- cuándo se desbloquea una hipótesis;
- por qué el dictamen es una decisión distinta de la conclusión.

## Narrativa

Debe quedar claro que:

- Toma no existe oficialmente;
- Ena lo recuerda;
- quedan consecuencias materiales;
- el tren de las 07:14 pertenece a otra continuidad;
- Kiru y Maru están conectados con Estación 0.

## Dirección visual

- no cyberpunk;
- no hilos rojos;
- no glitches RGB;
- uso sobrio de papel, sellos y capas;
- categorías legibles sin depender solo del color;
- remanentes representados por doble impresión o desalineación.

## Mobile

- funciona a 390 × 844;
- usable a 320 px de ancho;
- no requiere scroll horizontal;
- botones táctiles adecuados;
- texto no se corta.

## Contenido desacoplado

Debe ser posible modificar:

- texto de una evidencia;
- afirmaciones;
- contraste válido;
- hipótesis;
- dictamen;

sin editar el componente visual correspondiente.

## Fuera de alcance

La entrega no necesita:

- backend;
- autenticación;
- tienda;
- anuncios;
- múltiples casos;
- mapa;
- doblaje;
- arte final;
- generación con IA;
- nube;
- multiplayer.
