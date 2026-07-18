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
