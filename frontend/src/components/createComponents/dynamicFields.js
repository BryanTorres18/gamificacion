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
        <div>
            {/* Renderizar los campos dinámicos */}
            {fields.map((field, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Enunciado</label>
                        <input
                            type="text"
                            value={field.enunciado}
                            onChange={(e) => handleFieldChange(index, "enunciado", e.target.value)}
                            className="w-full p-2 border rounded-md"
                            placeholder="Ingrese el enunciado"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Respuesta</label>
                        <input
                            type="text"
                            value={field.respuesta}
                            onChange={(e) => handleFieldChange(index, "respuesta", e.target.value)}
                            className="w-full p-2 border rounded-md"
                            placeholder="Ingrese la respuesta"
                        />
                    </div>
                </div>
            ))}

            {/* Botón para añadir más campos */}
            <button
                type="button"
                onClick={addField}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
            >
                Añadir Más Campos
            </button>
        </div>
    );
}


