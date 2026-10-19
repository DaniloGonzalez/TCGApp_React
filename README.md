# TCG App React

Migración de TCG App para Full Stack II. Esta copia conserva el historial y los archivos del proyecto original.

## Estado actual

Etapa 1 completada: proyecto React con Vite y JavaScript en `frontend/`, React Router instalado y dependencias registradas en `package-lock.json`.

La pantalla de React todavía corresponde a la plantilla inicial. Las páginas, el CRUD local y la sesión se implementarán en las siguientes etapas. Spring Boot queda fuera de esta entrega. Las pruebas con Vitest se incorporarán al final del desarrollo.

## Ejecutar React

Desde esta carpeta:

```powershell
cd frontend
npm ci
npm run dev
```

Abrir la dirección que indique Vite en la terminal. Para detenerlo, usar Ctrl+C.

Entorno utilizado para preparar el proyecto: Node.js 22.20.0 y npm 11.17.0.

## Comandos disponibles

Ejecutar desde `frontend/`:

```powershell
npm run dev
npm run build
npm run preview
npm run lint
```

`build` genera `frontend/dist/`; `preview` permite revisar esa compilación localmente. No hay pruebas unitarias configuradas todavía.

## Estructura

- `frontend/`: nueva aplicación React con Vite.
- `pages/`, `css/`, `js/` y `assets/`: versión HTML original, conservada como referencia.
- `MIGRACION_A_REACT.md`: guía técnica anterior.
- `PLAN_MIGRACION_REACT.md`: alcance y orden de implementación actualizados según la evaluación.

La versión original no tiene un CRUD funcional. El plan contempla implementarlo con JavaScript y localStorage en la nueva aplicación.

## Repositorios

- Original: https://github.com/DaniloGonzalez/TCGApp
- Migración: https://github.com/DaniloGonzalez/TCGApp_React

El remoto de esta copia apunta únicamente al repositorio de migración.
