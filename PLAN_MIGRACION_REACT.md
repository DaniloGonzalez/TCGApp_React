# Plan de migración de TCG App a React

Fecha: 19 de octubre de 2026.

Estado: planificación. Este documento no significa que la aplicación ya se haya migrado, probado o subido al nuevo repositorio.

## 1. Objetivo y fuentes

Migrar la aplicación actual a React, conservar su diseño y completar un CRUD local de torneos con JavaScript. Trabajar en una copia independiente destinada a https://github.com/DaniloGonzalez/TCGApp_React. Dejar la configuración y ejecución de pruebas para la última etapa de desarrollo.

Fuentes revisadas:

- `DSY1104 Evaluación Parcial 2 - Anexo 1 Instrucciones.pdf`: páginas 1–2, requisitos de migración, datos JS, CRUD, persistencia, responsividad e interactividad; página 11, pruebas; página 12, entregables.
- `DSY1104 Evaluación Parcial 2_EE_EP_Estudiante.pdf`: páginas 3–4, Vite, componentes, pruebas y documentación; páginas 6–9, rúbrica y presentación.
- `MIGRACION_A_REACT.md`: diagnóstico, componentes, rutas, estilos y ejemplos de implementación. El archivo encontrado tiene extensión `.md`, no `.cd`.
- Código existente en `pages/`, `js/script.js`, `css/stylesheet.css` y `assets/`.

Los PDF se usan como requisitos académicos. Las decisiones de alcance siguientes responden a la solicitud del usuario: CRUD local, Spring Boot postergado, pruebas al final y repositorio separado.

## 2. Alcance y ajustes a la guía anterior

| Tema | Decisión para esta migración |
| --- | --- |
| Tecnología | React, Vite, JavaScript/JSX, React Router y CSS existente. |
| CRUD | Implementar crear, leer, editar y eliminar torneos desde el panel administrador. Actualmente no existe un CRUD funcional que se pueda trasladar directamente. |
| Datos | Arreglos iniciales en archivos JS y funciones JS de persistencia con `localStorage`. |
| Backend | No implementar Spring Boot, endpoints, base de datos remota ni autenticación de servidor en esta etapa. |
| Registro | Conservar la simulación con validación de la guía: informar que no crea una cuenta. El CRUD requerido se demuestra con torneos. |
| Login | Mantener las dos cuentas demo y guardar solo el perfil de sesión en `sessionStorage`. |
| Diseño | Conservar identidad visual, imágenes, textos y CSS; mejorar adaptación a móvil. |
| Nuevas vistas | Agregar detalle de torneo y formulario de creación/edición para completar el flujo. |
| Pruebas | Son obligatorias para la evaluación; configurarlas y desarrollarlas después de las funcionalidades. |

La guía anterior excluye el CRUD y deja «Crear torneo» y «Ver detalles» deshabilitados. Esas decisiones se reemplazan por flujos funcionales. Sus ejemplos de código sirven como base, pero no deben copiarse sin estos ajustes.

Los ejemplos de tienda, carrito, checkout y ofertas del anexo son propuestas de ampliación. Se conserva el dominio de torneos TCG; no se añade comercio electrónico por defecto. No se recibieron observaciones particulares del profesor ni un ERS previo: si existen, incorporarlos antes de cerrar el alcance académico.

El código tendrá un nivel adecuado para un proyecto de estudiante: funciones pequeñas, nombres claros, componentes funcionales, `useState`, props y contexto solo cuando sea útil. Evitar gestores de estado adicionales, capas genéricas innecesarias y dependencias que no aporten al trabajo. Los comentarios deben explicar decisiones; la presentación debe poder explicar el código real.

## 3. Diagnóstico inicial

- Existen siete vistas HTML, cinco imágenes y una hoja de estilos común.
- No hay proyecto React ni `package.json`.
- El login referencia un archivo inexistente y el script compartido presupone que existe el formulario de login.
- Registro no tiene su propia lógica; cerrar sesión es solo un enlace.
- Existen enlaces a páginas ausentes, entre ellas crear torneo y detalle.
- Torneos y ranking están escritos directamente en HTML.
- `MIGRACION_A_REACT.md` está sin seguimiento de Git: conservarlo y copiarlo explícitamente al preparar el nuevo proyecto.
- El remoto actual apunta a `DaniloGonzalez/TCGApp`. El repositorio destino `DaniloGonzalez/TCGApp_React` existe, es público y reportó tamaño 0 en la consulta. Revisar sus ramas y contenido nuevamente antes de la primera subida.

