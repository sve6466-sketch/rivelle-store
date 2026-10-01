import React, { useEffect, useMemo, useState } from 'react';

const defaultProducts = [
  { id: 1, name: { ar: 'فستان ناعم بتصميم تركي راقي', en: 'Elegant Turkish Design Dress' }, store: { ar: 'متجر روز للفساتين', en: 'Rose Boutique' }, price: 35000, category: 'dress', location: 'baghdad', popularity: 95, imageLabel: 'Dress', stock: 12 },
  { id: 2, name: { ar: 'سيروم فيتامين سي الأصلي للبشرة', en: 'Original Vitamin C Serum' }, store: { ar: 'سكن كير بغداد', en: 'Skin Care Baghdad' }, price: 18000, category: 'beauty', location: 'baghdad', popularity: 88, imageLabel: 'Serum', stock: 20 },
  { id: 3, name: { ar: 'سترة ناعمة للنساء بموديل أنيق', en: 'Soft Elegant Women Jacket' }, store: { ar: 'أرت ديزاين', en: 'Art Design' }, price: 24000, category: 'shirt', location: 'erbil', popularity: 82, imageLabel: 'Jacket', stock: 9 },
  { id: 4, name: { ar: 'طقم منسوجات منزلية فاخرة', en: 'Luxury Home Textile Set' }, store: { ar: 'بيت الموديل', en: 'Home Model' }, price: 29000, category: 'homegoods', location: 'basra', popularity: 90, imageLabel: 'Home', stock: 15 },
  { id: 5, name: { ar: 'فستان سهرة زاهِي بألوان أنيقة', en: 'Glam Evening Dress in Elegant Colors' }, store: { ar: 'النسيم للأزياء', en: 'Al-Naseem Fashion' }, price: 41000, category: 'dress', location: 'baghdad', popularity: 97, imageLabel: 'Evening', stock: 7 },
  { id: 6, name: { ar: 'مجموعة مكياج أساسية للوجه', en: 'Essential Face Makeup Kit' }, store: { ar: 'مكياج فخم', en: 'Luxury Makeup' }, price: 22000, category: 'beauty', location: 'basra', popularity: 72, imageLabel: 'Makeup', stock: 25 },
  { id: 7, name: { ar: 'ملابس منزلية مريحة قطنية', en: 'Comfort Cotton Homewear' }, store: { ar: 'منزل ناعم', en: 'Soft Home' }, price: 16000, category: 'home', location: 'erbil', popularity: 68, imageLabel: 'Homewear', stock: 30 },
  { id: 8, name: { ar: 'قميص أنيق بلمسة عصرية', en: 'Stylish Modern Shirt' }, store: { ar: 'مركز الأناقة', en: 'Elegance Center' }, price: 26000, category: 'shirt', location: 'baghdad', popularity: 80, imageLabel: 'Shirt', stock: 17 }
];

