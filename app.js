/**
 * SONOMA & CO. — Kitchen, Table & Entertaining
 * Application Logic & E-Commerce Core
 * Inspirado na experiência de compra da Williams-Sonoma
 */

// ==========================================================================
// Configurações Globais
// ==========================================================================
const CONFIG = {
  whatsappNumber: "5511999999999", // Configure para seu WhatsApp com DDD
  storeName: "SONOMA & CO. — Thanksgiving & Holiday Feast",
  freeShippingGoal: 299.00,
  validCoupons: {
    "SONOMA10": 0.10,   // 10% de desconto
    "CEIA15": 0.15,     // 15% de desconto
    "THANKS20": 0.20,   // 20% de desconto
    "BEMVINDO": 0.10
  }
};

// ==========================================================================
// Estado Global
// ==========================================================================
let state = {
  category: "all",
  priceRange: "all",
  selectedMaterials: [],
  searchQuery: "",
  sortBy: "default",
  cart: JSON.parse(localStorage.getItem("sonoma_cart") || "[]"),
  wishlist: JSON.parse(localStorage.getItem("sonoma_wishlist") || "[]"),
  appliedCoupon: localStorage.getItem("sonoma_coupon") || null,
  theme: localStorage.getItem("sonoma_theme") || "light"
};

// ==========================================================================
// Seletores DOM
// ==========================================================================
const elements = {
  // Catálogo & Filtros
  productsGrid: document.getElementById("productsGrid"),
  resultsCount: document.getElementById("resultsCount"),
  emptyState: document.getElementById("emptyState"),
  resetFiltersBtn: document.getElementById("resetFiltersBtn"),
  clearAllFiltersBtn: document.getElementById("clearAllFiltersBtn"),
  sortSelect: document.getElementById("sortSelect"),
  searchInput: document.getElementById("searchInput"),
  clearSearchBtn: document.getElementById("clearSearchBtn"),
  activeFilterChips: document.getElementById("activeFilterChips"),

  // Navegação de Departamentos
  deptLinks: document.querySelectorAll("[data-nav-category]"),
  sidebarCatBtns: document.querySelectorAll("[data-sidebar-cat]"),
  heroTiles: document.querySelectorAll("[data-hero-category]"),
  footerCatLinks: document.querySelectorAll("[data-footer-cat]"),

  // Contadores no Sidebar
  countAll: document.getElementById("countAll"),
  countAssadeiras: document.getElementById("countAssadeiras"),
  countCutelaria: document.getElementById("countCutelaria"),
  countMesa: document.getElementById("countMesa"),
  countUtensilios: document.getElementById("countUtensilios"),
  countConfeitaria: document.getElementById("countConfeitaria"),

  // Filtros de Preço e Materiais
  priceRadios: document.querySelectorAll('input[name="priceRange"]'),
  materialCheckboxes: document.querySelectorAll('#materialFilterOptions input[type="checkbox"]'),

  // Tema
  themeToggleBtn: document.getElementById("themeToggleBtn"),
  sunIcon: document.querySelector(".sun-icon"),
  moonIcon: document.querySelector(".moon-icon"),

  // Wishlist
  wishlistBtn: document.getElementById("wishlistBtn"),
  wishlistCountBadge: document.getElementById("wishlistCountBadge"),

  // Sacola Gourmet / Carrinho
  cartBtn: document.getElementById("cartBtn"),
  cartCountBadge: document.getElementById("cartCountBadge"),
  headerCartTotal: document.getElementById("headerCartTotal"),
  cartDrawerCount: document.getElementById("cartDrawerCount"),
  cartOverlay: document.getElementById("cartOverlay"),
  cartDrawer: document.getElementById("cartDrawer"),
  cartCloseBtn: document.getElementById("cartCloseBtn"),
  cartContinueBtn: document.getElementById("cartContinueBtn"),
  cartEmptyContinueBtn: document.getElementById("cartEmptyContinueBtn"),
  cartItemsList: document.getElementById("cartItemsList"),
  cartEmptyState: document.getElementById("cartEmptyState"),
  cartFooter: document.getElementById("cartFooter"),

  // Totais e Frete
  cartSubtotal: document.getElementById("cartSubtotal"),
  discountRow: document.getElementById("discountRow"),
  cartDiscount: document.getElementById("cartDiscount"),
  cartShippingValue: document.getElementById("cartShippingValue"),
  cartTotal: document.getElementById("cartTotal"),
  cartInstallments: document.getElementById("cartInstallments"),
  shippingNoticeText: document.getElementById("shippingNoticeText"),
  shippingProgressBar: document.getElementById("shippingProgressBar"),

  // Cupom
  couponInput: document.getElementById("couponInput"),
  applyCouponBtn: document.getElementById("applyCouponBtn"),
  couponMessage: document.getElementById("couponMessage"),

  // Checkout e Concierge
  checkoutWhatsAppBtn: document.getElementById("checkoutWhatsAppBtn"),
  sidebarConciergeBtn: document.getElementById("sidebarConciergeBtn"),
  utilityHelpBtn: document.getElementById("utilityHelpBtn"),

  // Modal Quick View
  quickViewModal: document.getElementById("quickViewModal"),
  modalCloseBtn: document.getElementById("modalCloseBtn"),
  modalProductDetails: document.getElementById("modalProductDetails"),

  // Newsletter e Toast
  toastContainer: document.getElementById("toastContainer"),
  newsletterForm: document.getElementById("newsletterForm"),
  newsletterNotice: document.getElementById("newsletterNotice")
};

