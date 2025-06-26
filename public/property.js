function getId() {
    const params = new URLSearchParams(location.search);
    return parseInt(params.get('id'), 10);
}

async function loadProperties() {
    const res = await fetch('data/properties.json');
    return res.json();
}

async function renderDetail() {
    const id = getId();
    const properties = await loadProperties();
    const p = properties.find(item => item.id === id);
    const detail = document.getElementById('detail');
    if (!p) {
        detail.textContent = '未找到该房源';
        return;
    }
    detail.innerHTML = `
        <div class="card">
            <img src="${p.image}" alt="${p.title}">
            <h2>${p.title}</h2>
            <p>${p.address}</p>
            <p>${p.price}</p>
            <p>${p.description}</p>
        </div>`;
}

renderDetail();
