import GameCard from "@/components/game_card";

export default function IndexPage() {
    return (
        <section>
            <h1 className="text-2xl font-bold mb-4">Selecciona un Tipo de Juego</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                <GameCard game_type={"Crucigrama"}/>
                <GameCard game_type={"Sopa de Letras"}/>
            </div>
        </section>
    );
}