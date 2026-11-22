/**
 * SONOMA & CO. — Kitchen, Table & Entertaining
 * Coleção Thanksgiving & Festas: Assados, Utensílios de Chef, Mesa Posta & Cutelaria
 * Inspirado na curadoria icônica da Williams-Sonoma
 */

const products = [
  {
    id: 1,
    brand: "Sonoma Heritage",
    name: "Assadeira Retangular Profissional para Assados em Aço Inox com Grelha V-Rack",
    category: "assadeiras",
    categoryLabel: "Assadeiras & Panelas",
    material: "Aço Inoxidável Triplo",
    price: 489.00,
    oldPrice: 599.00,
    rating: 4.9,
    reviewsCount: 142,
    badge: "Exclusivo Ceia",
    badgeType: "exclusive",
    swatches: [
      { name: "Aço Inox Polido", color: "#D1D5DB" },
      { name: "Cobre Escovado", color: "#B45309" }
    ],
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
    description: "A peça central de qualquer grande celebração. Construção tripla em aço inox de calibre pesado para distribuição uniforme de calor, alças rebitadas ergonômicas que facilitam manusear mesmo com luvas térmicas e grelha antiaderente em 'V' que eleva a ave permitindo que o calor circule e a gordura escorra perfeitamente.",
    specs: [
      "Capacidade: Comporta aves e assados de até 11 kg",
      "Material: Aço Inoxidável 18/10 de alta densidade + grelha antiaderente livre de PFOA",
      "Resistência de temperatura: Seguro para forno até 315°C",
      "Dimensões: 42cm × 33cm × 9cm de profundidade",
      "Compatibilidade: Todos os tipos de fogão (inclusive indução) para deglaçar molhos direto na assadeira"
    ]
  },
  {
    id: 2,
    brand: "Wüsthof Sonoma Edition",
    name: "Jogo de Trinchar Carnes & Aves 2 Peças em Aço Alemão Forjado e Cabo em Nogueira",
    category: "cutelaria",
    categoryLabel: "Facas & Cutelaria",
    material: "Aço Forjado & Nogueira",
    price: 389.00,
    oldPrice: 460.00,
    rating: 5.0,
    reviewsCount: 89,
    badge: "Top Pick do Chef",
    badgeType: "hot",
    swatches: [
      { name: "Nogueira Nobre", color: "#451A03" },
      { name: "Ébano Clássico", color: "#1C1917" }
    ],
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800&auto=format&fit=crop&q=80",
    description: "O conjunto definitivo para fatiar o peru e assados na frente dos convidados com precisão cirúrgica. Lâmina forjada em liga de aço cromo-molibdênio-vanádio com afiação a laser PEtec e garfo de dois dentes longos para fixar carnes com total estabilidade.",
    specs: [
      "Contém: 1 Faca de fatiar de 20cm e 1 Garfo trinchante de 16cm",
      "Material: Aço inox forjado de alta dureza (58 HRC) + cabos em madeira nogueira natural tratada",
      "Equilíbrio: Espiga completa (full tang) com triplo rebite em latão",
      "Cuidados: Lavar à mão e secar imediatamente após o uso"
    ]
  },
  {
    id: 3,
    brand: "Sonoma Tableware",
    name: "Travessa Oval de Servir em Faiança Heritage com Borda Rendada",
    category: "mesa",
    categoryLabel: "Mesa Posta & Servir",
    material: "Faiança Esmaltada",
    price: 299.00,
    oldPrice: 369.00,
    rating: 4.8,
    reviewsCount: 64,
    badge: "Mais Vendido",
    badgeType: "hot",
    swatches: [
      { name: "Branco Pérola", color: "#F8FAFC" },
      { name: "Verde Sálvia Vintage", color: "#4A5D4E" }
    ],
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&auto=format&fit=crop&q=80",
    description: "Inspirada nas peças de antiquário da Europa, esta majestosa travessa de servir é moldada em faiança de alta densidade com relevos clássicos na borda. Espaçosa e elegante para apresentar o peru de Ação de Graças, tender ou pernil com acompanhamentos.",
    specs: [
      "Dimensões generosas: 52cm comprimento × 38cm largura",
      "Material: Faiança de alta resistência com esmalte vitrificado brilhante",
      "Segurança: Apta para forno até 180°C para manter alimentos aquecidos, micro-ondas e lava-louças",
      "Design: Relevo botânico atemporal esculpido nas bordas"
    ]
  },
  {
    id: 4,
    brand: "Pillivuyt France",
    name: "Molheira Tradicional em Porcelana Francesa com Prato Integrado Antigotejamento",
    category: "mesa",
    categoryLabel: "Mesa Posta & Servir",
    material: "Porcelana Francesa",
    price: 189.90,
    oldPrice: 239.00,
    rating: 4.9,
    reviewsCount: 78,
    badge: "Clássico Francês",
    badgeType: "exclusive",
    swatches: [
      { name: "Branco Purista", color: "#FFFFFF" }
    ],
    image: "https://images.unsplash.com/photo-1615865417491-9941019fbc00?w=800&auto=format&fit=crop&q=80",
    description: "Produzida na histórica fábrica francesa de Pillivuyt. O bico em curva precisa serve o molho de carne (gravy) ou compotas sem derramar, enquanto o prato integrado protege a toalha de mesa de quaisquer respingos.",
    specs: [
      "Capacidade: 450 ml",
      "Material: Porcelana francesa culinária de alta queima (1400°C)",
      "Retenção de calor: Mantém o molho quente durante todo o jantar",
      "Compatibilidade: Seguro para forno, grelha, micro-ondas e lava-louças"
    ]
  },
  {
    id: 5,
    brand: "Le Creuset Exclusive",
    name: "Panela Cocotte Redonda em Ferro Fundido Esmaltado 6.7L Borgonha",
    category: "assadeiras",
    categoryLabel: "Assadeiras & Panelas",
    material: "Ferro Fundido Esmaltado",
    price: 890.00,
    oldPrice: 1090.00,
    rating: 5.0,
    reviewsCount: 230,
    badge: "Ícone Culinário",
    badgeType: "hot",
    swatches: [
      { name: "Borgonha Festivo", color: "#7F1D1D" },
      { name: "Laranja Vulcânico", color: "#EA580C" },
      { name: "Azul Marseille", color: "#1E3A8A" }
    ],
    image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80",
    description: "O maior ícone da culinária mundial para assar lentamente, preparar ensopados, recheios de pão e acompanhamentos da ceia. O ferro fundido distribui e retém o calor como nenhum outro material, enquanto a tampa pesada com anéis de condensação devolve a umidade continuamente aos alimentos.",
    specs: [
      "Capacidade: 6.7 Litros (ideal para servir 6 a 8 pessoas)",
      "Material: Ferro fundido esmaltado resistente a lascas e arranhões",
      "Puxador: Aço inox escovado resistente a qualquer temperatura de forno",
      "Compatibilidade: Todas as fontes de calor: indução, gás, elétrico e forno"
    ]
  },
  {
    id: 6,
    brand: "Emile Henry France",
    name: "Forma Canelada Profissional para Tortas Doces e Salgadas em Cerâmica HR",
    category: "confeitaria",
    categoryLabel: "Confeitaria & Assadeiras",
    material: "Cerâmica Francesa HR",
    price: 249.00,
    oldPrice: 299.00,
    rating: 4.9,
    reviewsCount: 92,
    badge: "Edição Especial",
    badgeType: "exclusive",
    swatches: [
      { name: "Vermelho Grand Cru", color: "#991B1B" },
      { name: "Argila Natural", color: "#E2E8F0" }
    ],
    image: "https://images.unsplash.com/photo-1519869325930-281384150729?w=800&auto=format&fit=crop&q=80",
    description: "Feita à mão na Borgonha com argila natural. Desenvolvida para a clássica torta de abóbora (Pumpkin Pie), torta de noz-pecã ou maçã caramelizada da temporada de festas. Garante massas folhadas douradas e assadas uniformemente sem queimar a base.",
    specs: [
      "Diâmetro: 28cm × 6cm de borda funda canelada",
      "Material: Cerâmica HR (High Resistance) resistente a choques térmicos (-20°C a 270°C)",
      "Esmalte livre de chumbo e cádmio que não risca mesmo cortando com faca de metal",
      "Garantia: 10 anos do fabricante"
    ]
  },
  {
    id: 7,
    brand: "Boos Blocks Sonoma",
    name: "Tábua Gourmet para Assados em Madeira Teca com Canaleta Coletora de Sucos",
    category: "utensilios",
    categoryLabel: "Utensílios do Chef",
    material: "Madeira Teca Maciça",
    price: 320.00,
    oldPrice: 395.00,
    rating: 4.8,
    reviewsCount: 115,
    badge: "Mais Vendido",
    badgeType: "hot",
    swatches: [
      { name: "Teca Natural Ouro", color: "#78350F" }
    ],
    image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=800&auto=format&fit=crop&q=80",
    description: "Espessa, imponente e projetada especificamente para trinchar grandes peças de carne e aves. Possui canaleta perimetral profunda com reservatório no canto que retém até 250ml de caldo para você preparar o molho sem sujar a bancada.",
    specs: [
      "Dimensões: 50cm × 35cm × 3.5cm de espessura",
      "Material: Madeira Teca 100% reflorestada de grão denso e auto-regenerativo que preserva o fio das facas",
      "Pegadores laterais embutidos para transporte seguro",
      "Tratada previamente com óleo mineral alimentar e cera de abelha pura"
    ]
  },
  {
    id: 8,
    brand: "ThermoPro Gourmet",
    name: "Termômetro Culinário Digital Instantâneo de Precisão à Prova d'Água",
    category: "utensilios",
    categoryLabel: "Utensílios do Chef",
    material: "Aço Inox & ABS",
    price: 159.90,
    oldPrice: 199.90,
    rating: 5.0,
    reviewsCount: 167,
    badge: "Indispensável",
    badgeType: "hot",
    swatches: [
      { name: "Preto Fosco", color: "#18181B" },
      { name: "Vermelho Alerta", color: "#DC2626" }
    ],
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&auto=format&fit=crop&q=80",
    description: "O segredo para um peru macio e suculento sem ressecar o peito. Leitura ultrarrápida em apenas 2 segundos com precisão de ±0,5°C. Sonda ultrafina dobrável e visor com luz de fundo para verificar assados no forno com facilidade.",
    specs: [
      "Velocidade de leitura: 1 a 2 segundos",
      "Faixa de temperatura: -50°C a 300°C",
      "À prova d'água IP65 para lavagem completa em água corrente",
      "Imã embutido no verso para fixação no exaustor ou geladeira"
    ]
  },
  {
    id: 9,
    brand: "Sonoma Home Linens",
    name: "Toalha de Mesa em Puro Linho Jacquard Belga com Estampa Botânica de Outono",
    category: "mesa",
    categoryLabel: "Mesa Posta & Servir",
    material: "100% Linho Belga",
    price: 369.00,
    oldPrice: 450.00,
    rating: 4.9,
    reviewsCount: 52,
    badge: "Edição Limitada",
    badgeType: "exclusive",
    swatches: [
      { name: "Linho Cru & Carvalho", color: "#D4C5B9" },
      { name: "Verde Musgo Floresta", color: "#365314" }
    ],
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=80",
    description: "Tecida em moinhos tradicionais na Bélgica com fios de linho puro fiados a partir de fibras cultivadas sem irrigação artificial. Padrão damascado sutil com folhas de carvalho e bolotas que dão o tom acolhedor e nobre da temporada de celebração.",
    specs: [
      "Tamanho: 275cm × 180cm (perfeita para mesas de 8 a 10 lugares)",
      "Material: 100% Linho europeu pré-lavado com toque sedoso e caimento impecável",
      "Bainha inglesa de 3cm com cantos mitrados elegantes",
      "Cuidados: Lavável em máquina no ciclo delicado"
    ]
  },
  {
    id: 10,
    brand: "Riedel Crystal Sonoma",
    name: "Conjunto 4 Taças de Cristal Lapidado para Vinho Tinto Borgonha & Pinot Noir",
    category: "mesa",
    categoryLabel: "Mesa Posta & Servir",
    material: "Cristal Sem Chumbo",
    price: 289.00,
    oldPrice: 350.00,
    rating: 4.8,
    reviewsCount: 88,
    badge: "Sommelier Pick",
    badgeType: "hot",
    swatches: [
      { name: "Cristal Translúcido", color: "#E2E8F0" }
    ],
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
    description: "Desenvolvidas com bojo largo e borda ligeiramente afunilada para direcionar o aroma e suavizar a acidez de vinhos tintos complexos e aromáticos servidos na ceia. Cristal sem chumbo de brilho diamantado e acústica cristalina.",
    specs: [
      "Contém: 4 taças de vinho tinto de 650 ml",
      "Material: Cristal ecológico brilhante e ultraleve",
      "Haste fina puxada e borda cortada a laser para contato suave nos lábios",
      "Seguras para lava-louças residenciais"
    ]
  },
  {
    id: 11,
    brand: "Sonoma Cook's Tools",
    name: "Jogo 2 Garfos Elevadores de Aves & Assados Pesados em Aço Inoxidável",
    category: "utensilios",
    categoryLabel: "Utensílios do Chef",
    material: "Aço Inox 18/10",
    price: 139.00,
    oldPrice: 175.00,
    rating: 4.9,
    reviewsCount: 73,
    badge: "Segurança na Ceia",
    badgeType: "exclusive",
    swatches: [
      { name: "Inox Escovado", color: "#94A3B8" }
    ],
    image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=800&auto=format&fit=crop&q=80",
    description: "A ferramenta indispensável para transferir com total firmeza o peru dourado ou o pernil da assadeira quente direto para a tábua de trinchar ou travessa de servir sem escorregar nem quebrar a pele crocante.",
    specs: [
      "Contém: 2 garfos anatômicos com 4 dentes curvos resistentes",
      "Material: Aço inoxidável maciço de grau cirúrgico",
      "Capacidade: Erguem assados de até 15 kg com facilidade e equilíbrio",
      "Cabos revestidos em silicone antideslizante com anéis para pendurar"
    ]
  },
  {
    id: 12,
    brand: "Nordic Ware Heritage",
    name: "Forma de Bolo e Brioche 'Abóbora de Outono' em Alumínio Fundido Pesado",
    category: "confeitaria",
    categoryLabel: "Confeitaria & Assadeiras",
    material: "Alumínio Fundido Pesado",
    price: 269.00,
    oldPrice: 329.00,
    rating: 4.9,
    reviewsCount: 104,
    badge: "Desejo da Estação",
    badgeType: "hot",
    swatches: [
      { name: "Bronze Queimado", color: "#9A3412" },
      { name: "Ouro Champagne", color: "#D97706" }
    ],
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80",
    description: "A forma mais desejada da temporada de festas. Esculpida nos EUA com detalhes nítidos que transformam massas de bolo de especiarias, maçã e nozes em uma verdadeira escultura de abóbora tridimensional para fechar a refeição com chave de ouro.",
    specs: [
      "Capacidade: 10 xícaras (2.4 Litros)",
      "Material: Alumínio fundido maciço com antiaderente premium reforçado sem PFOA",
      "Condução térmica perfeita que doura e assa por igual",
      "Fabricada com orgulho nos EUA pela Nordic Ware"
    ]
  }
];
