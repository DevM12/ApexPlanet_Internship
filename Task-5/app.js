// Application State
const AppState = {
    products: [],
    filteredProducts: [],
    cart: [],
    currentFilters: {
        category: '',
        minPrice: 0,
        maxPrice: Infinity,
        search: ''
    },
    currentSort: 'name',
    isLoading: false,
    isMobileMenuOpen: false
};

// Sample Products Database
const PRODUCTS_DB = [
    {
        id: 1,
        name: "iPhone 15 Pro Max",
        price: 1199,
        category: "Smartphones",
        rating: 4.8,
        description: "Latest iPhone with titanium design and advanced camera system",
        image: "📱",
        stock: 25,
        features: ["A17 Pro chip", "48MP camera", "Titanium build"]
    },
    {
        id: 2,
        name: "MacBook Pro 14-inch",
        price: 1999,
        category: "Laptops",
        rating: 4.9,
        description: "Powerful laptop with M3 chip for professionals",
        image: "💻",
        stock: 15,
        features: ["M3 chip", "Liquid Retina XDR", "Up to 22hr battery"]
    },
    {
        id: 3,
        name: "AirPods Pro (3rd Gen)",
        price: 249,
        category: "Audio",
        rating: 4.7,
        description: "Premium wireless earbuds with active noise cancellation",
        image: "🎧",
        stock: 50,
        features: ["Active Noise Cancellation", "Spatial Audio", "MagSafe charging"]
    },
    {
        id: 4,
        name: "PlayStation 5",
        price: 499,
        category: "Gaming",
        rating: 4.6,
        description: "Next-gen gaming console with 4K gaming capabilities",
        image: "🎮",
        stock: 8,
        features: ["4K gaming", "Ray tracing", "Ultra-fast SSD"]
    },
    {
        id: 5,
        name: "iPad Air",
        price: 599,
        category: "Accessories",
        rating: 4.5,
        description: "Versatile tablet perfect for work and creativity",
        image: "📱",
        stock: 30,
        features: ["M1 chip", "10.9-inch display", "Apple Pencil support"]
    },
    {
        id: 6,
        name: "Samsung Galaxy S24 Ultra",
        price: 1299,
        category: "Smartphones",
        rating: 4.7,
        description: "Premium Android phone with S Pen and AI features",
        image: "📱",
        stock: 20,
        features: ["200MP camera", "S Pen included", "AI photo editing"]
    },
    {
        id: 7,
        name: "Dell XPS 13",
        price: 1299,
        category: "Laptops",
        rating: 4.4,
        description: "Ultra-portable laptop with stunning display",
        image: "💻",
        stock: 12,
        features: ["13.4-inch OLED", "Intel Core i7", "16GB RAM"]
    },
    {
        id: 8,
        name: "Sony WH-1000XM5",
        price: 399,
        category: "Audio",
        rating: 4.8,
        description: "Industry-leading noise canceling headphones",
        image: "🎧",
        stock: 35,
        features: ["30hr battery", "Multipoint connection", "Premium comfort"]
    },
    {
        id: 9,
        name: "Nintendo Switch OLED",
        price: 349,
        category: "Gaming",
        rating: 4.5,
        description: "Hybrid gaming console with vibrant OLED screen",
        image: "🎮",
        stock: 22,
        features: ["7-inch OLED", "Enhanced audio", "64GB storage"]
    },
    {
        id: 10,
        name: "Apple Watch Series 9",
        price: 429,
        category: "Accessories",
        rating: 4.6,
        description: "Advanced smartwatch with health monitoring",
        image: "⌚",
        stock: 40,
        features: ["S9 chip", "Double Tap gesture", "All-day battery"]
    },
    {
        id: 11,
        name: "Google Pixel 8 Pro",
        price: 999,
        category: "Smartphones",
        rating: 4.4,
        description: "AI-powered camera and pure Android experience",
        image: "📱",
        stock: 18,
        features: ["Google Tensor G3", "Magic Eraser", "7 years updates"]
    },
    {
        id: 12,
        name: "Surface Laptop 5",
        price: 1299,
        category: "Laptops",
        rating: 4.3,
        description: "Sleek Windows laptop with premium design",
        image: "💻",
        stock: 16,
        features: ["Alcantara keyboard", "PixelSense display", "All-day battery"]
    },
    {
        id: 13,
        name: "Bose QuietComfort 45",
        price: 329,
        category: "Audio",
        rating: 4.5,
        description: "Comfortable over-ear headphones with great ANC",
        image: "🎧",
        stock: 28,
        features: ["24hr battery", "TriPort acoustics", "Lightweight design"]
    },
    {
        id: 14,
        name: "Xbox Series X",
        price: 499,
        category: "Gaming",
        rating: 4.7,
        description: "Most powerful Xbox with 4K gaming and quick resume",
        image: "🎮",
        stock: 10,
        features: ["4K/120fps", "1TB SSD", "Smart Delivery"]
    },
    {
        id: 15,
        name: "Amazon Echo Show 10",
        price: 249,
        category: "Smart Home",
        rating: 4.2,
        description: "Smart display that moves with you",
        image: "🏠",
        stock: 25,
        features: ["10.1-inch screen", "Motion tracking", "Zigbee hub"]
    },
    {
        id: 16,
        name: "Ring Video Doorbell Pro 2",
        price: 279,
        category: "Smart Home",
        rating: 4.3,
        description: "Advanced video doorbell with 3D motion detection",
        image: "🏠",
        stock: 32,
        features: ["1536p video", "3D Motion Detection", "Alexa integration"]
    },
    {
        id: 17,
        name: "Nest Thermostat",
        price: 129,
        category: "Smart Home",
        rating: 4.4,
        description: "Smart thermostat that saves energy",
        image: "🏠",
        stock: 45,
        features: ["Energy saving", "Remote control", "Works with Alexa"]
    },
    {
        id: 18,
        name: "Logitech MX Master 3S",
        price: 99,
        category: "Accessories",
        rating: 4.8,
        description: "Advanced wireless mouse for productivity",
        image: "🖱️",
        stock: 60,
        features: ["8K DPI sensor", "MagSpeed wheel", "Multi-device"]
    }
];

