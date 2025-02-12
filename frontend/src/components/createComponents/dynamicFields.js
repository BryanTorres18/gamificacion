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
                <div key={index} className=" bg-[#f8f8f8] mx-0 py-4 rounded-md grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pr-8 sm:pr-12">
                    <div className=" pl-4 flex flex-col sm:flex-row gap-4 align-center">
                        <label className="sm:my-2 text-sm font-medium text-[#686868] grow-0">Enunciado {index+1}</label>
                        <input
                            type="text"
                            value={field.enunciado}
                            onChange={(e) => handleFieldChange(index, "enunciado", e.target.value)}
                            className="p-1 border rounded-md grow focus:border-[#c6c6c6] focus:outline-none"
                            placeholder="Ingrese el enunciado"
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 align-center">
                        <label className="sm:my-2 text-sm font-medium text-[#686868] grow-0">Respuesta</label>
                        <input
                            type="text"
                            value={field.respuesta}
                            onChange={(e) => handleFieldChange(index, "respuesta", e.target.value)}
                            className="p-1 border rounded-md grow focus:border-[#c6c6c6] focus:outline-none"
                            placeholder="Ingrese la respuesta"
                        />
                    </div>
                </div>
            ))}

            {/* Botón para añadir más campos */}
            <button
                type="button"
                onClick={addField}
                className="self-end grow-0 bg-[#7f5c9c] hover:bg-[#dec5e3] text-white px-6 py-2 rounded-md mt-4"
            >
                + Agregar
            </button>
        </div>
    );
}


