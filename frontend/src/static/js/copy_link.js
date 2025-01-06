function copiarEnlace() {
    const input = document.querySelector('input[type="text"]');
    input.select();
    input.setSelectionRange(0, 99999); // Para móviles
    navigator.clipboard.writeText(input.value)
        .then(() => alert('¡Enlace copiado al portapapeles!'))
        .catch(err => console.error('Error al copiar el enlace:', err));
}