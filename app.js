/**
 * NexusTech Store — Application Logic
 */

// ==========================================================================
// Configurações & Estado Global
// ==========================================================================
const CONFIG = {
  whatsappNumber: "5511999999999", // Altere para seu número com DDD (ex: 5511999999999)
  validCoupons: {
    "NEXUS10": 0.10,
    "BEMVINDO": 0.10,
    "PROMO15": 0.15
  }
};

let state = {
  category: "all",
  searchQuery: "",
  sortBy: "default",
  cart: JSON.parse(localStorage.getItem("nexus_cart") || "[]"),
  appliedCoupon: localStorage.getItem("nexus_coupon") || null,
  theme: localStorage.getItem("nexus_theme") || "light"
};

// ==========================================================================
// Seletores DOM
// ==========================================================================
const elements = {
  productsGrid: document.getElementById("productsGrid"),
  resultsCount: document.getElementById("resultsCount"),
  emptyState: document.getElementById("emptyState"),
  resetFiltersBtn: document.getElementById("resetFiltersBtn"),
  categoryFilters: document.getElementById("categoryFilters"),
  searchInput: document.getElementById("searchInput"),
  clearSearchBtn: document.getElementById("clearSearchBtn"),
  sortSelect: document.getElementById("sortSelect"),
  
  // Carrinho
  cartBtn: document.getElementById("cartBtn"),
  cartCountBadge: document.getElementById("cartCountBadge"),
  cartOverlay: document.getElementById("cartOverlay"),
  cartCloseBtn: document.getElementById("cartCloseBtn"),
  cartItemsList: document.getElementById("cartItemsList"),
  cartSubtotal: document.getElementById("cartSubtotal"),
  discountRow: document.getElementById("discountRow"),
  cartDiscount: document.getElementById("cartDiscount"),
  cartTotal: document.getElementById("cartTotal"),
  couponInput: document.getElementById("couponInput"),
  applyCouponBtn: document.getElementById("applyCouponBtn"),
  couponFeedback: document.getElementById("couponFeedback"),
  checkoutWhatsAppBtn: document.getElementById("checkoutWhatsAppBtn"),
  clearCartBtn: document.getElementById("clearCartBtn"),

  // Modal de Detalhes
  productModalOverlay: document.getElementById("productModalOverlay"),
  modalCloseBtn: document.getElementById("modalCloseBtn"),
  modalBody: document.getElementById("modalBody"),

  // Tema & Toasts
  themeToggleBtn: document.getElementById("themeToggleBtn"),
  sunIcon: document.querySelector(".sun-icon"),
  moonIcon: document.querySelector(".moon-icon"),
  toastContainer: document.getElementById("toastContainer"),
  heroWhatsAppBtn: document.getElementById("heroWhatsAppBtn")
};

// ==========================================================================
// Formatação de Moeda
// ==========================================================================
function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value);
}

// ==========================================================================
// Inicialização
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderProducts();
  updateCartUI();
  setupEventListeners();
});

// ==========================================================================
// Gerenciamento de Tema (Claro / Escuro)
// ==========================================================================
function initTheme() {
  if (state.theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    elements.sunIcon.style.display = "none";
    elements.moonIcon.style.display = "block";
  } else {
    document.documentElement.removeAttribute("data-theme");
    elements.sunIcon.style.display = "block";
    elements.moonIcon.style.display = "none";
  }
}

function toggleTheme() {
  state.theme = state.theme === "dark" ? "light" : "dark";
  localStorage.setItem("nexus_theme", state.theme);
  initTheme();
}

// ==========================================================================
// Filtros, Busca e Ordenação de Produtos
// ==========================================================================
function getFilteredProducts() {
  let list = [...products];

  // Filtro por Categoria
  if (state.category !== "all") {
    list = list.filter(item => item.category === state.category);
  }

  // Filtro por Busca
  if (state.searchQuery.trim() !== "") {
    const query = state.searchQuery.toLowerCase().trim();
    list = list.filter(item => 
      item.name.toLowerCase().includes(query) ||
      item.categoryLabel.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );
  }

  // Ordenação
  switch (state.sortBy) {
    case "price-asc":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list.sort((a, b) => b.price - a.price);
      break;
    case "rating-desc":
      list.sort((a, b) => b.rating - a.rating);
      break;
    default:
      // Padrão (ordem de cadastro)
      break;
  }

  return list;
}

