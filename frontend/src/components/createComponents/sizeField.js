export default function SizeField({ size, setSize }) {
    const handleChange = (e) => {
        setSize(Number(e.target.value)); // Guarda el valor seleccionado como número
    };

    return (
        <div id="sizeField" className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Tamaño del tablero</label>
            <select
                value={size}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
            >
                <option value="" disabled>
                    Selecciona un tamaño
                </option>
                <option value={10}>Pequeño (10x10)</option>
                <option value={15}>Mediano (15x15)</option>
                <option value={20}>Grande (20x20)</option>
            </select>
        </div>
    );
}

