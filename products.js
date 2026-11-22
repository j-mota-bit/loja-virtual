/**
 * AURA Casa & Décor — Base de Dados dos Produtos
 * Curadoria de Decoração, Utensílios de Cozinha, Mesa Posta e Aromas
 */

const products = [
  {
    id: 1,
    name: "Vaso Escultórico em Cerâmica Gres 'Wabi-Sabi'",
    category: "decoracao",
    categoryLabel: "Decoração & Vasos",
    price: 189.90,
    oldPrice: 239.90,
    rating: 4.9,
    reviewsCount: 84,
    badge: "Mais Vendido",
    badgeType: "hot",
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&auto=format&fit=crop&q=80",
    description: "Peça de design contemporâneo inspirada na filosofia wabi-sabi. Textura tátil acetinada, acabamento artesanal único e silhueta escultural que valoriza qualquer aparador ou mesa de centro.",
    specs: [
      "Material: Cerâmica gres de alta temperatura",
      "Dimensões: 24cm altura × 16cm diâmetro",
      "Acabamento: Texturizado fosco mineral",
      "Cuidados: Limpar com pano macio levemente umedecido"
    ]
  },
  {
    id: 2,
    name: "Jogo 6 Utensílios de Cozinha em Silicone & Madeira Acácia",
    category: "utensilios",
    categoryLabel: "Cozinha & Utensílios",
    price: 169.00,
    oldPrice: 219.00,
    rating: 4.9,
    reviewsCount: 112,
    badge: "Destaque",
    badgeType: "featured",
    image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=800&auto=format&fit=crop&q=80",
    description: "Conjunto indispensável para sua cozinha gourmet. Cabos torneados em nobre madeira de acácia maciça e pontas em silicone alimentício de grau médico, resistentes ao calor e que não riscam suas panelas.",
    specs: [
      "Contém: 1 espátula, 1 concha, 1 pegador, 1 colher, 1 escumadeira e 1 fouet",
      "Material: Madeira acácia maciça + silicone livre de BPA",
      "Resistência térmica: Suporta até 230°C",
      "Cuidados: Lavar à mão com detergente neutro"
    ]
  },
  {
    id: 3,
    name: "Conjunto 4 Pratos Rasos Cerâmica Artesanal Terracota",
    category: "mesa",
    categoryLabel: "Mesa Posta",
    price: 269.00,
    oldPrice: 320.00,
    rating: 4.8,
    reviewsCount: 67,
    badge: "Artesanal",
    badgeType: "sale",
    image: "https://images.unsplash.com/photo-1615865417491-9941019fbc00?w=800&auto=format&fit=crop&q=80",
    description: "Pratos moldados à mão com bordas orgânicas e esmalte vitrificado acetinado em tom terracota terroso. Perfeitos para compor momentos acolhedores e elegantes à mesa.",
    specs: [
      "Contém: 4 pratos rasos de 27cm de diâmetro",
      "Material: Argila nobre vitrificada",
      "Compatibilidade: Seguro para micro-ondas e lava-louças",
      "Produção: Feito à mão no Brasil"
    ]
  },
  {
    id: 4,
    name: "Vela Aromática Vegetal Figo Ambarado & Baunilha 240g",
    category: "aromas",
    categoryLabel: "Aromas & Iluminação",
    price: 98.00,
    oldPrice: 120.00,
    rating: 5.0,
    reviewsCount: 95,
    badge: "Exclusivo",
    badgeType: "hot",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&auto=format&fit=crop&q=80",
    description: "Fragrância sofisticada e envolvente com notas florais de figo maduro, fundo ambarado e toque quente de favas de baunilha. Pote em vidro âmbar com tampa de madeira que vira suporte.",
    specs: [
      "Composição: Blend de ceras de coco e soja 100% vegetais",
      "Pavio: 100% algodão natural sem chumbo",
      "Tempo de queima: Aproximadamente 48 horas",
      "Livre de parabenos e ftalatos"
    ]
  },
  {
    id: 5,
    name: "Luminária de Mesa Portátil Minimalista Dimmable Champagne",
    category: "decoracao",
    categoryLabel: "Decoração & Vasos",
    price: 289.90,
    oldPrice: 359.00,
    rating: 4.9,
    reviewsCount: 53,
    badge: "Destaque",
    badgeType: "featured",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80",
    description: "Iluminação aconchegante sem fios. Corpo em alumínio escovado com botão touch sensível na cúpula que permite ajustar entre 3 níveis de luz âmbar quente (2700K).",
    specs: [
      "Material: Alumínio fosco anodizado",
      "Bateria: Recarregável USB-C com duração de 12 a 24 horas",
      "Iluminação: LED 2700K dimerizável",
      "Dimensões: 28cm altura × 12cm base"
    ]
  },
  {
    id: 6,
    name: "Tábua Orgânica Gourmet para Servir em Madeira Teca Maciça",
    category: "utensilios",
    categoryLabel: "Cozinha & Utensílios",
    price: 149.00,
    oldPrice: 189.00,
    rating: 4.8,
    reviewsCount: 78,
    badge: "Mais Vendido",
    badgeType: "hot",
    image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=800&auto=format&fit=crop&q=80",
    description: "Desenho orgânico com veio natural realçado. Perfeita para cortar com facilidade e servir queijos, pães artesanais, charcutaria ou antepastos com requinte.",
    specs: [
      "Material: Madeira Teca 100% reflorestada",
      "Acabamento: Selada com óleo mineral atóxico e cera de abelha",
      "Dimensões: 42cm × 22cm × 2cm",
      "Possui alça em couro natural para pendurar"
    ]
  },
  {
    id: 7,
    name: "Manta Decorativa 100% Linho Puro Lavado Fio Cru",
    category: "texteis",
    categoryLabel: "Têxteis & Conforto",
    price: 239.00,
    oldPrice: 289.00,
    rating: 4.9,
    reviewsCount: 42,
    badge: "Artesanal",
    badgeType: "sale",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=80",
    description: "Elegância despretensiosa para o sofá ou aos pés da cama. Linho europeu pré-lavado com textura irresistivelmente macia, caimento fluido e acabamento em desfiado artesanal.",
    specs: [
      "Material: 100% Linho puro de fibras nobres",
      "Dimensões: 180cm × 130cm",
      "Toque: Macio e respirável com textura natural",
      "Lavagem: Lavável em máquina no ciclo delicado"
    ]
  },
  {
    id: 8,
    name: "Moedor Duplo de Sal & Pimenta em Vidro Borossilicato e Madeira",
    category: "utensilios",
    categoryLabel: "Cozinha & Utensílios",
    price: 119.90,
    oldPrice: 149.90,
    rating: 4.7,
    reviewsCount: 61,
    badge: "Essencial",
    badgeType: "featured",
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&auto=format&fit=crop&q=80",
    description: "Design moderno e funcional para temperar com precisão. Engrenagens internas em cerâmica de alta densidade que não oxidam e permitem regular a espessura da moagem.",
    specs: [
      "Material: Vidro borossilicato resistente + tampa em madeira acácia",
      "Moedor: Núcleo de cerâmica regulável (fino ao grosso)",
      "Capacidade: 160ml cada compartimento",
      "Ideal para sal rosa, flor de sal e mix de pimentas em grãos"
    ]
  },
  {
    id: 9,
    name: "Difusor Elétrico Ultrassônico em Cerâmica Fosca & Névoa Fria",
    category: "aromas",
    categoryLabel: "Aromas & Iluminação",
    price: 249.00,
    oldPrice: 310.00,
    rating: 5.0,
    reviewsCount: 71,
    badge: "Novidade",
    badgeType: "sale",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80",
    description: "Aliado perfeito para aromaterapia e bem-estar. Cúpula esculpida em cerâmica mineral que se integra à decoração como um objeto de arte enquanto umidifica e perfuma o ar.",
    specs: [
      "Capacidade: 200ml (até 8h de difusão contínua)",
      "Tecnologia: Ultrassônica silenciosa (<25dB)",
      "Iluminação: Luz suave em tom âmbar com opção de desligar",
      "Desligamento automático inteligente ao fim da água"
    ]
  },
  {
    id: 10,
    name: "Conjunto 4 Taças de Cristal Ecológico Lapidado Borda Dourada",
    category: "mesa",
    categoryLabel: "Mesa Posta",
    price: 198.00,
    oldPrice: 245.00,
    rating: 4.8,
    reviewsCount: 39,
    badge: "Exclusivo",
    badgeType: "hot",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
    description: "Celebre momentos especiais com sofisticação. Cristal límpido com facetamento clássico e filete sutil em ouro na borda que traz brilho refinado para jantares e celebrações.",
    specs: [
      "Contém: 4 taças multifuncionais de 380ml",
      "Material: Cristal ecológico com borda com banho dourado",
      "Uso recomendado: Vinhos, espumantes e coquetéis",
      "Cuidados: Lavar com esponja macia"
    ]
  },
  {
    id: 11,
    name: "Kit 3 Cestos Organizadores Trançados em Fibra Natural de Juta",
    category: "decoracao",
    categoryLabel: "Decoração & Vasos",
    price: 185.00,
    oldPrice: 220.00,
    rating: 4.9,
    reviewsCount: 88,
    badge: "Eco-friendly",
    badgeType: "featured",
    image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&auto=format&fit=crop&q=80",
    description: "Organização com aconchego e atmosfera acolhedora. Trançados artesanalmente com fibras sustentáveis, perfeitos para toalhas no lavabo, mantas no living ou cachepot para plantas.",
    specs: [
      "Tamanhos inclusos: P (18x16cm), M (23x20cm) e G (28x25cm)",
      "Material: 100% Fibra natural de juta e algodão trançado",
      "Estrutura flexível e dobrável",
      "Produção sustentável e biodegradável"
    ]
  },
  {
    id: 12,
    name: "Porta-Velas & Joias Escultórico em Mármore Travertino Natural",
    category: "decoracao",
    categoryLabel: "Decoração & Vasos",
    price: 159.00,
    oldPrice: 195.00,
    rating: 4.9,
    reviewsCount: 34,
    badge: "Artesanal",
    badgeType: "sale",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80",
    description: "Escultura funcional lapidada em bloco maciço de mármore travertino com porosidades e veios originais da rocha. Uma peça atemporal que valoriza mesas de cabeceira e consoles.",
    specs: [
      "Material: Mármore travertino natural bruto",
      "Dimensões: 18cm × 10cm × 3cm",
      "Base: Proteção em feltro aveludado anti-risco",
      "Peça única: Cada bloco possui variações naturais exclusivas"
    ]
  }
];
