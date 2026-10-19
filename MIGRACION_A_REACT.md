# Guía de migración de TCG App a React

Documento elaborado a partir del código del repositorio, actualizado el 16 de octubre de 2026.

La sección 14 contiene los archivos completos para copiar e implementar la versión React con datos de demostración.

## 1. Objetivo y alcance

Convertir el frontend actual de HTML, CSS y JavaScript en una aplicación React con navegación entre vistas, componentes reutilizables y estado para los formularios y la sesión de demostración. Conservar el diseño oscuro, los textos en español, las imágenes y los datos de ejemplo.

La primera entrega debe funcionar con datos locales. La conexión con Spring Boot queda como una etapa posterior: el README menciona una API desarrollada previamente, pero este repositorio no contiene su código, contrato ni configuración de acceso.

Este documento es un plan de implementación; no significa que la migración ya esté realizada.

## 2. Diagnóstico del proyecto actual

### Archivos disponibles

```text
TCGApp/
├── assets/
│   ├── tcgapp_logo.png
│   ├── tcgapp_banner.png
│   ├── torneo1.png
│   ├── torneo2.png
│   └── torneo3.png
├── css/stylesheet.css
├── js/script.js
├── pages/
│   ├── index.html
│   ├── auth/login.html
│   ├── auth/registro.html
│   ├── torneos/torneos.html
│   ├── ranking/ranking.html
│   ├── jugador/jugador.html
│   └── admin/admin.html
└── README.md
```

No hay `package.json`, dependencias de npm, pruebas automatizadas ni llamadas a una API. Las páginas repiten la navegación y el pie de página. Los torneos, el ranking y los datos de perfil están escritos directamente en HTML.

### Problemas que la migración debe resolver

| Hallazgo comprobado | Consecuencia | Acción prevista |
| --- | --- | --- |
| `login.html` carga `../../js/login.js`, pero solo existe `js/script.js`. | El formulario no ejecuta la lógica de login incluida en el repositorio. | Implementar el envío en `LoginPage.jsx`. |
| `registro.html` carga `script.js`, que busca `login-form` y llama a `addEventListener` sin comprobar si existe. | El registro provoca un error de JavaScript y no tiene lógica propia. | Implementar su propio estado, validación y envío. |
| El login solo compara dos credenciales y redirige. | No crea una sesión ni restringe el acceso a perfiles o administración. | Añadir sesión de demostración y guardas de rutas. |
| «Cerrar sesión» es un enlace al login. | No elimina ningún estado de autenticación. | Implementar una acción `logout`. |
| Hay enlaces a `torneo-detalle.html`, `perfil.html` y `crear-torneo.html`, que no existen. | Parte de la navegación termina en páginas ausentes. | Usar `/jugador` para el perfil y resolver los otros destinos según el alcance descrito abajo. |
| El README enumera `login.js` y `registro.js`, ausentes del repositorio. | La documentación no coincide con los archivos reales. | Actualizar el README al terminar la migración. |
| El párrafo del banner de login usa `hero-content`. | Repite el estilo de fondo y espaciado del contenedor. | Cambiarlo a `hero-text`. |
| El CSS usa un formulario de ancho fijo y tarjetas en una fila sin adaptación móvil. | Puede producir desbordamiento en pantallas pequeñas. | Ajustar anchos, navegación y distribución responsive. |

Las validaciones actuales son principalmente los atributos HTML `required` y `type="email"`. La confirmación de contraseña del registro todavía no se comprueba.

## 3. Tecnología propuesta

| Herramienta | Uso en esta migración |
| --- | --- |
| React con JavaScript y JSX | Convertir las páginas y gestionar el estado de la interfaz, aprovechando el lenguaje actual. |
| Vite | Crear el entorno de desarrollo y generar los archivos de producción. |
| React Router, modo declarativo | Definir las rutas y navegar entre vistas. |
| CSS existente | Mantener el aspecto visual y corregir su adaptación a pantallas pequeñas. |
| Context y hooks de React | Compartir la sesión de demostración y mantener estado local en los formularios. |
| `fetch`, en la etapa de API | Consultar Spring Boot desde módulos de servicios. |

No se necesita introducir una biblioteca de componentes ni un gestor adicional de estado para estas siete vistas.

