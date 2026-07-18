

---

# FILE: README.md

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


---

# FILE: AGENTS.md

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


---

# FILE: docs/GAME_CONCEPT.md

# Concepto de juego

## Título

# CONCORDANCIA: ESTACIÓN 0

**Concordancia** es el nombre del universo narrativo. **Estación 0** es el título del primer juego/arco y de esta vertical slice.

## Género

Puzzle narrativo de investigación, misterio especulativo y decisiones ontológicas.

## Plataforma inicial

Mobile vertical.

## Premisa

La realidad permanece estable cuando coinciden tres dimensiones:

- **Registro:** lo que documentos, sistemas y archivos reconocen.
- **Memoria:** lo que las personas recuerdan haber vivido.
- **Consecuencia:** las huellas materiales, corporales, emocionales o conductuales que un hecho dejó.

Cuando estas dimensiones describen historias incompatibles, se produce una **discordancia**.

El jugador controla a **Kiru**, una joven analista del Departamento de Concordancia. Debe revisar expedientes, identificar continuidades incompatibles y emitir dictámenes que ayudan a fijar una versión de la realidad.

## Pregunta filosófica central

> ¿Qué hace que algo haya sido real: que ocurriera, que alguien lo recuerde o que haya cambiado el mundo?

## Fantasía del jugador

El jugador no es un detective omnisciente. Es un funcionario con poder institucional para transformar evidencia ambigua en una realidad oficialmente aceptable.

## Promesa emocional

Cada caso debe dejar esta sensación:

> La solución lógica era clara. Lo que no estaba claro era si debía aplicarla.

## Pilares

### 1. Investigación activa

El jugador inspecciona, marca, conecta, ordena y formula hipótesis.

### 2. Lógica antes que moral

Primero determina qué ocurrió. Después decide qué continuidad debe permanecer.

### 3. Historia común

Cada expediente avanza el misterio de Kiru, Maru, la Estación 0 y la Primera Discordancia.

### 4. Verdad incompleta

Un caso puede resolverse técnicamente sin explicar todos sus remanentes.

### 5. Interfaz diegética

La UI es el sistema oficial utilizado por Kiru: el Módulo de Contraste, conocido internamente como “la Mesa”.

## Audiencia

Jugadores que disfrutan:

- misterio;
- puzzles deductivos;
- ficción especulativa;
- historias serializadas;
- decisiones ambiguas;
- experiencias de 10–25 minutos por caso.

## Referencias funcionales, no imitativas

- investigación basada en documentos;
- puzzles de cronología;
- narrativa episódica;
- interfaces diegéticas;
- misterio juvenil en un mundo contemporáneo deteriorado.

No copiar personajes, tramas, símbolos, composiciones ni estilos específicos de ninguna obra existente.


---

# FILE: docs/WORLD_BIBLE.md

# Biblia del mundo

## La estructura de la realidad

Para que algo sea plenamente real deben concordar:

1. **Registro**
2. **Memoria**
3. **Consecuencia**

Cuando dejan de corresponder, aparecen varias continuidades posibles.

La realidad no busca verdad. Busca **coherencia**.

## Primera Discordancia

Diecisiete años antes del comienzo del juego, una zona ferroviaria quedó aislada durante once minutos.

Después existían dos historias incompatibles:

- un tren había sufrido un accidente grave;
- el tren nunca había salido de su terminal.

Los registros estabilizados indicaron que el accidente no ocurrió. Sin embargo, sobrevivieron lesiones, objetos, duelos, recuerdos y marcas de una continuidad distinta.

La corrección tardó semanas. La mayoría de las personas olvidó.

## Departamento de Concordancia

Unidad secreta dentro del Instituto de Integridad Civil.

Su función pública es resolver inconsistencias administrativas. Su función real es decidir qué continuidad debe fijarse.

### Áreas

- **Recepción:** detecta casos.
- **Contraste:** analiza expedientes.
- **Levantamiento:** inspecciona consecuencias físicas.
- **Dictamen:** selecciona continuidad.
- **Cierre:** ejecuta la resolución.
- **Custodia de Fondo:** conserva remanentes.