// ==========================================================================
// Utilitários de Formatação
// ==========================================================================
const formatCurrency = (val) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(val);
};

const calculateInstallments = (price, maxInstallments = 6) => {
  const installmentValue = price / maxInstallments;
  return `ou até ${maxInstallments}x de ${formatCurrency(installmentValue)} sem juros`;
};

// ==========================================================================
// Gerenciador de Tema (Claro / Escuro)
// ==========================================================================
function applyTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("sonoma_theme", theme);

  if (theme === "dark") {
    elements.sunIcon.style.display = "none";
    elements.moonIcon.style.display = "block";
  } else {
    elements.sunIcon.style.display = "block";
    elements.moonIcon.style.display = "none";
  }
}

function toggleTheme() {
  const newTheme = state.theme === "dark" ? "light" : "dark";
  applyTheme(newTheme);
  showToast(`Modo ${newTheme === "dark" ? "Escuro" : "Claro"} ativado`, "info");
}

// ==========================================================================
// Atualização de Contadores no Sidebar
// ==========================================================================
function updateSidebarCounts() {
  const countByCat = (cat) => products.filter((p) => p.category === cat).length;

  if (elements.countAll) elements.countAll.textContent = products.length;
  if (elements.countAssadeiras) elements.countAssadeiras.textContent = countByCat("assadeiras");
  if (elements.countCutelaria) elements.countCutelaria.textContent = countByCat("cutelaria");
  if (elements.countMesa) elements.countMesa.textContent = countByCat("mesa");
  if (elements.countUtensilios) elements.countUtensilios.textContent = countByCat("utensilios");
  if (elements.countConfeitaria) elements.countConfeitaria.textContent = countByCat("confeitaria");
}

// ==========================================================================
// Filtros e Ordenação de Produtos
// ==========================================================================
function getFilteredAndSortedProducts() {
  let list = [...products];

  // 1. Categoria
  if (state.category !== "all") {
    list = list.filter((p) => p.category === state.category);
  }

  // 2. Faixa de Preço
  if (state.priceRange === "under200") {
    list = list.filter((p) => p.price <= 200);
  } else if (state.priceRange === "200to400") {
    list = list.filter((p) => p.price > 200 && p.price <= 400);
  } else if (state.priceRange === "over400") {
    list = list.filter((p) => p.price > 400);
  }

  // 3. Materiais Selecionados
  if (state.selectedMaterials.length > 0) {
    list = list.filter((p) => state.selectedMaterials.includes(p.material));
  }

  // 4. Busca por Texto
  if (state.searchQuery.trim() !== "") {
    const q = state.searchQuery.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q)
    );
  }

  // 5. Ordenação
  switch (state.sortBy) {
    case "price-asc":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      list.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
      break;
    default:
      break;
  }

  return list;
}

