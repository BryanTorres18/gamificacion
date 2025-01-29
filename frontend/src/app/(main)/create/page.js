"use client";

/**
 * Página para la creación de juegos (CreateGamePage)
 *
 * Este componente permite crear un nuevo juego interactivo basado en el tipo de juego seleccionado.
 * Incluye campos dinámicos para ingresar enunciados y respuestas, y un selector para especificar
 * el tamaño del tablero si aplica.
 *
 * @returns {JSX.Element} - Interfaz para crear y enviar un juego personalizado.
 */

import { useState, useEffect } from "react";
import DynamicFields from "@/components/createComponents/dynamicFields"; // Componente para manejar campos dinámicos
import SizeField from "@/components/createComponents/sizeField"; // Componente para seleccionar el tamaño del tablero
import { useSearchParams } from "next/navigation"; // Hook para obtener parámetros de búsqueda

export default function CreateGamePage() {
    // Obtener el tipo de juego desde los parámetros de búsqueda
    const searchParams = useSearchParams();
    const gameType = searchParams.get("game_type") || "Desconocido";

    // Estado para gestionar los campos dinámicos y el tamaño del tablero
    const [fields, setFields] = useState([{ enunciado: "", respuesta: "" }]);
    const [showSizeField, setShowSizeField] = useState(false); // Controla si se muestra el campo de tamaño
    const [size, setSize] = useState("");

    // Efecto para mostrar el campo de tamaño si el tipo de juego es "Sopa de Letras"
    useEffect(() => {
        if (gameType === "Sopa de Letras") {
            setShowSizeField(true);
        }
    }, [gameType]);

    /**
     * handleSubmit
     *
     * Maneja el envío del formulario. Verifica los datos ingresados,
     * prepara el payload y lo envía al backend para guardar el juego.
     *
     * @param {Event} e - Evento de envío del formulario.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación: Verifica que todos los campos estén completos
        const emptyFields = fields.some(
            (field) => !field.enunciado.trim() || !field.respuesta.trim()
        );
        if (emptyFields) {
            alert("Por favor, completa todos los campos antes de enviar.");
            return;
        }

        // Validación: Verifica que se haya seleccionado un tamaño si aplica
        if (showSizeField && !size) {
            alert("Por favor, selecciona un tamaño para el tablero.");
            return;
        }

        // Preparar datos para enviar
        const payload = {
            game_type: gameType,
            title: gameType,
            size: parseInt(size, 10) || 10, // Convertir tamaño a número
            created_at: new Date().toISOString(),
            data: fields.reduce((acc, field) => {
                acc[field.enunciado] = field.respuesta;
                return acc;
            }, {}),
        };

        console.log("Datos enviados:", payload);

        try {
            // Enviar datos al backend
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

            // Abrir la página del juego en una nueva ventana o pestaña
            window.open(`/games/${result.id}`, "_blank");
        } catch (error) {
            console.error("Error al enviar datos:", error);
            alert("Hubo un error al guardar el juego.");
        }
    };

    return (
        <section>
            {/* Título principal del tipo de juego */}
            <h1 className="text-5xl font-bold mb-4">{gameType}</h1>
            <h2 className="text-2xl font-bold mb-4">Ingrese los enunciados con su respuesta:</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Componente para manejar campos dinámicos */}
                <DynamicFields fields={fields} setFields={setFields} />
                {/* Campo para seleccionar el tamaño del tablero si aplica */}
                {showSizeField && <SizeField size={size} setSize={setSize} />}
                {/* Botón para enviar el formulario */}
                <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-md mt-4">
                    Crear Juego
                </button>
            </form>
        </section>
    );
}



