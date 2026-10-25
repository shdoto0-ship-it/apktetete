# Cuentas y actividad en la nube
# Idioma y unidades
- [ ] Traducir toda la interfaz y las fechas al elegir English.
- [ ] Convertir las distancias y velocidades visibles según km/mi sin alterar la actividad guardada.
- [ ] Verificar ambos ajustes con pruebas y un recorrido en la aplicación.

# Cuentas y actividad en la nube
- [x] Crear cuentas por correo y perfiles privados con autenticación real.
- [x] Guardar actividad con reintentos sin duplicar pasos y compartir Tops en tiempo real (dos navegadores, 3 pasos y reintento de 120 = 123).
- [x] Conservar perfiles, preferencias y datos personales al recargar y cambiar de teléfono.
- [x] Verificar inicio de sesión y actividad compartida con cuentas temporales eliminadas al terminar; 21 pruebas correctas.
- [ ] Confirmar llegada del correo de activación y recuperación a un correo real: requiere una bandeja del usuario.

# Control del conteo
- [x] Contar pasos, saltos y bicicleta solo durante sesiones iniciadas, respetando pausa, fin y salida.
- [x] Verificar inicio, pausa y fin con sensores simulados (pruebas y recorrido en navegador para caminar, saltar y bici).
- [x] Conteo con pantalla apagada: servicio nativo de Android (sensor de pasos) con permiso de actividad física, notificación fija y reinicio al encender el teléfono (código escrito).
- [ ] Probar el conteo con pantalla apagada en un teléfono real (caminar 100 pasos con la pantalla apagada y abrir la app).

# Limpieza y conexión del remix
- [x] Quitar usuarios y cifras ficticias de Tops y del contador 9° vs 10°, conservando registros reales.
- [x] Vincular una conexión administrada de Google Maps al proyecto remixeado (visualización requiere un dominio autorizado).
- [x] Verificar rankings vacíos y totales reales con pruebas y registro completo en navegador.

# Medición de pulso
- [x] Agregar captura de cámara y estimación de pulso durante 30 segundos en Salud.
- [x] Mostrar calidad de señal, permisos, cancelación y orientación no diagnóstica.
- [x] Probar duración, señales válidas e inválidas y recorrido visible (12 pruebas; cámara artificial de 72 lpm, permisos y cancelación).
- [ ] Validar precisión con un dedo real y distintos teléfonos: requiere dispositivos físicos; no se afirma precisión médica.

# Inicio de sesión con Lovable
- [x] Activar el proveedor Lovable y añadir el botón «Iniciar sesión con Lovable» en la pantalla de entrada.
- [x] Pedir el grado a quien entra con una cuenta social (asistente de perfil y Ajustes) y guardarlo en la nube, para que sus pasos sumen al grado correcto.
- [x] Comprobar en navegador: botón visible y activo, cuenta sin grado llega al asistente, el grado elegido se conserva al recargar y se puede cambiar en Ajustes (24 pruebas correctas).
- [ ] Entrar con una cuenta real de Lovable desde la vista previa: requiere la sesión de Lovable del usuario.

# Empaquetado como aplicación de teléfono
- [x] Crear la ficha de la app (nombre, iconos, colores, apertura a pantalla completa) y recortar el logo a los tamaños que piden los empaquetadores.
- [x] Comprobar que la ficha y los iconos se sirven bien y que la app sigue cargando sin errores (24 pruebas correctas).
- [x] Empaquetar en un APK real con Capacitor: la web va dentro del APK (abre sin internet), con widgets y conteo nativo; se compila con GitHub Actions (.github/workflows/android-apk.yml).
- [ ] Compilar el APK por primera vez y probarlo en un teléfono (ver LEEME-ANDROID.md).
