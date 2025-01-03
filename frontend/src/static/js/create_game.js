document.addEventListener('DOMContentLoaded', () => {
    const addFieldButton = document.getElementById('addFieldButton');
    const dynamicFields = document.getElementById('dynamicFields');
    const sopaDeLetrasFields = document.getElementById('sopaDeLetrasFields');

    // Obtener el valor de game_type desde el dataset del formulario
    const gameType = document.getElementById('gameForm').dataset.gameType;

    // Agregar nuevos campos dinámicamente
    addFieldButton.addEventListener('click', () => {
        const newField = document.createElement('div');
        newField.classList.add('grid', 'grid-cols-1', 'sm:grid-cols-2', 'gap-4', 'mt-4');
        newField.innerHTML = `
            <div>
                <label class="block text-sm font-medium text-gray-700">Enunciado</label>
                <input type="text" name="enunciados[]" class="w-full p-2 border rounded-md" placeholder="Ingrese el enunciado">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Respuesta</label>
                <input type="text" name="respuestas[]" class="w-full p-2 border rounded-md" placeholder="Ingrese la respuesta">
            </div>
        `;
        dynamicFields.appendChild(newField);
    });

    // Mostrar campos adicionales para Sopa de Letras
    if (gameType === "Sopa de Letras") {
        sopaDeLetrasFields.classList.remove('hidden');
    }
});