// Renderizar Chips de Filtros Ativos
function renderActiveFilterChips() {
  const chips = [];

  if (state.category !== "all") {
    const sample = products.find((p) => p.category === state.category);
    const label = sample ? sample.categoryLabel : state.category;
    chips.push({ type: "category", label: `Departamento: ${label}` });
  }

  if (state.priceRange !== "all") {
    let label = "";
    if (state.priceRange === "under200") label = "Preço: Até R$ 200";
    if (state.priceRange === "200to400") label = "Preço: R$ 200 a R$ 400";
    if (state.priceRange === "over400") label = "Preço: Acima de R$ 400";
    chips.push({ type: "price", label });
  }

  state.selectedMaterials.forEach((mat) => {
    chips.push({ type: "material", value: mat, label: `Material: ${mat}` });
  });

  if (state.searchQuery) {
    chips.push({ type: "search", label: `Busca: "${state.searchQuery}"` });
  }

  if (chips.length === 0) {
    elements.activeFilterChips.innerHTML = "";
    return;
  }

  elements.activeFilterChips.innerHTML = chips
    .map((c) => {
      return `
        <span class="filter-chip">
          <span>${c.label}</span>
          <button data-remove-chip="${c.type}" ${c.value ? `data-chip-val="${c.value}"` : ""}>&times;</button>
        </span>
      `;
    })
    .join("");

  // Eventos de remoção de chips
  elements.activeFilterChips.querySelectorAll("[data-remove-chip]").forEach((btn) => {
    btn.onclick = () => {
      const type = btn.getAttribute("data-remove-chip");
      if (type === "category") setCategory("all");
      if (type === "price") {
        state.priceRange = "all";
        document.querySelector('input[name="priceRange"][value="all"]').checked = true;
      }
      if (type === "material") {
        const val = btn.getAttribute("data-chip-val");
        state.selectedMaterials = state.selectedMaterials.filter((m) => m !== val);
        const checkbox = document.querySelector(`#materialFilterOptions input[value="${val}"]`);
        if (checkbox) checkbox.checked = false;
      }
      if (type === "search") {
        state.searchQuery = "";
        elements.searchInput.value = "";
        elements.clearSearchBtn.style.display = "none";
      }
      renderProducts();
    };
  });
}

