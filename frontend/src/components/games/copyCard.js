import { toast } from 'sonner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faExclamationTriangle, faTimes } from '@fortawesome/free-solid-svg-icons';

function CopyCard() {
    const copiarEnlace = () => {
        const url = window.location.href; // Obtener la URL actual
        navigator.clipboard.writeText(url)
            .then(() => toast.success('¡Enlace copiado al portapapeles!', {
                icon: <FontAwesomeIcon icon={faClipboard} style={{ color: 'white', fontSize: '24px' }} />,
                style: {
                    backgroundColor: '#7F5C9C',
                    color: 'white',
                    fontSize: '16px',
                    padding: '16px',
                    borderRadius: '8px',
                    width: '400px',
                },
                duration: 3000, // Desaparece en 3 segundos
                position: 'bottom-right',
                closeButton: (
                    <button onClick={() => toast.dismiss()} style={{ background: 'rgba(255,255,255,0.3)', padding: '4px', borderRadius: '4px' }}>
                        <FontAwesomeIcon icon={faTimes} style={{ color: 'white', fontSize: '16px' }} />
                    </button>
                )
            }))
            .catch(err => toast.error('Error al copiar el enlace', {
                icon: <FontAwesomeIcon icon={faExclamationTriangle} style={{ color: 'white', fontSize: '24px' }} />,
                style: {
                    backgroundColor: '#F44336',
                    color: 'white',
                    fontSize: '16px',
                    padding: '16px',
                    borderRadius: '8px',
                    width: '400px',
                },
                duration: 3000,
                position: 'bottom-right',
                closeButton: (
                    <button onClick={() => toast.dismiss()} style={{ background: 'rgba(255,255,255,0.3)', padding: '4px', borderRadius: '4px' }}>
                        <FontAwesomeIcon icon={faTimes} style={{ color: 'white', fontSize: '16px' }} />
                    </button>
                )
            }));
    };

    return (
        <div className="grid grid-cols-[3fr_1fr] items-center gap-x-4">
            {/* Campo de enlace */}
            <label>
                <input
                    type="text"
                    value={window.location.href}
                    readOnly
                    className="input-link w-full border border-gray-300 rounded-lg text-[#686868] px-2 py-1"
                />
            </label>

            {/* Botón para copiar enlace */}
            <button
                onClick={copiarEnlace}
                className="btn-copy px-4 py-2 bg-[#7F5C9C] text-white rounded hover:bg-[#341D47]"
            >
                Copiar Enlace
            </button>
        </div>
    );
}

export default CopyCard;