const translations = {
  ar: {
    logo: 'RIVELLE • ريڤيل',
    searchPlaceholder: 'ابحث عن متجر، فستان، مكياج، منزل...',
    home: 'الرئيسية',
    cart: 'السلة',
    admin: 'لوحة الإدارة',
    cartBadge: 'السلة',
    trending: '🔥 الأكثر طلباً هذا الأسبوع',
    categoryAll: 'كل المنتجات',
    categoryDress: 'فساتين سهرة',
    categoryShirt: 'قمصان متسترة',
    categoryHome: 'ملابس منزلية',
    categoryBeauty: 'سكن كير وميكب',
    categoryHomegoods: 'مستلزمات منزلية',
    addToCart: 'أضف إلى السلة',
    noMatch: 'لا توجد منتجات مطابقة',
    tryAnother: 'جرب بحثاً آخر أو غيّر المرشحات.',
    locationAll: '📍 كل العراق / All Iraq',
    locationBaghdad: 'بغداد / Baghdad',
    locationBasra: 'البصرة / Basra',
    locationErbil: 'أربيل / Erbil',
    filterTrending: '🔥 الأكثر طلباً',
    filterLowHigh: '💵 من الأرخص للأغلى',
    filterHighLow: '💎 من الأغلى للأرخص',
    support: '💬 الدعم الفني',
    checkoutTitle: 'إتمام الطلب وتحديد العنوان',
    checkoutSubtitle: 'اختر طريقة الدفع (محلي أو من خارج العراق لهدية الأهل)',
    fullName: 'اسم المستلم / Recipient Name...',
    phone: 'رقم الموبايل العراقي للتوصيل...',
    paymentCash: '💵 الدفع عند الاستلام (داخل العراق)',
    paymentInternational: '🌍 دفع إلكتروني دولي (من خارج العراق / Visa & Mastercard)',
    confirm: 'تأكيد الطلب وإرسال للمتجر',
    requiredFields: 'الرجاء ملء اسم المستلم ورقم الهاتف.',
    orderSuccessLocal: 'تم تأكيد الطلب بنجاح! سيصل إشعار فوري إلى المتجر مع تفاصيل التوصيل الداخلي.',
    orderSuccessInternational: 'تم توجيهك لصفحة الدفع الآمن الدولي. سيتم إرسال تفاصيل الهدية للأهل داخل العراق.',
    supportMessage: 'تم فتح نافذة الدعم الفني للمراسلة المباشرة.',
    addSuccess: 'تمت إضافة المنتج إلى السلة',
    adminTitle: 'لوحة الإدارة',
    adminProducts: 'إدارة المنتجات',
    productName: 'اسم المنتج',
    productStore: 'اسم المتجر',
    productPrice: 'السعر (د.ع)',
    productCategory: 'الفئة',
    productLocation: 'المدينة',
    productStock: 'المخزون',
    saveProduct: 'حفظ المنتج',
    updateProduct: 'تحديث المنتج',
    cancelEdit: 'إلغاء',
    delete: 'حذف',
    edit: 'تعديل',
    orders: 'الطلبات',
    orderSummary: 'ملخص الطلب',
    emptyCart: 'السلة فارغة حالياً',
    emptyCartMessage: 'أضف بعض المنتجات من الصفحة الرئيسية لبدء الطلب.',
    continueShopping: 'متابعة التسوق',
    total: 'الإجمالي',
    qty: 'الكمية',
    pay: 'الدفع',
    cash: 'الدفع عند الاستلام',
    international: 'الدفع الدولي',
    customer: 'العميل',
    status: 'الحالة',
    pending: 'قيد المراجعة',
    product: 'منتج',
    products: 'منتجات',
    addNew: 'إضافة منتج جديد',
    all: 'الكل',
    brand: 'المتجر',
    overview: 'نظرة عامة',
    totalSales: 'إجمالي المبيعات',
    revenue: 'إيرادات',
    activeOrders: 'طلبات نشطة',
    inventory: 'المخزون',
    adminNote: 'تتبع الطلبات، إدارة المنتجات، والتحديثات مباشرة من هذه اللوحة.',
    shopNow: 'تسوق الآن',
    viewCart: 'عرض السلة',
    inStock: 'متوفر',
    outOfStock: 'غير متوفر',
    emptyOrders: 'لا توجد طلبات حتى الآن'
  },
  en: {
    logo: 'RIVELLE • Store',
    searchPlaceholder: 'Search store, dress, makeup, home...',
    home: 'Home',
    cart: 'Cart',
    admin: 'Admin',
    cartBadge: 'Cart',
    trending: '🔥 Trending This Week',
    categoryAll: 'All Products',
    categoryDress: 'Evening Dresses',
    categoryShirt: 'Layered Shirts',
    categoryHome: 'Homewear',
    categoryBeauty: 'Skincare & Makeup',
    categoryHomegoods: 'Home Goods',
    addToCart: 'Add to Cart',
    noMatch: 'No matching products',
    tryAnother: 'Try another search or filter.',
    locationAll: '📍 All Iraq / All Iraq',
    locationBaghdad: 'Baghdad / Baghdad',
    locationBasra: 'Basra / Basra',
    locationErbil: 'Erbil / Erbil',
    filterTrending: '🔥 Trending',
    filterLowHigh: '💵 Low to High',
    filterHighLow: '💎 High to Low',
    support: '💬 Support',
    checkoutTitle: 'Checkout & Delivery Info',
    checkoutSubtitle: 'Choose payment method (local or international gifting)',
    fullName: 'Recipient Name...',
    phone: 'Iraqi mobile number for delivery...',
    paymentCash: '💵 Cash on Delivery (Inside Iraq)',
    paymentInternational: '🌍 International Payment (Outside Iraq / Visa & Mastercard)',
    confirm: 'Confirm Order',
    requiredFields: 'Please fill in the recipient name and phone number.',
    orderSuccessLocal: 'Order confirmed successfully! The store will receive delivery details immediately.',
    orderSuccessInternational: 'You have been redirected to the secure international payment page. Gift details will be sent to your family in Iraq.',
    supportMessage: 'Support chat window has been opened.',
    addSuccess: 'Product added to cart',
    adminTitle: 'Admin Panel',
    adminProducts: 'Product Management',
    productName: 'Product Name',
    productStore: 'Store Name',
    productPrice: 'Price (IQD)',
    productCategory: 'Category',
    productLocation: 'City',
    productStock: 'Stock',
    saveProduct: 'Save Product',
    updateProduct: 'Update Product',
    cancelEdit: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    orders: 'Orders',
    orderSummary: 'Order Summary',
    emptyCart: 'Your cart is empty',
    emptyCartMessage: 'Add some products from the home page to start your order.',
    continueShopping: 'Continue Shopping',
    total: 'Total',
    qty: 'Qty',
    pay: 'Pay',
    cash: 'Cash on delivery',
    international: 'International payment',
    customer: 'Customer',
    status: 'Status',
    pending: 'Pending',
    product: 'Product',
    products: 'Products',
    addNew: 'Add New Product',
    all: 'All',
    brand: 'Brand',
    overview: 'Overview',
    totalSales: 'Total Sales',
    revenue: 'Revenue',
    activeOrders: 'Active Orders',
    inventory: 'Inventory',
    adminNote: 'Track orders, manage products, and update inventory in one place.',
    shopNow: 'Shop Now',
    viewCart: 'View Cart',
    inStock: 'In stock',
    outOfStock: 'Out of stock',
    emptyOrders: 'No orders yet'
  }
};

