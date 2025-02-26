import { useState } from "react";

/**
 * Componente SizeField
 *
 * Este componente permite al usuario seleccionar el tamaño de un tablero para el juego.
 * Proporciona botones para seleccionar entre tamaños predefinidos.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {number} props.size - Tamaño actual seleccionado del tablero.
 * @param {function} props.setSize - Función para actualizar el tamaño del tablero.
 * @returns {JSX.Element} - Un campo de selección de tamaño con botones.
 */
export default function SizeField({ size, setSize }) {
    const [selectedButton, setSelectedButton] = useState(size);

    /**
     * handleButtonClick
     *
     * Maneja el clic en los botones de tamaño.
     * Actualiza el tamaño seleccionado y el estado del tamaño.
     *
     * @param {number} value - Valor del tamaño seleccionado.
     */
    const handleButtonClick = (value) => {
        setSelectedButton(value);
        setSize(value);
    };

    return (
        <div className="space-y-4 pb-6">
            <label className="block text-lg font-bold text-[#7f5c9c] mb-2 pb-2">
                Tamaño del tablero
            </label>
            <div className="flex flex-wrap gap-6 pl-6">
                <button
                    type="button"
                    className={`px-6 py-2 rounded-full border font-bold ${
                        selectedButton === 10
                            ? 'bg-[#7f5c9c] text-white border-transparent'
                            : 'bg-white text-gray-700 border-[#c6c6c6] hover:bg-gray-100'
                    } transition-colors`}
                    onClick={() => handleButtonClick(10)}
                >
                    Pequeño
                </button>
                <button
                    type="button"
                    className={`px-6 py-2 rounded-full border font-bold ${
                        selectedButton === 15
                            ? 'bg-[#7f5c9c] text-white border-transparent'
                            : 'bg-white text-gray-700 border-[#c6c6c6] hover:bg-gray-100'
                    } transition-colors`}
                    onClick={() => handleButtonClick(15)}
                >
                    Mediano
                </button>
                <button
                    type="button"
                    className={`px-6 py-2 rounded-full border font-bold ${
                        selectedButton === 20
                            ? 'bg-[#7f5c9c] text-white border-transparent'
                            : 'bg-white text-gray-700 border-[#c6c6c6] hover:bg-gray-100'
                    } transition-colors`}
                    onClick={() => handleButtonClick(20)}
                >
                    Grande
                </button>
            </div>
        </div>
    );
}


