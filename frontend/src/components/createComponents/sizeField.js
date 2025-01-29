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
export default function SizeField({ size, setSize }) {
    /**
     * handleChange
     *
     * Maneja el cambio de valor en el menú desplegable.
     * Actualiza el tamaño seleccionado como un número.
     *
     * @param {Event} e - Evento del cambio del elemento select.
     */
    const handleChange = (e) => {
        setSize(Number(e.target.value)); // Guarda el valor seleccionado como número
    };

    return (
        /**
         * Contenedor principal del campo de selección de tamaño
         * - mt-6: Aplica un margen superior.
         */
        <div id="sizeField" className="mt-6">
            {/* Etiqueta del campo */}
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Tamaño del tablero
            </label>

            {/* Menú desplegable para seleccionar el tamaño */}
            <select
                value={size} // Tamaño actual seleccionado
                onChange={handleChange} // Maneja cambios en el valor seleccionado
                className="w-full p-2 border rounded-md" // Estilos para el menú desplegable
            >
                {/* Opción predeterminada deshabilitada */}
                <option value="" disabled>
                    Selecciona un tamaño
                </option>
                {/* Opciones de tamaño predefinidas */}
                <option value={10}>Pequeño (10x10)</option>
                <option value={15}>Mediano (15x15)</option>
                <option value={20}>Grande (20x20)</option>
            </select>
        </div>
    );
}


