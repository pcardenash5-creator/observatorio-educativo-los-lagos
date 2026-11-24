# Observatorio Educativo · Los Lagos

Versión preparada para GitHub Pages a partir de la versión 10 del Observatorio, publicada el 24 de noviembre de 2026. Los veinte archivos originales del sitio se conservan idénticos. No se modifican las bases integradas, cálculos, filtros, diseño, logotipos ni avisos institucionales.

**Estado de la migración:** copia privada preparada. La publicación pública en GitHub Pages está pendiente de autorización expresa. El flujo de despliegue permanece manual y no se ejecuta al subir archivos.

## Contenido

1. Titulación EMTP.
2. Autorizaciones docentes.
3. Programa de Integración Escolar.
4. Establecimientos y matrícula.
5. Evaluación y desarrollo profesional docente.
6. Asistencia escolar 2022–2025.
7. Convivencia y bienestar educativo.
8. Trayectorias educativas 2026: Educación General y EPJA como universos separados.

Los archivos del portal y los dashboards están en `site/`. Sus rutas relativas permiten publicarlos en la dirección de un proyecto de GitHub Pages, manteniendo navegación, apertura individual, descarga HTML y exportaciones de cada panel.

## Publicación inicial

1. Crear o seleccionar un repositorio en la cuenta u organización autorizada. El nombre propuesto es `observatorio-educativo-los-lagos`.
2. Incorporar **todo el contenido de este paquete** en la raíz del repositorio, incluyendo `.github/workflows/pages.yml` y la carpeta `site/`, en la rama `main`. No subir solamente el archivo ZIP ni agregar una carpeta contenedora adicional.
3. En el repositorio, abrir **Settings → Pages → Build and deployment → Source** y seleccionar **GitHub Actions**.
4. Abrir **Actions → Publicar Observatorio en GitHub Pages → Run workflow**. Las siguientes actualizaciones se publican desde Actions con Run workflow. El despliegue automático al actualizar main puede habilitarse una vez autorizada la publicación.
5. Esperar el despliegue correcto y abrir el enlace que GitHub indique en el entorno `github-pages` o en Settings → Pages. Esa es la dirección que se debe compartir; no se ha reservado ni verificado una dirección de GitHub en este paquete.

El sitio no requiere instalación de paquetes, compilación ni claves de acceso dentro de los archivos. El flujo usa exclusivamente las acciones oficiales de GitHub y publica la carpeta `site/`.

## Actualizaciones

Modificar los archivos necesarios dentro de `site/`, enviar los cambios a `main` y ejecutar manualmente el flujo de publicación cuando corresponda. Si solo cambia una base o dashboard, comprobar que las cifras de portada y `site/summary.json` sigan correspondiendo al mismo universo y corte. Conservar Educación General y EPJA por separado y las notas metodológicas de cada fuente.

Este paquete es una copia independiente. Las ediciones posteriores del Observatorio en Sites no se sincronizan automáticamente con GitHub. Tras completar la migración, se debe establecer cuál será el repositorio principal de mantenimiento.

## Uso institucional y acceso

El Observatorio Educativo de Los Lagos es una herramienta de trabajo de uso interno, destinada a las y los funcionarios del Ministerio de Educación de la Región de Los Lagos. Ha sido diseñado por el Departamento de Educación Regional para apoyar la elaboración del Diagnóstico Regional 2027. No se autoriza su uso con fines comerciales.

El aviso de uso interno declara la finalidad del instrumento; no es un control de acceso. La modalidad ordinaria de GitHub Pages publica el sitio en Internet. Publicarlo desde un repositorio privado no lo hace automáticamente privado. La publicación privada de Pages requiere una organización con GitHub Enterprise Cloud y la configuración de acceso correspondiente. No se ha cambiado la audiencia ni la publicación actual del Observatorio durante la preparación de este paquete.

## Integridad y procedencia

- Copia de la versión 10 del Observatorio.
- Commit de origen: `488fd4344f7dc9c5630d5cbbde070a64bf2a1098`.
- `INTEGRIDAD_SHA256.json` registra el SHA-256 de los veinte archivos originales, todos copiados sin cambios.
- `VERIFICACION.json` registra los controles realizados sobre el paquete.
- `ASSETS.md` documenta los logos y la tipografía GobCL.
- No se incluyen credenciales, el historial Git ni la configuración de alojamiento de Sites.

## Documentación oficial

- [Publicación automática de sitios web](https://docs.github.com/es/get-started/start-your-journey/deploying-your-website-automatically).
- [Flujos de trabajo de GitHub Pages](https://docs.github.com/es/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
- [Publicación privada en GitHub Pages](https://docs.github.com/en/enterprise-cloud@latest/pages/getting-started-with-github-pages/about-privately-published-github-pages-sites).
