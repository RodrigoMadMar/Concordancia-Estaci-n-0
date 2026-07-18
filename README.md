# CONCORDANCIA: ESTACIÓN 0 — paquete de definición para Codex

Este repositorio contiene la definición conceptual y funcional necesaria para construir la primera vertical slice de **CONCORDANCIA: ESTACIÓN 0**, un juego mobile narrativo de investigación sobre continuidades incompatibles de la realidad.

## Nomenclatura oficial

- **Universo / franquicia:** Concordancia
- **Primer juego / arco:** Estación 0
- **Título completo de esta entrega:** Concordancia: Estación 0
- **Institución dentro del mundo:** Departamento de Concordancia
- **Primer caso jugable:** El pasajero de las 07:14

Esta separación debe mantenerse en código, documentos, títulos de pantalla y metadatos.

## Objetivo inmediato

Construir una vertical slice jugable de 10–15 minutos basada en el prólogo:

**Caso 0 — El pasajero de las 07:14**

La versión debe demostrar el siguiente ciclo:

1. revisar evidencia;
2. extraer afirmaciones;
3. contrastar registro, memoria y consecuencia;
4. construir una hipótesis;
5. emitir un dictamen;
6. observar una consecuencia narrativa.

No se busca desarrollar todavía un juego completo ni arte final.

## Orden de lectura

1. `AGENTS.md`
2. `docs/GAME_CONCEPT.md`
3. `docs/WORLD_BIBLE.md`
4. `docs/CHARACTERS.md`
5. `docs/ART_DIRECTION.md`
6. `docs/GAMEPLAY_GRAMMAR.md`
7. `docs/UI_SPEC.md`
8. `docs/CASE_00.md`
9. `docs/CONTENT_SCHEMA.md`
10. `docs/TECHNICAL_ARCHITECTURE.md`
11. `docs/ACCEPTANCE_CRITERIA.md`
12. `docs/IMPLEMENTATION_PLAN.md`
13. `docs/CODEX_PROMPTS.md`

## Stack definida

- Expo
- React Native
- TypeScript estricto
- Expo Router
- Zustand o Context + reducer para estado local
- AsyncStorage para persistencia local del progreso
- Jest + React Native Testing Library
- Sin backend en esta etapa

## Restricción principal

El contenido narrativo y la lógica específica del caso deben vivir fuera de los componentes, en archivos configurables. El prototipo debe permitir crear un segundo caso sin reescribir el motor principal.
