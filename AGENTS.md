# AGENTS.md — instrucciones persistentes

## Propósito

Construir la vertical slice 0.1 de **CONCORDANCIA: ESTACIÓN 0** como una aplicación mobile vertical con Expo, React Native y TypeScript.

## Nomenclatura

- Usar `Concordancia: Estación 0` como título del producto.
- Usar `Concordancia` para el universo o franquicia.
- Usar `Estación 0` para el primer arco.
- No confundir el título con el `Departamento de Concordancia`, que es una institución dentro de la ficción.

## Reglas no negociables

1. Usar TypeScript estricto.
2. Mantener el contenido narrativo desacoplado del código.
3. No agregar backend, autenticación ni servicios externos.
4. No implementar funciones no solicitadas.
5. No rediseñar documentos o pantallas no relacionadas con la tarea actual.
6. Ejecutar lint, typecheck y pruebas después de cada cambio relevante.
7. Evitar componentes gigantes. Separar vista, estado y lógica de dominio.
8. El Caso 0 debe definirse mayoritariamente mediante JSON/TypeScript data.
9. Toda interacción debe funcionar en una pantalla mobile vertical.
10. Diseñar primero para 390 × 844 px y soportar desde 320 px de ancho.
11. No depender únicamente del color para comunicar categorías o estados.
12. Mantener legibilidad y controles táctiles de al menos 44 × 44 px.
13. Permitir reiniciar el caso y borrar el progreso local desde desarrollo.
14. No utilizar assets o personajes protegidos de otras obras.
15. No imitar directamente la identidad visual de una serie, artista o videojuego existente.

## Dirección visual obligatoria

La interfaz debe sentirse como una herramienta burocrática contemporánea construida sobre sistemas antiguos.

Evitar:

- cyberpunk;
- neón;
- hologramas;
- glitches RGB;
- terminales de hacker;
- HUD militar;
- mural detectivesco con hilos rojos;
- estética paranormal caricaturesca;
- iconografía excesiva;
- fondos constantemente oscuros;
- anime escolar convencional.

Priorizar:

- papel;
- sellos;
- documentos;
- metal;
- cinta magnética;
- verdes y azules institucionales apagados;
- rojo óxido para remanentes;
- errores de alineación discretos;
- espacios vacíos que indican elementos eliminados;
- movimientos sobrios y materiales.

## Arquitectura de dominio

Separar al menos:

- contenido del caso;
- progreso de investigación;
- validación de contrastes;
- validación de hipótesis;
- navegación;
- presentación visual.

No codificar soluciones del Caso 0 dentro de componentes de UI.

## Calidad

Antes de considerar una entrega terminada:

- `npm run lint`
- `npm run typecheck`
- `npm test`

Documentar brevemente cualquier decisión técnica no contemplada.