const categories = [
  { key: 'all', ar: 'الكل', en: 'All' },
  { key: 'dress', ar: 'فساتين', en: 'Dresses' },
  { key: 'shirt', ar: 'قمصان', en: 'Shirts' },
  { key: 'home', ar: 'ملابس منزلية', en: 'Homewear' },
  { key: 'beauty', ar: 'مكياج', en: 'Beauty' },
  { key: 'homegoods', ar: 'مستلزمات منزلية', en: 'Home Goods' }
];

const locationOptions = [
  { value: 'all', ar: 'كل العراق', en: 'All Iraq' },
  { value: 'baghdad', ar: 'بغداد', en: 'Baghdad' },
  { value: 'basra', ar: 'البصرة', en: 'Basra' },
  { value: 'erbil', ar: 'أربيل', en: 'Erbil' }
];

function loadStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function App() {
  const [lang, setLang] = useState('ar');
  const [activeTab, setActiveTab] = useState('home');
  const [products, setProducts] = useState(() => loadStorage('rivelle-products', defaultProducts));
  const [orders, setOrders] = useState(() => loadStorage('rivelle-orders', []));
  const [cart, setCart] = useState(() => loadStorage('rivelle-cart', []));
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceSort, setPriceSort] = useState('trending');
  const [checkoutForm, setCheckoutForm] = useState({ name: '', phone: '', payment: 'cash' });
  const [adminForm, setAdminForm] = useState({
    id: null,
    nameAr: '',
    nameEn: '',
    storeAr: '',
    storeEn: '',
    price: '',
    category: 'dress',
    location: 'baghdad',
    stock: 10
  });

  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('rivelle-products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('rivelle-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('rivelle-orders', JSON.stringify(orders));
  }, [orders]);

  const filteredProducts = useMemo(() => {
    const lower = search.trim().toLowerCase();

    const result = products.filter((product) => {
      const name = product.name[lang].toLowerCase();
      const store = product.store[lang].toLowerCase();
      const matchesSearch = !lower || name.includes(lower) || store.includes(lower);
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesLocation = selectedLocation === 'all' || product.location === selectedLocation;
      return matchesSearch && matchesCategory && matchesLocation;
    });

    if (priceSort === 'low-high') {
      return [...result].sort((a, b) => a.price - b.price);
    }
    if (priceSort === 'high-low') {
      return [...result].sort((a, b) => b.price - a.price);
    }

    return [...result].sort((a, b) => b.popularity - a.popularity);
  }, [products, search, selectedCategory, selectedLocation, priceSort, lang]);

  const cartItems = useMemo(() => {
    return cart.map((item) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) return null;
      return { ...product, quantity: item.quantity };
    }).filter(Boolean);
  }, [cart, products]);

  const totalCart = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const activeOrders = orders.filter((order) => order.status === 'pending').length;
  const totalInventory = products.reduce((sum, product) => sum + product.stock, 0);

  const handleLanguageToggle = () => setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));

  const addToCart = (productId) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (existing) {
        return prev.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: productId, quantity: 1 }];
    });
    setActiveTab('cart');
  };

  const updateCartQty = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id !== productId) return item;
          return { ...item, quantity: Math.max(0, item.quantity + delta) };
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleCheckout = () => {
    if (!checkoutForm.name.trim() || !checkoutForm.phone.trim()) {
      alert(t.requiredFields);
      return;
    }

    if (!cartItems.length) {
      alert(lang === 'ar' ? 'السلة فارغة، أضف منتجاً أولاً.' : 'Cart is empty. Add a product first.');
      return;
    }

    const order = {
      id: Date.now(),
      customer: checkoutForm.name,
      phone: checkoutForm.phone,
      payment: checkoutForm.payment,
      total: totalCart,
      createdAt: new Date().toISOString(),
      status: 'pending',
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name[lang],
        qty: item.quantity,
        price: item.price
      }))
    };

    setOrders((prev) => [order, ...prev]);
    setCart([]);
    setCheckoutForm({ name: '', phone: '', payment: 'cash' });

    if (checkoutForm.payment === 'international') {
      alert(t.orderSuccessInternational);
    } else {
      alert(t.orderSuccessLocal);
    }

    setActiveTab('home');
  };

  const resetAdminForm = () => {
    setAdminForm({
      id: null,
      nameAr: '',
      nameEn: '',
      storeAr: '',
      storeEn: '',
      price: '',
      category: 'dress',
      location: 'baghdad',
      stock: 10
    });
  };

  const handleAdminSubmit = (event) => {
    event.preventDefault();

    const newProduct = {
      id: adminForm.id ?? Date.now(),
      name: {
        ar: adminForm.nameAr.trim(),
        en: adminForm.nameEn.trim() || adminForm.nameAr.trim()
      },
      store: {
        ar: adminForm.storeAr.trim(),
        en: adminForm.storeEn.trim() || adminForm.storeAr.trim()
      },
      price: Number(adminForm.price),
      category: adminForm.category,
      location: adminForm.location,
      stock: Number(adminForm.stock),
      popularity: 70,
      imageLabel: adminForm.category === 'beauty' ? 'Beauty' : adminForm.category === 'dress' ? 'Dress' : adminForm.category === 'shirt' ? 'Shirt' : 'Home'
    };

    if (!newProduct.name.ar || !newProduct.store.ar || !newProduct.price) {
      alert(lang === 'ar' ? 'يرجى تعبئة الحقول الأساسية.' : 'Please fill all required fields.');
      return;
    }

    setProducts((prev) => {
      if (adminForm.id) {
        return prev.map((product) => (product.id === adminForm.id ? newProduct : product));
      }
      return [newProduct, ...prev];
    });

    resetAdminForm();
  };

  const editProduct = (product) => {
    setAdminForm({
      id: product.id,
      nameAr: product.name.ar,
      nameEn: product.name.en,
      storeAr: product.store.ar,
      storeEn: product.store.en,
      price: product.price,
      category: product.category,
      location: product.location,
      stock: product.stock
    });
    setActiveTab('admin');
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <button className="ghost-btn" onClick={handleLanguageToggle} type="button">
            {lang === 'ar' ? 'English 🇬🇧' : 'العربية 🇮🇶'}
          </button>

          <div className="brand-wrap">
            <h1>{t.logo}</h1>
          </div>

          <div className="navbar-actions">
            <button className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>
              {t.home}
            </button>
            <button className={`nav-btn ${activeTab === 'cart' ? 'active' : ''}`} onClick={() => setActiveTab('cart')}>
              {t.cart} <span className="count-pill">{cart.length}</span>
            </button>
            <button className={`nav-btn ${activeTab === 'admin' ? 'active' : ''}`} onClick={() => setActiveTab('admin')}>
              {t.admin}
            </button>
          </div>
        </div>
      </header>

      <main className="container page-content">
        {activeTab === 'home' && (
          <>
            <div className="search-box">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="button" className="icon-btn" aria-label="Search">📷</button>
            </div>

            <div className="filters-row">
              <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
                {locationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option[lang]}
                  </option>
                ))}
              </select>

              <select value={priceSort} onChange={(e) => setPriceSort(e.target.value)}>
                <option value="trending">{t.filterTrending}</option>
                <option value="low-high">{t.filterLowHigh}</option>
                <option value="high-low">{t.filterHighLow}</option>
              </select>
            </div>

            <div className="category-row">
              {categories.map((category) => (
                <button
                  type="button"
                  key={category.key}
                  className={`chip ${selectedCategory === category.key ? 'selected' : ''}`}
                  onClick={() => setSelectedCategory(category.key)}
                >
                  {category[lang]}
                </button>
              ))}
            </div>

            <div className="section-header">
              <h2>{t.trending}</h2>
              <span className="count-pill primary">{cart.length}</span>
            </div>

            <div className="product-grid">
              {filteredProducts.length ? (
                filteredProducts.map((product) => (
                  <article className="product-card" key={product.id}>
                    <div className="image-box">{product.imageLabel}</div>
                    <div className="product-body">
                      <p className="store-name">{product.store[lang]}</p>
                      <h3>{product.name[lang]}</h3>
                      <div className="price-row">
                        <strong>{new Intl.NumberFormat('ar-IQ').format(product.price)} د.ع</strong>
                        <span className={product.stock > 0 ? 'stock ok' : 'stock bad'}>
                          {product.stock > 0 ? t.inStock : t.outOfStock}
                        </span>
                      </div>
                    </div>
                    <button className="primary-btn" type="button" onClick={() => addToCart(product.id)}>
                      {t.addToCart}
                    </button>
                  </article>
                ))
              ) : (
                <div className="empty-state wide">
                  <h3>{t.noMatch}</h3>
                  <p>{t.tryAnother}</p>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'cart' && (
          <div className="cart-layout">
            <div className="cart-panel">
              <h2>{t.cart}</h2>
              {cartItems.length ? (
                cartItems.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <div className="mini-image">{item.imageLabel}</div>
                    <div className="item-info">
                      <h4>{item.name[lang]}</h4>
                      <p>{new Intl.NumberFormat('ar-IQ').format(item.price)} د.ع</p>
                    </div>
                    <div className="qty-box">
                      <button type="button" onClick={() => updateCartQty(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => updateCartQty(item.id, 1)}>+</button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <h3>{t.emptyCart}</h3>
                  <p>{t.emptyCartMessage}</p>
                  <button className="primary-btn" type="button" onClick={() => setActiveTab('home')}>{t.continueShopping}</button>
                </div>
              )}
            </div>

            <aside className="checkout-panel">
              <h3>{t.checkoutTitle}</h3>
              <p>{t.checkoutSubtitle}</p>

              <div className="field-group">
                <input
                  type="text"
                  placeholder={t.fullName}
                  value={checkoutForm.name}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                />
              </div>

              <div className="field-group">
                <input
                  type="text"
                  placeholder={t.phone}
                  value={checkoutForm.phone}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                />
              </div>

              <div className="field-group">
                <select
                  value={checkoutForm.payment}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, payment: e.target.value })}
                >
                  <option value="cash">{t.paymentCash}</option>
                  <option value="international">{t.paymentInternational}</option>
                </select>
              </div>

              <div className="summary-row">
                <span>{t.total}</span>
                <strong>{new Intl.NumberFormat('ar-IQ').format(totalCart)} د.ع</strong>
              </div>

              <button className="primary-btn full" type="button" onClick={handleCheckout}>
                {t.confirm}
              </button>
            </aside>
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="admin-layout">
            <div className="admin-header">
              <div>
                <h2>{t.adminTitle}</h2>
                <p>{t.adminNote}</p>
              </div>
              <div className="stats-grid">
                <div className="stat-box">
                  <span>{t.totalSales}</span>
                  <strong>{new Intl.NumberFormat('ar-IQ').format(totalRevenue)} د.ع</strong>
                </div>
                <div className="stat-box">
                  <span>{t.activeOrders}</span>
                  <strong>{activeOrders}</strong>
                </div>
                <div className="stat-box">
                  <span>{t.inventory}</span>
                  <strong>{totalInventory}</strong>
                </div>
              </div>
            </div>

            <div className="admin-grid">
              <section className="panel">
                <h3>{adminForm.id ? t.updateProduct : t.addNew}</h3>
                <form onSubmit={handleAdminSubmit} className="product-form">
                  <input type="text" placeholder={t.productName} value={adminForm.nameAr} onChange={(e) => setAdminForm({ ...adminForm, nameAr: e.target.value })} />
                  <input type="text" placeholder={lang === 'ar' ? 'Product Name (EN)' : 'اسم المنتج (EN)'} value={adminForm.nameEn} onChange={(e) => setAdminForm({ ...adminForm, nameEn: e.target.value })} />
                  <input type="text" placeholder={t.productStore} value={adminForm.storeAr} onChange={(e) => setAdminForm({ ...adminForm, storeAr: e.target.value })} />
                  <input type="text" placeholder={lang === 'ar' ? 'Store Name (EN)' : 'اسم المتجر (EN)'} value={adminForm.storeEn} onChange={(e) => setAdminForm({ ...adminForm, storeEn: e.target.value })} />
                  <input type="number" placeholder={t.productPrice} value={adminForm.price} onChange={(e) => setAdminForm({ ...adminForm, price: e.target.value })} />
                  <select value={adminForm.category} onChange={(e) => setAdminForm({ ...adminForm, category: e.target.value })}>
                    <option value="dress">Dress</option>
                    <option value="shirt">Shirt</option>
                    <option value="home">Home</option>
                    <option value="beauty">Beauty</option>
                    <option value="homegoods">Home Goods</option>
                  </select>
                  <select value={adminForm.location} onChange={(e) => setAdminForm({ ...adminForm, location: e.target.value })}>
                    <option value="baghdad">Baghdad</option>
                    <option value="basra">Basra</option>
                    <option value="erbil">Erbil</option>
                  </select>
                  <input type="number" placeholder={t.productStock} value={adminForm.stock} onChange={(e) => setAdminForm({ ...adminForm, stock: e.target.value })} />

                  <div className="form-actions">
                    <button className="primary-btn" type="submit">{adminForm.id ? t.updateProduct : t.saveProduct}</button>
                    {adminForm.id && (
                      <button className="ghost-btn