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
