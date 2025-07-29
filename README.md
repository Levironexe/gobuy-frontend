# GoBuy - Multilingual E-commerce Platform

A modern, multilingual marketplace built with Vue.js and Express.js, featuring real-time currency conversion and complete e-commerce functionality.

## 🌟 Features

### 🌍 Multilingual Support
- **3 Languages**: English, Spanish, Vietnamese
- **Real-time switching** - Change language instantly
- **150+ translated strings** across all components
- **Automatic browser language detection**

### 💱 Multi-Currency System
- **10 supported currencies**: USD, EUR, GBP, JPY, CAD, AUD, VND, CNY, KRW, INR
- **Live exchange rates** via FastForex API
- **Smart caching** with 10-minute refresh intervals
- **Automatic price conversion** throughout the app

### 🛒 E-commerce Features
- **Product listings** with advanced filtering and search
- **Shopping cart** with quantity management
- **User authentication** (Email/Password, Magic Links, Google OAuth)
- **Seller dashboard** for product management
- **User profiles** with customizable settings

### 🎨 Modern UI/UX
- **Responsive design** with Tailwind CSS
- **Smooth animations** and hover effects
- **Loading skeletons** for better UX
- **Clean, professional interface**

## 🏗️ Architecture

### Frontend (Vue.js)
- **Vue 3** with Composition API
- **Vue Router** for navigation
- **Tailwind CSS** for styling
- **Vite** for fast development

### Backend (Express.js)
- **Express.js** REST API
- **Supabase** for database and authentication
- **CORS** configured for secure cross-origin requests
- **JWT-based** session management

### Deployment
- **Frontend**: Vercel (https://your-app.vercel.app)
- **Backend**: Render (https://gobuy-backend-3to7.onrender.com)

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- Supabase account
- FastForex API key (optional, for currency conversion)

### Backend Setup

1. **Clone the backend repository**
   ```bash
   git clone https://github.com/Levironexe/gobuy-backend.git
   cd gobuy-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment configuration**
   ```bash
   # Copy example file
   cp .env.example .env
   
   # Fill in your values:
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_SERVICE_KEY=your_supabase_service_key
   SUPABASE_ANON_KEY=your_supabase_anon_key
   NODE_ENV=development
   PORT=3001
   ```

4. **Run the backend**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Clone the frontend repository**
   ```bash
   git clone https://github.com/yourusername/gobuy-frontend.git
   cd gobuy-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment configuration**
   ```bash
   # Copy example file
   cp .env.example .env
   
   # Fill in your values:
   VITE_API_BASE_URL=http://localhost:3001/api
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   PORT=5173
   ```

4. **Run the frontend**
   ```bash
   npm run dev
   ```

## 📱 Pages & Features

### 🏠 Home Page
- Hero section with call-to-action
- Feature highlights with icons
- Statistics cards
- "How it works" section

### 🛍️ Products Page
- Product grid with images and pricing
- Category filtering and search
- Stock status indicators
- Pagination with navigation

### 🛒 Shopping Cart
- Add/remove items with quantity controls
- Real-time price calculations
- Order summary with tax calculation
- Checkout process

### 👤 User Account
- **Registration**: Email/password with validation
- **Login**: Multiple options (Email, Magic Link, Google OAuth)
- **Profile**: Editable user information with avatar
- **My Products**: Seller dashboard for product management

### ⚙️ Settings
- **Language switching**: Real-time UI translation
- **Currency selection**: Live conversion for all prices
- **Individual localStorage**: Separate storage for each setting
- **Preview system**: See currency conversion before saving

## 🌐 Translation System

### Implementation
```javascript
// Usage in components
import { t } from '@/utils/language'

// In templates
{{ t('welcome_to_gobuy') }}
{{ t('showing_products', { start: 1, end: 9, total: 25 }) }}
```

### Language Files
- **English**: Complete base language
- **Spanish**: Full translation for Latin American market
- **Vietnamese**: Complete localization for Southeast Asia

### Features
- **Parameter replacement**: Dynamic content with `{param}` syntax
- **Reactive switching**: Instant UI updates on language change
- **Browser fallback**: Auto-detect user's preferred language

## 💱 Currency System

### Implementation
```javascript
// Usage in components
import { formatPrice } from '@/utils/currency'

// Automatic conversion
{{ formatPrice(product.price) }}  // $99.99 → €89.50
```

### Features
- **Live exchange rates**: FastForex API integration
- **Smart caching**: 10-minute intervals to reduce API calls
- **Fallback handling**: Graceful degradation if API fails
- **Format localization**: Proper currency symbols and formatting

## 🗄️ Database Schema

### Products Table
```sql
- id (uuid, primary key)
- seller_id (uuid, foreign key to auth.users)
- title (text)
- description (text)
- price (decimal)
- image_url (text)
- category (text)
- stock_quantity (integer)
- is_active (boolean)
- created_at (timestamp)
- updated_at (timestamp)
```

### Cart Items Table
```sql
- id (uuid, primary key)
- user_id (uuid, foreign key to auth.users)
- product_id (uuid, foreign key to products)
- quantity (integer)
- added_at (timestamp)
```

## 📡 API Endpoints

### Products
- `GET /api/posts` - Get all products
- `POST /api/posts` - Create new product (auth required)
- `GET /api/my-products` - Get user's products (auth required)
- `PUT /api/my-products/:id` - Update product (auth required)
- `DELETE /api/my-products/:id` - Delete product (auth required)

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - Email/password login
- `POST /api/auth/magic-link` - Magic link login
- `POST /api/auth/google` - Google OAuth
- `GET /api/auth/session` - Get current session
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Shopping Cart
- `GET /api/cart` - Get cart items (auth required)
- `POST /api/cart` - Add item to cart (auth required)
- `PUT /api/cart/:id` - Update cart item (auth required)
- `DELETE /api/cart/:id` - Remove cart item (auth required)

## 🔧 Development Tools

### Code Quality
- **ESLint**: Code linting and formatting
- **Prettier**: Consistent code style
- **Git hooks**: Pre-commit validation

### Build Tools
- **Vite**: Fast development and building
- **PostCSS**: CSS processing
- **Autoprefixer**: Browser compatibility

## 🚀 Deployment

### Backend (Render)
1. Connect GitHub repository
2. Set environment variables
3. Deploy with automatic builds

### Frontend (Vercel)
1. Connect GitHub repository
2. Configure build settings
3. Set environment variables
4. Deploy with preview URLs

## 🔐 Security Features

- **JWT authentication** with secure token handling
- **Environment variables** for sensitive data
- **CORS configuration** for secure cross-origin requests
- **Input validation** on all user inputs
- **SQL injection protection** via Supabase

## 📊 Performance

- **Fast loading**: Optimized bundle sizes
- **Caching**: Smart currency and data caching
- **Lazy loading**: Images and components
- **CDN delivery**: Static assets via Vercel/Render

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For questions or issues:
- Check the [Issues](https://github.com/Levironexe/gobuy-backend/issues) page
- Contact the development team

---

**Built with ❤️ using Vue.js, Express.js, and modern web technologies**
