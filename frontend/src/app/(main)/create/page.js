"use client"; // Indica que este componente se ejecuta en el cliente (navegador).

import { useState, useEffect } from "react";
import DynamicFields from "@/components/createComponents/dynamicFields";
import SizeField from "@/components/createComponents/sizeField";
import { useSearchParams } from "next/navigation";

/**
 * Página para la creación de juegos en la plataforma de gamificación.
 * Permite al usuario ingresar enunciados con sus respuestas y configurar el tamaño del juego según el tipo seleccionado.
 *
 * @component
 * @returns {JSX.Element} - Componente que renderiza la interfaz de creación de juegos.
 */
export default function CreateGamePage() {
    // Obtiene los parámetros de la URL
    const searchParams = useSearchParams();
    const gameType = searchParams.get("game_type") || "Desconocido";

    // Estados para almacenar datos del formulario
    const [fields, setFields] = useState([{ enunciado: "", respuesta: "" }]); // Lista de enunciados y respuestas
    const [showSizeField, setShowSizeField] = useState(false); // Controla la visibilidad del campo de tamaño
    const [size, setSize] = useState(""); // Tamaño del tablero en caso de ser necesario

    /**
     * Efecto secundario que determina si se debe mostrar el campo de tamaño basado en el tipo de juego.
     * Se activa cuando `gameType` cambia.
     */
    useEffect(() => {
        if (gameType === "Sopa de Letras") {
            setShowSizeField(true);
        }
    }, [gameType]);

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
            alert("Por favor, completa todos los campos antes de enviar.");
            return;
        }

        // Validación: Si el tamaño es obligatorio, verificar que esté definido
        if (showSizeField && !size) {
            alert("Por favor, selecciona un tamaño para el tablero.");
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
            const response = await fetch("http://127.0.0.1:8000/games/", {
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
            console.log("Juego guardado exitosamente:", result);
            alert("¡Juego creado exitosamente!");
            window.open(`/games/${result.id}`, "_blank"); // Abre la página del juego creado
        } catch (error) {
            console.error("Error al enviar datos:", error);
            alert("Hubo un error al guardar el juego.");
        }
    };

    return (
        <main className="container mx-auto p-4">
            <h1 className="text-5xl font-bold mb-4">{gameType}</h1>
            <h2 className="text-2xl font-bold mb-4">Ingrese los enunciados con su respuesta:</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Componente para manejar dinámicamente los campos de enunciado y respuesta */}
                <DynamicFields fields={fields} setFields={setFields} />

                {/* Muestra el campo de tamaño si el juego lo requiere */}
                {showSizeField && <SizeField size={size} setSize={setSize} />}

                <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-md mt-4">
                    Crear Juego
                </button>
            </form>
        </main>
    );
}



