// Cart functionality
let cart = [];
const cartButton = document.getElementById('cartButton');
const cartModal = document.getElementById('cartModal');
const closeModal = document.querySelector('.close');
const cartItemsDiv = document.getElementById('cartItems');
const totalAmountElement = document.getElementById('totalAmount');
const cartCountElement = document.getElementById('cartCount');

// Product Data
const products = [
    { id: 1, name: 'Pizza', price: 12.99, img: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Burger', price: 8.99, img: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Pasta', price: 10.99, img: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Sushi', price: 15.99, img: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Salad', price: 6.99, img: 'https://via.placeholder.com/150' },
];

// Populate products
const productsContainer = document.getElementById('productsContainer');
products.forEach(product => {
    const div = document.createElement('div');
    div.classList.add('product');
    div.setAttribute('data-id', product.id);
    div.setAttribute('data-name', product.name);

    div.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <button class="addToCart">Add to Cart</button>
    `;
    productsContainer.appendChild(div);
});

// Add to Cart
const addToCartButtons = document.querySelectorAll('.addToCart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
        const productElement = button.parentElement;
        const productId = productElement.getAttribute('data-id');
        const product = products.find(p => p.id == productId);
        addProductToCart(product);
    });
});

function addProductToCart(product) {
    cart.push(product);
    updateCart();
}

function updateCart() {
    cartCountElement.textContent = cart.length;
    let total = 0;
    cartItemsDiv.innerHTML = '';
    cart.forEach(item => {
        const div = document.createElement('div');
        div.textContent = `${item.name} - $${item.price}`;
        cartItemsDiv.appendChild(div);
        total += item.price;
    });
    totalAmountElement.textContent = total.toFixed(2);
}

// Open Cart Modal
cartButton.addEventListener('click', function () {
    cartModal.style.display = 'block';
});

// Close Cart Modal
closeModal.addEventListener('click', function () {
    cartModal.style.display = 'none';
});

// Close modal when clicking outside the modal content
window.addEventListener('click', function (event) {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Search functionality
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase();
    const productElements = document.querySelectorAll('.product');
    productElements.forEach(product => {
        const productName = product.getAttribute('data-name').toLowerCase();
        if (productName.includes(searchTerm)) {
            product.style.display = 'block';  // Show product
        } else {
            product.style.display = 'none';  // Hide product
        }
    });
});
