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
    price: 59.99,
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
    price: 45.99,
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
    price: 12.99,
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
    price: 49.99,
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
    price: 79.99,
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
    price: 24.99,
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
    price: 89.99,
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
    price: 29.99,
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
    price: 14.99,
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
    price: 19.99,
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
    price: 9.99,
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
    price: 34.99,
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
    price: 59.99,
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
    price: 39.99,
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
    price: 44.99,
    category: "accesorios",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 198,
    description:
      "Mochila con compartimento acolchado para laptop de 15.6 pulgadas, múltiples bolsillos organizadores, tirantes ergonómicos y respaldo acolchado. Resistente al agua.",
    stock: 33,
  },
  {
    id: 16,
    name: "Botines de Fútbol Taco",
    price: 69.99,
    category: "calzado",
    image: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=400&h=400&fit=crop",
    rating: 4.3,
    reviews: 74,
    description:
      "Botines de fútbol con tacos de aluminio, capellada de cuero sintético y plantilla acolchada. Ideales para canchas de césped natural. Tallas 38-45.",
    stock: 18,
  },
  {
    id: 17,
    name: "Zapatos Formales Derby",
    price: 84.99,
    category: "calzado",
    image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 53,
    description:
      "Zapatos formales estilo Derby con cuero genuino, suela de cuero y plantilla acolchada. Perfectos para oficina y eventos formales. Tallas 39-46.",
    stock: 10,
  },
  {
    id: 18,
    name: "Zapatillas Deportivas Urbanas",
    price: 54.99,
    category: "calzado",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
    rating: 4.1,
    reviews: 92,
    description:
      "Zapatillas urbanas con diseño moderno, suela amortiguada y parte superior de malla transpirable. Cómodas para el día a día. Tallas 36-44.",
    stock: 25,
  },
  {
    id: 19,
    name: "Tablet Pantalla Full HD",
    price: 149.99,
    category: "tecnologia",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
    rating: 4.4,
    reviews: 112,
    description:
      "Tablet con pantalla Full HD de 10 pulgadas, 64 GB de almacenamiento, batería de 12 horas y procesador octa-core. Ideal para estudio y entretenimiento.",
    stock: 14,
  },
  {
    id: 20,
    name: "Teclado Mecánico RGB",
    price: 34.99,
    category: "tecnologia",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 234,
    description:
      "Teclado mecánico con switches Cherry MX, retroiluminación RGB personalizable y reposamuñecas magnético. Cable USB-C desmontable. Construcción en aluminio.",
    stock: 30,
  },
  {
    id: 21,
    name: "Cámara Web HD 1080p",
    price: 29.99,
    category: "tecnologia",
    image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400&h=400&fit=crop",
    rating: 4.2,
    reviews: 87,
    description:
      "Cámara web con resolución 1080p, micrófono integrado con cancelación de ruido, enfoque automático y clip ajustable. Plug and play USB. Ideal para videollamadas.",
    stock: 42,
  },
  {
    id: 22,
    name: "Cargador Portátil 20000mAh",
    price: 25.99,
    category: "tecnologia",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 312,
    description:
      "Batería externa de 20000mAh con doble puerto USB-A y USB-C, carga rápida 18W. LED indicador de batería. Carga hasta 4 dispositivos simultáneamente.",
    stock: 65,
  },
  {
    id: 23,
    name: "Jeans Rectos Clásicos",
    price: 32.99,
    category: "ropa",
    image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=400&h=400&fit=crop",
    rating: 4.3,
    reviews: 145,
    description:
      "Jeans de corte recto en denim de algodón, con elasticidad cómoda, cierre de botón y costuras reforzadas. Disponible en 5 lavados. Tallas 28 a 42.",
    stock: 38,
  },
  {
    id: 24,
    name: "Polo Algodón Pima",
    price: 18.99,
    category: "ropa",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 78,
    description:
      "Polo de algodón Pima peruano, cuello tipo sport con botones, costuras reforzadas y tela fresca. Ideal para uso casual y semi formal. Tallas S a XXL.",
    stock: 55,
  },
  {
    id: 25,
    name: "Sweater Lana Fina",
    price: 28.99,
    category: "ropa",
    image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400&h=400&fit=crop",
    rating: 4.4,
    reviews: 63,
    description:
      "Sweater de lana fina mezcla con acrílico, tejido suave y liviano, cuello redondo y puños elásticos. Perfecto para climas fríos. Tallas S a XXL. 6 colores.",
    stock: 22,
  },
  {
    id: 26,
    name: "Short Deportivo",
    price: 14.99,
    category: "ropa",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop",
    rating: 4.1,
    reviews: 109,
    description:
      "Short deportivo de poliéster con elasticidad, cintura elástica con cordón y bolsillos laterales. Secado rápido y transpirable. Ideal para gym y running.",
    stock: 70,
  },
  {
    id: 27,
    name: "Vestido Floral Verano",
    price: 24.99,
    category: "ropa",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 88,
    description:
      "Vestido largo con estampado floral, tela ligera de viscosa, corte en A con mangas cortas y cintura ajustable. Fresco y cómodo para días cálidos. Tallas S a XL.",
    stock: 20,
  },
  {
    id: 28,
    name: "Set de Sartenes Antiadherentes",
    price: 49.99,
    category: "hogar",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 167,
    description:
      "Set de 3 sartenes con recubrimiento antiadherente triple capa, fondo difusor de calor y mangos ergonómicos aptos para horno. Diámetros 20, 24 y 28 cm.",
    stock: 15,
  },
  {
    id: 29,
    name: "Organizador de Escritorio",
    price: 15.99,
    category: "hogar",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop",
    rating: 4.2,
    reviews: 54,
    description:
      "Organizador de escritorio multifuncional con 8 compartimentos, fabricado en bambú natural. Incluye porta-lápices, bandeja para documentos y soporte para celular.",
    stock: 48,
  },
  {
    id: 30,
    name: "Cubrelecho Cebra",
    price: 39.99,
    category: "hogar",
    image: "https://images.unsplash.com/photo-1522771739014-7ebf19b19b0a?w=400&h=400&fit=crop",
    rating: 4.3,
    reviews: 78,
    description:
      "Cubrelecho suave de microfibra con estampado moderno, liviano y fácil de lavar. Disponible en tamaños individual, doble y queen. Ideal para decoración juvenil.",
    stock: 33,
  },
  {
    id: 31,
    name: "Juego de Toallas 4 Piezas",
    price: 22.99,
    category: "hogar",
    image: "https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=400&h=400&fit=crop",
    rating: 4.4,
    reviews: 132,
    description:
      "Juego de toallas de algodón 500 g/m², incluye 2 toallas de baño, 1 de mano y 1 facial. Suaves, absorbentes y con ribete decorativo. 6 colores disponibles.",
    stock: 60,
  },
  {
    id: 32,
    name: "Cafetera Eléctrica",
    price: 35.99,
    category: "hogar",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 203,
    description:
      "Cafetera eléctrica con capacidad de 1.5 litros, sistema antigoteo, jarra de vidrio y filtro permanente. Prepara hasta 12 tazas. Apagado automático de seguridad.",
    stock: 17,
  },
  {
    id: 33,
    name: "Espejo de Piso Grande",
    price: 44.99,
    category: "hogar",
    image: "https://images.unsplash.com/photo-1616600249638-46d2b5530f7b?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 91,
    description:
      "Espejo de piso de cuerpo completo con marco de aluminio negro, dimensiones 160x50 cm. Incluye soporte estable antideslizante. Ideal para vestidores y habitaciones.",
    stock: 8,
  },
  {
    id: 34,
    name: "Perfume Floral Elegante",
    price: 39.99,
    category: "belleza",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 276,
    description:
      "Perfume femenino con notas de jazmín, rosa y vainilla, fijación duradera de hasta 8 horas. Presentación de 100 ml. Elegante frasco de vidrio con atomizador.",
    stock: 25,
  },
  {
    id: 35,
    name: "Set de Maquillaje Básico",
    price: 19.99,
    category: "belleza",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
    rating: 4.1,
    reviews: 189,
    description:
      "Set de maquillaje con 12 sombras, 2 labiales, 1 rubor y 1 base. Incluye espejo y brochas. Estuche compacto ideal para viajes. Pigmentación de alta calidad.",
    stock: 40,
  },
  {
    id: 36,
    name: "Shampoo Nutritivo 500ml",
    price: 9.99,
    category: "belleza",
    image: "https://images.unsplash.com/photo-1585747861115-71a99088cb76?w=400&h=400&fit=crop",
    rating: 4.3,
    reviews: 221,
    description:
      "Shampoo con aceite de argán y keratina, limpia suavemente mientras nutre y repara el cabello. Sin sulfatos ni parabenos. Apto para uso diario. 500 ml.",
    stock: 85,
  },
  {
    id: 37,
    name: "Protector Solar SPF 50",
    price: 12.99,
    category: "belleza",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 198,
    description:
      "Protector solar de amplio espectro SPF 50, resistente al agua y de absorción rápida. Textura ligera no grasa. Ideal para uso diario en rostro y cuerpo. 200 ml.",
    stock: 72,
  },
  {
    id: 38,
    name: "Cepillo Eléctrico Dental",
    price: 27.99,
    category: "belleza",
    image: "https://images.unsplash.com/photo-1559650656-5d1d361ad10e?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 143,
    description:
      "Cepillo dental eléctrico con 3 modos de limpieza, temporizador de 2 minutos, cabezales recambiables y batería recargable USB. Incluye 2 cabezales adicionales.",
    stock: 35,
  },
  {
    id: 39,
    name: "Kit de Cuidado Facial",
    price: 16.99,
    category: "belleza",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=400&fit=crop",
    rating: 4.2,
    reviews: 67,
    description:
      "Kit facial con limpiador, tónico y crema hidratante con vitamina C. Fórmula suave para todo tipo de piel. Productos de 150 ml cada uno. Empaque ecológico.",
    stock: 30,
  },
  {
    id: 40,
    name: "Muñeca Bebé Interactiva",
    price: 22.99,
    category: "juguetes",
    image: "https://images.unsplash.com/photo-1596460107916-430662021049?w=400&h=400&fit=crop",
    rating: 4.4,
    reviews: 89,
    description:
      "Muñeca bebé de 35 cm con cuerpo suave, ojos que se cierran, ropa removible y accesorios incluidos. Emite sonidos de bebé real. Edad 3+.",
    stock: 20,
  },
  {
    id: 41,
    name: "Pista de Carreras Eléctrica",
    price: 34.99,
    category: "juguetes",
    image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 134,
    description:
      "Pista de carreras eléctrica de 2.5 metros con 2 autos a control remoto, luces LED y sonidos realistas. Incluye curvas, puentes y obstáculos. Edad 5+.",
    stock: 12,
  },
  {
    id: 42,
    name: "Rompecabezas 1000 Piezas",
    price: 14.99,
    category: "juguetes",
    image: "https://images.unsplash.com/photo-1586162245614-77d1214f74c0?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 76,
    description:
      "Rompecabezas de 1000 piezas con imagen panorámica de paisaje natural. Piezas de cartón grueso resistente. Incluye póster guía. Medida final 70x50 cm. Edad 10+.",
    stock: 45,
  },
  {
    id: 43,
    name: "Tren de Juguete Eléctrico",
    price: 29.99,
    category: "juguetes",
    image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=400&h=400&fit=crop",
    rating: 4.3,
    reviews: 55,
    description:
      "Tren eléctrico con locomotora, 3 vagones, rieles en forma de 8, estación y señales. Funciona con pilas. Luces y sonido realista. Edad 4+.",
    stock: 18,
  },
  {
    id: 44,
    name: "Juego de Mesa Estrategia",
    price: 17.99,
    category: "juguetes",
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 198,
    description:
      "Juego de mesa de estrategia para 2-6 jugadores. Incluye tablero plegable, fichas y cartas. Partidas de 45-60 minutos. Ideal para familias y amigos. Edad 8+.",
    stock: 28,
  },
  {
    id: 45,
    name: "Pelota Saltarina Saltón",
    price: 12.99,
    category: "juguetes",
    image: "https://images.unsplash.com/photo-1571687949921-1306a8f78933?w=400&h=400&fit=crop",
    rating: 4.0,
    reviews: 43,
    description:
      "Pelota saltarina con asa, diámetro 55 cm, fabricada en PVC resistente. Soporta hasta 80 kg. Ideal para saltar y jugar al aire libre. Edad 3+.",
    stock: 50,
  },
  {
    id: 46,
    name: "Libro: Cien Años de Soledad",
    price: 12.99,
    category: "libros",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 345,
    description:
      "Edición especial de Cien Años de Soledad de Gabriel García Márquez, con prólogo inédito y cubierta dura. 496 páginas. Incluye separador de tela.",
    stock: 60,
  },
  {
    id: 47,
    name: "Cuaderno Profesional A5",
    price: 6.99,
    category: "libros",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888b56?w=400&h=400&fit=crop",
    rating: 4.3,
    reviews: 89,
    description:
      "Cuaderno profesional tapa dura con 200 hojas rayadas de papel bond 90 g/m². Incluye cierre elástico, separador de cinta y bolsillo interior. Tamaño A5.",
    stock: 95,
  },
  {
    id: 48,
    name: "Libro: Hábitos Atómicos",
    price: 11.99,
    category: "libros",
    image: "https://images.unsplash.com/photo-1589829085813-5e8e2f0c2e3f?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 412,
    description:
      "Best seller internacional de James Clear sobre formación de hábitos. 320 páginas con estrategias prácticas y científicas. Traducción al español.",
    stock: 55,
  },
  {
    id: 49,
    name: "Set de 10 Marcadores",
    price: 7.99,
    category: "libros",
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&h=400&fit=crop",
    rating: 4.2,
    reviews: 67,
    description:
      "Set de 10 marcadores de colores surtidos, punta fina y media, base de agua y no tóxicos. Ideal para estudio, trabajo y manualidades. Colores brillantes.",
    stock: 100,
  },
  {
    id: 50,
    name: "Libro: Cocina Ecuatoriana",
    price: 15.99,
    category: "libros",
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 92,
    description:
      "Recetario tradicional ecuatoriano con más de 80 recetas ilustradas, desde encebollados hasta hornado. Incluye historia culinaria y tips de preparación. 250 páginas.",
    stock: 35,
  },
  {
    id: 51,
    name: "Agenda Diaria 2026",
    price: 9.99,
    category: "libros",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888b56?w=400&h=400&fit=crop",
    rating: 4.4,
    reviews: 110,
    description:
      "Agenda diaria 2026 con tapa dura, 12 meses, vistas semanales y mensuales. Incluye stickers decorativos, bolsillo para tarjetas y cinta separadora.",
    stock: 80,
  },
  {
    id: 52,
    name: "Pesas de 5 kg Par",
    price: 24.99,
    category: "deporte",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 156,
    description:
      "Par de pesas de 5 kg cada una, recubiertas de neopreno, con agarre ergonómico antideslizante. Ideales para entrenamiento en casa y gimnasio.",
    stock: 30,
  },
  {
    id: 53,
    name: "Bicicleta Montañera 21V",
    price: 189.99,
    category: "deporte",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 87,
    description:
      "Bicicleta de montaña con cuadro de aluminio, 21 velocidades, frenos de disco mecánicos y suspensión delantera. Ruedas 29 pulgadas. Ideal para senderos.",
    stock: 6,
  },
  {
    id: 54,
    name: "Cuerda para Saltar Ajustable",
    price: 8.99,
    category: "deporte",
    image: "https://images.unsplash.com/photo-1598716954313-faaa07b4a154?w=400&h=400&fit=crop",
    rating: 4.2,
    reviews: 203,
    description:
      "Cuerda para saltar con mangos de espuma, cable de acero recubierto de PVC y rodamientos de bolas. Longitud ajustable hasta 3 metros. Ideal para cardio.",
    stock: 90,
  },
  {
    id: 55,
    name: "Colchoneta Yoga 6mm",
    price: 18.99,
    category: "deporte",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop",
    rating: 4.4,
    reviews: 134,
    description:
      "Colchoneta de yoga de 6 mm de grosor, material NBR libre de tóxicos, superficie texturizada antideslizante. Incluye correa de transporte. 183x61 cm.",
    stock: 42,
  },
  {
    id: 56,
    name: "Guantes de Boxeo Profesionales",
    price: 32.99,
    category: "deporte",
    image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 78,
    description:
      "Guantes de boxeo de cuero sintético con relleno de espuma multicapa, cierre de velcro reforzado y forro transpirable. Peso 10 oz. Incluye par de venda.",
    stock: 15,
  },
  {
    id: 57,
    name: "Botella Deportiva 1L",
    price: 7.99,
    category: "deporte",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    rating: 4.3,
    reviews: 245,
    description:
      "Botella de agua deportiva de 1 litro, libre de BPA, con boquilla antiderrames y asa de transporte. Diseño ergonómico. Ideal para gym, running y ciclismo.",
    stock: 75,
  },
  {
    id: 58,
    name: "Reloj de Pulsera Clásico",
    price: 35.99,
    category: "accesorios",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 167,
    description:
      "Reloj clásico con movimiento de cuarzo, esfera plateada con marcadores romanos, correa de cuero genuino y cristal mineral. Resistente al agua 3 ATM.",
    stock: 20,
  },
  {
    id: 59,
    name: "Gafas de Sol Polarizadas",
    price: 19.99,
    category: "accesorios",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    rating: 4.4,
    reviews: 198,
    description:
      "Gafas de sol con lentes polarizadas, filtro UV400, marco de acetato ligero y patillas metálicas flexibles. Estilo aviador. Incluye estuche y paño.",
    stock: 35,
  },
  {
    id: 60,
    name: "Cinturón Cuero Formal",
    price: 22.99,
    category: "accesorios",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    rating: 4.3,
    reviews: 89,
    description:
      "Cinturón de cuero genuino con hebilla metálica cromada, ancho 3.5 cm. Hebilla removible. Disponible en negro y marrón. Tallas 75 a 110 cm.",
    stock: 45,
  },
  {
    id: 61,
    name: "Bolso Cruzado Casual",
    price: 28.99,
    category: "accesorios",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 112,
    description:
      "Bolso cruzado de lona con acabado impermeable, compartimento principal con cierre, bolsillo frontal y correa ajustable. Ideal para uso diario y viajes.",
    stock: 25,
  },
  {
    id: 62,
    name: "Llavero Personalizado Metal",
    price: 5.99,
    category: "accesorios",
    image: "https://images.unsplash.com/photo-1603400521630-9f2de124b33b?w=400&h=400&fit=crop",
    rating: 4.1,
    reviews: 56,
    description:
      "Llavero metálico grabable con acabado plateado, argolla doble de acero inoxidable y diseño minimalista. Tamaño 2.5 x 4 cm. Empaque tipo regalo.",
    stock: 98,
  },
  {
    id: 63,
    name: "Pañuelo Seda Estampado",
    price: 11.99,
    category: "accesorios",
    image: "https://images.unsplash.com/photo-1604603815783-2bd94c5a819e?w=400&h=400&fit=crop",
    rating: 4.2,
    reviews: 43,
    description:
      "Pañuelo de seda natural estampado, tamaño 55x55 cm, bordes doblados a mano y acabado de lujo. Diseño exclusivo. Ideal como accesorio de moda o regalo.",
    stock: 55,
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
