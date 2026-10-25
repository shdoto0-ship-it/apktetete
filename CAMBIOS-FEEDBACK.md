# Cambios del feedback

1. **Millas**: Ajustes → Unidades → `mi` ahora convierte en Inicio, Entrenar, Análisis, Perfil, Widgets, Mapa y Logros.
   - Distancias y velocidad: km → mi, km/h → mph.
   - Distancias cortas del mapa y de los puntos: m → ft.
   - Bici: 435 pasos por km se muestran como 700 pasos por milla.
   - Lo guardado (pasos y kilómetros) no cambia; solo se convierte al mostrar.
2. **Inglés**: todas las pantallas, botones, avisos, mensajes de error, fechas y la pestaña del navegador cambian a inglés y vuelven a español. Los nombres que escriben los estudiantes no se tocan.

## Archivos nuevos
- `src/lib/i18n.ts`: hook `useI18n()` (idioma, `t()`, conversión de unidades).
- `src/lib/i18n.test.ts`: pruebas (cada frase de la app debe tener traducción).

## Archivos principales editados
- `src/lib/translations.ts` (catálogo completo y función `translate`), `src/lib/store.tsx`, `src/components/app/*` y todas las rutas en `src/routes`.

Para correr las pruebas: `bun run test`.

# App Android independiente (feedback del APK)

Problema: el APK anterior solo abría la página web dentro de un envoltorio, por eso no funcionaba sin internet, no contaba pasos, no contaba con la pantalla apagada y no tenía widgets.

Ahora el APK es una app Android real (Capacitor):
- **Sin internet**: toda la app va dentro del APK. Tras entrar una vez, abre y funciona sin conexión; los pasos se guardan y se suben al volver la red.
- **Pasos**: sensor de pasos del teléfono (servicio en primer plano), también con la pantalla apagada y con la app cerrada. Se reanuda al encender el teléfono.
- **Widgets**: pequeño (anillo de la meta) y mediano (pasos de hoy y carrera 9° vs 10°), con botón para agregarlos desde Ajustes → Widgets.
- Permisos de Android: actividad física, notificaciones, ubicación y cámara (pulso).

Archivos nuevos: `vite.native.config.ts`, `native.html`, `capacitor.config.json`, `scripts/`, `native/android/` (código Java y recursos), `src/lib/native.ts`, `src/lib/offline-auth.ts`, `src/components/app/native-card.tsx`, `.github/workflows/android-apk.yml`, `LEEME-ANDROID.md`.
Cómo obtener el APK: ver `LEEME-ANDROID.md`.