// ==========================================================================
// Renderização do Grid de Produtos
// ==========================================================================
function renderProducts() {
  const list = getFilteredAndSortedProducts();
  renderActiveFilterChips();

  if (list.length === 0) {
    elements.productsGrid.innerHTML = "";
    elements.emptyState.style.display = "block";
    elements.resultsCount.textContent = "0 peças encontradas";
    return;
  }

  elements.emptyState.style.display = "none";
  elements.resultsCount.textContent = `Mostrando ${list.length} item${list.length > 1 ? "s" : ""} da Coleção de Ceia`;

  elements.productsGrid.innerHTML = list
    .map((product) => {
      const isWishlisted = state.wishlist.includes(product.id);
      const discountPercentage = product.oldPrice
        ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
        : 0;

      let badgeHtml = "";
      if (product.badge) {
        badgeHtml = `<span class="product-badge badge-${product.badgeType || "exclusive"}">${product.badge}</span>`;
      } else if (discountPercentage > 0) {
        badgeHtml = `<span class="product-badge badge-exclusive">-${discountPercentage}% OFF</span>`;
      }

      const swatchesHtml = product.swatches
        ? `
        <div class="product-swatches" title="Opções de acabamento disponíveis">
          ${product.swatches
            .map(
              (s, idx) => `
            <span 
              class="swatch-pill ${idx === 0 ? "active" : ""}" 
              style="background-color: ${s.color};" 
              title="${s.name}" 
              data-swatch-name="${s.name}"
              data-product-id="${product.id}"
            ></span>
          `
            )
            .join("")}
        </div>
      `
        : "";

      return `
        <article class="product-card" data-id="${product.id}">
          <div class="product-image-container">
            ${badgeHtml}
            <button 
              class="wishlist-toggle-btn ${isWishlisted ? "active" : ""}" 
              data-wishlist-id="${product.id}" 
              title="${isWishlisted ? "Remover dos favoritos de ceia" : "Salvar nos favoritos"}"
              aria-label="Favoritar"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <button class="quick-view-btn-overlay" data-quick-id="${product.id}">
              Espiar Ficha Técnica
            </button>
          </div>

          <div class="product-info">
            <span class="product-brand">${product.brand}</span>
            <h3 class="product-name" title="${product.name}">${product.name}</h3>
            
            <div class="product-rating">
              <span class="stars">★★★★★</span>
              <strong>${product.rating.toFixed(1)}</strong>
              <span>(${product.reviewsCount} avaliações)</span>
            </div>

            ${swatchesHtml}

            <div class="product-pricing">
              <div class="price-row">
                <span class="current-price">${formatCurrency(product.price)}</span>
                ${product.oldPrice ? `<span class="old-price">${formatCurrency(product.oldPrice)}</span>` : ""}
              </div>
              <div class="installment-text">
                ${calculateInstallments(product.price)}
              </div>
            </div>

            <button class="add-to-cart-btn" data-add-cart="${product.id}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span>Adicionar à Sacola</span>
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  attachProductCardEvents();
}

// ==========================================================================
// Eventos nos Cards de Produtos
// ==========================================================================
function attachProductCardEvents() {
  // Adicionar ao Carrinho
  document.querySelectorAll("[data-add-cart]").forEach((btn) => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = parseInt(btn.getAttribute("data-add-cart"), 10);
      addToCart(id, 1);
    };
  });

  // Quick View
  document.querySelectorAll("[data-quick-id]").forEach((btn) => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = parseInt(btn.getAttribute("data-quick-id"), 10);
      openQuickView(id);
    };
  });

  // Wishlist
  document.querySelectorAll("[data-wishlist-id]").forEach((btn) => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = parseInt(btn.getAttribute("data-wishlist-id"), 10);
      toggleWishlist(id);
    };
  });

  // Swatches
  document.querySelectorAll(".swatch-pill").forEach((pill) => {
    pill.onclick = (e) => {
      e.stopPropagation();
      const parent = pill.closest(".product-swatches");
      parent.querySelectorAll(".swatch-pill").forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      const swatchName = pill.getAttribute("data-swatch-name");
      showToast(`Acabamento selecionado: ${swatchName}`, "info");
    };
  });
}

// ==========================================================================
// Wishlist (Favoritos)
// ==========================================================================
function toggleWishlist(productId) {
  const index = state.wishlist.indexOf(productId);
  const product = products.find((p) => p.id === productId);

  if (index > -1) {
    state.wishlist.splice(index, 1);
    showToast(`"${product.name}" removido dos favoritos.`, "info");
  } else {
    state.wishlist.push(productId);
    showToast(`"${product.name}" salvo nos seus favoritos de ceia! ❤️`, "success");
  }

  localStorage.setItem("sonoma_wishlist", JSON.stringify(state.wishlist));
  updateWishlistBadge();
  renderProducts();
}

function updateWishlistBadge() {
  const count = state.wishlist.length;
  if (count > 0) {
    elements.wishlistCountBadge.textContent = count;
    elements.wishlistCountBadge.style.display = "inline-flex";
  } else {
    elements.wishlistCountBadge.style.display = "none";
  }
}

// ==========================================================================
// Modal Quick View (Ficha Técnica do Chef)
// ==========================================================================
function openQuickView(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const isWishlisted = state.wishlist.includes(product.id);

  elements.modalProductDetails.innerHTML = `
    <div class="modal-image">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="modal-details">
      <span class="product-brand" style="font-size: 0.8rem;">${product.brand}</span>
      <h2>${product.name}</h2>
      
      <div class="product-rating" style="margin-bottom: 0.75rem;">
        <span class="stars">★★★★★</span>
        <strong>${product.rating.toFixed(1)}</strong>
        <span>(${product.reviewsCount} avaliações verificadas de chefs e clientes)</span>
      </div>

      <div class="price-row" style="margin-bottom: 0.25rem;">
        <span class="current-price" style="font-size: 1.7rem;">${formatCurrency(product.price)}</span>
        ${product.oldPrice ? `<span class="old-price" style="font-size: 1.1rem;">${formatCurrency(product.oldPrice)}</span>` : ""}
      </div>
      <div class="installment-text" style="font-size: 0.85rem; margin-bottom: 1.25rem;">
        ${calculateInstallments(product.price)}
      </div>

      <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; margin-bottom: 1rem;">
        ${product.description}
      </p>

      <ul class="modal-specs-list">
        ${product.specs.map((s) => `<li>${s}</li>`).join("")}
      </ul>

      <div class="modal-actions-row">
        <button class="btn btn-primary btn-block" id="modalAddToCartBtn">
          Adicionar à Sacola
        </button>
        <button class="btn btn-outline" id="modalWishlistBtn">
          ${isWishlisted ? "❤️ Salvo" : "🤍 Favoritar"}
        </button>
      </div>
    </div>
  `;

  document.getElementById("modalAddToCartBtn").onclick = () => {
    addToCart(product.id, 1);
    closeQuickView();
  };

  document.getElementById("modalWishlistBtn").onclick = () => {
    toggleWishlist(product.id);
    openQuickView(product.id);
  };

  elements.quickViewModal.style.display = "flex";
}

function closeQuickView() {
  elements.quickViewModal.style.display = "none";
}

// ==========================================================================
// Gerenciador da Sacola Gourmet (Carrinho)
// ==========================================================================
function addToCart(productId, quantity = 1) {
  const existingItem = state.cart.find((item) => item.id === productId);
  const product = products.find((p) => p.id === productId);

  if (!product) return;

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    state.cart.push({
      id: product.id,
      brand: product.brand,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
  }

  saveCart();
  renderCart();
  openCartDrawer();
  showToast(`"${product.name}" adicionado à sacola de ceia! 🦃`, "success");
}

function updateCartItemQuantity(productId, newQty) {
  if (newQty <= 0) {
    removeFromCart(productId);
    return;
  }

  const item = state.cart.find((i) => i.id === productId);
  if (item) {
    item.quantity = newQty;
    saveCart();
    renderCart();
  }
}

function removeFromCart(productId) {
  const item = state.cart.find((i) => i.id === productId);
  state.cart = state.cart.filter((i) => i.id !== productId);
  saveCart();
  renderCart();
  if (item) {
    showToast(`"${item.name}" removido da sacola.`, "info");
  }
}

function saveCart() {
  localStorage.setItem("sonoma_cart", JSON.stringify(state.cart));
}

function calculateCartTotals() {
  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let discount = 0;

  if (state.appliedCoupon && CONFIG.validCoupons[state.appliedCoupon]) {
    const rate = CONFIG.validCoupons[state.appliedCoupon];
    discount = subtotal * rate;
  }

  const isFreeShipping = subtotal >= CONFIG.freeShippingGoal;
  const total = Math.max(0, subtotal - discount);

  return { subtotal, discount, isFreeShipping, total };
}

function renderCart() {
  const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  elements.cartCountBadge.textContent = totalCount;
  elements.cartDrawerCount.textContent = `${totalCount} item${totalCount !== 1 ? "s" : ""}`;

  const { subtotal, discount, isFreeShipping, total } = calculateCartTotals();
  elements.headerCartTotal.textContent = formatCurrency(total);

  if (state.cart.length === 0) {
    elements.cartItemsList.innerHTML = "";
    elements.cartEmptyState.style.display = "block";
    elements.cartFooter.style.display = "none";
    elements.shippingProgressBar.style.width = "0%";
    elements.shippingNoticeText.innerHTML = `Adicione mais <strong>${formatCurrency(CONFIG.freeShippingGoal)}</strong> para <strong>Frete Grátis</strong>`;
    return;
  }

  elements.cartEmptyState.style.display = "none";
  elements.cartFooter.style.display = "block";

  // Renderizar itens
  elements.cartItemsList.innerHTML = state.cart
    .map((item) => {
      return `
        <div class="cart-item">
          <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="cart-item-details">
            <button class="cart-item-remove-btn" data-remove-id="${item.id}" title="Remover item">&times;</button>
            <span class="cart-item-brand">${item.brand}</span>
            <h4 class="cart-item-title">${item.name}</h4>
            <div class="cart-item-price">${formatCurrency(item.price * item.quantity)}</div>
            <div class="cart-item-actions">
              <div class="quantity-stepper">
                <button class="stepper-btn" data-step-minus="${item.id}">-</button>
                <span class="stepper-val">${item.quantity}</span>
                <button class="stepper-btn" data-step-plus="${item.id}">+</button>
              </div>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  // Eventos de stepper e remoção
  document.querySelectorAll("[data-step-minus]").forEach((btn) => {
    btn.onclick = () => {
      const id = parseInt(btn.getAttribute("data-step-minus"), 10);
      const item = state.cart.find((i) => i.id === id);
      if (item) updateCartItemQuantity(id, item.quantity - 1);
    };
  });

  document.querySelectorAll("[data-step-plus]").forEach((btn) => {
    btn.onclick = () => {
      const id = parseInt(btn.getAttribute("data-step-plus"), 10);
      const item = state.cart.find((i) => i.id === id);
      if (item) updateCartItemQuantity(id, item.quantity + 1);
    };
  });

  document.querySelectorAll("[data-remove-id]").forEach((btn) => {
    btn.onclick = () => {
      const id = parseInt(btn.getAttribute("data-remove-id"), 10);
      removeFromCart(id);
    };
  });

  // Atualizar Totais
  elements.cartSubtotal.textContent = formatCurrency(subtotal);

  if (discount > 0) {
    elements.discountRow.style.display = "flex";
    elements.cartDiscount.textContent = `- ${formatCurrency(discount)}`;
  } else {
    elements.discountRow.style.display = "none";
  }

  if (isFreeShipping) {
    elements.cartShippingValue.textContent = "Grátis ✨";
    elements.shippingProgressBar.style.width = "100%";
    elements.shippingNoticeText.innerHTML = `🎉 Parabéns! Você ganhou <strong>Frete Grátis</strong> na sua Ceia`;
  } else {
    const diff = CONFIG.freeShippingGoal - subtotal;
    const progressPercent = Math.min(100, Math.round((subtotal / CONFIG.freeShippingGoal) * 100));
    elements.cartShippingValue.textContent = "Calculado no fechamento";
    elements.shippingProgressBar.style.width = `${progressPercent}%`;
    elements.shippingNoticeText.innerHTML = `Faltam apenas <strong>${formatCurrency(diff)}</strong> para ganhar <strong>Frete Grátis</strong>!`;
  }

  elements.cartTotal.textContent = formatCurrency(total);
  elements.cartInstallments.textContent = calculateInstallments(total);
}

// ==========================================================================
// Cupons de Desconto
// ==========================================================================
function applyCoupon() {
  const code = elements.couponInput.value.trim().toUpperCase();

  if (!code) {
    elements.couponMessage.textContent = "Por favor, digite um cupom.";
    elements.couponMessage.className = "coupon-message error";
    elements.couponMessage.style.display = "block";
    return;
  }

  if (CONFIG.validCoupons[code]) {
    state.appliedCoupon = code;
    localStorage.setItem("sonoma_coupon", code);
    const percent = CONFIG.validCoupons[code] * 100;
    elements.couponMessage.textContent = `Cupom ${code} aplicado: ${percent}% de desconto!`;
    elements.couponMessage.className = "coupon-message success";
    elements.couponMessage.style.display = "block";
    renderCart();
    showToast(`Cupom de ${percent}% OFF aplicado com sucesso! 🦃`, "success");
  } else {
    elements.couponMessage.textContent = "Cupom inválido ou expirado.";
    elements.couponMessage.className = "coupon-message error";
    elements.couponMessage.style.display = "block";
  }
}

// ==========================================================================
// Checkout via WhatsApp (Concierge Gourmet)
// ==========================================================================
function checkoutViaWhatsApp() {
  if (state.cart.length === 0) {
    showToast("Sua sacola está vazia!", "info");
    return;
  }

  const { subtotal, discount, isFreeShipping, total } = calculateCartTotals();
  const orderId = "SONOMA-" + Math.floor(1000 + Math.random() * 9000);

  let message = `🦃 *PEDIDO DE CEIA & FESTAS — ${CONFIG.storeName}*\n`;
  message += `📋 *Pedido:* #${orderId}\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
  message += `*Itens Selecionados para a Ceia:*\n`;

  state.cart.forEach((item, index) => {
    message += `${index + 1}. *[${item.brand}] ${item.name}*\n`;
    message += `   Qtd: ${item.quantity}x — ${formatCurrency(item.price * item.quantity)}\n`;
  });

  message += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `• *Subtotal:* ${formatCurrency(subtotal)}\n`;
  if (discount > 0) {
    message += `• *Desconto (${state.appliedCoupon}):* -${formatCurrency(discount)}\n`;
  }
  message += `• *Frete:* ${isFreeShipping ? "Grátis Especial 🎉" : "A combinar / Consultar CEP"}\n`;
  message += `• *VALOR TOTAL:* ${formatCurrency(total)}\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
  message += `📍 *Dados para Envio & Atendimento:*\n`;
  message += `• Nome Completo: \n`;
  message += `• CEP e Endereço: \n`;
  message += `• Forma de Pagamento (PIX com 5% OFF ou Cartão até 6x): \n\n`;
  message += `_Olá Chef Concierge! Gostaria de confirmar meu pedido e tirar dúvidas sobre prazos de entrega para a data da minha celebração._`;

  const encoded = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encoded}`;

  window.open(whatsappUrl, "_blank");
}

function openConciergeHelp() {
  const text = encodeURIComponent(
    `Olá Chef Concierge da Sonoma & Co.! Gostaria de ajuda para planejar os utensílios e louças para a minha Ceia de Festas.`
  );
  window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${text}`, "_blank");
}