## 4. Etapas de implementación

### Etapa 1. Preparar la copia y React

1. Crear una carpeta de trabajo independiente para `TCGApp_React`; conservar intacto el proyecto original.
2. Revisar el contenido remoto. Si está vacío, preparar la copia del historial del proyecto original y configurar el remoto de esa copia hacia `TCGApp_React`. Si contiene cambios, partir del destino e incorporar el original sin sobrescribir su historial.
3. Copiar explícitamente la guía de migración y este plan, ya que los archivos sin seguimiento no se trasladan mediante un clon de Git.
4. Crear `frontend/` con la plantilla React/JavaScript de Vite. Verificar compatibilidad de Node y dependencias al instalar; conservar el lockfile.
5. Conservar `pages/`, `css/`, `js/` y `assets/` originales como referencia, identificados como versión anterior en el README.
6. Configurar `.gitignore` para excluir dependencias, compilación, cobertura generada y archivos locales de entorno.

Resultado: proyecto independiente con una aplicación React base y destino Git correcto. No cambiar el remoto del proyecto original ni usar push forzado.

### Etapa 2. Migrar estructura visual y navegación

1. Copiar las cinco imágenes a `frontend/src/assets/` y adaptar el CSS a `src/styles/global.css`.
2. Crear `MainLayout`, `Navbar`, `Footer`, `Hero`, `TournamentCard` y `RankingTable`.
3. Convertir HTML a JSX, sustituyendo clases, etiquetas y eventos según corresponda.
4. Configurar rutas y navegación con `Link`/`NavLink`, evitando enlaces internos a archivos HTML.
5. Migrar inicio, torneos y ranking. Mantener los tres destacados, tres torneos y cinco filas de ranking originales como datos iniciales.

Resultado: las vistas públicas conservan su contenido y usan componentes reutilizables con props.

### Etapa 3. Crear la fuente de datos y persistencia local

1. Extraer los datos iniciales a módulos JS: `torneos.js`, `destacados.js`, `ranking.js` y `usuariosDemo.js`.
2. Crear `torneosService.js` con funciones `obtenerTorneos`, `obtenerTorneoPorId`, `crearTorneo`, `actualizarTorneo` y `eliminarTorneo`.
3. Guardar la lista en `localStorage` con la clave `tcgapp.torneos`. Usar los datos iniciales solo si no existe un almacenamiento válido; una lista vacía es válida y no debe repoblarse al recargar.
4. Mantener IDs estables y únicos. Al editar, conservar el ID; ante un ID inexistente, mostrar un resultado controlado.
5. Manejar JSON inválido o fallos de almacenamiento sin dejar la pantalla en blanco. Si no se puede guardar, informar el problema y no anunciar éxito persistente.
6. Mantener el listado en estado React y actualizarlo tras cada operación. Las vistas que se abran después deben leer el estado persistido actualizado.

Modelo del torneo: `id`, `nombre`, `descripcion`, `juego`, `fecha`, `formato`, `inscritos`, `cupo` y `estado`. Conservar las fechas como `YYYY-MM-DD` y mostrarlas sin desplazamientos de zona horaria.

Los destacados originales son contenido separado del catálogo, como establece la guía. No enlazarlos a IDs supuestos: pueden dirigir al listado general. El ranking queda de solo lectura con sus valores originales; no se inventa una fórmula de puntos.

Resultado: operaciones CRUD locales reutilizables, independientes del JSX. Los datos solo pertenecen a ese navegador y origen; no se comparten entre equipos.

### Etapa 4. Migrar formularios, sesión y roles

1. Implementar login con inputs controlados, validación y mensajes de error.
2. Mantener `admin@tcgapp.cl` / `admin123` y `user@tcgapp.cl` / `user123` como cuentas de demostración.
3. Crear contexto de autenticación y una guarda de rutas. Guardar en `sessionStorage` únicamente ID, nombre, correo y rol.
4. Redirigir cada cuenta a su panel. Un visitante va al login y un rol incorrecto vuelve a su propio panel.
5. Implementar cierre de sesión que limpie el contexto y la persistencia.
6. Migrar registro con nombre no vacío, correo válido, campos obligatorios y contraseñas coincidentes. Mostrar explícitamente que es una validación de demostración y que no se creó una cuenta.

