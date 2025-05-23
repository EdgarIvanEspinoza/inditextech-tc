# Proyecto: **InditexTech Technical Challenge**

## Descripción

Este proyecto es una interfaz interactiva para gestionar productos en filas utilizando drag-and-drop (arrastrar y soltar). Permite reordenar productos, agregar productos nuevos, eliminar productos y modificar la alineación de las filas. La funcionalidad de zoom permite ajustar la visualización del editor, facilitando la gestión de grandes cantidades de productos.

El componente SortableRow permite reordenar y gestionar productos dentro de filas, mientras que el zoom puede aumentar o disminuir el tamaño de la vista para ver más o menos productos de manera más cómoda.

## Características

- **Drag & Drop**: Permite reordenar productos dentro de una fila o entre diferentes filas.
- **Alineación de filas**: Las filas pueden alinearse a la izquierda, al centro o a la derecha.
- **Zoom dinámico**: Control de zoom para ajustar la vista del editor y ver más o menos filas de productos.
- **Agregar y eliminar productos**: Capacidad para agregar nuevos productos a cada fila o eliminar productos existentes.
- **Prevención de eliminación de productos únicos**: No se permite eliminar un producto si es el único dentro de la fila.

## Tecnologías utilizadas

- **React**: Biblioteca principal para la creación de componentes.
- **Tailwind CSS**: Utilizado para estilos rápidos y responsivos.
- **dnd-kit**: Biblioteca para implementar la funcionalidad de drag-and-drop.
- **Next.js**: Framework para la creación de aplicaciones React con renderizado del lado del servidor (SSR).
- **TypeScript**: Superset de JavaScript para tipos estáticos y mayor seguridad en el desarrollo.

## Instalación

### Prerrequisitos

Asegúrate de tener **Node.js** y **npm** instalados en tu máquina. Puedes descargarlos e instalarlos desde [Node.js](https://nodejs.org/).

### Pasos de instalación

1. Clona el repositorio del proyecto:

   ```bash
   git clone https://github.com/EdgarIvanEspinoza/inditextech-tc.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd inditextech-tc
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Ejecuta la aplicación localmente:

   ```bash
   npm run dev
   ```

5. Accede al proyecto en tu navegador en `http://localhost:3000`.

## Uso

### Estructura del Proyecto

- **`/components`**: Contiene todos los componentes reutilizables.

  - `SortableRow.tsx`: Componente para manejar filas interactivas con productos.
  - `ProductCard.tsx`: Componente para cada producto individual.
  - `ZoomSlider.tsx`: Componente para controlar el zoom en el editor.

- **`/hooks`**: Contiene hooks personalizados para manejar el estado.

  - `useEditorState.ts`: Hook principal para gestionar las filas, productos y acciones de edición.

- **`/mocks`**: Datos simulados para productos.

  - `mocks.ts`: Datos de productos de ejemplo para poblar las filas.

### Características del Editor

1. **Reordenar productos**: Haz clic y arrastra los productos dentro de las filas o entre filas.
2. **Agregar productos**: Usa el botón "+" para agregar un nuevo producto a la fila.
3. **Eliminar productos**: Usa el botón de la "X" para eliminar productos, asegurándote de que no se elimine el único producto en la fila.
4. **Alineación**: Cambia la alineación de la fila a izquierda, centro o derecha.
5. **Zoom**: Ajusta el zoom para ver más o menos productos, con un control estilo "volumen" para una experiencia fluida.

## Personalización

Puedes personalizar el estilo y las funcionalidades de este proyecto para adaptarlo a tus necesidades. Algunos de los parámetros que puedes ajustar:

- **Tamaño máximo de productos por fila**: Actualmente está limitado a 3.
