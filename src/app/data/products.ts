export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  stock: number;
}

export interface Category {
  id: string;
  icon: string;
  label: string;
  color: string;
}

export const categories: Category[] = [
  { id: "ropa", icon: "-shirt", label: "Ropa", color: "#1565C0" },
  { id: "calzado", icon: "footprints", label: "Calzado", color: "#42A5F5" },
  { id: "tecnologia", icon: "smartphone", label: "Tecnología", color: "#43A047" },
  { id: "hogar", icon: "home", label: "Hogar", color: "#FB8C00" },
  { id: "belleza", icon: "sparkles", label: "Belleza", color: "#D32F2F" },
  { id: "juguetes", icon: "gamepad-2", label: "Juguetes", color: "#7B1FA2" },
  { id: "libros", icon: "book-open", label: "Libros", color: "#00838F" },
  { id: "deporte", icon: "dumbbell", label: "Deporte", color: "#37474F" },
  { id: "accesorios", icon: "backpack", label: "Accesorios", color: "#6D4C41" },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Zapatillas Running Pro",
    price: 59900,
    category: "calzado",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 128,
    description:
      "Zapatillas deportivas de alta performance con amortiguación reactiva, malla transpirable y suela de caucho. Ideales para running y entrenamiento diario. Disponible en tallas 38-46.",
    stock: 15,
  },
  {
    id: 2,
    name: "Audífonos Bluetooth",
    price: 89900,
    category: "tecnologia",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 256,
    description:
      "Audífonos inalámbricos con cancelación de ruido activa, 30 horas de batería y sonido de alta fidelidad. Bluetooth 5.3 con conexión estable y rápido. Incluye estuche de carga USB-C.",
    stock: 23,
  },
  {
    id: 3,
    name: "Camiseta Básica Premium",
    price: 19900,
    category: "ropa",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    rating: 4.2,
    reviews: 89,
    description:
      "Camiseta de algodón 100% orgánico, corte regular fit con costuras reforzadas. Tela suave al tacto y resistente al lavado. Disponible en 8 colores. Tallas S a XXL.",
    stock: 45,
  },
  {
    id: 4,
    name: "Zapatillas Casual Air",
    price: 45900,
    category: "calzado",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 203,
    description:
      "Zapatillas estilo casual con diseño minimalista, suela de espuma moldeada y cierre de cordones. Cómodas para uso diario. Disponible en tallas 36-44.",
    stock: 30,
  },
  {
    id: 5,
    name: "Zapatillas Trekking",
    price: 79900,
    category: "calzado",
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=400&fit=crop",
    rating: 4.4,
    reviews: 67,
    description:
      "Zapatillas de senderismo con tracción multidireccional, impermeables y con refuerzo en tobillo. Ideales para montañismo y caminatas largas. Tallas 38-47.",
    stock: 12,
  },
  {
    id: 6,
    name: "Sandalias Confort",
    price: 29900,
    category: "calzado",
    image: "https://images.unsplash.com/photo-1603487742131-4160ec2f2960?w=400&h=400&fit=crop",
    rating: 4.0,
    reviews: 45,
    description:
      "Sandalias ergonómicas con plantilla de memory foam, correa ajustable y suela antideslizante. Perfectas para el verano. Tallas 36-44.",
    stock: 28,
  },
  {
    id: 7,
    name: "Smartwatch Fitness",
    price: 129900,
    category: "tecnologia",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 178,
    description:
      "Reloj inteligente con pantalla AMOLED, monitoreo de ritmo cardíaco, GPS integrado y 7 días de batería. Resistente al agua IP68. Notificaciones del teléfono.",
    stock: 18,
  },
  {
    id: 8,
    name: "Lámpara LED Escritorio",
    price: 35900,
    category: "hogar",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400&h=400&fit=crop",
    rating: 4.3,
    reviews: 92,
    description:
      "Lámpara de escritorio LED con 5 niveles de brillo, luz cálida y fría, base estable y brazo ajustable 360°. Carga USB integrada. Bajo consumo energético.",
    stock: 22,
  },
  {
    id: 9,
    name: "Crema Hidratante Corporal",
    price: 15900,
    category: "belleza",
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4ee88f6?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 134,
    description:
      "Crema hidratante con ácido hialurónico, vitamina E y extracto de aloe vera. Absorción rápida, sin grasa. Para todo tipo de piel. Tubo de 400ml.",
    stock: 50,
  },
  {
    id: 10,
    name: "Set de Bloques Constructor",
    price: 24900,
    category: "juguetes",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 312,
    description:
      "Set de 500 piezas de bloques interconectables, colores variados y instrucciones incluidas. Desarrolla creatividad y habilidades motoras. Edad 6+.",
    stock: 35,
  },
  {
    id: 11,
    name: "Libro: El Arte de la Accesibilidad",
    price: 12900,
    category: "libros",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 56,
    description:
      "Guía completa sobre diseño inclusivo y accesibilidad digital. 320 páginas con casos prácticos, herramientas y metodologías. Ideal para desarrolladores y diseñadores.",
    stock: 40,
  },
  {
    id: 12,
    name: "Balón de Fútbol Profesional",
    price: 39900,
    category: "deporte",
    image: "https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=400&h=400&fit=crop",
    rating: 4.4,
    reviews: 87,
    description:
      "Balón de fútbol tamaño 5, costuras machine-stitched, cubierta de PU de alta calidad. FIFA Quality Pro certificado. Ideal para entrenamiento y partidos.",
    stock: 20,
  },
  {
    id: 13,
    name: "Chaqueta Impermeable",
    price: 69900,
    category: "ropa",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 104,
    description:
      "Chaqueta cortavientos impermeable con capucha, forro interior fleece, bolsillos con cierre y cordón ajustable. Perfecta para lluvia y viento. Tallas S a XXL.",
    stock: 16,
  },
  {
    id: 14,
    name: "Auriculares Inalámbricos Pro",
    price: 49900,
    category: "tecnologia",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
    rating: 4.3,
    reviews: 156,
    description:
      "Auriculares true wireless con cancelación de ruido, 8 horas de batería por carga, estuche con carga inalámbrica. Resistencia al sudor IPX5.",
    stock: 27,
  },
  {
    id: 15,
    name: "Mochila Universitaria",
    price: 32900,
    category: "accesorios",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 198,
    description:
      "Mochila con compartimento acolchado para laptop de 15.6 pulgadas, múltiples bolsillos organizadores, tirantes ergonómicos y respaldo acolchado. Resistente al agua.",
    stock: 33,
  },
];

export const getProductsByCategory = (categoryId: string): Product[] =>
  products.filter((p) => p.category === categoryId);

export const searchProducts = (query: string): Product[] => {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
};

export const getCategoryById = (id: string): Category | undefined =>
  categories.find((c) => c.id === id);