Resultado: formularios React funcionales, sesión recuperable y paneles diferenciados. Las guardas son una simulación de navegación; no equivalen a autorización de servidor.

### Etapa 5. Completar el CRUD y la interactividad

1. Mostrar una tabla de torneos en administración con acciones de crear, editar y eliminar.
2. Reutilizar `TorneoForm` para creación y edición, pasando datos iniciales y una función de guardado mediante props.
3. Validar nombre, juego, descripción, formato, fecha y estado; cupo entero positivo e inscritos enteros entre cero y el cupo. No invalidar automáticamente los datos históricos de ejemplo por su fecha.
4. Confirmar la eliminación indicando el torneo y permitir cancelarla.
5. Reflejar los cambios en el listado público y mantenerlos al recargar.
6. Crear detalle por ID y un mensaje cuando el torneo no exista o haya sido eliminado.
7. Agregar búsqueda por nombre y filtro por juego con un mensaje cuando no haya resultados.

Resultado: CRUD completo y visible. El jugador consulta torneos; las operaciones administrativas se presentan solo en el panel administrador.

### Etapa 6. Terminar presentación y documentación funcional

1. Ajustar navegación, tarjetas, formularios y tablas para móvil, tablet y escritorio.
2. Añadir etiquetas, textos alternativos, foco visible y mensajes asociados a campos.
3. Preparar README con instalación, ejecución desde `frontend/`, cuentas demo, estructura y límites del almacenamiento local.
4. Preparar ERS V2 con requisitos, roles, reglas del CRUD, flujos y límites reales. Si aparece un ERS anterior, actualizarlo en vez de sustituirlo sin revisión.
5. Preparar el guion de presentación: página original frente a componente React, props, estado, formulario, CRUD y persistencia.
6. Dejar definida la configuración de despliegue de la SPA y su directorio de compilación. El anexo recomienda Vercel; elegirlo como destino propuesto y configurar retorno a `index.html` para las rutas internas.

Resultado: funcionalidades y documentación listas para la etapa final de pruebas. Todavía no afirmar resultados de pruebas ni cobertura.

### Etapa 7. Pruebas y validación final

Esta es la última etapa de desarrollo. Recién aquí configurar Vitest, React Testing Library, entorno DOM y cobertura compatibles con las dependencias instaladas.

El anexo exige un mínimo de diez pruebas y al menos una de cada tipo: renderizado, props, estado y eventos. La rúbrica también evalúa mocks, análisis y cobertura. Se propone esta batería de pruebas de componentes:

| Nº | Caso | Evidencia principal |
| --- | --- | --- |
| 1 | Listado representa todos los torneos suministrados. | Renderizado. |
| 2 | Búsqueda sin coincidencias presenta el mensaje correspondiente. | Renderizado condicional. |
| 3 | Tarjeta muestra nombre, juego y fecha recibidos. | Props. |
| 4 | Formulario de edición recibe y muestra los valores iniciales. | Props. |
| 5 | Escribir en el formulario modifica los valores visibles. | Estado. |
| 6 | Cambiar el filtro por juego modifica los resultados. | Estado y eventos. |
| 7 | Guardar un torneo válido invoca la función recibida con sus datos. | Eventos y mock de callback. |
| 8 | Cupo inválido muestra un error y bloquea el guardado. | Validación y renderizado condicional. |
| 9 | Login incorrecto muestra error y no crea sesión. | Formulario y eventos. |
| 10 | Ruta administrativa rechaza una sesión de jugador. | Comportamiento por rol. |
| 11 | Cancelar eliminación conserva la fila. | Eventos y estado. |
| 12 | Confirmar eliminación actualiza la lista. | Eventos y mock del servicio. |

Añadir comprobaciones del servicio para crear, leer, editar, eliminar, recuperar cambios tras recarga y manejar almacenamiento inválido. Estas complementan las pruebas de componentes; no sustituyen las diez exigidas.

