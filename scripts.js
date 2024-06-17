async function loadProducts() {
    const response = await fetch('products.json');
    const products = await response.json();
    displayProducts(products);
}

function displayProducts(products) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('a');
        productCard.href = product.url;
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.img}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>${product.price}</p>
        `;
        productGrid.appendChild(productCard);
    });
}

function searchProducts() {
    const query = document.getElementById('search').value.toLowerCase();
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            const filteredProducts = products.filter(product => product.title.toLowerCase().includes(query));
            displayProducts(filteredProducts);
        });
}

document.getElementById('search').addEventListener('input', searchProducts);

loadProducts();
