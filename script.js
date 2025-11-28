const portfolio = document.querySelector("#porotito");

async function datos(raw) {
    try {
        let consulta = await fetch(raw);
        if (consulta.status === 429) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            consulta = await fetch(raw);
        }
        let json = await consulta.json();
        let trabajos = json.data;
        window.trabajosCache = trabajos;
        trabajos.forEach((trabajo, i) => {
            const col = document.createElement('div');
            col.className = 'col';
            col.innerHTML = `
                <div class="card shadow-sm" data-index="${i}">
                    <img class="card-img-top" src="${trabajo.imagen}" alt="${trabajo.alt}">
                    <div class="card-body">
                        <p class="card-text">${trabajo.titulo}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-secondary">${trabajo.categoria}</button>
                            </div>
                            <small class="text-body-secondary">Reciente</small>
                        </div>
                        <p class="card-description">${trabajo.descripcion}</p>
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
        datos("https://api.myjson.online/v1/records/b127122e-b99e-4658-abf4-dcc067c175c6");
    });
} else {
    datos("https://api.myjson.online/v1/records/b127122e-b99e-4658-abf4-dcc067c175c6");
}

document.addEventListener("click", (e) => {
    let card = e.target.closest(".card");
    if (!card) return;
    let index = card.dataset.index;
    if (!window.trabajosCache) return;
    let trabajo = window.trabajosCache[index];
    document.querySelector("#modal-img").src = trabajo.imagen;
    document.querySelector("#modal-desc").textContent = trabajo.titulo;
    document.querySelector("#modalito").style.display = "flex";
});

document.querySelector("#cerrar").addEventListener("click", (e) => {
    e.stopPropagation();
    document.querySelector("#modalito").style.display = "none";
});

document.querySelector("#modalito").addEventListener("click", (e) => {
    if (e.target.id === "modalito") {
        document.querySelector("#modalito").style.display = "none";
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        document.querySelector("#modalito").style.display = "none";
    }
});