# AgriPredict - Frontend Application

AgriPredict is a sophisticated web application designed to help farmers and agricultural scientists predict optimal potato varieties for cultivation based on geographical and climatic conditions. This repository contains the frontend implementation built with React, TypeScript, and Tailwind CSS.

## 🌟 Features

- User authentication (Login/Register)
- Protected routes and role-based access
- Interactive prediction creation
- Detailed prediction results visualization
- Profile management
- Prediction sharing capabilities
- Responsive design for all devices
- Interactive tour guide for new users

## 🏗️ Project Structure

```
.
├── src/
│   ├── api/                 # API integration layer
│   │   ├── auth.ts         # Authentication API calls
│   │   ├── potatoes.ts     # Potato varieties API calls
│   │   ├── predictions.ts  # Predictions API calls
│   │   ├── user.ts         # User management API calls
│   │   └── utils/
│   │       └── util.ts     # Utility functions
│   ├── components/         # Reusable UI components
│   │   ├── Pagination.tsx
│   │   ├── PotatoDetailModal.tsx
│   │   ├── PredictionCard.tsx
│   │   ├── ProfileModal.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── ShareModal.tsx
│   │   ├── Sidebar.tsx
│   │   └── TourGuide.tsx
│   ├── data/              # Static data
│   │   └── locations.ts   # Peru locations data
│   ├── pages/             # Application pages
│   │   ├── Dashboard.tsx
│   │   ├── HomePage.tsx
│   │   ├── LandingPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── MyPredictionsPage.tsx
│   │   ├── PredictionDetailPage.tsx
│   │   ├── PredictPage.tsx
│   │   ├── RegisterPage.tsx
│   │   └── SearchPage.tsx
│   ├── types/             # TypeScript type definitions
│   │   ├── potato.ts
│   │   └── user.ts
│   └── App.tsx            # Main application component
```

## 🔒 Authentication Flow

The application implements a secure authentication system using JWT tokens stored in cookies:

1. **Login/Register**:
   - Users can register with email, password, and role (Farmer/Scientist)
   - Upon successful login, the backend returns a JWT token
   - Token is stored in an HTTP-only cookie using `js-cookie`

2. **Protected Routes**:
   - `ProtectedRoute` component wraps authenticated routes
   - Checks for valid token before rendering protected content
   - Redirects to login if token is invalid or missing

3. **API Requests**:
   ```typescript
   // Example of authenticated API request
   const response = await axios.get(`${API_URL}/predictions`, {
     headers: {
       'Authorization': `Bearer ${getAuthToken()}`
     }
   });
   ```

## 🔄 State Management

The application uses React's built-in state management with hooks:
- `useState` for component-level state
- `useEffect` for side effects and data fetching
- Props for component communication

## 📱 Components

### Core Components

1. **Sidebar (`Sidebar.tsx`)**
   - Main navigation component
   - Responsive design with mobile toggle
   - Dynamic route highlighting

2. **ProtectedRoute (`ProtectedRoute.tsx`)**
   ```typescript
   <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
     <Component />
   </ProtectedRoute>
   ```

3. **ProfileModal (`ProfileModal.tsx`)**
   - User profile management
   - Avatar upload
   - Account settings

### Feature Components

1. **PredictionCard (`PredictionCard.tsx`)**
   - Displays prediction summaries
   - Links to detailed views

2. **ShareModal (`ShareModal.tsx`)**
   - Email-based prediction sharing
   - Multiple recipient support

## 📄 Pages

1. **LandingPage**
   - Public landing page with feature showcase
   - Authentication entry points

2. **Dashboard**
   - Main application interface
   - Navigation hub
   - User-specific content

3. **PredictPage**
   - Prediction creation form
   - Location selection
   - Climate data input

4. **PredictionDetailPage**
   - Detailed prediction results
   - Farmer/Scientist view modes
   - Sharing capabilities

## 🌐 API Integration

The application communicates with a backend API:

```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
```

API modules are organized by domain:
- `auth.ts`: Authentication endpoints
- `predictions.ts`: Prediction management
- `potatoes.ts`: Potato varieties data
- `user.ts`: User management

## 🚀 Deployment

The application is deployed on Vercel, leveraging its:
- Automatic deployments from Git
- Environment variable management
- SSL/TLS encryption
- Global CDN

### Deployment Configuration (`vercel.json`):


```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

## 🛠️ Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/agripredict-frontend.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```env
   VITE_API_URL=your_backend_url
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

## 📦 Build

```bash
npm run build
```

The build output will be in the `dist` directory.

## 🔧 Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Axios
- React Router DOM
- Lucide Icons
- js-cookie

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.