# Local Backend Setup

## Starting the Local Backend

If you want to run the local backend for development, follow these steps:

### Option 1: Using Docker (Recommended)
```bash
# Navigate to your backend directory
cd ../pestcontrol-backend

# Start the backend using Docker
docker-compose up -d

# Or if you have a different backend setup
docker run -p 8000:8000 your-backend-image
```

### Option 2: Using Python/Django
```bash
# Navigate to your backend directory
cd ../pestcontrol-backend

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start the development server
python manage.py runserver 0.0.0.0:8000
```

### Option 3: Using Node.js/Express
```bash
# Navigate to your backend directory
cd ../pestcontrol-backend

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Fallback Behavior

If the local backend is not running, the frontend will automatically:
1. Try to connect to `http://localhost:8000` (local backend)
2. If that fails, fallback to `https://pestcontrol-backend-production.up.railway.app` (production backend)
3. If both fail, show an error message to the user

## Environment Variables

You can override the backend URL using:
```bash
NEXT_PUBLIC_CRM_API_URL=https://your-custom-backend-url.com
```

## Testing the Backend Connection

Visit `/api/test-railway` to test the backend connection and see which backend is being used.