## Leyes del mundo

### La realidad busca coherencia, no verdad

La versión final no tiene por qué ser la original.

### Las consecuencias resisten más

Archivos digitales cambian rápido. Hábitos, cicatrices, afectos y estructuras pueden permanecer.

### Nada desaparece del todo

Toda continuidad descartada puede dejar remanentes.

### Recordar fortalece una continuidad

Los recuerdos profundos fijan más que los superficiales.

### Investigar altera

Construir una explicación coherente fortalece esa versión.

## Vocabulario

- **Discordancia:** continuidades incompatibles activas.
- **Remanente:** evidencia de una continuidad descartada.
- **Huérfano causal:** consecuencia cuya causa oficial ya no existe.
- **Doble trazo:** persona con dos biografías documentadas.
- **Desalineado:** identidad que pierde correspondencia con su versión oficial.
- **Fondo:** capa resistente de la realidad.
- **Deriva:** distancia entre continuidades.
- **Costura:** explicación artificial que une evidencias incompatibles.
- **Blanco:** lugar sin continuidad dominante.
- **Fijar:** fortalecer una continuidad.
- **Cerrar:** permitir que una continuidad absorba las demás.
- **Caer del registro:** desaparecer administrativamente antes de desaparecer físicamente.

## Estado del mundo

No es un apocalipsis.

Las ciudades funcionan, pero el mundo está fatigado:

- infraestructura para habitantes que ya no existen;
- edificios con distribuciones contradictorias;
- rutas que terminan en zonas clausuradas;
- casas vacías con consumos activos;
- servicios asociados a personas ausentes.

La sociedad aprendió a responder:

> Debe ser un error de archivo.

## Tipos de zona

### Estable

Normalidad administrada.

### Fatigada

Varias correcciones superpuestas.

### Blanco

La causalidad y la identidad dejan de ser confiables.

## Facciones

### La Mesa

Defiende una continuidad compartida y administrable.

> Una verdad inhabitable no puede sostener un mundo.

### Custodia de Fondo

Cree que toda vida descartada debe conservar testigos.

> Lo que fue amado no puede reducirse a un error.

### La Intemperie

Acepta la coexistencia de identidades y recuerdos incompatibles.

> La contradicción no destruye a las personas. Obligar a elegir sí.

### Los Restituyentes

Intentan recuperar personas y acontecimientos borrados. Cada restitución desplaza otras vidas.

## Tema central

La amenaza no es una máquina del tiempo. Es la resistencia humana a aceptar una pérdida irreversible.

Corregir el dolor de una persona puede borrar la realidad de otra.


---

# FILE: docs/CHARACTERS.md

# Personajes principales

## Kiru

- Mujer.
- 19–20 años.
- Analista recién incorporada al Departamento de Concordancia.
- No utiliza apellido.
- “Kiru” es el único nombre que aparece igual en todos sus expedientes.
- No existen documentos verificables de sus primeros siete años.
- Fue criada por Noa, aunque los registros difieren sobre el vínculo.
- Inteligente, curiosa, funcional, desafiante.
- Tiende a convertir problemas emocionales en problemas intelectuales.
- No debe parecer frágil ni permanentemente melancólica.
- Cree inicialmente que aquello que no recuerda no debería dolerle.

### Pregunta personal

> ¿Tiene menos valor una vida si fue creada para corregir un error?

### Diseño visual

- cabello corto, práctico e irregular;
- chaqueta institucional heredada o alterada;
- bolso cruzado;
- libreta y grabadora;
- ropa reparada;
- silueta compacta;
- expresión observadora;
- un pequeño acento cromático asociado a su continuidad desconocida.

## Maru

- Hombre.
- 21 años.
- Agrimensor de campo.
- Más experimentado que Kiru.
- Delgado y resistente, no heroico.
- Memoria espacial excepcional.
- Dificultad para fijar rostros con precisión.
- Reconoce personas por postura, voz y movimiento.
- Práctico, reservado y aparentemente obediente.
- Confía en consecuencias materiales más que en testimonios.
- Al inicio acepta cierres duros si la evidencia física lo justifica.