Para crear el proyecto se utilizará la plantilla oficial React de Vite. Comprobar antes la compatibilidad de Node.js: la guía consultada indica 20.19+ o 22.12+, y advierte que algunas plantillas pueden exigir una versión superior. Elegir una versión de Node mantenida y compatible con la plantilla. [Guía oficial de Vite](https://vite.dev/guide/).

## 4. Preparación y comandos

Crear la aplicación en una nueva carpeta `frontend/` dentro del repositorio. Así se puede comparar cada vista con el original durante la migración. Los siguientes comandos son instrucciones para la futura implementación en este repositorio. El código de la sección 14 se verificó por separado en una carpeta temporal, sin crear todavía `frontend/` aquí.

Desde la raíz `TCGApp`, en PowerShell:

```powershell
node --version
npm --version
npm create vite@latest frontend -- --template react
Set-Location frontend
npm install
npm install react-router
npm run dev
```

La instalación e imports propuestos usan `react-router`, conforme a su documentación del modo declarativo. Mantener ese criterio en todos los ejemplos del proyecto. [Instalación oficial de React Router](https://reactrouter.com/start/declarative/installation).

Después de instalar, conservar `package-lock.json` en el repositorio. En instalaciones posteriores usar `npm ci`. Excluir `node_modules/`, `dist/` y archivos locales de entorno mediante `.gitignore`.

## 5. Estructura propuesta

```text
frontend/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── .oxlintrc.json             # Configuración generada por la plantilla verificada
├── .gitignore
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── assets/                  # Copia de las cinco imágenes actuales
    ├── styles/
    │   └── global.css           # Base tomada de stylesheet.css
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── Hero.jsx
    │   ├── TournamentCard.jsx
    │   └── RankingTable.jsx
    ├── layouts/
    │   └── MainLayout.jsx
    ├── pages/
    │   ├── HomePage.jsx
    │   ├── TorneosPage.jsx
    │   ├── RankingPage.jsx
    │   ├── LoginPage.jsx
    │   ├── RegistroPage.jsx
    │   ├── JugadorPage.jsx
    │   ├── AdminPage.jsx
    │   └── NotFoundPage.jsx
    ├── context/
    │   ├── AuthContext.js
    │   └── AuthProvider.jsx
    ├── hooks/
    │   └── useAuth.js
    ├── routes/
    │   └── ProtectedRoute.jsx
    ├── data/
    │   ├── torneos.js
    │   ├── destacados.js
    │   ├── ranking.js
    │   └── usuariosDemo.js
    ├── services/
    │   └── authDemoService.js
    └── utils/
        └── formatDate.js
```

`services/` podrá incorporar `apiClient.js`, `authService.js`, `torneosService.js` y `rankingService.js` cuando se conozca el contrato de Spring Boot. No crear llamadas a endpoints supuestos.

## 6. Mapa de páginas y rutas

| Archivo actual | Componente React | Ruta | Acceso propuesto |
| --- | --- | --- | --- |
| `pages/index.html` | `HomePage` | `/` | Público |
| `pages/torneos/torneos.html` | `TorneosPage` | `/torneos` | Público |
| `pages/ranking/ranking.html` | `RankingPage` | `/ranking` | Público |
| `pages/auth/login.html` | `LoginPage` | `/login` | Público |
| `pages/auth/registro.html` | `RegistroPage` | `/registro` | Público |
| `pages/jugador/jugador.html` | `JugadorPage` | `/jugador` | Rol `jugador` |
| `pages/admin/admin.html` | `AdminPage` | `/admin` | Rol `admin` |
| Sin equivalente | `NotFoundPage` | `*` | Público |

Como decisión inicial, cada rol accede a su propio panel. Una sesión válida que intente entrar al panel del otro rol debe volver a su panel o recibir un mensaje de acceso denegado; un visitante sin sesión debe ir a `/login`.

Para cerrar la primera entrega sin enlaces rotos, los controles «Ver detalles» y «Crear Torneo» se mostrarán deshabilitados, con una indicación visible de «Próximamente». Implementar `/torneos/:id` y `/admin/torneos/nuevo` será una ampliación posterior: ambas pantallas faltan en el proyecto original. El enlace «Perfil» sí debe llevar a `/jugador`.

### Composición de la aplicación

En `main.jsx`, importar `global.css` y envolver `App` con `BrowserRouter` y `AuthProvider`. En `App.jsx`, declarar las rutas mediante `Routes` y `Route`. Agrupar las páginas bajo `MainLayout`, que renderiza `Navbar`, un `<main><Outlet /></main>` y `Footer`. Envolver los paneles con `ProtectedRoute`, pasándole los roles admitidos.

Las páginas deben devolver únicamente el contenido que va dentro del layout, para no duplicar `<main>`, navegación ni pie de página. `ProtectedRoute` consulta el contexto y devuelve el contenido permitido o una redirección mediante `Navigate`.

## 7. Componentes que se pueden reutilizar

| Componente | Datos de entrada | Responsabilidad |
| --- | --- | --- |
| `Navbar` | Sesión desde el contexto | Enlaces comunes, enlace al panel correspondiente y botón para cerrar sesión. |
| `Footer` | Ninguno inicialmente | Pie de página compartido. |
| `Hero` | `title`, `description` | Banner y encabezado de cada vista. |
| `TournamentCard` | `torneo`, `variant` | Mostrar una tarjeta destacada o una tarjeta del listado. |
| `RankingTable` | `jugadores` | Dibujar encabezados y filas del ranking. |
| `MainLayout` | Ruta hija mediante `Outlet` | Estructura común de todas las páginas. |

Usar `Link` o `NavLink` para navegación interna. Usar botones para acciones como enviar formularios o cerrar sesión. Sustituir `window.location.href` por `useNavigate` en el flujo de login.

## 8. Conversión de HTML, CSS e imágenes

Al trasladar el contenido a JSX:

- Cambiar `class` por `className` y `for` por `htmlFor`.
- Cerrar etiquetas como `<img />` e `<input />`.
- Devolver un elemento raíz o un fragmento por componente.
- Cambiar los listeners del script por handlers como `onSubmit` y `onChange`.
- Mantener `lang="es"` y los metadatos generales en `frontend/index.html`.
- Usar un único título principal por vista y textos alternativos adecuados para las imágenes.

Estas son las reglas básicas de conversión descritas en la [guía oficial de JSX](https://react.dev/learn/writing-markup-with-jsx).

Copiar las cinco imágenes a `src/assets/` y el CSS a `src/styles/global.css`. La referencia existente `url("../assets/tcgapp_banner.png")` seguirá correspondiendo a esa estructura. Para las imágenes de componentes, usar imports:

```jsx
import logo from '../assets/tcgapp_logo.png';
import { Link } from 'react-router';

export default function BrandLink() {
  return (
    <Link to="/" aria-label="TCG App, inicio">
      <img className="logo" src={logo} alt="TCG App" />
    </Link>
  );
}
```

El ejemplo muestra la parte del logo que puede incorporarse a `Navbar`; no exige crear un componente adicional. Aplicar `.logo` a la imagen para controlar su ancho.

Eliminar los imports del CSS de demostración de Vite para evitar que interfieran con el diseño. Conservar los colores actuales: fondo `#10131a`, superficies `#181c26` y botones `#6d4aff`.

Ajustes sugeridos sobre el CSS existente:

```css
* { box-sizing: border-box; }
.logo { max-width: 100%; height: auto; }
.login-content { width: min(100%, 460px); }
.tournament-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}
.tournament-card { width: auto; min-width: 0; }
.table-container { overflow-x: auto; }

@media (max-width: 768px) {
  main { width: 92%; }
  .navbar { flex-direction: column; gap: 16px; }
  .nav-links { flex-wrap: wrap; gap: 12px; }
  .tournament-list { grid-template-columns: 1fr; }
  .hero-content { padding: 28px 16px; }
  .hero-title { font-size: 30px; }
}
```

Envolver la tabla de ranking en `.table-container`. Añadir estilos de foco visibles y estados de botón deshabilitado. Comprobar el contraste del texto sobre el banner.

## 9. Datos locales y renderizado

Extraer las tarjetas y filas del HTML a arreglos y renderizarlos con `.map()`, usando identificadores estables como `key`.

| Conjunto | Campos propuestos |
| --- | --- |
| Torneos del listado | `id`, `nombre`, `descripcion`, `juego`, `fecha`, `formato`, `inscritos`, `cupo`, `estado` |
| Torneos destacados | `id`, `nombre`, `descripcion`, `fecha`, `ubicacion`, `premio`, `imagen`, `imagenAlt` |
| Ranking | `id`, `posicion`, `nombre`, `victorias`, `derrotas`, `puntos` |
| Usuario de sesión demo | `id`, `nombre`, `email`, `rol` |

Los destacados de inicio y los torneos del listado tienen nombres, fechas y campos diferentes. Mantenerlos como dos conjuntos durante la migración; no asumir que representan los mismos eventos.

Conservar los tres torneos del listado —Gundam Santiago Cup, Pokémon League Challenge y Grand Line Tournament— y las cinco filas del ranking con sus valores actuales. No inventar una fórmula de ranking a partir de esos ejemplos.

Guardar las fechas de muestra como fechas de calendario `YYYY-MM-DD` y presentarlas como `DD/MM/YYYY`. Evitar conversiones de zona horaria que cambien el día. Sus fechas y estados son datos de demostración; no interpretarlos como disponibilidad real actual.

## 10. Formularios y sesión de demostración

### Login

1. Crear estados para correo, contraseña y mensaje de error.
2. Usar inputs controlados mediante `value` y `onChange`.
3. En `onSubmit`, ejecutar `event.preventDefault()` y validar los campos.
4. Consultar `authDemoService` con las dos cuentas de prueba del README.
5. Guardar en `AuthContext` únicamente el usuario sin contraseña y navegar al panel según su rol.
6. Mostrar «Correo o contraseña incorrectos.» cuando las credenciales no coincidan.

| Rol | Correo de prueba | Contraseña de prueba | Destino |
| --- | --- | --- | --- |
| `admin` | `admin@tcgapp.cl` | `admin123` | `/admin` |
| `jugador` | `user@tcgapp.cl` | `user123` | `/jugador` |

Estas credenciales son exclusivamente de demostración y ya están presentes en el proyecto. Centralizarlas en `usuariosDemo.js`; retirar esa lógica al integrar autenticación real.

### Registro

Crear estado independiente para nombre, correo, contraseña, confirmación y mensaje. Validar nombre no vacío después de `trim()`, formato de correo, campos obligatorios y coincidencia de contraseñas. La política adicional de contraseña debe acordarse con el backend, pues el proyecto actual no define una.

Para la primera entrega, el registro será una simulación de validación: al aceptar el formulario debe mostrar «Validación correcta. Registro de demostración: no se ha creado una cuenta». No almacenar contraseñas ni afirmar que el usuario puede iniciar sesión con esos datos. La creación real de cuentas se implementará con Spring Boot.

Asociar mensajes a los campos y usar `role="alert"` para los errores. Evitar que un formulario válido se envíe mediante la navegación predeterminada del navegador.

### Contexto y persistencia

El contexto expondrá `user`, `login` y `logout`. Para permitir recargar la demo, guardar solo el perfil sin contraseña en `sessionStorage`, por ejemplo con la clave `tcgapp.demo.user`. Inicializar el contexto leyendo ese valor de forma síncrona, validando estructura y rol, y tratando JSON inválido como ausencia de sesión. Manejar también la indisponibilidad del almacenamiento sin romper la aplicación.

`logout` debe eliminar el valor persistido, limpiar el contexto y navegar al login. Los paneles deben mostrar los datos del contexto en lugar de correos y nombres repetidos en el JSX.

Esta guarda controla la navegación de la demo. Un rol guardado en el navegador se puede modificar; la autorización real debe comprobarse en Spring Boot para cada operación protegida.

## 11. Integración posterior con Spring Boot

Antes de implementar esta etapa, obtener la documentación de la API o revisar sus controladores y DTO. Confirmar:

- URL base, rutas y métodos reales de autenticación, registro, torneos y ranking.
- Campos obligatorios, nombres de roles y estructura de respuestas y errores.
- Mecanismo de sesión: cookies o tokens, expiración y cierre de sesión.
- Configuración de CORS para el origen del frontend.
- Paginación, ordenamiento y reglas de inscripción, si existen.

No se conocen esos endpoints a partir de este repositorio. La siguiente distribución es una propuesta de responsabilidades, no un contrato existente:

| Módulo futuro | Responsabilidad |
| --- | --- |
| `apiClient.js` | URL base, envío HTTP, lectura de respuestas y conversión de errores. |
| `authService.js` | Login, registro y recuperación/cierre de sesión según el contrato real. |
| `torneosService.js` | Consulta de torneos y operaciones que el backend permita. |
| `rankingService.js` | Consulta y adaptación del ranking. |

Configurar la URL con `VITE_API_BASE_URL` en un archivo local y documentar un valor de ejemplo en `.env.example`. Las variables expuestas al frontend son públicas: no colocar contraseñas, claves privadas ni secretos de servidor en ellas. [Variables de entorno de Vite](https://vite.dev/guide/env-and-mode).

Sustituir los datos locales a través de los servicios, manteniendo las páginas independientes del formato específico de la API. Añadir estados de carga, error y resultado vacío; comprobar `response.ok` antes de tratar una respuesta como exitosa. Definir el almacenamiento o envío de credenciales según el mecanismo confirmado del backend, sin reutilizar el perfil demo como prueba de autenticación.

## 12. Orden de implementación

1. **Preparar el proyecto:** crear `frontend/`, instalar dependencias y verificar que inicia la plantilla.
2. **Migrar la presentación:** copiar imágenes y CSS; crear layout, navegación, footer y banner.
3. **Migrar vistas públicas:** implementar inicio, torneos y ranking; extraer datos locales.
4. **Configurar navegación:** incorporar las siete rutas y la página de ruta desconocida; resolver enlaces ausentes según el alcance inicial.
5. **Migrar formularios:** implementar login demo y validación de registro con mensajes explícitos.
6. **Implementar sesión y roles:** crear contexto, guardas, paneles y cierre de sesión.
7. **Revisar diseño y accesibilidad:** corregir estilos heredados, teclado, etiquetas, mensajes y móvil.
8. **Validar la entrega:** ejecutar las comprobaciones siguientes y actualizar el README con los comandos y limitaciones reales.
9. **Integrar la API en otra etapa:** confirmar primero su contrato y reemplazar los servicios demo.

Mantener los archivos originales disponibles como referencia hasta aceptar la versión React. La migración base no necesita incluir inscripción a torneos, CRUD administrativo ni cálculo de ranking, porque esas funciones no están implementadas actualmente.

## 13. Verificación y criterios de aceptación

Desde `frontend/`:

```powershell
npm run lint
npm run build
npm run preview
```

`preview` sirve para revisar localmente el resultado de la compilación; no es el servidor de producción. Al publicar la aplicación con `BrowserRouter`, el hosting debe devolver `index.html` para las rutas del frontend que no sean archivos, de modo que recargar `/ranking` o `/admin` funcione. La configuración concreta depende del hosting elegido.

### Lista de comprobación de la migración

- [ ] Las siete vistas se pueden abrir mediante sus nuevas rutas.
- [ ] La navegación interna funciona sin recargar todo el documento.
- [ ] Una URL desconocida muestra la página de error con enlace a inicio.
- [ ] Inicio conserva sus tres destacados y el listado conserva sus tres torneos.
- [ ] Ranking conserva las cinco filas y sus valores.
- [ ] Las cinco imágenes cargan y el banner mantiene el estilo esperado.
- [ ] Las cuentas demo llevan al panel correspondiente.
- [ ] Credenciales incorrectas muestran un error y no crean sesión.
- [ ] Acceder directamente a un panel sin sesión redirige al login.
- [ ] Un jugador no puede abrir el panel de administrador mediante la navegación de la demo, ni viceversa.
- [ ] Recargar una ruta conserva una sesión demo válida en la misma pestaña.
- [ ] Un valor de sesión corrupto no provoca una pantalla en blanco.
- [ ] Cerrar sesión impide volver a ver un panel protegido, incluso usando «Atrás».
- [ ] Registro detecta campos vacíos, correo inválido y contraseñas distintas.
- [ ] Registro válido informa que no ha creado una cuenta real.
- [ ] No quedan enlaces a archivos `.html` inexistentes ni acciones habilitadas sin implementar.
- [ ] Formularios y navegación se pueden usar con teclado y tienen foco visible.
- [ ] A 360 px, 768 px y en escritorio no hay desbordamiento horizontal de la página; la tabla puede desplazarse dentro de su contenedor.
- [ ] No aparecen errores de JavaScript ni solicitudes de recursos ausentes en la consola/red del navegador.
- [ ] `lint` y `build` terminan correctamente.
- [ ] El hosting permite abrir y recargar rutas internas directamente.
- [ ] El README describe la estructura React, cómo ejecutarla y qué partes siguen siendo simuladas.

Si se añaden pruebas automatizadas durante la implementación, priorizar el login por rol, el acceso a rutas protegidas, el cierre de sesión y la validación de registro. Estas pruebas deben verificar resultados visibles y permisos de navegación.

La entrega base se considera terminada al completar esta lista con datos locales. La autenticación real, el registro persistente y las nuevas pantallas de torneos requieren una entrega adicional.

## 14. Código completo, archivo por archivo

Esta implementación cubre la entrega base descrita arriba. Copiar cada bloque en la ruta indicada, relativa a la raíz del repositorio. Los archivos de esta sección reemplazan los ejemplos parciales anteriores; no se deben concatenar con ellos.

### 14.1. Preparar las carpetas y las imágenes

Primero ejecutar la creación e instalación de la sección 4. Detener el servidor con `Ctrl+C` si está ejecutándose. Desde `TCGApp/frontend`, ejecutar:

```powershell
$reactFolders = @('assets', 'styles', 'components', 'layouts', 'pages', 'context', 'hooks', 'routes', 'data', 'services', 'utils')
foreach ($reactFolder in $reactFolders) {
    New-Item -ItemType Directory -Path (Join-Path 'src' $reactFolder) -Force | Out-Null
}
Copy-Item -Path '../assets/*.png' -Destination './src/assets/'
```

Conservar el `package.json`, `package-lock.json` y la configuración del linter generados por Vite. La plantilla verificada para este documento utiliza Oxlint y `.oxlintrc.json`; si tu plantilla anterior usa ESLint, conservar su `eslint.config.js` y su comando de lint. `npm install react-router` agrega la dependencia de navegación al manifiesto y al lockfile. Verificar que `package.json` contenga `"type": "module"`. Estos son los scripts de la plantilla verificada; este bloque es solo la propiedad `scripts`, no un reemplazo del archivo completo:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "oxlint",
    "preview": "vite preview"
  }
}
```

Mantener las dependencias que instala la plantilla. No escribir manualmente `package-lock.json`. Los archivos de muestra `src/App.css` y `src/index.css` pueden quedar sin uso: el único CSS importado por esta implementación será `src/styles/global.css`.

### 14.2. Entrada y configuración

#### `frontend/index.html`

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Torneos y ranking de juegos de cartas coleccionables." />
    <title>TCG App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

#### `frontend/vite.config.js`

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

#### `frontend/.gitignore`

```gitignore
node_modules/
dist/
dist-ssr/
*.local
*.log
.env
.env.*
!.env.example
```

#### `frontend/src/main.jsx`

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
```

#### `frontend/src/App.jsx`

```jsx
import { Route, Routes } from 'react-router';
import MainLayout from './layouts/MainLayout.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import HomePage from './pages/HomePage.jsx';
import TorneosPage from './pages/TorneosPage.jsx';
import RankingPage from './pages/RankingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegistroPage from './pages/RegistroPage.jsx';
import JugadorPage from './pages/JugadorPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="torneos" element={<TorneosPage />} />
        <Route path="ranking" element={<RankingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="registro" element={<RegistroPage />} />
        <Route element={<ProtectedRoute allowedRoles={['jugador']} />}>
          <Route path="jugador" element={<JugadorPage />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="admin" element={<AdminPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
```

Las rutas hijas se muestran en el `Outlet` del layout. Las rutas protegidas pasan primero por otro `Outlet`, el de `ProtectedRoute`. [Rutas anidadas de React Router](https://reactrouter.com/start/declarative/routing).

### 14.3. Datos de demostración y formato de fechas

#### `frontend/src/data/torneos.js`

```js
export const torneos = [
  {
    id: 'gundam-santiago',
    nombre: 'Gundam Santiago Cup',
    descripcion: 'Torneo competitivo de Gundam Card Game.',
    juego: 'Gundam Card Game',
    fecha: '2026-09-15',
    formato: 'Standard',
    inscritos: 18,
    cupo: 32,
    estado: 'Inscripciones abiertas',
  },
  {
    id: 'pokemon-league',
    nombre: 'Pokémon League Challenge',
    descripcion: 'Torneo para jugadores de Pokémon Trading Card Game.',
    juego: 'Pokémon TCG',
    fecha: '2026-09-22',
    formato: 'Standard',
    inscritos: 12,
    cupo: 16,
    estado: 'Inscripciones abiertas',
  },
  {
    id: 'grand-line',
    nombre: 'Grand Line Tournament',
    descripcion: 'Torneo competitivo de One Piece Card Game.',
    juego: 'One Piece Card Game',
    fecha: '2026-09-28',
    formato: 'Standard',
    inscritos: 8,
    cupo: 24,
    estado: 'Próximamente',
  },
];
```

#### `frontend/src/data/destacados.js`

```js
import torneo1 from '../assets/torneo1.png';
import torneo2 from '../assets/torneo2.png';
import torneo3 from '../assets/torneo3.png';

export const destacados = [
  {
    id: 'destacado-1',
    nombre: 'Torneo Destacado 1',
    descripcion: 'Descripción del torneo destacado 1.',
    fecha: '2026-01-15',
    ubicacion: 'Ciudad 2',
    premio: 2000,
    imagen: torneo1,
    imagenAlt: 'Torneo Gundam',
  },
  {
    id: 'destacado-2',
    nombre: 'Torneo Destacado 2',
    descripcion: 'Descripción del torneo destacado 2.',
    fecha: '2026-02-20',
    ubicacion: 'Ciudad 3',
    premio: 3000,
    imagen: torneo2,
    imagenAlt: 'Torneo Pokémon',
  },
  {
    id: 'destacado-3',
    nombre: 'Torneo Destacado 3',
    descripcion: 'Descripción del torneo destacado 3.',
    fecha: '2026-03-10',
    ubicacion: 'Ciudad 4',
    premio: 4000,
    imagen: torneo3,
    imagenAlt: 'Torneo One Piece',
  },
];
```

#### `frontend/src/data/ranking.js`

```js
export const ranking = [
  { id: 'j1', posicion: 1, nombre: 'Jugador 1', victorias: 8, derrotas: 1, puntos: 24 },
  { id: 'j2', posicion: 2, nombre: 'Jugador 2', victorias: 7, derrotas: 2, puntos: 21 },
  { id: 'j3', posicion: 3, nombre: 'Jugador 3', victorias: 6, derrotas: 3, puntos: 18 },
  { id: 'j4', posicion: 4, nombre: 'Jugador 4', victorias: 5, derrotas: 4, puntos: 15 },
  { id: 'j5', posicion: 5, nombre: 'Jugador 5', victorias: 4, derrotas: 5, puntos: 12 },
];
```

#### `frontend/src/data/usuariosDemo.js`

```js
// Credenciales públicas de prueba; sustituir por la API en la etapa real.
export const usuariosDemo = [
  {
    id: 'admin-demo',
    nombre: 'Administrador',
    email: 'admin@tcgapp.cl',
    password: 'admin123',
    rol: 'admin',
  },
  {
    id: 'jugador-demo',
    nombre: 'Jugador TCG',
    email: 'user@tcgapp.cl',
    password: 'user123',
    rol: 'jugador',
  },
];
```

#### `frontend/src/utils/formatDate.js`

```js
// Las fechas de los datos locales son fechas de calendario, sin hora.
export function formatDate(fecha) {
  const [year, month, day] = fecha.split('-');
  return `${day}/${month}/${year}`;
}
```

### 14.4. Autenticación de demostración

Separar el objeto contexto, su proveedor y el hook permite que los archivos JSX exporten solo componentes. El contexto se crea fuera de los componentes y el proveedor comparte su valor con los consumidores. [Referencia de createContext](https://react.dev/reference/react/createContext).

#### `frontend/src/services/authDemoService.js`

```js
import { usuariosDemo } from '../data/usuariosDemo.js';

const SESSION_KEY = 'tcgapp.demo.user';

function publicProfile(usuario) {
  return {
    id: usuario.id,
    nombre: usuario.nombre,
    email: usuario.email,
    rol: usuario.rol,
  };
}

export function authenticateDemo(email, password) {
  const usuario = usuariosDemo.find(
    (item) => item.email === email.trim().toLowerCase()
      && item.password === password,
  );
  return usuario ? publicProfile(usuario) : null;
}

export function readDemoSession() {
  try {
    const stored = JSON.parse(sessionStorage.getItem(SESSION_KEY));
    if (!stored || typeof stored !== 'object') return null;

    // Aceptar únicamente perfiles que coincidan con una cuenta demo.
    const usuario = usuariosDemo.find((item) => (
      item.id === stored.id
      && item.nombre === stored.nombre
      && item.email === stored.email
      && item.rol === stored.rol
    ));
    return usuario ? publicProfile(usuario) : null;
  } catch {
    // JSON corrupto o almacenamiento bloqueado: comenzar sin sesión.
    return null;
  }
}

export function writeDemoSession(user) {
  try {
    if (user) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(publicProfile(user)));
    } else {
      sessionStorage.removeItem(SESSION_KEY);
    }
    return true;
  } catch {
    // La sesión en memoria sigue funcionando mientras la página esté abierta.
    return false;
  }
}

export function getPanelPath(rol) {
  return rol === 'admin' ? '/admin' : '/jugador';
}
```

#### `frontend/src/context/AuthContext.js`

```js
import { createContext } from 'react';

export const AuthContext = createContext(null);
```

#### `frontend/src/context/AuthProvider.jsx`

```jsx
import { useState } from 'react';
import { AuthContext } from './AuthContext.js';
import {
  authenticateDemo,
  readDemoSession,
  writeDemoSession,
} from '../services/authDemoService.js';

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(readDemoSession);

  function login(email, password) {
    const authenticatedUser = authenticateDemo(email, password);
    if (!authenticatedUser) {
      throw new Error('Correo o contraseña incorrectos.');
    }
    writeDemoSession(authenticatedUser);
    setUser(authenticatedUser);
    return authenticatedUser;
  }

  function logout() {
    writeDemoSession(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

#### `frontend/src/hooks/useAuth.js`

```js
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.js';

export default function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth debe utilizarse dentro de AuthProvider.');
  }
  return context;
}
```

#### `frontend/src/routes/ProtectedRoute.jsx`

```jsx
import { Navigate, Outlet } from 'react-router';
import useAuth from '../hooks/useAuth.js';
import { getPanelPath } from '../services/authDemoService.js';

export default function ProtectedRoute({ allowedRoles }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.rol)) {
    return <Navigate to={getPanelPath(user.rol)} replace />;
  }
  return <Outlet />;
}
```

La validación de `sessionStorage` evita usar valores corruptos; no convierte la demo en autenticación segura. La aplicación real deberá obtener y validar la sesión mediante el backend.

### 14.5. Layout y componentes compartidos

#### `frontend/src/layouts/MainLayout.jsx`

```jsx
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

