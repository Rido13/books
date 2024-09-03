let allProducts = [];

// Функция для загрузки продуктов с сервера
async function loadProducts() {
    try {
        const response = await fetch('./products/products.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        allProducts = await response.json();
        displayProducts(allProducts);
    } catch (error) {
        console.error('Error loading products:', error);
        // Отобразить сообщение об ошибке для пользователя
        document.getElementById('product-grid').innerHTML = '<p>Error loading products. Please try again later.</p>';
    }
}

// Функция для отображения продуктов
function displayProducts(products) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';
    const fragment = document.createDocumentFragment();

    products.forEach(product => {
        const productCard = document.createElement('a');
        productCard.href = product.url;
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.img}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>${product.price}</p>
        `;
        fragment.appendChild(productCard);
    });

    productGrid.appendChild(fragment);
}

// Функция для поиска по продуктам
function searchProducts() {
    const query = document.getElementById('search').value.toLowerCase();
    const filteredProducts = allProducts.filter(product =>
        product.title.toLowerCase().includes(query)
    );
    displayProducts(filteredProducts);
}

// Дебаунс функция для оптимизации поиска
function debounce(fn, delay) {
    let timeoutId;
    return function (...args) {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
}

// Добавление обработчика событий для поиска
document.getElementById('search').addEventListener('input', debounce(searchProducts, 300));

// Загрузка продуктов при старте
loadProducts();