### Pregunta personal

> ¿Una relación puede ser una consecuencia aunque no pueda medirse?

### Diseño visual

- ropa de terreno;
- mochila de instrumentos;
- cámara, cinta métrica y mapas;
- prendas ordenadas y funcionales;
- postura contenida;
- observa primero el espacio y luego a las personas.

## Dinámica Kiru–Maru

- Kiru confía en la memoria.
- Maru confía en la consecuencia.
- El Departamento confía en el registro.

Sus nombres tienen una simetría deliberada. Oficialmente no se conocían antes de entrar al Departamento, pero aparecen juntos en evidencia de hace diecisiete años.

Su vínculo no debe plantearse inicialmente como romance. Se convierten progresivamente en testigos de la existencia del otro.

## Noa

- Figura materna de Kiru.
- En algunas continuidades es su madre.
- En otras, trabajadora social.
- En otras, murió antes del nacimiento de Kiru.
- Su presencia debe ser emocionalmente importante, pero no explicarse por completo en el prólogo.

## Ena Var

- 56 años.
- Protagonista del Caso 0.
- Recuerda veinte años de matrimonio con Toma.
- Legalmente soltera.
- Clara, funcional y emocionalmente contenida.
- No debe presentarse como una persona confundida.

## Toma Narel

- Esposo de Ena en una continuidad descartada.
- Tomaba el tren de las 07:14.
- Ya no posee identidad oficial.
- Mantiene consecuencias domésticas y afectivas.
- Es un huérfano causal.


---

# FILE: docs/ART_DIRECTION.md

# Dirección de arte v0.1

## Tesis visual

> Un mundo contemporáneo que ha sido corregido demasiadas veces.

Debe sentirse habitable, pero nunca completamente seguro.

## Tono

No es:

- cyberpunk;
- posapocalipsis exuberante;
- distopía negra permanente;
- fantasía paranormal decorativa.

Sí es:

- normalidad institucional;
- deterioro silencioso;
- infraestructura agotada;
- humedad;
- espacios parcialmente ocupados;
- tensión por ausencia;
- belleza puntual convertida en evidencia.

## Mundo

### Ciudad

- capital costera, densa y sísmica;
- hormigón manchado;
- edificios públicos de distintas décadas;
- estaciones;
- pasos bajo nivel;
- hospitales;
- archivos;
- señalética superpuesta;
- cielos nublados o blancos;
- calles húmedas;
- menos habitantes de los que la infraestructura sugiere.

### Departamento

- muros repintados;
- fluorescentes;
- archivadores metálicos;
- computadores relativamente modernos conectados a sistemas viejos;
- cintas magnéticas;
- sellos;
- formularios;
- cableado agregado;
- espacios de seguridad sin espectacularidad.

### Zonas fatigadas

La anomalía se comunica mediante errores de correspondencia:

- habitaciones con proporciones apenas incorrectas;
- marcas de uso en puertas clausuradas;
- sombras sin origen;
- espacio reservado para objetos ausentes;
- letreros duplicados;
- muebles de continuidades distintas;
- materiales reparados alrededor de algo que ya no existe.

## Paleta

### Base

- gris cemento;
- blanco envejecido;
- carbón;
- verde institucional apagado;
- azul acero;
- marrón húmedo.

### Semántica

- Registro: azul grisáceo.
- Memoria: ámbar sucio.
- Consecuencia: verde mineral.
- Remanente/discordancia: rojo óxido.
- Blanco: reducción de contraste y pigmento.

El color no puede ser el único identificador.

## Iluminación

- fluorescentes duros;
- exteriores nublados;
- lámparas domésticas cálidas y aisladas;
- túneles iluminados por sectores;
- sombras que comienzan o terminan incorrectamente.

Evitar usar oscuridad como sustituto de tensión.

## UI

La interfaz debe sentirse impresa y material.

Elementos:

- bandejas;
- capas de papel;
- sellos;
- fichas;
- presión;
- sobreimpresión;
- líneas incompletas;
- espacios vacíos;
- duplicación discreta.

No usar:

- glow;
- neón;
- glitch RGB;
- partículas tecnológicas;
- paneles transparentes flotantes;
- gráficos de ciencia ficción.

## Tipografía

- sans serif institucional para navegación;
- serif sobria o monoespaciada moderada para documentos;
- manuscrita solo para notas personales.

## Movimiento

- deslizamiento de documentos;
- apertura de bandejas;
- presión de sellos;
- capas que se alinean;
- pequeñas demoras en elementos discordantes.

Nada debe rebotar o sentirse juguetón.

## Sonido

- papel;
- cinta;
- metal;
- teclas;
- motores pequeños;
- fluorescentes;
- sello seco;
- duplicación sutil de un sonido para indicar discordancia.

## Referencia tonal

Puede tomar como inspiración general:

- protagonistas jóvenes en entornos demasiado viejos;
- ropa funcional;
- extrañeza cotidiana;
- paisajes contemporáneos deteriorados;
- contraste entre calma y amenaza.

No replicar directamente estilo visual, diseño de personajes, encuadres o identidad de ninguna obra existente.

## Briefs de arte requeridos para la v0.1

1. Kiru, cuerpo completo y tres expresiones.
2. Maru, cuerpo completo y tres expresiones.
3. Oficina del Departamento.
4. Cocina de Ena.
5. Estación 0.
6. Una imagen de cámara analógica de la cocina.
7. Fotografía de Kiru y Maru niños en la estación.

Para el prototipo pueden utilizarse placeholders sobrios. No bloquear la implementación por ausencia de arte final.


---

# FILE: docs/GAMEPLAY_GRAMMAR.md

# Gramática de gameplay

## Ciclo principal

1. Recibir objetivo.
2. Revisar evidencia.
3. Extraer afirmaciones.
4. Clasificar las afirmaciones.
5. Contrastar.
6. Crear observaciones.
7. Reconstruir secuencia.
8. Validar hipótesis.
9. Emitir dictamen.
10. Observar consecuencias.

## Unidad jugable: afirmación

El jugador no conecta documentos completos. Extrae afirmaciones concretas.

Ejemplo:

Documento: registro civil de Ena.

Afirmación:

> Ena figura como soltera desde su nacimiento.

## Categorías

### Registro

Datos oficialmente reconocidos.

Icono sugerido: cuadrado estructurado.

### Memoria

Recuerdos, testimonios y relatos.

Icono sugerido: onda o línea irregular.

### Consecuencia

Huellas físicas, conductuales o afectivas.

Icono sugerido: círculo incompleto.

### Remanente

Estado adicional aplicable a cualquier categoría.

Representación: doble impresión desplazada.

## Inspección

Tipos iniciales:

- documento;
- fotografía;
- escena estática;
- audio;
- secuencia temporal.

Acciones:

- tocar hotspot;
- ampliar;
- cambiar cara del documento;
- seleccionar fragmento;
- escuchar intervalo;
- elegir formulación de una afirmación.

## Contraste

El jugador selecciona 2–3 afirmaciones y define su relación:

- coinciden;
- se contradicen;
- una deja huella en otra.

El motor valida la combinación y puede producir:

- comentario;
- observación débil;
- observación firme;
- discordancia confirmada.

## Observaciones

Una observación es una conclusión construida por el jugador.

No es evidencia original.

Estados:

- débil;
- firme;
- discordancia confirmada.

## Secuencia

Eventos ordenables verticalmente.

En casos complejos, pueden separarse en dos continuidades.

El punto de divergencia se denomina **corte**.

## Hipótesis

Las hipótesis se desbloquean por observaciones.

Para validarlas, el jugador llena slots semánticos:

- registro;
- memoria;
- consecuencia;
- anomalía no resuelta.

Estados:

- insuficiente;
- compatible;
- viable;
- dominante;
- inestable.

## Dictamen

La conclusión técnica no depende de la decisión moral.

Después de construir una hipótesis dominante, el jugador elige qué continuidad fijar.

No usar puntuaciones de moralidad, empatía o estabilidad en pantalla.

## Feedback

### Correcto

- sello seco;
- vibración breve;
- la observación queda visualmente impresa.

### Incorrecto

