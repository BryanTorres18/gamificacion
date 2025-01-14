function CopyCard() {
    const copiarEnlace = () => {
        const url = window.location.href; // Obtener la URL actual
        navigator.clipboard.writeText(url)
            .then(() => alert('¡Enlace copiado al portapapeles!'))
            .catch(err => console.error('Error al copiar el enlace:', err));
    };

    return (
        <div className="grid grid-cols-[3fr_1fr] items-center gap-x-4">
            {/* Campo de enlace */}
            <label>
                <input
                    type="text"
                    value={window.location.href}
                    readOnly
                    className="input-link w-full border border-gray-300 rounded text-blue-800 px-2 py-1"
                />
            </label>

            {/* Botón para copiar enlace */}
            <button
                onClick={copiarEnlace}
                className="btn-copy px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Copiar Enlace
            </button>
        </div>
    );
}

export default CopyCard;