// Utility Functions
const Utils = {
    formatPrice: (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    },

    generateStars: (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '★'.repeat(fullStars);
        if (hasHalfStar) stars += '☆';
        return stars + ` (${rating})`;
    },

    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    showNotification: (message, type = 'success') => {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        z-index: 3000;
        font-weight: 600;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
        notification.textContent = message;
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
};

// Mobile Menu Management
const MobileMenuManager = {
    toggle: () => {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');

        if (!mobileMenuBtn || !navLinks) return;

        AppState.isMobileMenuOpen = !AppState.isMobileMenuOpen;

        if (AppState.isMobileMenuOpen) {
            // Show mobile menu
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'white';
            navLinks.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1)';
            navLinks.style.padding = '1rem';
            navLinks.style.zIndex = '1000';
            navLinks.style.animation = 'slideDown 0.3s ease';

            mobileMenuBtn.textContent = '✕';
            mobileMenuBtn.style.color = '#ef4444';

            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        } else {
            // Hide mobile menu
            navLinks.style.display = '';
            navLinks.style.flexDirection = '';
            navLinks.style.position = '';
            navLinks.style.top = '';
            navLinks.style.left = '';
            navLinks.style.right = '';
            navLinks.style.background = '';
            navLinks.style.boxShadow = '';
            navLinks.style.padding = '';
            navLinks.style.zIndex = '';
            navLinks.style.animation = '';

            mobileMenuBtn.textContent = '☰';
            mobileMenuBtn.style.color = '';

            // Restore body scroll
            document.body.style.overflow = '';
        }
    },

    close: () => {
        if (AppState.isMobileMenuOpen) {
            MobileMenuManager.toggle();
        }
    }
};

