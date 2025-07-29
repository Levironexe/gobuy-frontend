// utils/language.js

// Get user's language setting from localStorage
export const getUserLanguage = () => {
  try {
    const language = localStorage.getItem('gobuy_language')
    if (language) {
      return language
    }
    
    // Fallback to browser language
    const browserLang = navigator.language.slice(0, 2)
    const supportedLangs = ['en', 'es', 'vi']
    
    return supportedLangs.includes(browserLang) ? browserLang : 'en'
  } catch (err) {
    console.error('Failed to get language setting:', err)
    return 'en'
  }
}

// Set user's language preference
export const setUserLanguage = (language) => {
  try {
    localStorage.setItem('gobuy_language', language)
    console.log(`🌐 Language set to: ${language}`)
    
    // Dispatch event for cross-component reactivity
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language } 
    }))
  } catch (err) {
    console.error('Failed to update language setting:', err)
  }
}

// Language configuration
export const languageConfig = {
  en: { name: 'English', flag: '🇺🇸', rtl: false },
  es: { name: 'Español', flag: '🇪🇸', rtl: false },
  vi: { name: 'Tiếng Việt', flag: '🇻🇳', rtl: false }
}

// Complete translation dictionary
const translations = {
  en: {
    // Common
    'loading': 'Loading...',
    'error': 'Error',
    'success': 'Success',
    'save': 'Save',
    'cancel': 'Cancel',
    'close': 'Close',
    'search': 'Search',
    'try_again': 'Try Again',
    'apply': 'Apply',
    'remove': 'Remove',
    'delete': 'Delete',
    'activate': 'Activate',
    'deactivate': 'Deactivate',
    
    // Home Page
    'your_trusted_marketplace': 'Your trusted marketplace',
    'welcome_to_gobuy': 'Welcome to GoBuy',
    'home_subtitle': 'Your one-stop marketplace for buying and selling products with confidence and ease.',
    'browse_products': 'Browse Products',
    'sell_your_product': 'Sell Your Product',
    'active_users': 'Active Users',
    'products_listed': 'Products Listed',
    'secure_transactions': 'Secure Transactions',
    'how_it_works': 'How It Works',
    'how_it_works_subtitle': 'Get started in just three simple steps',
    
    // All Products
    'all_products': 'All Products',
    'products_subtitle': 'Discover amazing products from trusted sellers',
    'no_products_found': 'No Products Found',
    'no_products_message': 'There are no products available at the moment.',
    'reload_products': 'Reload Products',
    'products': 'products',
    'showing': 'Showing',
    'of': 'of',
    'all_categories': 'All Categories',
    'in_stock_only': 'In Stock Only',
    'active_only': 'Active Only',
    'search_products': 'Search products...',
    'out_of_stock': 'Out of Stock',
    'low_stock': 'Low Stock',
    'inactive': 'Inactive',
    'view': 'View',
    'add_to_cart': 'Add to Cart',
    'unavailable': 'Unavailable',
    'price': 'Price:',
    'category': 'Category:',
    'stock': 'Stock:',
    'status': 'Status:',
    'description': 'Description:',
    'active': 'Active',
    'first': 'First',
    'previous': 'Previous',
    'next': 'Next',
    'last': 'Last',
    'in_stock': 'in stock',
    'updated': 'Updated:',
    'items': 'items',
    'item': 'item',
    
    // Login
    'welcome_back': 'Welcome Back',
    'login_subtitle': 'Sign in to continue your shopping journey',
    'email_address': 'Email Address',
    'enter_your_email': 'Enter your email',
    'password': 'Password',
    'enter_your_password': 'Enter your password',
    'sign_in': 'Sign In',
    'signing_in': 'Signing In...',
    'continue_with_google': 'Continue with Google',
    'dont_have_account': 'Don\'t have an account?',
    'create_one_here': 'Create one here',
    
    // Settings
    'settings': 'Settings',
    'settings_subtitle': 'Customize your GoBuy experience',
    'settings_saved': 'Settings saved successfully!',
    'language_region': 'Language & Region',
    'language': 'Language',
    'currency': 'Currency',
    'save_settings': 'Save Settings',
    'reset_to_default': 'Reset to Default',
    'prototype_notice': 'This is a prototype. Settings are saved locally and will reset when you clear browser data.',
    
    // Cart
    'your_cart': 'Your Cart',
    'cart_subtitle': 'Review your items and checkout when ready',
    'empty_cart': 'Your Cart is Empty',
    'empty_cart_message': 'Add some products to your cart to get started.',
    'continue_shopping': 'Continue Shopping',
    'quantity': 'Quantity:',
    'total': 'Total:',
    'order_summary': 'Order Summary',
    'proceed_to_checkout': 'Proceed to Checkout',
    
    // Profile
    'my_profile': 'My Profile',
    'profile_subtitle': 'Manage your account information',
    'display_name': 'Display Name',
    'update_profile': 'Update Profile',
    'sign_out': 'Sign Out',

    // Addition - Missing English strings
    'browse_discover': 'Browse & Discover',
    'browse_discover_desc': 'Explore thousands of products from trusted sellers. Use our smart filters to find exactly what you need.',
    'secure_purchase': 'Secure Purchase',
    'secure_purchase_desc': 'Buy with confidence using our secure payment system. Your money is protected until you receive your item.',
    'fast_delivery': 'Fast Delivery',
    'fast_delivery_desc': 'Get your products delivered quickly and safely. Track your order every step of the way.',
    'why_choose_gobuy': 'Why Choose GoBuy?',
    'why_choose_subtitle': 'Experience the difference with our premium features',
    'secure_payments': 'Secure Payments',
    'secure_payments_desc': 'Your transactions are protected with bank-level security and encryption. Shop with complete peace of mind.',
    'lightning_fast': 'Lightning Fast',
    'lightning_fast_desc': 'Quick browsing, instant checkout, and rapid delivery. We value your time and make everything seamless.',
    'quality_assured': 'Quality Assured',
    'quality_assured_desc': 'Every product is verified and reviewed. Our quality standards ensure you get exactly what you expect.',
    'smart_matching': 'Smart Matching',
    'smart_matching_desc': 'Our AI-powered system helps you discover products you\'ll love based on your preferences and history.',
    '24_7_support': '24/7 Support',
    '24_7_support_desc': 'Our dedicated support team is always ready to help. Get assistance whenever you need it, day or night.',
    'global_reach': 'Global Reach',
    'global_reach_desc': 'Connect with buyers and sellers worldwide. Expand your market reach beyond geographical boundaries.',
    'or_continue_with': 'or continue with',
    'magic_link_login': 'Magic Link Login',
    'magic_link_desc': 'Get a secure login link sent to your email',
    'enter_email_magic_link': 'Enter email for magic link',
    'send_magic_link': 'Send Magic Link',
    'join_gobuy': 'Join GoBuy',
    'register_subtitle': 'Create your account and start shopping with confidence',
    'create_password': 'Create a password',
    'confirm_your_password': 'Confirm your password',
    'create_account': 'Create Account',
    'what_youll_get': 'What you\'ll get:',
    'secure_encrypted_shopping': 'Secure & encrypted shopping',
    'exclusive_deals': 'Access to exclusive deals',
    'customer_support': '24/7 customer support',
    'fast_reliable_delivery': 'Fast & reliable delivery',
    'already_have_account': 'Already have an account?',
    'sign_in_here': 'Sign in here',
    'terms_privacy_notice': 'By creating an account, you agree to our',
    'terms_of_service': 'Terms of Service',
    'privacy_policy': 'Privacy Policy',
    'my_products': 'My Products',
    'manage_listings': 'Manage your listings',
    'add_product': 'Add Product',
    'enter_display_name': 'Enter your display name',
    'account_information': 'Account Information',
    'member_since': 'Member Since:',
    'last_sign_in': 'Last Sign In:',
    'user_id': 'User ID:',
    'sign_out_desc': 'Sign out of your GoBuy account on this device.',
    'cart_items': 'Cart Items',
    'promo_code': 'Promo code',
    'upload_product': 'Upload Product',
    'sell_subtitle': 'Share your product with thousands of buyers!',
    'product_title': 'Product title',
    'product_description': 'Describe your product',
    'stock_quantity': 'Stock Quantity',
    'product_thumbnail': 'Product Thumbnail',
    'click_upload_drag': 'Click to upload or drag & drop',
    'file_size_limit': 'PNG, JPG, GIF up to 10MB',
    'upload_product_btn': 'Upload Product',
    'back_to_products': 'Back to Products',
    'price_usd': 'Price ($)',
    'title': 'Title',
    'email_cannot_change': 'Email cannot be changed'
  },
  
  es: {
    // Common
    'loading': 'Cargando...',
    'error': 'Error',
    'success': 'Éxito',
    'save': 'Guardar',
    'cancel': 'Cancelar',
    'close': 'Cerrar',
    'search': 'Buscar',
    'try_again': 'Intentar de Nuevo',
    'apply': 'Aplicar',
    'remove': 'Eliminar',
    'delete': 'Borrar',
    'activate': 'Activar',
    'deactivate': 'Desactivar',
    
    // Home Page
    'your_trusted_marketplace': 'Tu mercado de confianza',
    'welcome_to_gobuy': 'Bienvenido a GoBuy',
    'home_subtitle': 'Tu mercado integral para comprar y vender productos con confianza y facilidad.',
    'browse_products': 'Explorar Productos',
    'sell_your_product': 'Vende tu Producto',
    'active_users': 'Usuarios Activos',
    'products_listed': 'Productos Listados',
    'secure_transactions': 'Transacciones Seguras',
    'how_it_works': 'Cómo Funciona',
    'how_it_works_subtitle': 'Comienza en solo tres sencillos pasos',
    
    // All Products
    'all_products': 'Todos los Productos',
    'products_subtitle': 'Descubre productos increíbles de vendedores confiables',
    'no_products_found': 'No se Encontraron Productos',
    'no_products_message': 'No hay productos disponibles en este momento.',
    'reload_products': 'Recargar Productos',
    'products': 'productos',
    'showing': 'Mostrando',
    'of': 'de',
    'all_categories': 'Todas las Categorías',
    'in_stock_only': 'Solo en Stock',
    'active_only': 'Solo Activos',
    'search_products': 'Buscar productos...',
    'out_of_stock': 'Agotado',
    'low_stock': 'Stock Bajo',
    'inactive': 'Inactivo',
    'view': 'Ver',
    'add_to_cart': 'Añadir al Carrito',
    'unavailable': 'No Disponible',
    'price': 'Precio:',
    'category': 'Categoría:',
    'stock': 'Stock:',
    'status': 'Estado:',
    'description': 'Descripción:',
    'active': 'Activo',
    'first': 'Primero',
    'previous': 'Anterior',
    'next': 'Siguiente',
    'last': 'Último',
    'in_stock': 'en stock',
    'updated': 'Actualizado:',
    'items': 'artículos',
    'item': 'artículo',
    
    // Login
    'welcome_back': 'Bienvenido de Vuelta',
    'login_subtitle': 'Inicia sesión para continuar tu viaje de compras',
    'email_address': 'Dirección de Email',
    'enter_your_email': 'Ingresa tu email',
    'password': 'Contraseña',
    'enter_your_password': 'Ingresa tu contraseña',
    'sign_in': 'Iniciar Sesión',
    'signing_in': 'Iniciando Sesión...',
    'continue_with_google': 'Continuar con Google',
    'dont_have_account': '¿No tienes una cuenta?',
    'create_one_here': 'Crea una aquí',
    
    // Settings
    'settings': 'Configuración',
    'settings_subtitle': 'Personaliza tu experiencia GoBuy',
    'settings_saved': '¡Configuración guardada exitosamente!',
    'language_region': 'Idioma y Región',
    'language': 'Idioma',
    'currency': 'Moneda',
    'save_settings': 'Guardar Configuración',
    'reset_to_default': 'Restablecer por Defecto',
    'prototype_notice': 'Este es un prototipo. La configuración se guarda localmente y se restablecerá cuando borres los datos del navegador.',
    
    // Cart
    'your_cart': 'Tu Carrito',
    'cart_subtitle': 'Revisa tus artículos y paga cuando estés listo',
    'empty_cart': 'Tu Carrito está Vacío',
    'empty_cart_message': 'Agrega algunos productos a tu carrito para comenzar.',
    'continue_shopping': 'Continuar Comprando',
    'quantity': 'Cantidad:',
    'total': 'Total:',
    'order_summary': 'Resumen del Pedido',
    'proceed_to_checkout': 'Proceder al Pago',
    
    // Profile
    'my_profile': 'Mi Perfil',
    'profile_subtitle': 'Administra la información de tu cuenta',
    'display_name': 'Nombre de Pantalla',
    'update_profile': 'Actualizar Perfil',
    'sign_out': 'Cerrar Sesión',
    // Addition - Missing Spanish strings
    'browse_discover': 'Explorar y Descubrir',
    'browse_discover_desc': 'Explora miles de productos de vendedores confiables. Usa nuestros filtros inteligentes para encontrar exactamente lo que necesitas.',
    'secure_purchase': 'Compra Segura',
    'secure_purchase_desc': 'Compra con confianza usando nuestro sistema de pago seguro. Tu dinero está protegido hasta que recibas tu artículo.',
    'fast_delivery': 'Entrega Rápida',
    'fast_delivery_desc': 'Recibe tus productos de forma rápida y segura. Rastrea tu pedido en cada paso del camino.',
    'why_choose_gobuy': '¿Por qué Elegir GoBuy?',
    'why_choose_subtitle': 'Experimenta la diferencia con nuestras características premium',
    'secure_payments': 'Pagos Seguros',
    'secure_payments_desc': 'Tus transacciones están protegidas con seguridad y encriptación de nivel bancario. Compra con total tranquilidad.',
    'lightning_fast': 'Súper Rápido',
    'lightning_fast_desc': 'Navegación rápida, checkout instantáneo y entrega veloz. Valoramos tu tiempo y hacemos todo sin complicaciones.',
    'quality_assured': 'Calidad Asegurada',
    'quality_assured_desc': 'Cada producto es verificado y revisado. Nuestros estándares de calidad aseguran que obtengas exactamente lo que esperas.',
    'smart_matching': 'Coincidencia Inteligente',
    'smart_matching_desc': 'Nuestro sistema impulsado por IA te ayuda a descubrir productos que amarás basándose en tus preferencias e historial.',
    '24_7_support': 'Soporte 24/7',
    '24_7_support_desc': 'Nuestro equipo de soporte dedicado siempre está listo para ayudar. Obtén asistencia cuando la necesites, día y noche.',
    'global_reach': 'Alcance Global',
    'global_reach_desc': 'Conecta con compradores y vendedores de todo el mundo. Expande tu alcance de mercado más allá de las fronteras geográficas.',
    'or_continue_with': 'o continuar con',
    'magic_link_login': 'Inicio de Sesión con Enlace Mágico',
    'magic_link_desc': 'Recibe un enlace de inicio de sesión seguro en tu email',
    'enter_email_magic_link': 'Ingresa email para enlace mágico',
    'send_magic_link': 'Enviar Enlace Mágico',
    'join_gobuy': 'Únete a GoBuy',
    'register_subtitle': 'Crea tu cuenta y comienza a comprar con confianza',
    'create_password': 'Crear una contraseña',
    'confirm_your_password': 'Confirmar tu contraseña',
    'create_account': 'Crear Cuenta',
    'what_youll_get': 'Lo que obtendrás:',
    'secure_encrypted_shopping': 'Compras seguras y encriptadas',
    'exclusive_deals': 'Acceso a ofertas exclusivas',
    'customer_support': 'Soporte al cliente 24/7',
    'fast_reliable_delivery': 'Entrega rápida y confiable',
    'already_have_account': '¿Ya tienes una cuenta?',
    'sign_in_here': 'Inicia sesión aquí',
    'terms_privacy_notice': 'Al crear una cuenta, aceptas nuestros',
    'terms_of_service': 'Términos de Servicio',
    'privacy_policy': 'Política de Privacidad',
    'my_products': 'Mis Productos',
    'manage_listings': 'Administra tus anuncios',
    'add_product': 'Agregar Producto',
    'enter_display_name': 'Ingresa tu nombre de pantalla',
    'account_information': 'Información de la Cuenta',
    'member_since': 'Miembro desde:',
    'last_sign_in': 'Último Inicio de Sesión:',
    'user_id': 'ID de Usuario:',
    'sign_out_desc': 'Cerrar sesión de tu cuenta GoBuy en este dispositivo.',
    'cart_items': 'Artículos del Carrito',
    'promo_code': 'Código promocional',
    'upload_product': 'Subir Producto',
    'sell_subtitle': '¡Comparte tu producto con miles de compradores!',
    'product_title': 'Título del producto',
    'product_description': 'Describe tu producto',
    'stock_quantity': 'Cantidad en Stock',
    'product_thumbnail': 'Miniatura del Producto',
    'click_upload_drag': 'Haz clic para subir o arrastra y suelta',
    'file_size_limit': 'PNG, JPG, GIF hasta 10MB',
    'upload_product_btn': 'Subir Producto',
    'back_to_products': 'Volver a Productos',
    'price_usd': 'Precio ($)',
    'title': 'Título',
    'email_cannot_change': 'El email no se puede cambiar'
  },
  
  vi: {
    // Common
    'loading': 'Đang tải...',
    'error': 'Lỗi',
    'success': 'Thành công',
    'save': 'Lưu',
    'cancel': 'Hủy',
    'close': 'Đóng',
    'search': 'Tìm kiếm',
    'try_again': 'Thử Lại',
    'apply': 'Áp dụng',
    'remove': 'Xóa',
    'delete': 'Xóa',
    'activate': 'Kích hoạt',
    'deactivate': 'Vô hiệu hóa',
    
    // Home Page
    'your_trusted_marketplace': 'Thị trường đáng tin cậy của bạn',
    'welcome_to_gobuy': 'Chào mừng đến với GoBuy',
    'home_subtitle': 'Thị trường một cửa để mua và bán sản phẩm với sự tin tưởng và dễ dàng.',
    'browse_products': 'Khám phá ngay',
    'sell_your_product': 'Trở thành seller',
    'active_users': 'Người dùng Hoạt động',
    'products_listed': 'Sản phẩm Đã liệt kê',
    'secure_transactions': 'Giao dịch An toàn',
    'how_it_works': 'Cách Hoạt động',
    'how_it_works_subtitle': 'Bắt đầu chỉ với ba bước đơn giản',
    
    // All Products
    'all_products': 'Tất cả Sản phẩm',
    'products_subtitle': 'Khám phá các sản phẩm tuyệt vời từ người bán đáng tin cậy',
    'no_products_found': 'Không Tìm Thấy Sản phẩm',
    'no_products_message': 'Hiện tại không có sản phẩm nào có sẵn.',
    'reload_products': 'Tải Lại Sản phẩm',
    'products': 'sản phẩm',
    'showing': 'Hiển thị',
    'of': 'của',
    'all_categories': 'Tất cả Danh mục',
    'in_stock_only': 'Chỉ Còn hàng',
    'active_only': 'Chỉ Đang bán',
    'search_products': 'Tìm kiếm sản phẩm...',
    'out_of_stock': 'Hết hàng',
    'low_stock': 'Sắp hết',
    'inactive': 'Không hoạt động',
    'view': 'Xem',
    'add_to_cart': 'Thêm vào Giỏ',
    'unavailable': 'Không có sẵn',
    'price': 'Giá:',
    'category': 'Danh mục:',
    'stock': 'Kho:',
    'status': 'Trạng thái:',
    'description': 'Mô tả:',
    'active': 'Hoạt động',
    'first': 'Đầu',
    'previous': 'Trước',
    'next': 'Tiếp',
    'last': 'Cuối',
    'in_stock': 'còn hàng',
    'updated': 'Cập nhật:',
    'items': 'mục',
    'item': 'mục',
    
    // Login
    'welcome_back': 'Chào mừng Trở lại',
    'login_subtitle': 'Đăng nhập để tiếp tục hành trình mua sắm',
    'email_address': 'Địa chỉ Email',
    'enter_your_email': 'Nhập email của bạn',
    'password': 'Mật khẩu',
    'enter_your_password': 'Nhập mật khẩu của bạn',
    'sign_in': 'Đăng nhập',
    'signing_in': 'Đang đăng nhập...',
    'continue_with_google': 'Tiếp tục với Google',
    'dont_have_account': 'Chưa có tài khoản?',
    'create_one_here': 'Tạo một cái ở đây',
    
    // Settings
    'settings': 'Cài đặt',
    'settings_subtitle': 'Tùy chỉnh trải nghiệm GoBuy của bạn',
    'settings_saved': 'Cài đặt đã được lưu thành công!',
    'language_region': 'Ngôn ngữ & Khu vực',
    'language': 'Ngôn ngữ',
    'currency': 'Tiền tệ',
    'save_settings': 'Lưu Cài đặt',
    'reset_to_default': 'Đặt lại Mặc định',
    'prototype_notice': 'Đây là nguyên mẫu. Cài đặt được lưu cục bộ và sẽ được đặt lại khi bạn xóa dữ liệu trình duyệt.',
    
    // Cart
    'your_cart': 'Giỏ hàng của Bạn',
    'cart_subtitle': 'Xem lại các mặt hàng và thanh toán khi sẵn sàng',
    'empty_cart': 'Giỏ hàng của Bạn Trống',
    'empty_cart_message': 'Thêm một số sản phẩm vào giỏ hàng để bắt đầu.',
    'continue_shopping': 'Tiếp tục Mua sắm',
    'quantity': 'Số lượng:',
    'total': 'Tổng cộng:',
    'order_summary': 'Tóm tắt Đơn hàng',
    'proceed_to_checkout': 'Tiến hành Thanh toán',
    
    // Profile
    'my_profile': 'Hồ sơ của Tôi',
    'profile_subtitle': 'Quản lý thông tin tài khoản của bạn',
    'display_name': 'Tên Hiển thị',
    'update_profile': 'Cập nhật Hồ sơ',
    'sign_out': 'Đăng xuất',
    // Addition - Missing Vietnamese strings
    'browse_discover': 'Duyệt & Khám phá',
    'browse_discover_desc': 'Khám phá hàng nghìn sản phẩm từ những người bán đáng tin cậy. Sử dụng bộ lọc thông minh của chúng tôi để tìm chính xác những gì bạn cần.',
    'secure_purchase': 'Mua hàng An toàn',
    'secure_purchase_desc': 'Mua với sự tin tưởng bằng hệ thống thanh toán an toàn của chúng tôi. Tiền của bạn được bảo vệ cho đến khi bạn nhận được hàng.',
    'fast_delivery': 'Giao hàng Nhanh',
    'fast_delivery_desc': 'Nhận sản phẩm của bạn một cách nhanh chóng và an toàn. Theo dõi đơn hàng của bạn trong từng bước.',
    'why_choose_gobuy': 'Tại sao Chọn GoBuy?',
    'why_choose_subtitle': 'Trải nghiệm sự khác biệt với các tính năng cao cấp của chúng tôi',
    'secure_payments': 'Thanh toán An toàn',
    'secure_payments_desc': 'Các giao dịch của bạn được bảo vệ với bảo mật và mã hóa cấp ngân hàng. Mua sắm với sự yên tâm hoàn toàn.',
    'lightning_fast': 'Cực Nhanh',
    'lightning_fast_desc': 'Duyệt nhanh, thanh toán tức thì và giao hàng nhanh. Chúng tôi trân trọng thời gian của bạn và làm mọi thứ liền mạch.',
    'quality_assured': 'Chất lượng Đảm bảo',
    'quality_assured_desc': 'Mỗi sản phẩm đều được xác minh và đánh giá. Tiêu chuẩn chất lượng của chúng tôi đảm bảo bạn nhận được chính xác những gì bạn mong đợi.',
    'smart_matching': 'Ghép đôi Thông minh',
    'smart_matching_desc': 'Hệ thống được hỗ trợ bởi AI của chúng tôi giúp bạn khám phá những sản phẩm bạn sẽ yêu thích dựa trên sở thích và lịch sử của bạn.',
    '24_7_support': 'Hỗ trợ 24/7',
    '24_7_support_desc': 'Đội ngũ hỗ trợ tận tình của chúng tôi luôn sẵn sàng giúp đỡ. Nhận hỗ trợ bất cứ khi nào bạn cần, ngày hay đêm.',
    'global_reach': 'Tầm với Toàn cầu',
    'global_reach_desc': 'Kết nối với người mua và người bán trên toàn thế giới. Mở rộng tầm với thị trường của bạn vượt qua ranh giới địa lý.',
    'or_continue_with': 'hoặc tiếp tục với',
    'magic_link_login': 'Đăng nhập Liên kết Ma thuật',
    'magic_link_desc': 'Nhận liên kết đăng nhập an toàn được gửi đến email của bạn',
    'enter_email_magic_link': 'Nhập email cho liên kết ma thuật',
    'send_magic_link': 'Gửi Liên kết Ma thuật',
    'join_gobuy': 'Tham gia GoBuy',
    'register_subtitle': 'Tạo tài khoản của bạn và bắt đầu mua sắm với sự tin tưởng',
    'create_password': 'Tạo mật khẩu',
    'confirm_your_password': 'Xác nhận mật khẩu của bạn',
    'create_account': 'Tạo Tài khoản',
    'what_youll_get': 'Những gì bạn sẽ nhận được:',
    'secure_encrypted_shopping': 'Mua sắm an toàn & được mã hóa',
    'exclusive_deals': 'Truy cập vào các ưu đãi độc quyền',
    'customer_support': 'Hỗ trợ khách hàng 24/7',
    'fast_reliable_delivery': 'Giao hàng nhanh & đáng tin cậy',
    'already_have_account': 'Đã có tài khoản?',
    'sign_in_here': 'Đăng nhập ở đây',
    'terms_privacy_notice': 'Bằng cách tạo tài khoản, bạn đồng ý với',
    'terms_of_service': 'Điều khoản Dịch vụ',
    'privacy_policy': 'Chính sách Quyền riêng tư',
    'my_products': 'Sản phẩm của Tôi',
    'manage_listings': 'Quản lý danh sách của bạn',
    'add_product': 'Thêm Sản phẩm',
    'enter_display_name': 'Nhập tên hiển thị của bạn',
    'account_information': 'Thông tin Tài khoản',
    'member_since': 'Thành viên từ:',
    'last_sign_in': 'Lần Đăng nhập Cuối:',
    'user_id': 'ID Người dùng:',
    'sign_out_desc': 'Đăng xuất khỏi tài khoản GoBuy của bạn trên thiết bị này.',
    'cart_items': 'Mặt hàng trong Giỏ',
    'promo_code': 'Mã khuyến mãi',
    'upload_product': 'Tải lên Sản phẩm',
    'sell_subtitle': 'Chia sẻ sản phẩm của bạn với hàng nghìn người mua!',
    'product_title': 'Tiêu đề sản phẩm',
    'product_description': 'Mô tả sản phẩm của bạn',
    'stock_quantity': 'Số lượng Kho',
    'product_thumbnail': 'Hình thu nhỏ Sản phẩm',
    'click_upload_drag': 'Nhấp để tải lên hoặc kéo & thả',
    'file_size_limit': 'PNG, JPG, GIF tối đa 10MB',
    'upload_product_btn': 'Tải lên Sản phẩm',
    'back_to_products': 'Quay lại Sản phẩm',
    'price_usd': 'Giá ($)',
    'title': 'Tiêu đề',
    'email_cannot_change': 'Email không thể thay đổi'
  }
}

// Get translation for a key
export const t = (key, params = {}) => {
  const language = getUserLanguage()
  const translation = translations[language]?.[key] || translations.en[key] || key
  
  // Simple parameter replacement for dynamic content
  if (params && Object.keys(params).length > 0) {
    return translation.replace(/\{(\w+)\}/g, (match, param) => {
      return params[param] || match
    })
  }
  
  return translation
}

// Get language info
export const getLanguageInfo = (targetLanguage = null) => {
  const language = targetLanguage || getUserLanguage()
  return languageConfig[language] || languageConfig.en
}

// Initialize language system
export const initializeLanguage = async () => {
  const userLanguage = getUserLanguage()
  console.log(`🌐 Initializing language system with: ${userLanguage}`)
  
  // Set document language for accessibility
  document.documentElement.lang = userLanguage
  
  // Set text direction (none of our current languages are RTL)
  const langInfo = getLanguageInfo(userLanguage)
  document.documentElement.dir = langInfo.rtl ? 'rtl' : 'ltr'
}