// ==========================================================================
// Abertura / Fechamento da Gaveta
// ==========================================================================
function openCartDrawer() {
  elements.cartOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCartDrawer() {
  elements.cartOverlay.classList.remove("open");
  document.body.style.overflow = "";
}

// ==========================================================================
// Toast Notifications
// ==========================================================================
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${type === "success" ? "✓" : "✦"}</span>
    <div>${message}</div>
  `;

  elements.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ==========================================================================
// Seleção de Categoria
// ==========================================================================
function setCategory(cat) {
  state.category = cat;

  // Atualizar Botões do Mega-Nav
  elements.deptLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("data-nav-category") === cat);
  });

  // Atualizar Botões do Sidebar
  elements.sidebarCatBtns.forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-sidebar-cat") === cat);
  });

  renderProducts();
}

// ==========================================================================
// Inicialização
// ==========================================================================
function init() {
  applyTheme(state.theme);
  updateSidebarCounts();
  renderProducts();
  renderCart();
  updateWishlistBadge();

  if (state.appliedCoupon) {
    elements.couponInput.value = state.appliedCoupon;
  }

  // Tema
  elements.themeToggleBtn.onclick = toggleTheme;

  // Busca
  elements.searchInput.oninput = (e) => {
    state.searchQuery = e.target.value;
    elements.clearSearchBtn.style.display = state.searchQuery ? "block" : "none";
    renderProducts();
  };

  elements.clearSearchBtn.onclick = () => {
    elements.searchInput.value = "";
    state.searchQuery = "";
    elements.clearSearchBtn.style.display = "none";
    renderProducts();
  };

  // Ordenação
  elements.sortSelect.onchange = (e) => {
    state.sortBy = e.target.value;
    renderProducts();
  };

  // Mega-Nav Departamentos
  elements.deptLinks.forEach((link) => {
    link.onclick = () => {
      const cat = link.getAttribute("data-nav-category");
      setCategory(cat);
      document.getElementById("catalogo").scrollIntoView({ behavior: "smooth" });
    };
  });

  // Sidebar Departamentos
  elements.sidebarCatBtns.forEach((btn) => {
    btn.onclick = () => {
      const cat = btn.getAttribute("data-sidebar-cat");
      setCategory(cat);
    };
  });

  // Hero Quick Tiles
  elements.heroTiles.forEach((tile) => {
    tile.onclick = () => {
      const cat = tile.getAttribute("data-hero-category");
      setCategory(cat);
      document.getElementById("catalogo").scrollIntoView({ behavior: "smooth" });
    };
  });

  // Footer Links
  elements.footerCatLinks.forEach((link) => {
    link.onclick = (e) => {
      e.preventDefault();
      const cat = link.getAttribute("data-footer-cat");
      setCategory(cat);
      document.getElementById("catalogo").scrollIntoView({ behavior: "smooth" });
    };
  });

  // Filtros de Preço
  elements.priceRadios.forEach((radio) => {
    radio.onchange = (e) => {
      state.priceRange = e.target.value;
      renderProducts();
    };
  });

  // Filtros de Materiais
  elements.materialCheckboxes.forEach((checkbox) => {
    checkbox.onchange = () => {
      state.selectedMaterials = Array.from(elements.materialCheckboxes)
        .filter((cb) => cb.checked)
        .map((cb) => cb.value);
      renderProducts();
    };
  });

  // Limpar Filtros
  const clearAllFilters = () => {
    state.category = "all";
    state.priceRange = "all";
    state.selectedMaterials = [];
    state.searchQuery = "";
    state.sortBy = "default";

    elements.searchInput.value = "";
    elements.clearSearchBtn.style.display = "none";
    elements.sortSelect.value = "default";
    document.querySelector('input[name="priceRange"][value="all"]').checked = true;
    elements.materialCheckboxes.forEach((cb) => (cb.checked = false));

    setCategory("all");
    showToast("Filtros redefinidos.", "info");
  };

  elements.clearAllFiltersBtn.onclick = clearAllFilters;
  elements.resetFiltersBtn.onclick = clearAllFilters;

  // Sacola Gourmet
  elements.cartBtn.onclick = openCartDrawer;
  elements.cartCloseBtn.onclick = closeCartDrawer;
  elements.cartContinueBtn.onclick = closeCartDrawer;
  elements.cartEmptyContinueBtn.onclick = closeCartDrawer;

  elements.cartOverlay.onclick = (e) => {
    if (e.target === elements.cartOverlay) closeCartDrawer();
  };

  elements.applyCouponBtn.onclick = applyCoupon;
  elements.checkoutWhatsAppBtn.onclick = checkoutViaWhatsApp;

  // Concierge
  if (elements.sidebarConciergeBtn) elements.sidebarConciergeBtn.onclick = openConciergeHelp;
  if (elements.utilityHelpBtn) elements.utilityHelpBtn.onclick = (e) => { e.preventDefault(); openConciergeHelp(); };

  // Wishlist Button
  elements.wishlistBtn.onclick = () => {
    if (state.wishlist.length === 0) {
      showToast("Você ainda não favoritou nenhuma peça de ceia.", "info");
      return;
    }
    showToast(`Mostrando seus ${state.wishlist.length} itens favoritos de ceia!`, "info");
    const favProducts = products.filter((p) => state.wishlist.includes(p.id));
    elements.productsGrid.innerHTML = "";
    elements.resultsCount.textContent = `${favProducts.length} peça${favProducts.length > 1 ? "s" : ""} favorita${favProducts.length > 1 ? "s" : ""}`;
    elements.emptyState.style.display = "none";

    elements.productsGrid.innerHTML = favProducts
      .map((product) => {
        return `
          <article class="product-card" data-id="${product.id}">
            <div class="product-image-container">
              <span class="product-badge badge-exclusive">Favorito Ceia</span>
              <button class="wishlist-toggle-btn active" data-wishlist-id="${product.id}" title="Remover dos favoritos">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#DC2626" stroke="#DC2626" stroke-width="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
              <img src="${product.image}" alt="${product.name}">
              <button class="quick-view-btn-overlay" data-quick-id="${product.id}">Espiar Ficha Técnica</button>
            </div>
            <div class="product-info">
              <span class="product-brand">${product.brand}</span>
              <h3 class="product-name">${product.name}</h3>
              <div class="product-pricing">
                <span class="current-price">${formatCurrency(product.price)}</span>
              </div>
              <button class="add-to-cart-btn" data-add-cart="${product.id}">Adicionar à Sacola</button>
            </div>
          </article>
        `;
      })
      .join("");

    attachProductCardEvents();
    document.getElementById("catalogo").scrollIntoView({ behavior: "smooth" });
  };

  // Modal
  elements.modalCloseBtn.onclick = closeQuickView;
  elements.quickViewModal.onclick = (e) => {
    if (e.target === elements.quickViewModal) closeQuickView();
  };

  // Newsletter
  elements.newsletterForm.onsubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById("newsletterEmail").value;
    elements.newsletterNotice.textContent = `Receita exclusiva de ave & cupom de 10% OFF enviados para ${email}`;
    elements.newsletterNotice.style.color = "var(--accent-green)";
    elements.newsletterNotice.style.fontWeight = "700";
    elements.newsletterForm.reset();
    showToast("Inscrição no Clube Gastronômico realizada com sucesso! Use o cupom SONOMA10.", "success");
  };

  // Tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCartDrawer();
      closeQuickView();
    }
  });
}

document.addEventListener("DOMContentLoaded", init);
