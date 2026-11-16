# MarioFuentes

Sitio corporativo en React y Vite, con diseño de referencia de AX Group.

## Desarrollo local

Con Node.js 22.12 o superior, ejecuta:

```sh
npm install
npm run dev
```

Vite abre automáticamente http://127.0.0.1:5190/ en el navegador. Para generar la versión de producción en `dist/`, ejecuta `npm run build`.

Los sectores son ilustrativos. La sección de contacto queda pendiente de los datos oficiales.

## Publicación en Netlify

1. En Netlify, crea un proyecto importando el repositorio de GitHub `josemedina1/MarioFuentes`.
2. Selecciona la rama `main` y deja el directorio base en la raíz del repositorio.
3. Netlify lee `netlify.toml` y usa Node.js 24, `npm run build` y el directorio de publicación `dist`.
4. Publica el proyecto. Los siguientes cambios en `main` activarán nuevos despliegues.

Las dependencias se instalan con pnpm 11.25.0 y el archivo `pnpm-lock.yaml` existente. El frontend actual no requiere variables de entorno ni claves privadas. La navegación utiliza anclas (`#sobre-nosotros`, `#sector-de-negocios` y `#contactanos`).
