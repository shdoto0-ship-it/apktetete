# Podómetro B.S — app Android independiente

Antes, el APK solo abría la página web dentro de una ventana, por eso no funcionaba sin internet, no contaba pasos y no tenía widgets. Ahora el APK es una **app Android real** (Capacitor):

| Antes (página en un APK) | Ahora |
|---|---|
| Necesitaba internet para abrir | Toda la app va **dentro del APK**. Abre sin internet (después de entrar una vez). |
| No contaba pasos | Usa el **sensor de pasos del teléfono**. |
| No contaba con la pantalla apagada | **Servicio en segundo plano** (notificación fija «Podómetro B.S · N pasos hoy»). También cuenta con la app cerrada y se reactiva al encender el teléfono. |
| Sin widgets | **Widget pequeño** (anillo de la meta) y **mediano** (pasos de hoy y carrera 9° vs 10°). |
| Sin internet no dejaba entrar | La sesión queda guardada en el teléfono; los pasos se guardan y **se suben solos al volver la red**. |

## Cómo obtener el APK (sin instalar nada)

El proyecto ya trae un flujo de GitHub que compila el APK en la nube.

1. En Lovable conecta el proyecto a GitHub (ya lo está si ves el repositorio) y deja que se sincronicen estos archivos.
2. En GitHub: **Actions → «Compilar APK de Android» → Run workflow** (también corre solo al subir cambios a `main`).
3. Espera unos 8–15 minutos. Descarga el APK de dos formas:
   - **Releases → «APK más reciente»** → `podometro-bs.apk`, o
   - la ejecución en **Actions → Artifacts → podometro-bs-apk** (viene dentro de un .zip).
4. Pásalo al teléfono, ábrelo y permite «instalar apps desconocidas». **Desinstala antes el APK anterior** (es otra app distinta).

### Firma estable (para actualizar sin desinstalar)
Cada compilación nueva usa una llave temporal, así que Android no deja instalar encima de la versión anterior. Para evitarlo, una sola vez:

```sh
keytool -genkeypair -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Android Debug,O=Android,C=US"
base64 -w0 debug.keystore      # copia el resultado
```
En GitHub: **Settings → Secrets and variables → Actions → New repository secret**, nombre `DEBUG_KEYSTORE_BASE64`, pega el texto. Guarda `debug.keystore` en un lugar seguro.

## Compilar en tu computador (opcional)
Requisitos: Node 22, JDK 21 y Android Studio (o el SDK de Android).

```sh
bun install            # o npm install
bun run build:native   # compila la web que va dentro del APK  → ./www
node scripts/android-setup.mjs   # crea ./android, copia el código nativo y sincroniza
cd android && ./gradlew assembleDebug
# APK: android/app/build/outputs/apk/debug/app-debug.apk
```
`npm run android:open` abre el proyecto en Android Studio.

## Primera vez en el teléfono
1. Abre la app → elige idioma → **Permitir y continuar** (acepta *Actividad física*, *Notificaciones* y *Ubicación*).
2. Entra con tu cuenta (**esta primera vez necesita internet**). Después ya abre sin conexión.
3. Ve a **Ajustes → Ver widgets**: ahí puedes **agregar los widgets** y ver si el conteo está *Activo*.
4. Toca **Quitar ahorro de batería** y elige *Sin restricciones*. En Xiaomi/Huawei/Samsung/Oppo además activa «Inicio automático» / «Permitir actividad en segundo plano»; si no, el teléfono puede matar el conteo.

## Lista de prueba (con el teléfono real)
- [ ] Modo avión: abre la app, se ve el inicio y los pasos de hoy.
- [ ] Apaga la pantalla, camina ~100 pasos, enciéndela: el contador sube (~100).
- [ ] Cierra la app desde recientes, camina 50 pasos, ábrela: suben.
- [ ] Reinicia el teléfono: la notificación vuelve sola.
- [ ] Desactiva el modo avión: Ajustes muestra «Guardado en la nube» y el ranking refleja tus pasos.
- [ ] El widget se actualiza al caminar y al cambiar de día.

## Qué cambia respecto a la versión web
- **Caminar** se cuenta solo todo el día (no hace falta pulsar «Empezar»). **Saltos y bicicleta** siguen necesitando una sesión con la pantalla encendida.
- «Iniciar sesión con Lovable» no aparece en la app (abre una ventana del navegador); usa correo y contraseña. Los correos de confirmación abren la página web publicada.
- El **panel de administrador** (restablecer contraseñas) solo existe en la versión web.
- El mapa de Google y la tipografía necesitan internet; sin conexión la app usa un aviso y la tipografía del sistema. Si el mapa no carga en el APK, añade `https://localhost/*` a las direcciones permitidas de la clave de Google Maps.
- Los pasos de hoy en el widget = lo guardado en la app + lo que el sensor contó desde la última vez que se abrió.

## Notas técnicas
- La app del teléfono se compila con `vite.native.config.ts` (SPA estática, sin servidor); la web publicada sigue usando `vite.config.ts` sin cambios.
- Código nativo en `native/android/` (servicio `StepService`, `PodometroPlugin`, widgets, receptor de arranque). `scripts/android-setup.mjs` lo copia al proyecto Android y añade permisos y componentes al manifiesto; es seguro repetirlo.
- Los pasos nativos pasan a la app en bloques numerados (`peek`/`ack`), así que no se pierden ni se duplican si la app se cierra a mitad.
- `targetSdk` queda en 34 para que Android 15 no dibuje la app debajo de la barra de estado. Para Google Play súbelo a 35 y ajusta los márgenes.
- Identificador de la app: `com.podometrobs.app` (en `capacitor.config.json`).
