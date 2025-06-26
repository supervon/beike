async function loadProperties() {
    const res = await fetch('data/properties.json');
    const data = await res.json();
    return data;
}

function createCard(p) {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
        <img src="${p.image}" alt="${p.title}">
        <h2>${p.title}</h2>
        <p>${p.address}</p>
        <p>${p.price}</p>
        <a href="property.html?id=${p.id}">查看详情</a>
    `;
    return div;
}

async function render() {
    const list = document.getElementById('list');
    const searchInput = document.getElementById('search');
    const properties = await loadProperties();

    function showFiltered() {
        const keyword = searchInput.value.trim();
        list.innerHTML = '';
        properties.filter(p =>
            p.title.includes(keyword) || p.address.includes(keyword)
        ).forEach(p => list.appendChild(createCard(p)));
    }

    searchInput.addEventListener('input', showFiltered);
    showFiltered();
}

render();
