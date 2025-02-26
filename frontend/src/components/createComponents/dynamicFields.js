/**
 * Componente DynamicFields
 *
 * Este componente permite gestionar dinámicamente un conjunto de campos de entrada
 * para enunciados y respuestas. Ofrece funcionalidades para añadir más campos y
 * aplicar restricciones en los valores ingresados.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {Array} props.fields - Lista de campos actuales (cada campo es un objeto con `enunciado` y `respuesta`).
 * @param {function} props.setFields - Función para actualizar la lista de campos.
 * @returns {JSX.Element} - Una interfaz para gestionar campos dinámicos de entrada.
 */
export default function DynamicFields({ fields, setFields }) {
    /**
     * handleFieldChange
     *
     * Maneja los cambios en los valores de los campos.
     * Aplica restricciones específicas para el campo "respuesta".
     *
     * @param {number} index - Índice del campo que se está modificando.
     * @param {string} key - Clave del campo (`enunciado` o `respuesta`).
     * @param {string} value - Nuevo valor ingresado por el usuario.
     */
    const handleFieldChange = (index, key, value) => {
        const updatedFields = [...fields];

        if (key === "respuesta") {
            // Restringir valores solo para el campo "respuesta"
            const formattedValue = value
                .toUpperCase() // Convertir a mayúsculas
                .replace(/[^A-Z]/g, ""); // Eliminar caracteres no alfabéticos

            if (formattedValue.length <= 10) {
                updatedFields[index][key] = formattedValue;
            }
        } else {
            // Permitir cualquier valor para el campo "enunciado"
            updatedFields[index][key] = value;
        }

        setFields(updatedFields);
    };

    /**
     * addField
     *
     * Agrega un nuevo campo vacío (`enunciado` y `respuesta`) a la lista de campos.
     */
    const addField = () => {
        setFields([...fields, { enunciado: "", respuesta: "" }]);
    };

    return (
        <div className="flex flex-col px-8">
            {/* Renderizar los campos dinámicos */}
            {fields.map((field, index) => (
                <div key={index} className="bg-gray-50 rounded-md p-4 mb-4">
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
                        <div className="flex flex-col md:flex-row md:items-center mb-4 md:mb-0 w-full md:w-1/2">
                            <label className="font-bold text-gray-700 mb-2 md:mb-0 md:mr-4 md:w-32 flex-shrink-0">
                                Enunciado {index + 1}
                            </label>
                            <input
                                type="text"
                                value={field.enunciado}
                                onChange={(e) => handleFieldChange(index, "enunciado", e.target.value)}
                                className="p-2 border rounded-md w-full focus:border-purple-400 focus:outline-none"
                                placeholder="Ingrese el enunciado"
                            />
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center w-full md:w-1/2">
                            <label className="font-bold text-gray-700 mb-2 md:mb-0 md:mr-4 md:w-24 flex-shrink-0">
                                Respuesta
                            </label>
                            <input
                                type="text"
                                value={field.respuesta}
                                onChange={(e) => handleFieldChange(index, "respuesta", e.target.value)}
                                className="p-2 border rounded-md w-full focus:border-purple-400 focus:outline-none"
                                placeholder="Ingrese la respuesta"
                            />
                        </div>
                    </div>
                </div>
            ))}

            {/* Botón para añadir más campos */}
            <div className="flex justify-end mt-4">
                <button
                    type="button"
                    onClick={addField}
                    className="bg-[#7f5c9c] hover:bg-[#dec5e3] text-white font-medium py-2 px-4 rounded-md flex items-center"
                >
                    <span className="mr-1">+</span> Agregar
                </button>
            </div>
        </div>
    );
}


