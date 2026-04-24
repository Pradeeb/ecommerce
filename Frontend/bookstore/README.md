# BookStore E-Commerce Frontend

A modern, responsive e-commerce frontend application for an online bookstore, built with React and Vite. This application provides a seamless shopping experience with user authentication, product browsing, detailed product views, and secure checkout integration.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure login/signup with mobile number and password
- **OAuth Integration**: Social login via Google and GitHub
- **Product Catalog**: Browse books with advanced filtering and search capabilities
- **Product Details**: Comprehensive book information including ISBN, author, ratings, and reviews
- **Related Products**: Intelligent recommendations based on categories
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Updates**: Live data fetching with React Query

### Technical Features
- **Performance Optimized**: Code splitting, lazy loading, and efficient bundling
- **Error Handling**: Comprehensive error boundaries and user-friendly notifications
- **Accessibility**: ARIA-compliant components and keyboard navigation support
- **Security**: Environment-based configuration and secure API communication
- **State Management**: Efficient client-side state with React Query
- **Form Validation**: Robust form handling with Yup schema validation

## 🛠 Tech Stack

### Frontend Framework
- **React 19**: Latest React with concurrent features and hooks
- **Vite**: Fast build tool with HMR and optimized production builds

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **React Icons**: Comprehensive icon library
- **React Hot Toast**: Elegant notification system

### State & Data Management
- **TanStack React Query**: Powerful data synchronization for server state
- **Axios**: HTTP client with request/response interceptors

### Forms & Validation
- **React Hook Form**: Performant forms with easy validation
- **Yup**: Schema-based validation for form data

### Routing & Navigation
- **React Router DOM**: Declarative routing with protected routes
- **Custom HOCs**: Higher-order components for authentication

### Development Tools
- **ESLint**: Code linting with React-specific rules
- **Vite Plugins**: Optimized development and build process

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher (comes with Node.js)
- **Backend API**: Running BookStore backend server on port 8080

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bookstore-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:8080
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## 🏗 Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── Signin.jsx          # User login component
│   │   ├── Signup.jsx          # User registration component
│   │   ├── ProtectedRoute.jsx  # Route protection HOC
│   │   └── withAuth.jsx        # Authentication wrapper
│   ├── layout/
│   │   ├── Layout.jsx          # Main layout wrapper
│   │   └── Navebar.jsx         # Navigation component
│   ├── Pages/
│   │   ├── HomePage.jsx        # Product listing page
│   │   └── ProductView.jsx     # Product details page
│   ├── hooks/
│   │   └── useURL.jsx          # API endpoint configuration
│   └── ErrorBoundary.jsx       # Error handling component
├── assets/                     # Static assets
├── App.jsx                     # Main application component
├── main.jsx                    # Application entry point
└── index.css                   # Global styles
```

## 🔐 Authentication Flow

### User Registration
1. User provides name, email, mobile number, and password
2. Form validation using Yup schema
3. API call to `/api/auth/signup` endpoint
4. Success notification and redirect to login

### User Login
1. User provides mobile number and password
2. Form validation and API authentication
3. JWT token stored in HTTP-only cookies
4. Redirect to main application

### Protected Routes
- Authentication verification via `/greeting` endpoint
- Automatic redirect to login on authentication failure
- Loading states during verification

## 🌐 API Integration

### Authentication Endpoints
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User authentication
- `GET /greeting` - Authentication verification
- `POST /api/auth/logout` - User logout

### OAuth Endpoints
- `GET /oauth2/authorization/google` - Google OAuth
- `GET /oauth2/authorization/github` - GitHub OAuth

### Product Endpoints
- `GET /api/product/getall` - Fetch all products
- `GET /api/product/id/{id}` - Fetch single product
- `GET /api/product/category/{category}` - Fetch products by category
- `GET /api/product/getcategory` - Fetch all categories

### Request/Response Handling
- Axios interceptors for consistent error handling
- Automatic retry logic with exponential backoff
- Request cancellation on component unmount
- Cookie-based authentication headers

## ⚡ Performance Optimizations

### Code Splitting
- Lazy loading of route components
- Dynamic imports for better initial bundle size
- Suspense boundaries for loading states

### Caching Strategy
- React Query for intelligent data caching
- Stale-while-revalidate pattern
- Background refetching for data freshness

### Bundle Optimization
- Vite's tree shaking and minification
- Optimized chunk splitting
- Efficient asset handling

## 🧪 Testing Strategy

### Unit Testing
```bash
npm run test
```
- Component testing with React Testing Library
- Hook testing with custom render utilities
- API mocking with MSW (Mock Service Worker)

### Integration Testing
- End-to-end user flows
- API integration verification
- Cross-browser compatibility testing

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables for Production
```env
VITE_API_BASE_URL=https://api.bookstore.com
```

### Deployment Checklist
- [ ] Environment variables configured
- [ ] API endpoints updated for production
- [ ] Build optimization verified
- [ ] HTTPS enabled
- [ ] Performance monitoring configured
- [ ] Error tracking implemented

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure responsive design across devices

## 📄 License

This project is proprietary software. All rights reserved.

## 📞 Support

For support and questions:
- **Email**: support@bookstore.com
- **Documentation**: [Internal Wiki](https://wiki.bookstore.com)
- **Issue Tracker**: [JIRA](https://jira.bookstore.com)

## 🔄 Version History

### v1.0.0 (Current)
- Initial release with core e-commerce functionality
- Authentication and product management
- Responsive design and performance optimizations

---

**Built with ❤️ by the BookStore Development Team**