No quitar vidas ni puntos.

Maru o Kiru explican por qué la relación no es concluyente.

### Discordancia

- sonido duplicado;
- pequeño desfase;
- doble impresión.

## Dificultad

El prólogo debe ser guiado.

No presentar más de:

- 6 evidencias;
- 8 afirmaciones activas;
- 4 observaciones necesarias;
- 1 hipótesis dominante;
- 2 dictámenes.

## Regla narrativa

Toda mecánica debe tener sentido dentro de la institución.

No añadir minijuegos abstractos sin relación con inspección, contraste o fijación.


---

# FILE: docs/UI_SPEC.md

# Especificación de interfaz

## Plataforma

Mobile vertical.

## Navegación principal durante un caso

Barra inferior:

1. **Caso**
2. **Evidencias**
3. **Contraste**
4. **Dictamen**

El dictamen permanece bloqueado hasta validar una hipótesis dominante.

## Barra superior

Mostrar:

- código del expediente;
- fatiga;
- deriva.

Ejemplo:

`07-14-C · FATIGA D2 · DERIVA +11:00`

## Pantalla Caso

Componentes:

- ficha administrativa;
- sujeto;
- ubicación;
- motivo;
- objetivo actual;
- notas de campo;
- progreso narrativo discreto.

## Pantalla Evidencias

Lista vertical.

Cada elemento muestra:

- código;
- tipo;
- fuente;
- estado.

Estados:

- sin revisar;
- revisada;
- contiene marca;
- alterada;
- incompatible.

### Visor de evidencia

Debe ocupar la mayor parte de la pantalla.

Permitir:

- hotspots;
- selección de fragmentos;
- reverso;
- reproducción de audio;
- elección de formulación de afirmación.

## Pantalla Contraste

Tres bandejas verticales:

- Registro
- Memoria
- Consecuencia

El jugador selecciona afirmaciones y abre una bandeja inferior para elegir relación.

No usar canvas libre.

### Observaciones

Separadas visualmente de las afirmaciones.

Deben sentirse “selladas” después de validarse.

### Secuencia

Lista reordenable.

Para la vertical slice basta una secuencia lineal.

## Pantalla Hipótesis

Puede vivir dentro de Contraste.

Presenta:

- nombre;
- descripción;
- slots;
- estado;
- anomalía no resuelta.

## Pantalla Dictamen

Documento limpio.

Primero muestra conclusión técnica.

Después presenta dos continuidades con consecuencias explícitas.

No presentar la decisión como bien/mal.

## Minuto sin registro

Al seleccionar un dictamen:

- suspender cabecera;
- retirar códigos de identidad;
- reducir UI;
- permitir cancelar;
- mostrar botón de mantener presionado: `FIJAR CONTINUIDAD`.

Duración en prototipo: 8 segundos.

## Pantalla fuera del caso

No es prioritaria para la primera entrega.

Si se implementa, debe mostrar:

- Bandeja;
- Archivo;
- Anclas;
- Custodia bloqueada.

## Accesibilidad

- controles táctiles mínimos de 44 px;
- contraste suficiente;
- iconos además de color;
- texto ajustable;
- subtítulos para audio;
- vibración opcional;
- soporte de lector de pantalla en acciones principales.

## Layout base

Diseñar para:

- ancho objetivo: 390 px;
- alto objetivo: 844 px;
- ancho mínimo: 320 px.

Evitar scroll horizontal.


---

# FILE: docs/CASE_00.md

# Caso 0 — El pasajero de las 07:14

## Objetivo

Introducir:

- Kiru;
- Maru;
- las tres anclas;
- registro, memoria y consecuencia;
- inspección;
- contraste;
- hipótesis;
- dictamen;
- consecuencia;
- misterio de Estación 0.

## Duración de la vertical slice

10–15 minutos.

## Secuencia

### 1. Las tres anclas

Kiru declara:

1. una ancla corporal elegida por el jugador;
2. `Noa me crió`;
3. `Volveré a la estación`.

La tercera aparece sola.

Diálogo:

**Kiru:** Yo no escribí eso.  
**Maru:** ¿Es tu letra?  
**Kiru:** Sí.  
**Maru:** Entonces guárdalo.