Usar datos aislados por prueba, limpiar el almacenamiento y restablecer mocks entre casos. Documentar qué se simula y qué comportamiento real se comprueba.

Después, ejecutar pruebas, cobertura, lint y build. Revisar manualmente navegación, login por rol, logout, registro, CRUD completo, recarga y diseño a 360 px, 768 px y escritorio. Registrar resultados reales, problemas corregidos y límites de cobertura en el informe. Los documentos no fijan un porcentaje numérico mínimo de cobertura; no inventarlo.

La página 9 de la rúbrica menciona Jasmine/Karma dentro de una celda, aunque el indicador, las instrucciones específicas y el anexo piden Vitest. Este plan sigue Vitest.

Resultado: pruebas ejecutadas, defectos corregidos e informe de cobertura sustentado en resultados reales.

## 5. Rutas previstas

| Ruta | Vista | Acceso |
| --- | --- | --- |
| `/` | Inicio | Público |
| `/torneos` | Listado con filtros | Público |
| `/torneos/:id` | Detalle de torneo | Público |
| `/ranking` | Ranking | Público |
| `/login` | Login demo | Público |
| `/registro` | Validación de registro demo | Público |
| `/jugador` | Perfil | Jugador |
| `/admin` | Panel y tabla CRUD | Administrador |
| `/admin/torneos/nuevo` | Crear torneo | Administrador |
| `/admin/torneos/:id/editar` | Editar torneo | Administrador |
| `*` | Página no encontrada | Público |

## 6. Organización propuesta

```text
TCGApp_React/
  assets/, css/, js/, pages/     # Versión original de referencia
  MIGRACION_A_REACT.md
  PLAN_MIGRACION_REACT.md
  README.md
  docs/
    ERS_V2.md
    COBERTURA_TESTING.md         # Se completa en la etapa final
  frontend/
    package.json
    package-lock.json
    index.html
    vite.config.js
    src/
      main.jsx
      App.jsx
      assets/
      styles/global.css
      components/               # Navbar, Footer, Hero, tarjetas, tabla, TorneoForm
      layouts/MainLayout.jsx
      pages/                    # Vistas públicas, paneles y formularios de torneos
      context/                  # Sesión demo
      hooks/useAuth.js
      routes/ProtectedRoute.jsx
      data/                     # Datos iniciales JS
      services/                 # torneosService y authDemoService
      utils/                    # Fechas y validaciones compartidas cuando se necesiten
      tests/                    # Se incorpora en la etapa final
```

## 7. Distribución orientativa para dos semanas

| Días de trabajo | Actividad |
| --- | --- |
| 1 | Copia independiente, remoto y Vite. |
| 2–3 | Layout, componentes y vistas públicas. |
| 4 | Datos JS y persistencia. |
| 5 | Formularios, sesión y roles. |
| 6–7 | CRUD, detalle y filtros. |
| 8 | Responsive, README, ERS y preparación de presentación. |
| 9–10 | Pruebas, correcciones, informe y cierre de entrega. |

Es una distribución propuesta, no una fecha de entrega confirmada. Mantener commits pequeños que describan cambios realmente realizados: base React, vistas, datos, sesión, CRUD, responsive y pruebas. Subir avances al repositorio destino sin fabricar historial.

## 8. Publicación y entregables

Tras la validación final, subir los cambios pendientes a `TCGApp_React`, desplegar la versión validada y comprobar apertura y recarga de rutas internas en el sitio publicado. Corregir cualquier problema encontrado antes de entregar.

- Repositorio público `DaniloGonzalez/TCGApp_React` con código y lockfile.
- Enlace público de la aplicación desplegada.
- Proyecto comprimido reproducible, excluyendo `node_modules`, `.git` y secretos locales.
- ERS actualizado a V2, exportado al formato exigido por el curso.
- Informe de pruebas con casos, mocks, resultados, cobertura y límites observados.
- README con instrucciones verificadas y usuarios demo.
- Demostración preparada: navegar, iniciar sesión, crear/editar/eliminar un torneo, recargar y explicar las pruebas.

No se considera terminada la evaluación solo con la migración visual: el cierre incluye CRUD, pruebas y documentos. Spring Boot permanece como trabajo posterior y no bloquea esta entrega local.