function renderProducts() {
  const filtered = getFilteredProducts();

  // Atualiza contagem
  elements.resultsCount.textContent = `Exibindo ${filtered.length} ${filtered.length === 1 ? 'produto' : 'produtos'}`;

  // Estado Vazio
  if (filtered.length === 0) {
    elements.productsGrid.style.display = "none";
    elements.emptyState.style.display = "block";
    return;
  }

  elements.emptyState.style.display = "none";
  elements.productsGrid.style.display = "grid";

  // Renderiza cards
  elements.productsGrid.innerHTML = filtered.map(item => `
    <article class="product-card" data-id="${item.id}">
      <div class="card-media" onclick="openProductModal(${item.id})">
        ${item.badge ? `<span class="badge badge-${item.badgeType}">${item.badge}</span>` : ''}
        <img src="${item.image}" alt="${item.name}" loading="lazy">
      </div>
      <div class="card-body">
        <span class="card-category">${item.categoryLabel}</span>
        <h3 class="card-title" onclick="openProductModal(${item.id})">${item.name}</h3>
        <div class="card-rating">
          ★ <strong>${item.rating.toFixed(1)}</strong>
          <span>(${item.reviewsCount} avaliações)</span>
        </div>
        <div class="card-footer">
          <div class="price-box">
            ${item.oldPrice ? `<span class="old-price">${formatCurrency(item.oldPrice)}</span>` : ''}
            <span class="current-price">${formatCurrency(item.price)}</span>
          </div>
          <button class="card-add-btn" onclick="addToCart(${item.id})" title="Adicionar ao carrinho" aria-label="Adicionar ${item.name} ao carrinho">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

// Atalho para filtro global
window.filterByCategory = function(category) {
  state.category = category;
  document.querySelectorAll(".filter-chip").forEach(chip => {
    chip.classList.toggle("active", chip.dataset.category === category);
  });
  renderProducts();
};

// ==========================================================================
// Modal de Detalhes do Produto (Quick View)
// ==========================================================================
window.openProductModal = function(productId) {
  const item = products.find(p => p.id === productId);
  if (!item) return;

  const installmentValue = (item.price / 10).toFixed(2);

  elements.modalBody.innerHTML = `
    <div class="modal-content-grid">
      <div class="modal-image-col">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="modal-details-col">
        <span class="card-category">${item.categoryLabel}</span>
        <h2 class="modal-title">${item.name}</h2>
        <div class="card-rating">
          ★ <strong>${item.rating.toFixed(1)}</strong>
          <span>(${item.reviewsCount} clientes satisfeitos)</span>
        </div>
        <div class="modal-price-box">
          ${item.oldPrice ? `<span class="old-price">${formatCurrency(item.oldPrice)}</span>` : ''}
          <div class="current-price" style="font-size: 1.6rem;">${formatCurrency(item.price)}</div>
          <div class="modal-installment">💳 Em até 10x de ${formatCurrency(installmentValue)} sem juros</div>
        </div>
        <p class="modal-desc">${item.description}</p>
        <ul class="modal-specs-list">
          ${item.specs.map(spec => `<li>${spec}</li>`).join("")}
        </ul>
        <div class="modal-actions">
          <button class="btn btn-primary" style="flex: 1;" onclick="addToCart(${item.id}); closeModal();">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  `;

  elements.productModalOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
};

function closeModal() {
  elements.productModalOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

// ==========================================================================
// Carrinho de Compras
// ==========================================================================
window.addToCart = function(productId, quantity = 1) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = state.cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    state.cart.push({ id: productId, quantity });
  }

  saveCart();
  updateCartUI();
  showToast(`"${product.name}" adicionado ao carrinho!`);

  // Animação no badge
  elements.cartCountBadge.classList.add("badge-bump");
  setTimeout(() => elements.cartCountBadge.classList.remove("badge-bump"), 300);
};

window.updateItemQuantity = function(productId, delta) {
  const itemIndex = state.cart.findIndex(i => i.id === productId);
  if (itemIndex === -1) return;

  state.cart[itemIndex].quantity += delta;
  if (state.cart[itemIndex].quantity <= 0) {
    state.cart.splice(itemIndex, 1);
  }

  saveCart();
  updateCartUI();
};

window.removeFromCart = function(productId) {
  state.cart = state.cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
};

function clearCart() {
  if (state.cart.length === 0) return;
  if (confirm("Tem certeza que deseja esvaziar seu carrinho?")) {
    state.cart = [];
    state.appliedCoupon = null;
    localStorage.removeItem("nexus_coupon");
    saveCart();
    updateCartUI();
  }
}

function saveCart() {
  localStorage.setItem("nexus_cart", JSON.stringify(state.cart));
}

function updateCartUI() {
  // Quantidade total de itens
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  elements.cartCountBadge.textContent = totalItems;

  if (state.cart.length === 0) {
    elements.cartItemsList.innerHTML = `
      <div class="cart-empty">
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <h4>Seu carrinho está vazio</h4>
        <p>Explore nosso catálogo e adicione seus itens favoritos!</p>
      </div>
    `;
    elements.cartFooter.style.display = "none";
    return;
  }

  elements.cartFooter.style.display = "block";

  // Renderiza itens
  let subtotal = 0;
  elements.cartItemsList.innerHTML = state.cart.map(cartItem => {
    const product = products.find(p => p.id === cartItem.id);
    if (!product) return "";
    const itemTotal = product.price * cartItem.quantity;
    subtotal += itemTotal;

    return `
      <div class="cart-item">
        <img src="${product.image}" alt="${product.name}" class="cart-item-img">
        <div class="cart-item-info">
          <div>
            <h4 class="cart-item-title">${product.name}</h4>
            <span class="cart-item-price">${formatCurrency(product.price)}</span>
          </div>
          <div class="cart-item-bottom">
            <div class="qty-control">
              <button class="qty-btn" onclick="updateItemQuantity(${product.id}, -1)">−</button>
              <span class="qty-value">${cartItem.quantity}</span>
              <button class="qty-btn" onclick="updateItemQuantity(${product.id}, 1)">+</button>
            </div>
            <button class="item-remove-btn" onclick="removeFromCart(${product.id})">Remover</button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  // Cálculo de desconto e total
  let discount = 0;
  if (state.appliedCoupon && CONFIG.validCoupons[state.appliedCoupon]) {
    const discountRate = CONFIG.validCoupons[state.appliedCoupon];
    discount = subtotal * discountRate;
    elements.discountRow.style.display = "flex";
    elements.cartDiscount.textContent = `- ${formatCurrency(discount)}`;
  } else {
    elements.discountRow.style.display = "none";
  }

  const finalTotal = Math.max(0, subtotal - discount);
  elements.cartSubtotal.textContent = formatCurrency(subtotal);
  elements.cartTotal.textContent = formatCurrency(finalTotal);
}

// ==========================================================================
// Cupom de Desconto
// ==========================================================================
function applyCoupon() {
  const code = elements.couponInput.value.trim().toUpperCase();
  if (!code) return;

  if (CONFIG.validCoupons[code]) {
    state.appliedCoupon = code;
    localStorage.setItem("nexus_coupon", code);
    elements.couponFeedback.className = "coupon-feedback success";
    elements.couponFeedback.textContent = `Cupom "${code}" aplicado com sucesso!`;
    updateCartUI();
  } else {
    elements.couponFeedback.className = "coupon-feedback error";
    elements.couponFeedback.textContent = "Cupom inválido. Tente 'NEXUS10'.";
  }
}

// ==========================================================================
// Checkout via WhatsApp
// ==========================================================================
function checkoutViaWhatsApp() {
  if (state.cart.length === 0) return;

  let message = "Olá! Gostaria de fazer o seguinte pedido na *NexusTech*:\n\n";

  let subtotal = 0;
  state.cart.forEach((cartItem, index) => {
    const product = products.find(p => p.id === cartItem.id);
    if (product) {
      const itemSub = product.price * cartItem.quantity;
      subtotal += itemSub;
      message += `${index + 1}. *${cartItem.quantity}x* ${product.name}\n`;
      message += `   ↳ Valor: ${formatCurrency(itemSub)}\n`;
    }
  });

  let discount = 0;
  if (state.appliedCoupon && CONFIG.validCoupons[state.appliedCoupon]) {
    discount = subtotal * CONFIG.validCoupons[state.appliedCoupon];
    message += `\n🏷️ *Cupom:* ${state.appliedCoupon} (-${formatCurrency(discount)})`;
  }

  const total = subtotal - discount;
  message += `\n📦 *Frete:* Grátis`;
  message += `\n💰 *Total:* ${formatCurrency(total)}\n`;
  message += `\nPor favor, informe as opções de pagamento (Pix / Cartão) e prazo de entrega!`;

  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// ==========================================================================
// Toasts
// ==========================================================================
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <span class="toast-icon">✓</span>
    <span>${message}</span>
  `;
  elements.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// ==========================================================================
// Event Listeners
// ==========================================================================
function setupEventListeners() {
  // Filtros de categoria
  elements.categoryFilters.addEventListener("click", e => {
    const chip = e.target.closest(".filter-chip");
    if (!chip) return;
    document.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    state.category = chip.dataset.category;
    renderProducts();
  });

  // Busca
  elements.searchInput.addEventListener("input", e => {
    state.searchQuery = e.target.value;
    elements.clearSearchBtn.style.display = state.searchQuery ? "block" : "none";
    renderProducts();
  });

  elements.clearSearchBtn.addEventListener("click", () => {
    elements.searchInput.value = "";
    state.searchQuery = "";
    elements.clearSearchBtn.style.display = "none";
    renderProducts();
  });

  // Reset de filtros no estado vazio
  elements.resetFiltersBtn.addEventListener("click", () => {
    state.category = "all";
    state.searchQuery = "";
    elements.searchInput.value = "";
    elements.clearSearchBtn.style.display = "none";
    document.querySelectorAll(".filter-chip").forEach(c => {
      c.classList.toggle("active", c.dataset.category === "all");
    });
    renderProducts();
  });

  // Ordenação
  elements.sortSelect.addEventListener("change", e => {
    state.sortBy = e.target.value;
    renderProducts();
  });

  // Gaveta do Carrinho
  elements.cartBtn.addEventListener("click", () => {
    elements.cartOverlay.classList.add("active");
  });

  elements.cartCloseBtn.addEventListener("click", () => {
    elements.cartOverlay.classList.remove("active");
  });

  elements.cartOverlay.addEventListener("click", e => {
    if (e.target === elements.cartOverlay) {
      elements.cartOverlay.classList.remove("active");
    }
  });

  // Modal
  elements.modalCloseBtn.addEventListener("click", closeModal);
  elements.productModalOverlay.addEventListener("click", e => {
    if (e.target === elements.productModalOverlay) {
      closeModal();
    }
  });

  // Tecla ESC fecha modal e carrinho
  window.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeModal();
      elements.cartOverlay.classList.remove("active");
    }
  });

  // Tema
  elements.themeToggleBtn.addEventListener("click", toggleTheme);

  // Cupom
  elements.applyCouponBtn.addEventListener("click", applyCoupon);
  elements.couponInput.addEventListener("keydown", e => {
    if (e.key === "Enter") applyCoupon();
  });

  // Esvaziar carrinho
  elements.clearCartBtn.addEventListener("click", clearCart);

  // Checkout
  elements.checkoutWhatsAppBtn.addEventListener("click", checkoutViaWhatsApp);

  // WhatsApp no Hero
  elements.heroWhatsAppBtn.addEventListener("click", () => {
    const text = encodeURIComponent("Olá! Gostaria de tirar dúvidas sobre os produtos da NexusTech.");
    window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${text}`, "_blank");
  });
}