export default function MainLayout() {
  return (
    <>
      <a href="#contenido" className="skip-link">Saltar al contenido</a>
      <Navbar />
      <main id="contenido" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
```

#### `frontend/src/components/Navbar.jsx`

```jsx
import { Link, NavLink, useNavigate } from 'react-router';
import logo from '../assets/tcgapp_logo.png';
import useAuth from '../hooks/useAuth.js';
import { getPanelPath } from '../services/authDemoService.js';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <header>
      <nav className="navbar" aria-label="Navegación principal">
        <Link to="/" aria-label="TCG App, inicio">
          <img className="logo" src={logo} alt="TCG App" />
        </Link>
        <ul className="nav-links">
          <li><NavLink to="/" end>Inicio</NavLink></li>
          <li><NavLink to="/torneos">Torneos</NavLink></li>
          <li><NavLink to="/ranking">Ranking</NavLink></li>
          {user ? (
            <>
              <li>
                <NavLink to={getPanelPath(user.rol)}>
                  {user.rol === 'admin' ? 'Administración' : 'Perfil'}
                </NavLink>
              </li>
              <li>
                <button type="button" className="nav-button" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </li>
            </>
          ) : (
            <>
              <li><NavLink to="/login">Iniciar sesión</NavLink></li>
              <li><NavLink to="/registro">Registrarse</NavLink></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
```

#### `frontend/src/components/Footer.jsx`

```jsx
export default function Footer() {
  return (
    <footer>
      <p>© 2026 TCG App. Todos los derechos reservados. Proyecto TCG App</p>
    </footer>
  );
}
```

#### `frontend/src/components/Hero.jsx`

```jsx
export default function Hero({ title, description }) {
  return (
    <section className="hero-content">
      <h1 className="hero-title">{title}</h1>
      <p className="hero-text">{description}</p>
    </section>
  );
}
```

#### `frontend/src/components/TournamentCard.jsx`

```jsx
import { formatDate } from '../utils/formatDate.js';

export default function TournamentCard({ torneo, variant = 'listado' }) {
  const destacado = variant === 'destacado';

  return (
    <article className="tournament-card">
      {destacado && (
        <img className="tournament-image" src={torneo.imagen} alt={torneo.imagenAlt} />
      )}
      <h3>{torneo.nombre}</h3>
      <p className="main-text">{torneo.descripcion}</p>
      <ul className="main-list">
        {!destacado && <li>Juego: {torneo.juego}</li>}
        <li>Fecha: <time dateTime={torneo.fecha}>{formatDate(torneo.fecha)}</time></li>
        {destacado ? (
          <>
            <li>Ubicación: {torneo.ubicacion}</li>
            <li>Premio: ${torneo.premio}</li>
          </>
        ) : (
          <>
            <li>Formato: {torneo.formato}</li>
            <li>Jugadores: {torneo.inscritos} / {torneo.cupo}</li>
            <li>Estado: {torneo.estado}</li>
          </>
        )}
      </ul>
      {!destacado && (
        <button type="button" className="main-button" disabled>
          Ver detalles — Próximamente
        </button>
      )}
    </article>
  );
}
```

#### `frontend/src/components/RankingTable.jsx`

```jsx
export default function RankingTable({ jugadores }) {
  if (jugadores.length === 0) {
    return <p className="main-text">Todavía no hay jugadores en el ranking.</p>;
  }

  return (
    <div className="table-container" tabIndex={0} role="region" aria-label="Tabla de ranking">
      <table className="ranking-table">
        <caption>Resultados generales de los jugadores</caption>
        <thead>
          <tr>
            <th scope="col">Posición</th>
            <th scope="col">Jugador</th>
            <th scope="col">Victorias</th>
            <th scope="col">Derrotas</th>
            <th scope="col">Puntos</th>
          </tr>
        </thead>
        <tbody>
          {jugadores.map((jugador) => (
            <tr key={jugador.id}>
              <td>{jugador.posicion}</td>
              <th scope="row">{jugador.nombre}</th>
              <td>{jugador.victorias}</td>
              <td>{jugador.derrotas}</td>
              <td>{jugador.puntos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

### 14.6. Páginas públicas

#### `frontend/src/pages/HomePage.jsx`

```jsx
import { Link } from 'react-router';
import Hero from '../components/Hero.jsx';
import TournamentCard from '../components/TournamentCard.jsx';
import { destacados } from '../data/destacados.js';
import useAuth from '../hooks/useAuth.js';
import { getPanelPath } from '../services/authDemoService.js';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <>
      <Hero
        title="Bienvenido a TCG App"
        description="La aplicación definitiva para los amantes de los juegos de cartas coleccionables."
      />
      <section className="main-content">
        <h2 className="main-title">Explora nuestros torneos</h2>
        <p className="main-text">Descubre torneos, rankings y mucho más en nuestra aplicación.</p>
        <Link to="/torneos" className="main-button">Ver Torneos</Link>
      </section>
      <section className="main-content">
        <h2 className="main-title">Consulta el ranking</h2>
        <p className="main-text">Mantente al día con los mejores jugadores y sus posiciones en el ranking.</p>
        <Link to="/ranking" className="main-button">Ver Ranking</Link>
      </section>
      <section className="main-content">
        <h2 className="main-title">Únete a nuestra comunidad</h2>
        <p className="main-text">Regístrate o inicia sesión para participar en torneos y mejorar tu ranking.</p>
        {user ? (
          <Link to={getPanelPath(user.rol)} className="main-button">Ir a mi panel</Link>
        ) : (
          <>
            <Link to="/registro" className="main-button">Registrarse</Link>
            <Link to="/login" className="main-button">Iniciar Sesión</Link>
          </>
        )}
      </section>
      <section className="main-grid">
        <h2 className="main-title">Torneos Destacados</h2>
        <div className="tournament-list">
          {destacados.map((torneo) => (
            <TournamentCard key={torneo.id} torneo={torneo} variant="destacado" />
          ))}
        </div>
      </section>
    </>
  );
}
```

#### `frontend/src/pages/TorneosPage.jsx`

```jsx
import Hero from '../components/Hero.jsx';
import TournamentCard from '../components/TournamentCard.jsx';
import { torneos } from '../data/torneos.js';

export default function TorneosPage() {
  return (
    <>
      <Hero
        title="Torneos"
        description="Encuentra torneos disponibles y participa con tus juegos de cartas favoritos."
      />
      <section className="main-grid">
        <h2 className="main-title">Torneos disponibles</h2>
        <p className="main-text">Fechas, cupos y estados de demostración.</p>
        <div className="tournament-list">
          {torneos.map((torneo) => <TournamentCard key={torneo.id} torneo={torneo} />)}
        </div>
      </section>
    </>
  );
}
```

#### `frontend/src/pages/RankingPage.jsx`

```jsx
import Hero from '../components/Hero.jsx';
import RankingTable from '../components/RankingTable.jsx';
import { ranking } from '../data/ranking.js';

export default function RankingPage() {
  return (
    <>
      <Hero
        title="Ranking de Jugadores"
        description="Consulta las posiciones de los mejores jugadores de TCG App."
      />
      <section className="main-content">
        <h2 className="main-title">Ranking General</h2>
        <RankingTable jugadores={ranking} />
      </section>
    </>
  );
}
```

### 14.7. Formularios de login y registro

El login conserva las cuentas de prueba. El registro valida el formulario y muestra explícitamente que no crea una cuenta. La validación nativa del navegador comprueba los campos `required` y el tipo `email`; la validación React comprueba además espacios en el nombre y coincidencia de contraseñas.

#### `frontend/src/pages/LoginPage.jsx`

```jsx
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router';
import Hero from '../components/Hero.jsx';
import useAuth from '../hooks/useAuth.js';
import { getPanelPath } from '../services/authDemoService.js';

export default function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (user) return <Navigate to={getPanelPath(user.rol)} replace />;

  function handleSubmit(event) {
    event.preventDefault();
    setError('');
    try {
      const authenticatedUser = login(email, password);
      navigate(getPanelPath(authenticatedUser.rol), { replace: true });
    } catch (loginError) {
      setError(loginError.message);
    }
  }

  return (
    <>
      <Hero title="Bienvenido a TCG App" description="Inicia sesión para acceder a tu panel." />
      <section className="login-content">
        <h2>Iniciar Sesión</h2>
        <p className="main-text">Acceso de demostración con las cuentas de prueba del proyecto.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="login-email">Correo electrónico</label>
          <input
            id="login-email" name="email" type="email" autoComplete="username" required
            value={email} aria-describedby={error ? 'login-message' : undefined}
            onChange={(event) => { setEmail(event.target.value); setError(''); }}
          />
          <label htmlFor="login-password">Contraseña</label>
          <input
            id="login-password" name="password" type="password" autoComplete="current-password" required
            value={password} aria-describedby={error ? 'login-message' : undefined}
            onChange={(event) => { setPassword(event.target.value); setError(''); }}
          />
          <button type="submit" className="main-button">Ingresar</button>
          {error && <p id="login-message" className="form-error" role="alert">{error}</p>}
        </form>
        <p><Link to="/registro">Ir al formulario de registro</Link></p>
      </section>
    </>
  );
}
```

#### `frontend/src/pages/RegistroPage.jsx`

```jsx
import { useRef, useState } from 'react';
import { Link } from 'react-router';
import Hero from '../components/Hero.jsx';

export default function RegistroPage() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const nombreRef = useRef(null);
  const confirmRef = useRef(null);

  function clearMessages() {
    setErrors({});
    setMessage('');
  }

  function handleSubmit(event) {
    event.preventDefault();
    setMessage('');
    const nextErrors = {};
    if (!nombre.trim()) nextErrors.nombre = 'Ingresa un nombre que no contenga solo espacios.';
    if (password !== confirmPassword) nextErrors.confirm = 'Las contraseñas no coinciden.';
    setErrors(nextErrors);

    if (nextErrors.nombre) {
      nombreRef.current.focus();
      return;
    }
    if (nextErrors.confirm) {
      confirmRef.current.focus();
      return;
    }

    setMessage('Validación correcta. Registro de demostración: no se ha creado una cuenta.');
    setNombre('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }

  return (
    <>
      <Hero title="Crear una cuenta" description="Únete a la comunidad de TCG App." />
      <section className="login-content">
        <h2>Registro</h2>
        <p className="main-text">Formulario de demostración: valida tus datos sin crear una cuenta.</p>
        <form onSubmit={handleSubmit} onChange={clearMessages}>
          <label htmlFor="registro-nombre">Nombre</label>
          <input
            ref={nombreRef} id="registro-nombre" name="nombre" type="text" autoComplete="name" required
            value={nombre} onChange={(event) => setNombre(event.target.value)}
            aria-invalid={Boolean(errors.nombre)}
            aria-describedby={errors.nombre ? 'nombre-error' : undefined}
          />
          {errors.nombre && <p id="nombre-error" className="form-error" role="alert">{errors.nombre}</p>}
          <label htmlFor="registro-email">Correo electrónico</label>
          <input
            id="registro-email" name="email" type="email" autoComplete="email" required
            value={email} onChange={(event) => setEmail(event.target.value)}
          />
          <label htmlFor="registro-password">Contraseña</label>
          <input
            id="registro-password" name="password" type="password" autoComplete="new-password" required
            value={password} onChange={(event) => setPassword(event.target.value)}
          />
          <label htmlFor="registro-confirm">Confirmar contraseña</label>
          <input
            ref={confirmRef} id="registro-confirm" name="confirmPassword" type="password"
            autoComplete="new-password" required
            value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}
            aria-invalid={Boolean(errors.confirm)}
            aria-describedby={errors.confirm ? 'confirm-error' : undefined}
          />
          {errors.confirm && <p id="confirm-error" className="form-error" role="alert">{errors.confirm}</p>}
          <button type="submit" className="main-button">Registrarse</button>
          <p className="form-success" role="status">{message}</p>
        </form>
        <p><Link to="/login">Iniciar sesión con una cuenta de prueba</Link></p>
      </section>
    </>
  );
}
```

### 14.8. Paneles y página de ruta desconocida

#### `frontend/src/pages/JugadorPage.jsx`

```jsx
import { Link } from 'react-router';
import Hero from '../components/Hero.jsx';
import useAuth from '../hooks/useAuth.js';

export default function JugadorPage() {
  const { user } = useAuth();

  return (
    <>
      <Hero title="Perfil del Jugador" description="Bienvenido a tu cuenta de TCG App." />
      <section className="main-content">
        <h2 className="main-title">Información del jugador</h2>
        <p className="main-text">Nombre: {user.nombre}</p>
        <p className="main-text">Correo: {user.email}</p>
        <p className="main-text">Rol: Jugador</p>
      </section>
      <section className="main-content">
        <h2 className="main-title">Mis opciones</h2>
        <Link to="/torneos" className="main-button">Ver Torneos</Link>
        <Link to="/ranking" className="main-button">Ver Ranking</Link>
      </section>
    </>
  );
}
```

#### `frontend/src/pages/AdminPage.jsx`

```jsx
import { Link } from 'react-router';
import Hero from '../components/Hero.jsx';
import useAuth from '../hooks/useAuth.js';

export default function AdminPage() {
  const { user } = useAuth();

  return (
    <>
      <Hero title="Panel de Administración" description="Gestiona los torneos de TCG App." />
      <section className="main-content">
        <h2 className="main-title">{user.nombre}</h2>
        <p className="main-text">Correo: {user.email}</p>
        <p className="main-text">Rol: Administrador</p>
      </section>
      <section className="main-content">
        <h2 className="main-title">Opciones de administración</h2>
        <button type="button" className="main-button" disabled>Crear Torneo — Próximamente</button>
        <Link to="/torneos" className="main-button">Ver Torneos</Link>
        <Link to="/ranking" className="main-button">Ver Ranking</Link>
      </section>
    </>
  );
}
```

#### `frontend/src/pages/NotFoundPage.jsx`

```jsx
import { Link } from 'react-router';
import Hero from '../components/Hero.jsx';

export default function NotFoundPage() {
  return (
    <>
      <Hero title="404 — Página no encontrada" description="La dirección que buscas no existe." />
      <section className="main-content">
        <h2 className="main-title">Vuelve a explorar TCG App</h2>
        <Link to="/" className="main-button">Volver al inicio</Link>
      </section>
    </>
  );
}
```

### 14.9. Hoja de estilos completa

Este archivo ya incorpora los estilos originales y los ajustes de la sección 8. Copiarlo completo, sin importar también `stylesheet.css`, `App.css` o `index.css`.

#### `frontend/src/styles/global.css`

```css
* { box-sizing: border-box; }

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #10131a;
  color: white;
  line-height: 1.5;
}

#root { min-height: 100vh; display: flex; flex-direction: column; }
a { color: #bba6ff; }
button, input { font: inherit; }
button { cursor: pointer; }
button:disabled { cursor: not-allowed; background: #414657; color: #e2e4eb; }
a:focus-visible, button:focus-visible, input:focus-visible, [tabindex]:focus-visible {
  outline: 3px solid #c5b5ff;
  outline-offset: 4px;
}

.skip-link {
  position: absolute;
  top: -100px;
  left: 12px;
  padding: 10px 16px;
  background: #181c26;
  z-index: 10;
}
.skip-link:focus { top: 12px; }

header { background-color: #181c26; padding: 20px; }
.logo { display: block; width: 120px; max-width: 100%; height: auto; }
.navbar {
  width: 90%;
  max-width: 1280px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
}
.nav-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 24px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.nav-links a, .nav-button {
  color: white;
  text-decoration: none;
  font-weight: bold;
}
.nav-button { background: none; border: 0; padding: 0; }
.nav-links a:hover, .nav-links a.active, .nav-button:hover { color: #bba6ff; }
.nav-links a.active { text-decoration: underline; text-underline-offset: 5px; }

main { width: 80%; max-width: 1200px; margin: 0 auto; flex: 1; }
.hero-content {
  background-image: linear-gradient(#10131acc, #10131acc), url('../assets/tcgapp_banner.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  text-align: center;
  margin: 40px 0 30px;
  padding: 60px;
  border-radius: 10px;
}
.hero-title { font-size: 40px; line-height: 1.2; margin: 0 0 15px; }
.hero-text { color: #e1e4ed; font-size: 18px; margin: 0; }
.main-content { background-color: #181c26; padding: 30px; margin-bottom: 20px; border-radius: 10px; }
.main-title { color: white; margin-top: 0; }
.main-text, .main-list { color: #b4b8c2; }
.main-list { padding-left: 20px; }
.main-list li { margin-bottom: 5px; }
.main-button {
  display: inline-block;
  background-color: #6d4aff;
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  margin-top: 10px;
  margin-right: 10px;
  border: 0;
  border-radius: 5px;
  max-width: 100%;
}
.main-button:hover:not(:disabled) { background-color: #7754e8; }
.main-grid { margin: 50px 0; }
.tournament-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}
.tournament-card {
  background-color: #181c26;
  padding: 25px;
  border: 1px solid #333849;
  border-radius: 10px;
  min-width: 0;
  overflow-wrap: anywhere;
}
.tournament-card h3 { color: #bba6ff; font-size: 22px; margin-top: 0; }
.tournament-image { width: 100%; height: 180px; border-radius: 8px; margin-bottom: 15px; object-fit: cover; }

.login-content {
  width: min(100%, 460px);
  background-color: #181c26;
  margin: 40px auto;
  padding: 30px;
  border-radius: 10px;
}
.login-content h2 { text-align: center; }
.login-content label { display: block; margin: 15px 0 5px; }
.login-content input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #737b8e;
  border-radius: 5px;
  color: #10131a;
  background: white;
}
.login-content input[aria-invalid='true'] { border: 2px solid #ff9696; }
.form-error { color: #ff9696; }
.form-success { color: #9ce5b2; }
.form-success:empty { margin: 0; }

.table-container { overflow-x: auto; }
.ranking-table { width: 100%; min-width: 480px; border-collapse: collapse; margin-top: 20px; }
.ranking-table caption { text-align: left; color: #b4b8c2; margin-bottom: 12px; }
.ranking-table thead th { background-color: #6d4aff; padding: 12px; }
.ranking-table td, .ranking-table tbody th {
  background-color: #181c26;
  padding: 12px;
  text-align: center;
  border: 1px solid #333849;
}
.ranking-table tbody th { font-weight: normal; }

footer { background-color: #181c26; text-align: center; padding: 20px; margin-top: 40px; }
footer p { color: #a8aebb; margin: 0; }

@media (max-width: 1024px) {
  .tournament-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 768px) {
  main { width: 92%; }
  .navbar { width: 100%; flex-direction: column; gap: 16px; }
  .nav-links { gap: 12px; }
  .tournament-list { grid-template-columns: 1fr; }
  .hero-content { padding: 28px 16px; }
  .hero-title { font-size: 30px; }
  .main-content, .login-content { padding: 20px; overflow-wrap: anywhere; }
}
```

### 14.10. Arranque y comprobación al copiar los archivos

Con los bloques anteriores guardados y las cinco imágenes copiadas, ejecutar desde `frontend/`:

```powershell
npm run lint
npm run build
npm run dev
```

Abrir la URL que indique Vite. Comprobar primero `/`, `/torneos`, `/ranking` y `/registro`; después probar el login con las dos cuentas de la sección 10, la recarga del panel, el acceso con el rol equivocado y el cierre de sesión. Aplicar también la lista de la sección 13.

Para revisar la compilación, detener el servidor de desarrollo y ejecutar `npm run preview`. El frontend debe abrirse mediante el servidor, no haciendo doble clic en `index.html`.

No es necesario crear `login.js`, `registro.js` ni copiar `js/script.js`: los eventos de esos formularios están implementados en las páginas React. Los módulos de API de la sección 11 se escribirán cuando se conozca el contrato real de Spring Boot; no son necesarios para ejecutar estos archivos.

### 14.11. Verificación realizada sobre estos bloques

Se extrajeron los 30 archivos de esta sección a una carpeta temporal, se copiaron las imágenes originales y se instalaron las dependencias de la plantilla React de Vite. Entorno verificado: Node.js 22.20.0, React 19.2.8, React Router 7.18.4, Vite 8.3.4 y Oxlint 1.81.0. `@latest` puede instalar otras versiones al ejecutar la guía en el futuro; conservar el lockfile de la instalación elegida.

- Todos los imports relativos apuntaron a archivos existentes.
- `npm run lint` terminó sin errores.
- `npm run build` generó correctamente la aplicación y sus recursos.
- Pasaron 19 comprobaciones de credenciales demo, destinos por rol, persistencia, eliminación de sesión, almacenamiento corrupto o bloqueado, formato de fechas y datos originales.

No se realizó una prueba interactiva en navegador. La revisión visual, la navegación protegida en pantalla y los formularios deben comprobarse con la lista de la sección 13 al implementar la aplicación. El repositorio conserva su frontend original: el entregable de esta tarea es este documento con el código para copiar.