// Product Management
const ProductManager = {
    init: () => {
        AppState.products = [...PRODUCTS_DB];
        AppState.filteredProducts = [...PRODUCTS_DB];
        ProductManager.render();
        ProductManager.setupIntersectionObserver();
    },

    render: () => {
        const grid = document.getElementById('productsGrid');
        const loadingIndicator = document.getElementById('loadingIndicator');

        if (!grid) return;

        if (AppState.isLoading) {
            if (loadingIndicator) loadingIndicator.style.display = 'flex';
            return;
        }

        if (loadingIndicator) loadingIndicator.style.display = 'none';

        if (AppState.filteredProducts.length === 0) {
            grid.innerHTML = `
            <div class="no-products" style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                <h3>No products found</h3>
                <p>Try adjusting your filters or search terms</p>
            </div>
        `;
            return;
        }

        grid.innerHTML = AppState.filteredProducts.map(product => `
        <div class="product-card fade-in" data-product-id="${product.id}">
            <div class="product-image">
                <span style="font-size: 4rem;">${product.image}</span>
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-meta">
                    <span class="product-price">${Utils.formatPrice(product.price)}</span>
                    <span class="product-rating">${Utils.generateStars(product.rating)}</span>
                </div>
                <div style="margin-bottom: 1rem;">
                    <small style="color: #6b7280;">
                        Stock: ${product.stock} | ${product.features.slice(0, 2).join(', ')}
                    </small>
                </div>
                <button 
                    class="add-to-cart-btn" 
                    onclick="CartManager.addItem(${product.id})"
                    ${product.stock === 0 ? 'disabled' : ''}
                >
                    ${product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
            </div>
        </div>
    `).join('');

        // Trigger fade-in animation
        setTimeout(() => {
            document.querySelectorAll('.product-card.fade-in').forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 100);
            });
        }, 50);
    },

    setupIntersectionObserver: () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        // Observe fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }
};

// Filter and Search Management
const FilterManager = {
    apply: () => {
        AppState.isLoading = true;
        ProductManager.render();

        // Simulate API delay for better UX
        setTimeout(() => {
            let filtered = [...AppState.products];

            // Apply category filter
            if (AppState.currentFilters.category) {
                filtered = filtered.filter(product =>
                    product.category === AppState.currentFilters.category
                );
            }

            // Apply price filters
            filtered = filtered.filter(product =>
                product.price >= AppState.currentFilters.minPrice &&
                product.price <= AppState.currentFilters.maxPrice
            );

            // Apply search filter
            if (AppState.currentFilters.search) {
                const searchTerm = AppState.currentFilters.search.toLowerCase();
                filtered = filtered.filter(product =>
                    product.name.toLowerCase().includes(searchTerm) ||
                    product.description.toLowerCase().includes(searchTerm) ||
                    product.category.toLowerCase().includes(searchTerm) ||
                    product.features.some(feature =>
                        feature.toLowerCase().includes(searchTerm)
                    )
                );
            }

            AppState.filteredProducts = filtered;
            FilterManager.sort();
            AppState.isLoading = false;
            ProductManager.render();
        }, 300);
    },

    sort: () => {
        switch (AppState.currentSort) {
            case 'name':
                AppState.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'price-low':
                AppState.filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                AppState.filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                AppState.filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                AppState.filteredProducts.sort((a, b) => b.id - a.id);
                break;
        }
    },

    clear: () => {
        // Reset filter inputs
        const categoryFilter = document.getElementById('categoryFilter');
        const minPrice = document.getElementById('minPrice');
        const maxPrice = document.getElementById('maxPrice');
        const searchInput = document.getElementById('searchInput');
        const sortBy = document.getElementById('sortBy');

        if (categoryFilter) categoryFilter.value = '';
        if (minPrice) minPrice.value = '';
        if (maxPrice) maxPrice.value = '';
        if (searchInput) searchInput.value = '';
        if (sortBy) sortBy.value = 'name';

        // Reset state
        AppState.currentFilters = {
            category: '',
            minPrice: 0,
            maxPrice: Infinity,
            search: ''
        };
        AppState.currentSort = 'name';

        FilterManager.apply();
    }
};

