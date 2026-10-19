# ERS V2 — TCG App React

## Propósito

TCG App permite consultar torneos y ranking de juegos de cartas coleccionables. Los administradores de demostración pueden gestionar torneos desde una interfaz React.

## Tecnología

- React con JavaScript y Vite.
- React Router para la navegación.
- CSS propio y responsivo.
- `localStorage` para los torneos.
- `sessionStorage` para la sesión de demostración.

Spring Boot no forma parte de esta versión. No existe comunicación con una API ni base de datos remota.

## Roles

| Rol | Acceso |
| --- | --- |
| Visitante | Inicio, torneos, detalle, ranking, login y registro. |
| Jugador | Perfil, torneos y ranking. |
| Administrador | Panel y CRUD de torneos. |

## Requisitos funcionales

1. El sistema debe permitir navegar entre inicio, torneos, ranking, login y registro sin recargar el documento completo.
2. El sistema debe mostrar tres torneos iniciales y permitir filtrar por nombre y juego.
3. El sistema debe mostrar el detalle de un torneo existente y un mensaje cuando no exista.
4. El administrador debe poder crear, editar y eliminar torneos.
5. El sistema debe validar los datos obligatorios del torneo, el cupo y la cantidad de inscritos.
6. Los cambios del CRUD deben mantenerse al recargar la misma aplicación en el navegador.
7. El sistema debe permitir iniciar sesión con las cuentas demo documentadas.
8. El sistema debe limitar el acceso al panel de jugador o administrador según el rol de la sesión.
9. El registro debe validar los datos ingresados y comunicar que no crea una cuenta real.
10. El sistema debe permitir cerrar sesión.

## Datos de demostración

| Rol | Correo | Contraseña |
| --- | --- | --- |
| Administrador | `admin@tcgapp.cl` | `admin123` |
| Jugador | `user@tcgapp.cl` | `user123` |

Los torneos se guardan localmente con la clave `tcgapp.torneos`. La sesión usa la clave `tcgapp.demo.user` y no guarda contraseñas.

## Requisitos no funcionales

- La aplicación debe ser utilizable en móvil, tablet y escritorio.
- Los controles interactivos deben mostrar foco visible al navegar con teclado.
- Las imágenes deben tener texto alternativo.
- La tabla de ranking puede desplazarse horizontalmente dentro de su contenedor en pantallas estrechas.
- La aplicación debe compilar con Vite sin errores.

## Límites actuales

- Los datos locales pertenecen a cada navegador y no se comparten entre usuarios.
- La autorización por rol solo controla la navegación de demostración; no sustituye la seguridad de un backend.
- No existen inscripción a torneos, pagos, cálculo de ranking ni registro persistente.
