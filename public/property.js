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
    renderTransactions(id);
}

async function loadTransactions() {
    const res = await fetch('data/transactions.json');
    return res.json();
}

async function renderTransactions(id) {
    const detail = document.getElementById('detail');
    const data = await loadTransactions();
    const list = data.filter(t => t.propertyId === id);
    const section = document.createElement('section');
    section.id = 'transactions';
    section.innerHTML = '<h2>成交记录</h2>';
    if (list.length === 0) {
        section.innerHTML += '<p>暂无记录</p>';
    } else {
        const table = document.createElement('table');
        table.innerHTML = `
            <thead><tr><th>日期</th><th>价格</th><th>状态</th></tr></thead>
            <tbody></tbody>`;
        const tbody = table.querySelector('tbody');
        list.forEach(t => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${t.date}</td><td>${t.price}</td><td>${t.status}</td>`;
            tbody.appendChild(tr);
        });
        section.appendChild(table);
    }
    detail.appendChild(section);
}

renderDetail();
