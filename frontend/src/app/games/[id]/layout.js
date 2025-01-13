export default function GameLayout({ children }) {
    return (
        <div>
            <header>
                <h1>#JUEGO: Plataforma de Gamificación</h1>
            </header>
            <main>{children}</main>
        </div>
    );
}