// Cart Management - COMPLETELY FIXED VERSION
const CartManager = {
    addItem: (productId) => {
        console.log('Adding item with ID:', productId);

        const product = AppState.products.find(p => p.id === productId);
        if (!product) {
            console.error('Product not found:', productId);
            Utils.showNotification('Product not found!', 'error');
            return;
        }

        if (product.stock === 0) {
            Utils.showNotification('Product is out of stock!', 'error');
            return;
        }

        const existingItem = AppState.cart.find(item => item.id === productId);

        if (existingItem) {
            if (existingItem.quantity >= product.stock) {
                Utils.showNotification('Cannot add more items. Stock limit reached!', 'error');
                return;
            }
            existingItem.quantity += 1;
        } else {
            AppState.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                stock: product.stock,
                quantity: 1
            });
        }

        console.log('Cart after adding:', AppState.cart);
        CartManager.updateUI();
        Utils.showNotification(`${product.name} added to cart!`);
    },

    removeItem: (productId) => {
        console.log('Removing item with ID:', productId);

        const itemIndex = AppState.cart.findIndex(item => item.id === productId);
        if (itemIndex > -1) {
            const product = AppState.cart[itemIndex];
            AppState.cart.splice(itemIndex, 1);
            CartManager.updateUI();
            Utils.showNotification(`${product.name} removed from cart`, 'error');
            console.log('Cart after removing:', AppState.cart);
        }
    },

    updateQuantity: (productId, change) => {
        console.log('Updating quantity for ID:', productId, 'Change:', change);

        const item = AppState.cart.find(item => item.id === productId);
        const product = AppState.products.find(p => p.id === productId);

        if (!item || !product) {
            console.error('Item or product not found');
            return;
        }

        const newQuantity = item.quantity + change;

        if (newQuantity <= 0) {
            CartManager.removeItem(productId);
            return;
        }

        if (newQuantity > product.stock) {
            Utils.showNotification('Cannot exceed stock limit!', 'error');
            return;
        }

        item.quantity = newQuantity;
        CartManager.updateUI();
        console.log('Cart after quantity update:', AppState.cart);
    },

    updateUI: () => {
        console.log('Updating cart UI. Current cart:', AppState.cart);

        const cartCount = document.getElementById('cartCount');
        const cartContent = document.getElementById('cartContent');
        const cartFooter = document.getElementById('cartFooter');
        const cartTotal = document.getElementById('cartTotal');
        const emptyCart = document.getElementById('emptyCart');

        // Update cart count badge
        const totalItems = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }

        // Check if cart is empty
        if (AppState.cart.length === 0) {
            if (emptyCart) {
                emptyCart.style.display = 'block';
            }
            if (cartFooter) {
                cartFooter.style.display = 'none';
            }
            if (cartContent) {
                cartContent.innerHTML = '';
            }
            console.log('Cart is empty, showing empty state');
            return;
        }

        // Hide empty cart message and show footer
        if (emptyCart) {
            emptyCart.style.display = 'none';
        }
        if (cartFooter) {
            cartFooter.style.display = 'block';
        }

        // Render cart items
        if (cartContent) {
            const cartItemsHTML = AppState.cart.map(item => `
            <div class="cart-item" style="
                display: flex; 
                align-items: center; 
                gap: 1rem; 
                padding: 1rem; 
                border-bottom: 1px solid #e5e7eb;
                background: white;
            ">
                <div class="cart-item-image" style="font-size: 2rem; min-width: 50px; text-align: center;">
                    ${item.image}
                </div>
                <div class="cart-item-info" style="flex: 1; min-width: 0;">
                    <div class="cart-item-title" style="
                        font-weight: 600; 
                        margin-bottom: 0.5rem; 
                        color: #111827;
                        font-size: 0.9rem;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    ">${item.name}</div>
                    <div class="cart-item-price" style="
                        color: #3b82f6; 
                        font-weight: 600;
                        font-size: 0.9rem;
                        margin-bottom: 0.5rem;
                    ">${Utils.formatPrice(item.price)}</div>
                    <div class="cart-item-controls" style="
                        display: flex; 
                        align-items: center; 
                        gap: 0.5rem; 
                        flex-wrap: wrap;
                    ">
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <button 
                                onclick="CartManager.updateQuantity(${item.id}, -1)" 
                                style="
                                    background: #f3f4f6; 
                                    border: none; 
                                    padding: 0.3rem 0.6rem; 
                                    border-radius: 0.25rem; 
                                    cursor: pointer;
                                    font-weight: bold;
                                    min-width: 30px;
                                    height: 30px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                "
                                onmouseover="this.style.background='#e5e7eb'"
                                onmouseout="this.style.background='#f3f4f6'"
                            >-</button>
                            <span style="
                                min-width: 2rem; 
                                text-align: center; 
                                font-weight: 600;
                                font-size: 0.9rem;
                            ">${item.quantity}</span>
                            <button 
                                onclick="CartManager.updateQuantity(${item.id}, 1)" 
                                style="
                                    background: #f3f4f6; 
                                    border: none; 
                                    padding: 0.3rem 0.6rem; 
                                    border-radius: 0.25rem; 
                                    cursor: pointer;
                                    font-weight: bold;
                                    min-width: 30px;
                                    height: 30px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                "
                                onmouseover="this.style.background='#e5e7eb'"
                                onmouseout="this.style.background='#f3f4f6'"
                            >+</button>
                        </div>
                        <button 
                            onclick="CartManager.removeItem(${item.id})" 
                            style="
                                background: #ef4444; 
                                color: white; 
                                border: none; 
                                padding: 0.3rem 0.6rem; 
                                border-radius: 0.25rem; 
                                cursor: pointer;
                                font-size: 0.8rem;
                                font-weight: 500;
                            "
                            onmouseover="this.style.background='#dc2626'"
                            onmouseout="this.style.background='#ef4444'"
                        >Remove</button>
                    </div>
                </div>
            </div>
        `).join('');

            cartContent.innerHTML = cartItemsHTML;
            console.log('Cart content rendered with', AppState.cart.length, 'items');
        }

        // Update total price
        if (cartTotal) {
            const total = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotal.textContent = Utils.formatPrice(total);
        }
    },

    clear: () => {
        AppState.cart = [];
        CartManager.updateUI();
        Utils.showNotification('Cart cleared!', 'error');
    }
};

