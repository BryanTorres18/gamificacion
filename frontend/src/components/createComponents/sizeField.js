/**
 * Componente SizeField
 *
 * Este componente permite al usuario seleccionar el tamaño de un tablero para el juego.
 * Proporciona un menú desplegable con opciones predefinidas.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {number} props.size - Tamaño actual seleccionado del tablero.
 * @param {function} props.setSize - Función para actualizar el tamaño del tablero.
 * @returns {JSX.Element} - Un campo de selección de tamaño con un menú desplegable.
 */

import { useState } from "react";
export default function SizeField({ size, setSize }) {
    /**
     * handleChange
     *
     * Maneja el cambio de valor en el menú desplegable.
     * Actualiza el tamaño seleccionado como un número.
     *
     * @param {Event} e - Evento del cambio del elemento select.
     */
    // const handleChange = (e) => {
    //     setSize(Number(e.target.value)); // Guarda el valor seleccionado como número
    // };

    const [selectedButton, setSelectedButton] = useState(15);

  const handleButtonClick = (value) => {
    console.log(value);
      setSelectedButton(value);
      setSize(Number(value));

  };

    return (
        /**
         * Contenedor principal del campo de selección de tamaño
         * - mt-6: Aplica un margen superior.
         */

        <div className="flex space-x-4">
             {/* Etiqueta del campo */}
             <label className="block text-sm font-medium text-[#7f5c9c] mb-2">
                Tamaño del tablero
            </label>
      <button
        className={`px-4 py-2 rounded-full border-[#c6c6c6] ${
          selectedButton === 10 ? 'border-none bg-[#7f5c9c] text-gray-100' : 'bg-gray-200 text-gray-700 border-2'
        }`}
        onClick={() => handleButtonClick(10)}
        
      >
        Pequeño
      </button>
      <button
        className={`px-4 py-2 rounded-full ${
          selectedButton === 15 ? 'border-none bg-[#7f5c9c] text-gray-100' : 'bg-gray-200 text-gray-700 border-2'
        }`}
        onClick={() => handleButtonClick(15)}
        
      >
        Mediano
      </button>
      <button
        className={`px-4 py-2 rounded-full border-[#c6c6c6] ${
          selectedButton === 20 ? 'border-none bg-[#7f5c9c] text-gray-100' : 'bg-gray-200 text-gray-700 border-2'
        }`}
        onClick={() => handleButtonClick(20)}
        
      >
        Grande
      </button>
    </div>
       
    );
}


