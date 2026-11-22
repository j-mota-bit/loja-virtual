# AURA — Casa, Decoração & Utensílios de Cozinha 🏺✨

E-commerce sofisticado, elegante e responsivo focado no nicho de **Casa, Decoração Afetiva, Cerâmicas Artesanais, Utensílios de Cozinha e Mesa Posta**.

Desenvolvido com **HTML5 semântico, CSS3 moderno com estética editorial orgânica e Vanilla JavaScript** de alta performance, sem dependências pesadas e compatível com **GitHub Pages**.

---

## ✨ Destaques Visuais & Experiência do Usuário (UX/UI)

- 🏺 **Curadoria de Design & Estética Editorial:** Tipografia nobre (*Playfair Display* e *Plus Jakarta Sans*), paleta em tons de terracota, linho natural, madeira nobre e ouro envelhecido.
- 🌓 **Modo Claro & Escuro (Dark Mode):** Transição suave com paleta em carvão mineral e âmbar quente.
- 🔍 **Filtros por Categoria & Busca em Tempo Real:** Filtragem instantânea por Vasos & Decoração, Utensílios de Cozinha, Mesa Posta, Aromas e Têxteis.
- 🛍️ **Sacola de Compras Interativa (Slide Drawer):**
  - Barra de progresso dinâmica para **Frete Grátis** (meta configurável, ex: R$ 250).
  - Controle de quantidades (+/-), cálculo em tempo real e remoção de itens.
  - Cupons de desconto ativos: `BEMVINDO` (10% OFF), `AURA15` (15% OFF) e `CASA20` (20% OFF).
  - Cálculo de parcelamento em até 6x sem juros.
- 💬 **Checkout Estruturado via WhatsApp:** Gera automaticamente um pedido formatado com saudação, itens, subtotal, frete, desconto e campos para o cliente preencher dados de entrega.
- 👁️ **Quick View (Espiar Detalhes):** Modal com especificações técnicas da peça, dimensões, materiais e instruções de cuidados.
- ❤️ **Favoritos (Wishlist):** Salve itens com um clique e filtre seus produtos prediletos.
- 📱 **100% Responsivo:** Otimizado para smartphones, tablets e telas amplas.

---

## 🚀 Como testar localmente

Basta abrir o arquivo [index.html](index.html) dando dois cliques para ver no seu navegador!

Ou se preferir via linha de comando:
```powershell
# Iniciar servidor local rápido
npx serve .
```

---

## ⚙️ Como Personalizar

1. **Catálogo de Peças:** Edite o arquivo [products.js](products.js) para alterar nomes, preços, categorias, fotos do Unsplash e especificações.
2. **Seu WhatsApp para Receber os Pedidos:** No arquivo [app.js](app.js), na linha `CONFIG.whatsappNumber`, substitua pelo seu número com DDD (ex: `5511999999999`).
3. **Metas de Frete Grátis & Cupons:** Também no arquivo [app.js](app.js) dentro do objeto `CONFIG`.
