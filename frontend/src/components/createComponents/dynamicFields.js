export default function DynamicFields({ fields, setFields }) {
    const handleFieldChange = (index, key, value) => {
        const updatedFields = [...fields];
        updatedFields[index][key] = value;
        setFields(updatedFields);
    };

    const addField = () => {
        setFields([...fields, { enunciado: "", respuesta: "" }]);
    };

    return (
        <div>
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
