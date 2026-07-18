# Prompts para Codex

## Prompt inicial

Lee completamente:

- `AGENTS.md`
- `README.md`
- todos los archivos de `/docs`
- `src/content/case-00.example.json`

Luego:

1. resume en no más de 15 puntos las reglas no negociables;
2. propone una arquitectura concreta compatible con los documentos;
3. identifica decisiones técnicas aún abiertas;
4. no escribas código todavía;
5. no agregues funcionalidades;
6. espera aprobación antes de comenzar la Fase 1.

---

## Prompt Fase 1

Implementa exclusivamente la **Fase 1 — Esqueleto** descrita en `docs/IMPLEMENTATION_PLAN.md`.

Requisitos:

- Expo + React Native + TypeScript estricto;
- Expo Router;
- diseño mobile vertical;
- tema visual inicial alineado con `ART_DIRECTION.md`;
- tabs Caso, Evidencias, Contraste y Dictamen;
- Dictamen bloqueado;
- datos mock cargados desde contenido externo;
- componentes reutilizables;
- sin backend;
- sin lógica de gameplay completa;
- sin assets finales.

Antes de terminar:

- ejecuta lint;
- ejecuta typecheck;
- ejecuta tests disponibles;
- entrega resumen de archivos, decisiones y pendientes.

No avances a la Fase 2.

---

## Prompt Fase 2

Implementa exclusivamente la **Fase 2 — Evidencias**.

Usa `CASE_00.md`, `GAMEPLAY_GRAMMAR.md`, `UI_SPEC.md` y `CONTENT_SCHEMA.md`.

Debe incluir:

- cinco evidencias del Caso 0;
- lista vertical;
- visor por tipo;
- hotspots;
- extracción de afirmaciones;
- elección entre formulaciones;
- estado revisada/sin revisar;
- store local;
- AsyncStorage;
- reinicio de progreso en modo development.

Mantén el contenido fuera de los componentes.

Añade pruebas de dominio y UI.

No avances a Contraste.

---

## Prompt Fase 3

Implementa exclusivamente la **Fase 3 — Contraste**.

Debe incluir:

- tres bandejas;
- selección de 2–3 afirmaciones;
- relaciones;
- motor puro de validación;
- cuatro contrastes obligatorios del Caso 0;
- observaciones con estados;
- feedback narrativo breve;
- desbloqueo progresivo.

No uses canvas libre ni hilos.

Añade pruebas.

No avances a secuencia o dictamen.

---

## Prompt Fase 4

Implementa exclusivamente la **Fase 4 — Secuencia e hipótesis**.

Debe incluir:

- lista reordenable;
- secuencia correcta del Caso 0;
- feedback no punitivo;
- hipótesis disponibles;
- slots semánticos;
- validación de la hipótesis dominante;
- anomalía no resuelta;
- desbloqueo del tab Dictamen.

No implementar todavía consecuencias finales.

---

## Prompt Fase 5

Implementa exclusivamente la **Fase 5 — Dictamen y epílogo**.

Debe incluir:

- conclusión técnica;
- dos continuidades;
- consecuencias explícitas;
- minuto sin registro de 8 segundos;
- mantener presionado para confirmar;
- ramificación A/B;
- fotografía final;
- mutación de ancla;
- persistencia del resultado;
- opción de reiniciar.

No agregar monetización ni más casos.

---

## Prompt Fase 6

Ejecuta la **Fase 6 — Pulido**.

Prioridades:

1. claridad;
2. tensión;
3. legibilidad;
4. materialidad;
5. accesibilidad;
6. rendimiento.

Añade:

- feedback sonoro sobrio;
- vibración opcional;
- transiciones discretas;
- estados de foco y accesibilidad;
- revisión a 320, 390 y 430 px;
- tests faltantes;
- limpieza de warnings.

No conviertas la dirección visual en cyberpunk o glitch art.

---

## Prompt de auditoría final

Audita la vertical slice contra `docs/ACCEPTANCE_CRITERIA.md`.

Entrega una tabla con:

- criterio;
- estado;
- evidencia;
- corrección pendiente.

Después corrige solo los criterios fallidos o parciales.

Ejecuta:

- lint;
- typecheck;
- test.

No agregues ninguna funcionalidad fuera del alcance.
