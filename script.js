const portfolio = document.querySelector("#porotito");

async function datos(raw) {
    try {
        let consulta = await fetch(raw);
        if (consulta.status === 429) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            consulta = await fetch(raw);
        }
        let trabajos = await consulta.json();
        window.trabajosCache = trabajos;

        trabajos.forEach((trabajo, i) => {
            const col = document.createElement('div');
            col.className = 'col';

            col.innerHTML = `
                <div class="card shadow-sm" data-index="${i}">
                    <img class="card-img-top" src="${trabajo.imagen}">
                    <div class="card-body">
                        <p class="card-text">${trabajo.titulo}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-secondary">${trabajo.categoria}</button>
                            </div>
                            <small class="text-body-secondary">Reciente</small>
                        </div>
                    </div>
                </div>
            `;

            portfolio.appendChild(col);
        });
    } catch (error) {
        console.error("Error al cargar los datos:", error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        datos("https://raw.githubusercontent.com/mbassaletti/clase10/main/datos.json");
    });
} else {
    datos("https://raw.githubusercontent.com/mbassaletti/clase10/main/datos.json");
}

document.addEventListener("click", (e) => {
    let card = e.target.closest(".card");
    if (!card) return;

    let index = card.dataset.index;
    let trabajo = window.trabajosCache[index];

    document.querySelector("#modal-img").src = trabajo.imagen;
    document.querySelector("#modal-desc").textContent = trabajo.titulo;

    document.querySelector("#modalito").style.display = "flex";
});

document.querySelector("#cerrar").addEventListener("click", () => {
    document.querySelector("#modalito").style.display = "none";
});



