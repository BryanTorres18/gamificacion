const ErrorPage = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="text-center p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-4xl font-semibold text-red-600">¡Vaya! Página no encontrada</h1>
                <p className="mt-4 text-lg text-gray-600">La página que buscas no existe.</p>
                <a href="/" className="mt-6 inline-block px-6 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-lg">
                    Volver al inicio
                </a>
            </div>
        </div>
    );
};

export default ErrorPage;
