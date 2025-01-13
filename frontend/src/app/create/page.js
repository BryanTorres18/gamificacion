"use client";

import { useState, useEffect } from "react";
import DynamicFields from "@/components/createComponents/dynamicFields";
import SizeField from "@/components/createComponents/sizeField";
import { useSearchParams } from "next/navigation"; // Ya no necesitamos useRouter

export default function CreateGamePage({}) {
    const searchParams = useSearchParams();
    const gameType = searchParams.get("game_type") || "Desconocido";
    const [fields, setFields] = useState([{ enunciado: "", respuesta: "" }]);
    const [showSizeField, setShowSizeField] = useState(false);

    useEffect(() => {
        if (gameType === "Sopa de Letras") {
            setShowSizeField(true);
        }
    }, [gameType]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            game_type: gameType,
            title: gameType,
            created_at: new Date().toISOString(),
            data: fields.reduce((acc, field) => {
                acc[field.enunciado] = field.respuesta;
                return acc;
            }, {}),
        };

        console.log("Datos enviados:", payload);

        try {
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

            // Abre la página del juego en una nueva ventana/pestaña
            window.open(`/games/${result.id}`, "_blank");
        } catch (error) {
            console.error("Error al enviar datos:", error);
            alert("Hubo un error al guardar el juego.");
        }
    };

    return (
        <section>
            <h1 className="text-5xl font-bold mb-4">{gameType}</h1>
            <h2 className="text-2xl font-bold mb-4">Ingrese los enunciados con su respuesta:</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Componentes de campos dinámicos */}
                <DynamicFields fields={fields} setFields={setFields} />
                {/* Componentes adicionales para "Sopa de Letras" */}
                {showSizeField && <SizeField />}
                <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-md mt-4">
                    Crear Juego
                </button>
            </form>
        </section>
    );
}


