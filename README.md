# MarioFuentes

Sitio corporativo en React y Vite, con diseño de referencia de AX Group.

## Desarrollo local

Con Node.js 22.12 o superior, ejecuta:

```sh
npm install
npm run dev
```

Vite abre automáticamente http://127.0.0.1:5190/ en el navegador. Para generar la versión de producción en `dist/`, ejecuta `npm run build`.

Los sectores son ilustrativos.

## Formulario de contacto

La sección `#contactanos` incluye un formulario (nombre, empresa, correo, teléfono y mensaje) que envía los datos por correo mediante [FormSubmit](https://formsubmit.co), sin backend ni claves privadas.

- El correo de destino está en la constante `CONTACT_EMAIL` al inicio de `site.jsx` (actualmente `jmedina@tsgenviro.com`). Para cambiarlo, edita esa línea y vuelve a publicar.
- **Activación:** la primera vez que se envíe el formulario a un correo nuevo, FormSubmit manda a ese correo un mensaje con el enlace "Activate Form". Hasta hacer clic en él, los envíos no se entregan. Esto se repite cada vez que se cambie el correo de destino.
- El formulario incluye un campo oculto anti-spam (`_honey`).

## Publicación en Netlify

1. En Netlify, crea un proyecto importando el repositorio de GitHub `josemedina1/MarioFuentes`.
2. Selecciona la rama `main` y deja el directorio base en la raíz del repositorio.
3. Netlify lee `netlify.toml` y usa Node.js 24, `npm run build` y el directorio de publicación `dist`.
4. Publica el proyecto. Los siguientes cambios en `main` activarán nuevos despliegues.

Las dependencias se instalan con pnpm 11.25.0 y el archivo `pnpm-lock.yaml` existente. El frontend actual no requiere variables de entorno ni claves privadas. La navegación utiliza anclas (`#sobre-nosotros`, `#sector-de-negocios` y `#contactanos`).