### 2. Briefing

Expediente `07-14-C`.

Ena Var reconoce como conviviente a Toma Narel.

No existe registro de Toma.

Ena afirma que él toma el tren de las 07:14.

La línea nunca funcionó.

### 3. Evidencias de la slice

#### E-01 — Declaración de Ena

Afirmaciones disponibles:

- `Ena recuerda veinte años de matrimonio con Toma.` — Memoria
- `Toma sale cada mañana a las 07:14.` — Memoria
- `Ena no puede fijar el rostro de Toma cuando él no está.` — Memoria

#### E-02 — Registro civil

Afirmaciones:

- `Ena figura como soltera desde su nacimiento.` — Registro
- `El documento conserva la presión de una línea eliminada.` — Registro + Remanente

#### E-03 — Mesa de desayuno

Hotspots:

- taza de té;
- taza de café;
- segunda silla.

Afirmaciones:

- `Una segunda taza fue utilizada recientemente.` — Consecuencia
- `Ena no consume café.` — Memoria
- `La segunda silla fue desplazada esta mañana.` — Consecuencia

#### E-04 — Cámara de arrastre

Fotogramas:

- 07:09: Ena sola;
- 07:12: segunda sombra;
- 07:14: habitación vacía;
- 07:15: Ena vuelve sin la segunda taza.

Afirmaciones:

- `Una sombra aparece sin un cuerpo que la produzca.` — Consecuencia
- `La habitación fue registrada vacía durante el paso del tren.` — Registro
- `La segunda taza desaparece durante el intervalo.` — Consecuencia

#### E-05 — Grabación de cinta

Transcripción:

> ¿Dormiste bien?  
> Te dejé el café donde siempre.  
> No, hoy no voy contigo.  
> Ya sé.  
> No vuelvas a traerla aquí.

Afirmaciones:

- `Ena mantiene una conversación con pausas compatibles con respuestas.` — Consecuencia
- `La cinta contiene la frase: “Kiru todavía no debe subir”.` — Remanente

### 4. Contrastes obligatorios

#### C-01

- `Ena figura como soltera desde su nacimiento.`
- `Ena recuerda veinte años de matrimonio con Toma.`

Relación: contradicción.

Observación:

> La memoria afectiva de Ena y su biografía oficial describen continuidades incompatibles.

#### C-02

- `Una segunda taza fue utilizada recientemente.`
- `Ena no consume café.`

Relación: huella.

Observación:

> La rutina doméstica contiene consecuencias atribuibles a una segunda persona.

#### C-03

- `La habitación fue registrada vacía durante el paso del tren.`
- `La segunda taza desaparece durante el intervalo.`

Relación: coincidencia causal.

Observación:

> Durante las 07:14, la cámara registró una versión distinta de la habitación.

#### C-04

- `El documento conserva la presión de una línea eliminada.`
- `Ena recuerda veinte años de matrimonio con Toma.`
- `Una segunda taza fue utilizada recientemente.`

Relación: discordancia.

Observación:

> La identidad de Toma fue eliminada del registro, pero permanece en memoria y consecuencia.

### 5. Secuencia

Orden:

1. Ena prepara dos desayunos.
2. La segunda silla se desplaza.
3. Aparece una segunda sombra.
4. Se escucha el tren.
5. La habitación queda vacía.
6. Ena reaparece sin la segunda taza.

### 6. Hipótesis

#### Incorrecta: invención de Ena

No explica consecuencias independientes.

#### Incorrecta: intruso

No explica desaparición ni ausencia de identidad.

#### Parcial: copia temporal creada por Ena

No explica registros físicos anteriores.

#### Dominante

> Toma perteneció a una continuidad ferroviaria descartada y permanece como huérfano causal.

Slots:

- Registro: presión de línea eliminada.
- Memoria: veinte años de matrimonio.
- Consecuencia: segunda taza utilizada.
- Anomalía: voz que menciona a Kiru.

### 7. Conclusión técnica

> Toma Narel perteneció a una continuidad descartada asociada al servicio ferroviario de las 07:14.

