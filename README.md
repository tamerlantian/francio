# React Native Expo MVVC Boilerplate 🚀

Este es un boilerplate para aplicaciones móviles basado en [React Native](https://reactnative.dev/) y [Expo](https://expo.dev), implementando el patrón de arquitectura **MVVC (Model-View-ViewModel-Controller)** con una estructura modular para facilitar el desarrollo escalable y mantenible.

## Características principales

- ✅ **Arquitectura MVVC**: Separación clara de responsabilidades
- ✅ **Estructura modular**: Organización del código por módulos funcionales
- ✅ **Expo Router**: Sistema de navegación basado en archivos
- ✅ **Redux Toolkit**: Gestión de estado global
- ✅ **React Query**: Gestión de estado del servidor
- ✅ **TypeScript**: Tipado estático para prevenir errores

## Estructura del proyecto

```
├── app/                  # Rutas de la aplicación (Expo Router)
├── assets/               # Recursos estáticos (imágenes, fuentes, etc.)
├── src/
│   ├── modules/          # Módulos funcionales de la aplicación
│   │   └── [module]/     # Cada módulo sigue la estructura MVVC
│   │       ├── models/   # Modelos de datos
│   │       ├── views/    # Componentes de UI
│   │       ├── viewModels/ # Lógica de presentación
│   │       └── controllers/ # Lógica de negocio
│   └── store/            # Configuración de Redux
└── scripts/              # Scripts de utilidad
```

## Comenzando

### Requisitos previos

- Node.js (versión 18 o superior)
- npm o yarn
- Expo CLI

### Instalación

1. Clona este repositorio

   ```bash
   git clone [url-del-repositorio]
   cd rn-expo-mvvc
   ```

2. Instala las dependencias

   ```bash
   npm install
   # o
   yarn install
   ```

3. Inicia la aplicación

   ```bash
   npm start
   # o
   yarn start
   ```

## Desarrollo con arquitectura MVVC

### Model (Modelo)

Representa los datos y la lógica de negocio. Define cómo se almacenan, manipulan y procesan los datos.

### View (Vista)

Componentes de UI puros que muestran información al usuario y envían las interacciones del usuario al ViewModel.

### ViewModel (Modelo de Vista)

Actúa como intermediario entre el Modelo y la Vista. Procesa los datos del Modelo para presentarlos en la Vista y maneja las interacciones del usuario.

### Controller (Controlador)

Maneja la lógica de negocio y la comunicación con servicios externos como APIs.

## Proyecto limpio

Para comenzar con un proyecto limpio, ejecuta:

```bash
npm run reset-project
```

Este comando moverá el código de ejemplo a un directorio **app-example** y creará un directorio **app** en blanco donde podrás comenzar a desarrollar.

## Tecnologías principales

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Query](https://tanstack.com/query/latest)
- [TypeScript](https://www.typescriptlang.org/)
- [Axios](https://axios-http.com/)
