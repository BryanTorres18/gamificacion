/**
 * Componente Footer
 *
 * Este componente representa el pie de página de la aplicación.
 * Contiene información estática como derechos reservados.
 *
 * @returns {JSX.Element} - Un pie de página estilizado.
 */
function Footer() {
    return (
        /**
         * Elemento principal del pie de página
         * - bg-gray-800: Establece un fondo oscuro.
         * - text-white: Cambia el color del texto a blanco.
         * - py-4: Aplica un padding vertical.
         * - mt-auto: Permite que el pie de página se mantenga en la parte inferior de la página.
         * - w-screen: Asegura que ocupe todo el ancho de la pantalla.
         */
        <footer className="bg-gray-800 text-white py-4 mt-auto w-screen">
            {/* Contenedor centrado para el contenido del pie de página */}
            <div className="container mx-auto text-center">
                {/* Texto de derechos reservados */}
                <p>&copy; 2025 Gamificación. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}

export default Footer;