### 8. Dictámenes

#### A — Cierre de concordancia

- retirar objetos;
- debilitar el recuerdo de Ena;
- clausurar manifestación;
- reducir estabilidad ferroviaria.

Consecuencia:

Ena prepara una sola taza y pregunta si Kiru venía acompañada. Durante unos segundos no percibe a Maru.

#### B — Estabilización residual

- conservar ritual;
- reconocer identidad residual;
- mantener observación;
- fortalecer línea ferroviaria.

Consecuencia:

Toma aparece como silueta y dice:

> Esta vez no subas sola.

### 9. Epílogo

Maru entrega una fotografía.

Kiru y Maru aparecen como niños en Estación 0.

Reverso:

> Traslado 0  
> Sujetos estabilizados: 2  
> Destino administrativo: pendiente

Después la imagen cambia y Kiru desaparece.

Ancla final:

`Noa me crió` cambia por `Maru me encontró`.

El jugador no puede corregirla.


---

# FILE: docs/CONTENT_SCHEMA.md

# Esquema de contenido

## Objetivo

Permitir crear nuevos casos sin modificar componentes centrales.

## Entidades principales

- Case
- Evidence
- Hotspot
- Claim
- ContrastRule
- Observation
- TimelineEvent
- Hypothesis
- Verdict
- Dialogue
- AnchorMutation

## Tipos sugeridos

```ts
export type ClaimCategory = "record" | "memory" | "consequence";

export type EvidenceType =
  | "document"
  | "image"
  | "scene"
  | "audio"
  | "sequence";

export interface Claim {
  id: string;
  evidenceId: string;
  text: string;
  category: ClaimCategory;
  remnant?: boolean;
  unlockCondition?: Condition;
}

export interface Evidence {
  id: string;
  code: string;
  title: string;
  type: EvidenceType;
  source?: string;
  asset?: string;
  description?: string;
  hotspots?: Hotspot[];
  claims: Claim[];
}

export interface ContrastRule {
  id: string;
  requiredClaimIds: string[];
  relation: "supports" | "contradicts" | "leaves_trace";
  observationId: string;
  feedbackIncorrect?: string;
}

export interface Observation {
  id: string;
  text: string;
  strength: "weak" | "firm" | "discordance";
}

export interface TimelineEvent {
  id: string;
  time?: string;
  text: string;
  correctIndex: number;
}

export interface Hypothesis {
  id: string;
  title: string;
  description: string;
  status: "insufficient" | "compatible" | "viable" | "dominant" | "unstable";
  requiredObservationIds: string[];
  slots: HypothesisSlot[];
}

export interface Verdict {
  id: string;
  title: string;
  description: string;
  consequences: string[];
  endingSceneId: string;
}

export interface GameCase {
  id: string;
  code: string;
  title: string;
  initialTitle?: string;
  fatigue: string;
  initialDrift: string;
  objectives: Objective[];
  evidence: Evidence[];
  contrastRules: ContrastRule[];
  observations: Observation[];
  timeline?: TimelineEvent[];
  hypotheses: Hypothesis[];
  verdicts: Verdict[];
}
```

## Estado de sesión

```ts
export interface CaseProgress {
  caseId: string;
  reviewedEvidenceIds: string[];
  unlockedClaimIds: string[];
  selectedClaimIds: string[];
  unlockedObservationIds: string[];
  timelineOrder: string[];
  validatedHypothesisId?: string;
  selectedVerdictId?: string;
  currentObjectiveId: string;
  anchorValues: Record<string, string>;
  completed: boolean;
}
```

## Condiciones

El motor debe soportar inicialmente:

- evidenceReviewed;
- claimUnlocked;
- observationUnlocked;
- timelineCompleted;
- hypothesisValidated;
- verdictSelected.

No construir un lenguaje complejo de reglas. Usar condiciones declarativas simples.


---

# FILE: docs/TECHNICAL_ARCHITECTURE.md

# Arquitectura técnica

## Stack

- Expo
- React Native
- TypeScript
- Expo Router
- Zustand o reducer central
- AsyncStorage
- Jest
- React Native Testing Library

