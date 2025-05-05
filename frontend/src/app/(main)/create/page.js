"use client"; // Indica que este componente se ejecuta en el cliente (navegador).

import { useState, useEffect } from "react";
import DynamicFields from "@/components/createComponents/dynamicFields";
import SizeField from "@/components/createComponents/sizeField";
import { useSearchParams } from "next/navigation";
import { Toaster, toast } from "sonner";  // Importa Sonner para mostrar las alertas
import { Suspense } from "react";
import Link from "next/link"

/**
 * Página para la creación de juegos en la plataforma de gamificación.
 * Permite al usuario ingresar enunciados con sus respuestas y configurar el tamaño del juego según el tipo seleccionado.
 *
 * @component
 * @returns {JSX.Element} - Componente que renderiza la interfaz de creación de juegos.
 */
function CreateGamePage() {
    // Obtiene los parámetros de la URL
    const searchParams = useSearchParams();
    const gameType = searchParams.get("game_type") || "Desconocido";

    // Estados para almacenar datos del formulario
    const [fields, setFields] = useState([{ enunciado: "", respuesta: "" }]); // Lista de enunciados y respuestas
    const [showSizeField, setShowSizeField] = useState(false); // Controla la visibilidad del campo de tamaño
    const [size, setSize] = useState(15); // Tamaño del tablero, inicializado con 15 para coincidir con el valor predeterminado de SizeField

    /**
     * Efecto secundario que determina si se debe mostrar el campo de tamaño basado en el tipo de juego.
     * Se activa cuando `gameType` cambia.
     */
    useEffect(() => {
        // Verifica el tipo de juego y muestra el campo de tamaño si es necesario
        if (gameType === "Sopa de Letras") {
            setShowSizeField(true);
        } else {
            setShowSizeField(false); // Oculta el campo si no es necesario
        }
    }, [gameType]);

    const gameLogos = {
        "Sopa de Letras": "/logos/logoSopaDeLetras.png",
        "Crucigrama": "/logos/logoCrucigrama.png",
    };

    /**
     * Maneja el envío del formulario para crear un nuevo juego.
     * Realiza validaciones y envía los datos al backend.
     *
     * @param {Event} e - Evento del formulario.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación: Verifica si hay campos vacíos
        const emptyFields = fields.some(
            (field) => !field.enunciado.trim() || !field.respuesta.trim()
        );
        if (emptyFields) {
            toast.error("Por favor, completa todos los campos antes de enviar.", {
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
            return;
        }

        // Validación: Si el tamaño es obligatorio, verificar que esté definido
        if (showSizeField && !size) {
            toast.error("Por favor, selecciona un tamaño para el tablero.", {
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
            return;
        }

        // Construcción del payload con los datos del juego
        const payload = {
            game_type: gameType,
            title: gameType,
            size: parseInt(size, 10) || 10, // Conversión a número con valor por defecto 10
            created_at: new Date().toISOString(), // Fecha de creación
            data: fields.reduce((acc, field) => {
                acc[field.enunciado] = field.respuesta;
                return acc;
            }, {}),
        };

        console.log("Datos enviados:", payload);

        try {
            // Envío de los datos al backend (API de juegos)
            const response = await fetch("https://ld2hepukpj.execute-api.us-east-1.amazonaws.com/games", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Error al guardar el juego");
            }

            const result = await response.json();
            console.log(result.id)
            console.log("Juego guardado exitosamente:", result);
            toast.success("¡Juego creado exitosamente!", {
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
            window.open(`/games/${result.id}`, "_blank"); // Abre la página del juego creado
        } catch (error) {
            console.error("Error al enviar datos:", error);
            toast.error("Hubo un error al guardar el juego.", {
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
        }
    };

    return (
        <main className="flex flex-col min-h-screen bg-white">
            {/* Header con estilo similar al mockup */}
            <div className="w-full bg-[#dec5e3] py-4">
                <Link href="/" className="flex items-center gap-4 px-6 md:px-8 hover:opacity-80 transition-opacity">
                    {gameLogos[gameType] && (
                        <img
                            src={gameLogos[gameType]}
                            alt={`Logo de ${gameType}`}
                            className="w-12 h-12 object-contain"
                        />
                    )}
                    <h1 className="text-4xl md:text-5xl text-[#7f5c9c] font-bold">
                        {gameType}
                    </h1>
                </Link>
            </div>

            {/* Contenido principal con padding consistente */}
            <div className="flex-1 px-6 md:px-8 py-6">
                <h2 className="text-xl md:text-2xl text-[#7f5c9c] font-bold mb-6">
                    Ingrese los enunciados con su respuesta:
                </h2>

                <form onSubmit={handleSubmit} className="space-y-8 max-w-13xl">
                    {/* Componente para manejar dinámicamente los campos */}
                    <DynamicFields fields={fields} setFields={setFields}/>

                    {/* Muestra el campo de tamaño si el juego lo requiere */}
                    {showSizeField && (
                        <div className="mt-8">
                            <SizeField size={size} setSize={setSize}/>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="mt-6 bg-[#7f5c9c] hover:bg-[#9370b5] text-white px-7 py-3 rounded-md font-medium transition-colors"
                    >
                        Crear Juego
                    </button>
                </form>
            </div>
            {/* Toaster para mostrar las alertas */}
            <Toaster />
        </main>
    );
}

export default function SuspendedCreateGamePage() {
    return (
        <Suspense fallback={<div className="p-6 text-[#7f5c9c]">Cargando...</div>}>
            <CreateGamePage />
        </Suspense>
    );
}




