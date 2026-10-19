# TCG App React

Aplicación React de TCG App para Full Stack II.

## Estado actual

La migración funcional está en desarrollo: el proyecto utiliza React con Vite, React Router y JavaScript. Incluye las vistas públicas, login y registro de demostración, paneles por rol y CRUD local de torneos mediante `localStorage`.

Spring Boot queda fuera de esta entrega. Las pruebas con Vitest se incorporarán al final del desarrollo.

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

- `frontend/`: aplicación React con Vite.
- `MIGRACION_A_REACT.md`: guía técnica anterior.
- `PLAN_MIGRACION_REACT.md`: alcance y orden de implementación actualizados según la evaluación.

La aplicación implementa el CRUD de torneos con JavaScript y `localStorage`; sus cambios pertenecen al navegador actual.

## Repositorios

- Original: https://github.com/DaniloGonzalez/TCGApp
- Migración: https://github.com/DaniloGonzalez/TCGApp_React

El remoto de esta copia apunta únicamente al repositorio de migración.