## Estructura sugerida

```text
/app
  _layout.tsx
  index.tsx
  case/[caseId]/
    _layout.tsx
    overview.tsx
    evidence.tsx
    contrast.tsx
    verdict.tsx

/src
  /components
    /case
    /evidence
    /contrast
    /dialogue
    /shared
  /domain
    caseEngine.ts
    contrastEngine.ts
    hypothesisEngine.ts
    progressionEngine.ts
    types.ts
  /store
    useGameStore.ts
  /content
    case-00.ts
  /theme
    colors.ts
    typography.ts
    spacing.ts
    motion.ts
  /utils
  /tests

/assets
  /case-00
  /audio
  /fonts
```

## Separación de responsabilidades

### Componentes

Solo presentación e interacción.

### Motores de dominio

Funciones puras para:

- validar contrastes;
- desbloquear observaciones;
- validar cronología;
- calcular hipótesis disponibles;
- avanzar objetivos.

### Store

Persistir:

- progreso;
- anclas;
- dictamen;
- flags de escena.

### Contenido

Texto, evidencia, reglas y diálogos.

## Navegación

Expo Router.

Durante el caso, mantener barra inferior persistente.

El epílogo puede ocultar la navegación.

## Persistencia

AsyncStorage.

Guardar después de:

- revisar evidencia;
- extraer afirmación;
- desbloquear observación;
- completar secuencia;
- validar hipótesis;
- elegir dictamen.

## Testing mínimo

### Unitario

- contraste correcto;
- contraste incompleto;
- desbloqueo de observación;
- validación de hipótesis;
- secuencia correcta;
- progreso después del dictamen.

### UI

- navegación entre tabs;
- abrir evidencia;
- marcar hotspot;
- seleccionar afirmación;
- crear observación;
- desbloquear dictamen.

## Rendimiento

- assets locales;
- audio comprimido;
- evitar listas pesadas;
- evitar animaciones complejas;
- no utilizar WebView.

## Analytics

No implementar analytics externos.

Durante pruebas, puede existir un logger local en desarrollo.

## Configuración

Crear scripts:

- `start`
- `android`
- `ios`
- `web`
- `lint`
- `typecheck`
- `test`

## Estado de desarrollo

Incluir un menú solo en modo development para:

- reiniciar caso;
- desbloquear todas las evidencias;
- saltar a dictamen;
- cambiar resultado;
- borrar almacenamiento.


---

# FILE: docs/ACCEPTANCE_CRITERIA.md

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


---

# FILE: docs/IMPLEMENTATION_PLAN.md

# Plan de implementación

## Fase 1 — Esqueleto

Objetivo: navegación y sistema visual.

Entregar:

- proyecto Expo;
- tema;
- navegación;
- barra superior;
- tabs;
- mocks de Caso, Evidencias, Contraste y Dictamen.

No implementar lógica compleja.

## Fase 2 — Evidencias

Entregar:

- lista;
- visor;
- hotspots;
- selección de formulación;
- estado revisado;
- store local;
- persistencia.

## Fase 3 — Contraste

Entregar:

- bandejas;
- selección;
- relaciones;
- motor de validación;
- observaciones;
- feedback de Kiru/Maru.

## Fase 4 — Secuencia e hipótesis

Entregar:

- reordenamiento;
- validación;
- slots;
- hipótesis dominante;
- desbloqueo de dictamen.

## Fase 5 — Dictamen y epílogo

Entregar:

- dos opciones;
- consecuencias;
- minuto sin registro;
- hold to confirm;
- escenas finales;
- mutación de ancla.

## Fase 6 — Pulido

Entregar:

- sonidos;
- vibración;
- transiciones;
- accesibilidad;
- test en tamaños;
- pruebas;
- limpieza.

## Revisión al cierre de cada fase

Codex debe informar:

1. archivos creados o modificados;
2. decisiones tomadas;
3. comandos ejecutados;
4. pruebas realizadas;
5. limitaciones;
6. siguiente paso sugerido.

No avanzar automáticamente a otra fase sin revisar la anterior.


---

# FILE: docs/CODEX_PROMPTS.md

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
