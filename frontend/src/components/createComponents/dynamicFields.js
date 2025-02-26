import { useState, useEffect } from "react";
import { toast } from "sonner";  // Importa Sonner para mostrar las alertas

/**
 * Componente DynamicFields
 *
 * Este componente permite gestionar dinámicamente un conjunto de campos de entrada
 * para enunciados y respuestas. Ofrece funcionalidades para añadir más campos y
 * eliminar los existentes, asegurando que siempre haya al menos un campo visible.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {Array} props.fields - Lista de campos actuales (cada campo es un objeto con `enunciado` y `respuesta`).
 * @param {function} props.setFields - Función para actualizar la lista de campos.
 * @returns {JSX.Element} - Una interfaz para gestionar campos dinámicos de entrada.
 */
export default function DynamicFields({ fields, setFields }) {

    /**
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
            updatedFields[index][key] = value;
        }

        setFields(updatedFields);
    };

    /**
     * Agrega un nuevo campo vacío (`enunciado` y `respuesta`) a la lista de campos.
     */
    const addField = () => {
        setFields([...fields, { enunciado: "", respuesta: "" }]);
        toast.success("Campo agregado", {
            style: {
                color: 'white',
                fontSize: '16px',
                padding: '16px',
                borderRadius: '8px',
                width: '400px',
                background: '#7F5C9C',
            },
            duration: 3000,
            position: 'bottom-right',
            closeButton: true,
        });
    };

    /**
     * Elimina un campo específico de la lista.
     * Si es el último campo, muestra una alerta para evitar dejar la lista vacía.
     *
     * @param {number} index - Índice del campo a eliminar.
     */
    const removeField = (index) => {
        if (fields.length > 1) {
            const updatedFields = [...fields];
            updatedFields.splice(index, 1); // Elimina el campo en el índice especificado
            setFields(updatedFields);
            toast.success("Campo eliminado", {
                style: {
                    color: 'white',
                    fontSize: '16px',
                    padding: '16px',
                    borderRadius: '8px',
                    width: '400px',
                    background: '#C70039',
                },
                duration: 3000,
                position: 'bottom-right',
                closeButton: true,
            });
        } else {
            // Si solo hay un campo, mostrar una advertencia
            toast.error("Debe haber al menos un campo.", {
                style: {
                    color: 'white',
                    fontSize: '16px',
                    padding: '16px',
                    borderRadius: '8px',
                    width: '400px',
                    background: '#FFBF00',
                },
                duration: 3000,
                position: 'bottom-right',
                closeButton: true,
            });
        }
    };

    return (
        <div className="flex flex-col px-8">
            {/* Renderizar los campos dinámicos */}
            {fields.map((field, index) => (
                <div key={index} className="bg-gray-50 rounded-md p-4 mb-4">
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
                        {/* Campo de Enunciado */}
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

                        {/* Campo de Respuesta */}
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

                        {/* Botón para eliminar el campo */}
                        <button
                            type="button"
                            onClick={() => removeField(index)}
                            className="bg-[#7f5c9c] hover:bg-[#dec5e3] ml-4 text-white hover:text-red-700 font-medium py-2 px-4 rounded-md"
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            ))}

            {/* Botón para agregar más campos */}
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




