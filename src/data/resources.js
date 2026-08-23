export const categories = [
  {
    id: 'todos',
    name: 'Todos',
    description: 'Todo el catálogo de recursos del centro.',
  },
  {
    id: 'pc',
    name: 'PC',
    color: '#38bdf8',
    description: 'Herramientas y guías para mantenimiento, reparación e instalación en computadoras Windows.',
  },
  {
    id: 'celulares',
    name: 'Celulares',
    color: '#34d399',
    description: 'Utilidades para administración, depuración y reparación de dispositivos móviles Android.',
  },
  {
    id: 'otros',
    name: 'Otros',
    color: '#a78bfa',
    description: 'Máquinas virtuales, drivers de impresoras y recursos adicionales.',
  },
]

export const types = [
  { id: 'todos', name: 'Todos' },
  { id: 'herramienta', name: 'Herramientas' },
  { id: 'guia', name: 'Guías' },
  { id: 'comando', name: 'Comandos' },
  { id: 'descarga', name: 'Descargas' },
]

export const typeLabels = {
  herramienta: 'Herramienta',
  guia: 'Guía',
  comando: 'Comando',
  descarga: 'Descarga',
}

export const resources = [
  {
    id: 'driver-booster',
    name: 'Driver Booster',
    category: 'pc',
    type: 'herramienta',
    source: 'APP QUE REPARA TODO.txt',
    url: 'https://www.iobit.com/es/driver-booster.php',
    description:
      'Detecta drivers desactualizados o con errores y los actualiza automáticamente. Ideal cuando un dispositivo no funciona correctamente.',
    tags: ['drivers', 'reparación', 'windows'],
  },
  {
    id: 'revo-uninstaller',
    name: 'Revo Uninstaller Pro',
    category: 'pc',
    type: 'herramienta',
    source: 'Forzar eliminacion de Apps',
    url: 'https://www.revouninstaller.com/es/products/revo-uninstaller-pro/',
    description:
      'Fuerza la eliminación de aplicaciones que no se dejan desinstalar y limpia los archivos y registros residuales que dejan atrás.',
    tags: ['desinstalador', 'limpieza', 'forzar'],
  },
  {
    id: 'ninite',
    name: 'Ninite',
    category: 'pc',
    type: 'herramienta',
    source: 'INSTALAR APP PRACTICO.txt',
    url: 'https://ninite.com/',
    description:
      'Instala varias aplicaciones populares de una sola vez, sin barras de herramientas ni software innecesario. Perfecto para formateos.',
    tags: ['instalador', 'apps', 'lote'],
  },
  {
    id: 'winutil',
    name: 'WinUtil (Chris Titus Tech)',
    category: 'pc',
    type: 'comando',
    source: 'INSTALADOR DE APP.txt',
    command: 'iwr -useb https://christitus.com/win | iex',
    requirement: 'Windows PowerShell como Administrador',
    description:
      'Suite todo-en-uno para instalar aplicaciones, aplicar ajustes al sistema, deshabilitar telemetría y optimizar Windows desde un solo panel.',
    tags: ['powershell', 'optimización', 'instalador'],
  },
  {
    id: 'gpedit',
    name: 'Habilitar Editor de Directivas de Grupo Local',
    category: 'pc',
    type: 'guia',
    source: 'Habilitar el Editor de Directivas de Grupo Local',
    url: 'https://www.mediafire.com/file/wvq07imzsmfli6e/Group_Policy.bat/file',
    urlLabel: 'Descargar Group_Policy.bat',
    description:
      'Activa gpedit.msc en ediciones de Windows que no incluyen el Editor de Directivas de Grupo Local (Home / Basic).',
    steps: [
      { text: 'Descarga el archivo Group_Policy.bat desde el enlace.' },
      { text: 'Ejecútalo como administrador.' },
      { text: 'Reinicia el equipo.' },
      { text: 'Verifica la instalación:', cmd: 'Win + R → gpedit.msc' },
    ],
    tags: ['gpedit', 'directivas', 'windows home'],
  },
  {
    id: 'usb-doble-particion',
    name: 'USB Doble Partición',
    category: 'pc',
    type: 'guia',
    source: 'UBS DOBLE PARTICION.txt',
    description:
      'Divide una memoria USB en dos particiones usando DiskPart desde la consola de Windows.',
    steps: [
      { text: 'Abre CMD como administrador e inicia DiskPart.', cmd: 'diskpart' },
      { text: 'Lista los discos conectados.', cmd: 'list disk' },
      { text: 'Selecciona el disco correspondiente a tu USB.', cmd: 'select disk ?' },
      { text: 'Muestra el detalle del disco elegido.', cmd: 'detail disk' },
      { text: 'Limpia la tabla de particiones.', cmd: 'clean' },
      { text: 'Habilita el volumen del USB en Administración de equipos.' },
    ],
    tags: ['usb', 'diskpart', 'particiones'],
  },
  {
    id: 'no-ejecuta-exe',
    name: 'Solución: No ejecuta App .exe',
    category: 'pc',
    type: 'guia',
    source: 'No ejecuta App.exe/Instruccion.JPG',
    file: 'PC/No ejecuta App.exe/Instruccion.JPG',
    description:
      'Instrucciones en imagen (incluida en el repositorio) para resolver cuando una aplicación .exe no se ejecuta en Windows.',
    tags: ['solución de problemas', 'exe'],
  },
  {
    id: 'adb-appcontrol',
    name: 'ADB AppControl',
    category: 'celulares',
    type: 'herramienta',
    source: 'DESISTALAR APP ANDROID.txt',
    url: 'https://adbappcontrol.com/en/',
    description:
      'Desinstala o deshabilita aplicaciones preinstaladas de Android sin root, gestiona permisos y aplica ajustes vía ADB desde la PC.',
    tags: ['android', 'adb', 'bloatware'],
  },
  {
    id: 'zofti-drivers',
    name: 'Drivers de todas las impresoras',
    category: 'otros',
    type: 'herramienta',
    source: 'DRIVERS DE TODAS LAS IMPRESORAS.txt',
    url: 'https://zofti.com/',
    description:
      'Sitio centralizado para descargar controladores de impresoras de las principales marcas (HP, Epson, Canon, Brother y más).',
    tags: ['impresoras', 'drivers'],
  },
  {
    id: 'vmware-workstation',
    name: 'VMware Workstation Pro 26H1',
    category: 'otros',
    type: 'descarga',
    source: 'OTROS/MAQUINAS VIRTUALES',
    file: 'OTROS/MAQUINAS VIRTUALES/VMware-Workstation-Full-26H1-25388281.exe',
    description:
      'Software de virtualización para crear y ejecutar máquinas virtuales con otros sistemas operativos. Instalador incluido en el repositorio.',
    tags: ['máquinas virtuales', 'virtualización'],
  },
]
