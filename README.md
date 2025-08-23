# PestControl99 - Professional Pest Control Website

A modern, responsive pest control business website built with Next.js, featuring advanced form handling, Google Maps integration, and CRM system integration.

## 🚀 Live Backend API

The project is now connected to a **production Railway backend**:
- **Backend URL**: https://pestcontrol-backend-production.up.railway.app/
- **Status**: Running ✅
- **API Version**: v1.0.0

## 🔗 APIs & Integrations

### External APIs
- **Google Maps JavaScript API** - Map functionality and address autocomplete
- **Google Places API** - Address search and validation
- **Google Geocoding API** - Address to coordinates conversion
- **Gmail SMTP** - Email notifications
- **Google Analytics 4** - Website analytics

### Backend APIs
- **Railway Production Backend** - CRM inquiry management
- **Internal API Routes** - Form processing and data handling

## 🛠️ Environment Variables

Create a `.env.local` file with the following variables:

```env
# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Email (Gmail SMTP)
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_app_password

# CRM System (Optional - Auto-detected based on environment)
# Development: http://localhost:8000
# Production: https://pestcontrol-backend-production.up.railway.app
NEXT_PUBLIC_CRM_API_URL=your_custom_api_url

# Analytics
NEXT_PUBLIC_GA_ID=G-69K3FRS21R
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

### 🔄 Smart Backend Configuration

The system automatically detects the environment and uses the appropriate backend:

- **Development Mode** (`npm run dev`): Uses `http://localhost:8000`
- **Production Mode** (`npm run build && npm start`): Uses Railway backend
- **Custom URL**: Set `NEXT_PUBLIC_CRM_API_URL` to override both

## 🧪 Testing Backend Connection

Test the backend connection (automatically detects environment):
```bash
# Test API endpoint
curl http://localhost:3000/api/test-railway

# Or visit the test page
http://localhost:3000/test-railway
```

## 📦 Installation & Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎯 Key Features

- **Responsive Design** - Mobile-first approach
- **Google Maps Integration** - Address autocomplete and location services
- **CRM Integration** - Direct connection to Railway backend
- **Email Notifications** - Automated quote and inquiry processing
- **SEO Optimized** - Meta tags, sitemap, and structured data
- **Performance Optimized** - Image optimization and lazy loading
- **Analytics** - Google Analytics integration

## 🔧 API Endpoints

### Internal Routes
- `/api/contact` - Contact form processing
- `/api/send-quote` - Quote request handling
- `/api/home-quote` - Home page quote form
- `/api/test-railway` - Railway backend connection test

### External Backend (Railway)
- `https://pestcontrol-backend-production.up.railway.app/api/inquiries/` - CRM inquiry submission

## 📱 Mobile Optimization

- Responsive design for all devices
- Touch-friendly interface
- Optimized loading times
- Mobile-specific navigation

## 🚀 Deployment

The project is optimized for deployment on Vercel with:
- Automatic image optimization
- Edge functions for API routes
- Global CDN distribution
- Environment variable management

## 📊 Performance

- Lighthouse score: 90+ across all metrics
- Core Web Vitals optimized
- Image compression and WebP format
- Lazy loading for better UX

## 🔒 Security

- Environment variable protection
- Input validation and sanitization
- CORS configuration
- Rate limiting on API routes

## 📞 Support

For technical support or questions about the Railway backend integration, please refer to the API documentation or contact the development team.
