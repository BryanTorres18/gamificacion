export default function SizeField() {
    return (
        <div id="sizeField" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Largo</label>
                    <input
                        type="number"
                        className="w-full p-2 border rounded-md"
                        placeholder="Ej: 10"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Ancho</label>
                    <input
                        type="number"
                        className="w-full p-2 border rounded-md"
                        placeholder="Ej: 10"
                    />
                </div>
            </div>
        </div>
    );
}
