# NexusTech — Loja Virtual & Catálogo de Produtos 🛒

Site moderno, responsivo e de alta performance desenvolvido com **HTML5 puro, CSS3 moderno e Vanilla JavaScript**. Sem dependências pesadas, super rápido e pronto para ser publicado gratuitamente no **GitHub Pages**!

---

## ✨ Recursos Inclusos

- 🛍️ **Catálogo Dinâmico:** Produtos organizados por categorias (Fones, Smartwatches, Periféricos, Acessórios) com badges promocionais (*Destaque*, *Mais Vendido*, *Promoção*).
- 🔍 **Busca em Tempo Real & Filtros:** Busca instantânea por nome ou categoria, além de ordenação por menor preço, maior preço e avaliações.
- 👁️ **Quick View (Modal de Detalhes):** Visualização rápida de especificações técnicas, parcelamento sem juros e botão de compra.
- 🛒 **Carrinho de Compras Interativo (Drawer):**
  - Adição e remoção de produtos com controle de quantidade (+ / -).
  - Cálculo automático de subtotal e frete grátis.
  - Suporte a cupons de desconto (ex: `NEXUS10`).
  - Persistência dos dados no `localStorage` (o carrinho não se perde ao atualizar a página).
- 💬 **Checkout Direto via WhatsApp:** Gera automaticamente uma mensagem formatada com todos os itens do pedido, valores e total pronto para envio ao seu número.
- 🌓 **Modo Claro / Escuro (Dark Mode):** Alternância instantânea com persistência de preferência.
- 📱 **Totalmente Responsivo:** Design impecável em computadores, tablets e smartphones.

---

## 🚀 Como testar localmente

Abra um terminal na pasta do projeto e inicie um servidor local:

```powershell
# Se tiver Python instalado:
python -m http.server 3000

# Ou simplesmente dê dois cliques no arquivo index.html para abrir direto no navegador!
```

---

## ⚙️ Como Personalizar

1. **Seus Produtos:** Abra o arquivo [products.js](products.js) para alterar nomes, preços, fotos e descrições dos produtos.
2. **Seu Número do WhatsApp:** No arquivo [app.js](app.js), na linha `CONFIG.whatsappNumber`, substitua `5511999999999` pelo seu número de WhatsApp com código do país (55) e DDD.
3. **Cupons de Desconto:** No [app.js](app.js), configure os cupons e porcentagens no objeto `CONFIG.validCoupons`.

---

## 🌐 Como Publicar no GitHub Pages (Grátis)

Como você já tem o GitHub configurado no seu ambiente (`j-mota-bit`), basta rodar os seguintes comandos para criar o repositório e publicar:

```powershell
# 1. Salvar as alterações no Git
git add .
git commit -m "feat: site da loja virtual completo"

# 2. Criar o repositório remoto público no GitHub via GitHub CLI
gh repo create loja-virtual --public --source=. --remote=origin --push

# 3. Ativar o GitHub Pages
# Acesse o repositório no GitHub -> Settings -> Pages -> Source: Deploy from branch 'main' / 'root'
```

Seu site estará no ar gratuitamente em:
`https://j-mota-bit.github.io/loja-virtual/`
