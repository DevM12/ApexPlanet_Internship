
        // Smooth scrolling
        function scrollToSection(sectionId) {
            document.getElementById(sectionId).scrollIntoView({
                behavior: 'smooth'
            });
        }

        // Animate skill bars on scroll
        function animateSkills() {
            const skillBars = document.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            });
        }

        // Todo App Functionality
        let todos = [];

        // Load todos from memory (simulating localStorage)
        function loadTodos() {
            const saved = window.todoStorage || [];
            todos = saved;
            renderTodos();
        }

        // Save todos to memory
        function saveTodos() {
            window.todoStorage = todos;
        }

        function addTodo() {
            const input = document.getElementById('todoInput');
            const text = input.value.trim();
            
            if (text) {
                const todo = {
                    id: Date.now(),
                    text: text,
                    completed: false
                };
                
                todos.push(todo);
                saveTodos();
                renderTodos();
                input.value = '';
            }
        }

        function toggleTodo(id) {
            const todo = todos.find(t => t.id === id);
            if (todo) {
                todo.completed = !todo.completed;
                saveTodos();
                renderTodos();
            }
        }

        function deleteTodo(id) {
            todos = todos.filter(t => t.id !== id);
            saveTodos();
            renderTodos();
        }

        function renderTodos() {
            const container = document.getElementById('todoList');
            container.innerHTML = '';
            
            todos.forEach(todo => {
                const todoElement = document.createElement('div');
                todoElement.className = `todo-item ${todo.completed ? 'completed' : ''}`;
                todoElement.innerHTML = `
                    <span>${todo.text}</span>
                    <div class="todo-actions">
                        <button class="btn-small btn-complete" onclick="toggleTodo(${todo.id})">
                            ${todo.completed ? 'Undo' : 'Complete'}
                        </button>
                        <button class="btn-small btn-delete" onclick="deleteTodo(${todo.id})">Delete</button>
                    </div>
                `;
                container.appendChild(todoElement);
            });
        }

        // Product Listing Functionality
        const products = [
            { id: 1, name: 'MacBook Pro', price: 1299, category: 'Electronics', rating: 4.8, description: 'High-performance laptop' },
            { id: 2, name: 'iPhone 15', price: 999, category: 'Electronics', rating: 4.7, description: 'Latest smartphone' },
            { id: 3, name: 'Wireless Headphones', price: 299, category: 'Electronics', rating: 4.5, description: 'Premium audio quality' },
            { id: 4, name: 'Designer T-Shirt', price: 49, category: 'Clothing', rating: 4.2, description: 'Comfortable cotton tee' },
            { id: 5, name: 'Jeans', price: 89, category: 'Clothing', rating: 4.4, description: 'Classic denim jeans' },
            { id: 6, name: 'Running Shoes', price: 129, category: 'Clothing', rating: 4.6, description: 'Lightweight running shoes' },
            { id: 7, name: 'JavaScript Guide', price: 35, category: 'Books', rating: 4.9, description: 'Complete programming guide' },
            { id: 8, name: 'Design Patterns', price: 42, category: 'Books', rating: 4.7, description: 'Software architecture book' },
            { id: 9, name: 'Coffee Maker', price: 159, category: 'Home', rating: 4.3, description: 'Automatic drip coffee maker' },
            { id: 10, name: 'Smart Thermostat', price: 249, category: 'Home', rating: 4.5, description: 'WiFi-enabled thermostat' },
            { id: 11, name: 'Gaming Mouse', price: 79, category: 'Electronics', rating: 4.4, description: 'High-precision gaming mouse' },
            { id: 12, name: 'Winter Jacket', price: 199, category: 'Clothing', rating: 4.6, description: 'Waterproof winter jacket' }
        ];

        let filteredProducts = [...products];

        function renderProducts(productsToRender = filteredProducts) {
            const container = document.getElementById('productsGrid');
            container.innerHTML = '';
            
            productsToRender.forEach(product => {
                const productElement = document.createElement('div');
                productElement.className = 'product-item';
                productElement.innerHTML = `
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">${product.price}</div>
                    <div class="product-category">${product.category}</div>
                    <div class="product-rating">${'★'.repeat(Math.floor(product.rating))} ${product.rating}</div>
                    <div style="color: #b0b0b0; font-size: 0.9rem; margin-top: 0.5rem;">${product.description}</div>
                `;
                container.appendChild(productElement);
            });
        }

        function filterProducts() {
            const category = document.getElementById('categoryFilter').value;
            const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
            const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;
            
            filteredProducts = products.filter(product => {
                const matchesCategory = !category || product.category === category;
                const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
                return matchesCategory && matchesPrice;
            });
            
            renderProducts(filteredProducts);
        }

        function sortProducts() {
            const sortBy = document.getElementById('sortBy').value;
            
            filteredProducts.sort((a, b) => {
                switch(sortBy) {
                    case 'name':
                        return a.name.localeCompare(b.name);
                    case 'price-low':
                        return a.price - b.price;
                    case 'price-high':
                        return b.price - a.price;
                    case 'rating':
                        return b.rating - a.rating;
                    default:
                        return 0;
                }
            });
            
            renderProducts(filteredProducts);
        }

        // Contact form handler
        function handleSubmit(event) {
            event.preventDefault();
            
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData.entries());
            
            // Simulate form submission
            alert(`Thank you ${data.name}! Your message has been sent. I'll get back to you soon.`);
            event.target.reset();
        }

        // Add enter key support for todo input
        document.addEventListener('DOMContentLoaded', function() {
            const todoInput = document.getElementById('todoInput');
            if (todoInput) {
                todoInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        addTodo();
                    }
                });
            }
            
            // Initialize data
            loadTodos();
            renderProducts();
            
            // Animate skills when about section is in view
            const aboutSection = document.getElementById('about');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(animateSkills, 500);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            if (aboutSection) {
                observer.observe(aboutSection);
            }
            
            // Smooth scroll behavior for navigation links
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href').substring(1);
                    scrollToSection(targetId);
                });
            });
        });

        // Add some interactive animations
        document.addEventListener('mousemove', function(e) {
            const cursor = document.querySelector('.cursor');
            if (!cursor) {
                const newCursor = document.createElement('div');
                newCursor.className = 'cursor';
                newCursor.style.cssText = `
                    position: fixed;
                    width: 20px;
                    height: 20px;
                    background: radial-gradient(circle, rgba(0, 212, 255, 0.3), transparent);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    transition: transform 0.1s ease;
                `;
                document.body.appendChild(newCursor);
            }
            
            const cursor_elem = document.querySelector('.cursor');
            if (cursor_elem) {
                cursor_elem.style.left = e.clientX - 10 + 'px';
                cursor_elem.style.top = e.clientY - 10 + 'px';
            }
        });

        // Add scroll effects
        window.addEventListener('scroll', function() {
            const nav = document.querySelector('nav');
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(12, 12, 12, 0.98)';
                nav.style.backdropFilter = 'blur(25px)';
            } else {
                nav.style.background = 'rgba(12, 12, 12, 0.95)';
                nav.style.backdropFilter = 'blur(20px)';
            }
        });