# Concordancia: Estacion 0 - Assets runtime

El arte usado por el juego se conecta mediante el registro tipado en `src/assets/artRegistry.ts`.
No importes imagenes directamente desde componentes de interfaz si el asset pertenece al runtime del Caso 0.

## Agregar un nuevo personaje

1. Crear una carpeta en `assets/characters/<personaje>/`.
2. Agregar las imagenes PNG con fondo transparente.
3. Registrar el nuevo `CharacterId` en `src/assets/artRegistry.ts`.
4. Declarar cada asset con `id`, `label`, `path`, `source`, dimensiones, transparencia y `runtimeUse`.
5. Usar el nuevo personaje desde datos de escena, no desde componentes visuales.

## Agregar una nueva expresion

1. Guardar el PNG en la carpeta del personaje correspondiente.
2. Agregar la expresion al tipo del personaje en `src/assets/artRegistry.ts`.
3. Registrar el asset dentro de `characterAssets`.
4. Marcar `runtimeUse` como `available` si aun no aparece en escena.
5. Actualizar o crear datos de escena en `src/content/tutorialVisuals.ts` cuando deba aparecer.

## Agregar un nuevo fondo

1. Guardar el PNG en `assets/case-00/` o en la carpeta del caso correspondiente.
2. Agregar el id del fondo al tipo de fondos del caso.
3. Registrarlo en `case00BackgroundAssets` con dimensiones y transparencia.
4. Usarlo en escenas mediante `backgroundId`; los componentes deben recibir solo la clave tipada.

## Agregar una nueva escena

1. Crear una entrada de datos con `backgroundId`, `portraits`, `activeCharacterId`, `dialogue` y `objective`.
2. Referenciar personajes mediante `characterId` y `expression` registrados.
3. Agregar hotspots opcionales como datos, con coordenadas relativas al fondo.
4. Consumir la escena con `NarrativeScene`; no agregar decisiones narrativas dentro del componente.

## Precarga

La precarga runtime vive en `preloadTutorialAssets`. Solo debe incluir assets usados por el tutorial o inspectores activos.
No precargar referencias editoriales, hojas de direccion de arte ni material que no se use en ejecucion.