// UI Event Handlers
function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');

    if (sidebar && overlay) {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');

        // Prevent body scroll when cart is open
        document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
    }
}

function closeCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');

    if (sidebar && overlay) {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function applyFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');

    AppState.currentFilters = {
        ...AppState.currentFilters,
        category: categoryFilter ? categoryFilter.value : '',
        minPrice: minPrice ? parseFloat(minPrice.value) || 0 : 0,
        maxPrice: maxPrice ? parseFloat(maxPrice.value) || Infinity : Infinity
    };

    FilterManager.apply();
}

function applySorting() {
    const sortBy = document.getElementById('sortBy');
    if (sortBy) {
        AppState.currentSort = sortBy.value;
        FilterManager.sort();
        ProductManager.render();
    }
}

function clearFilters() {
    FilterManager.clear();
}

const debouncedSearch = Utils.debounce((searchTerm) => {
    AppState.currentFilters.search = searchTerm;
    FilterManager.apply();
}, 300);

function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        const searchTerm = searchInput.value.trim();
        debouncedSearch(searchTerm);
    }
}

function scrollToProducts() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function checkout() {
    if (AppState.cart.length === 0) {
        Utils.showNotification('Your cart is empty!', 'error');
        return;
    }

    const total = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);

    // Simulate checkout process
    Utils.showNotification('Processing your order...', 'success');

    setTimeout(() => {
        Utils.showNotification(
            `Order confirmed! ${itemCount} items for ${Utils.formatPrice(total)}`,
            'success'
        );
        CartManager.clear();
        closeCart();
    }, 2000);
}

function toggleMobileMenu() {
    MobileMenuManager.toggle();
}

// Event Listeners Setup
function setupEventListeners() {
    // Mobile menu button
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
        });
    }

    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            debouncedSearch(e.target.value.trim());
        });

        // Enter key for search
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchProducts();
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const nav = document.querySelector('.nav');
        if (AppState.isMobileMenuOpen && nav && !nav.contains(e.target)) {
            MobileMenuManager.close();
        }
    });

    // Close cart on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCart();
            if (AppState.isMobileMenuOpen) {
                MobileMenuManager.close();
            }
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu after navigation
                MobileMenuManager.close();
            }
        });
    });

    // Header scroll effect
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        const scrollY = window.scrollY;

        if (header) {
            if (scrollY > lastScrollY && scrollY > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        }

        lastScrollY = scrollY;
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && AppState.isMobileMenuOpen) {
            MobileMenuManager.close();
        }
    });

    // Cart overlay click to close
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart);
    }
}

// Initialize Application
function initApp() {
    console.log('🚀 TechStore initializing...');

    // Setup event listeners
    setupEventListeners();

    // Initialize managers
    ProductManager.init();
    CartManager.updateUI();

    // Trigger initial fade-in animations
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(el => {
            el.classList.add('visible');
        });
    }, 100);

    console.log('✅ TechStore ready!');
    console.log('Initial cart state:', AppState.cart);
    Utils.showNotification('Welcome to TechStore!', 'success');
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Export for debugging (optional)
window.TechStore = {
    AppState,
    ProductManager,
    FilterManager,
    CartManager,
    MobileMenuManager,
    Utils
};