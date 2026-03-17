# ATP Community Frontend

React-based frontend for ATP Community, connecting to the ATP Laravel backend via JWT-authenticated APIs.

## Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Environment Configuration

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_URL=http://localhost:5000
```

For production:
```env
VITE_API_BASE_URL=https://atp-global.com.au
VITE_APP_URL=https://talent.atp-global.com.au
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Architecture

### Authentication Flow

1. User clicks "Login with Google" or "Login with LinkedIn"
2. OAuth popup opens and redirects to provider
3. After authorization, callback returns with code
4. Frontend sends code to backend API
5. Backend validates with OAuth provider and returns JWT token
6. Frontend stores JWT token in localStorage
7. All subsequent API requests include JWT token in Authorization header

### Member Status Flow

- **created**: New member, needs to complete registration → `/register`
- **pending**: Registration submitted, awaiting approval → `/pending`
- **joined**: Approved member, full access → `/student-portal`
- **blocked**: Account blocked → `/blocked`
- **rejected**: Application rejected → redirected to registration

### API Integration

All API calls go through the centralized API client in `src/lib/api.ts`:

- Automatic JWT token attachment
- Token refresh on 401 errors
- CORS handling
- Error handling

### Services

- `authService.ts`: Authentication (OAuth, JWT, logout)
- `memberService.ts`: Member operations (profile, registration)
- `videoService.ts`: Video browsing and purchases
- `resourceService.ts`: Events and resources

### Protected Routes

Routes are protected using the `ProtectedRoute` component which:
- Checks authentication status
- Redirects based on member status
- Shows loading state during auth check

## Project Structure

```
src/
├── components/
│   ├── ui/              # Shadcn UI components
│   └── ProtectedRoute.tsx
├── contexts/
│   └── AuthContext.tsx  # Global auth state
├── lib/
│   ├── api.ts          # API client with JWT
│   ├── config.ts       # Environment config
│   └── queryClient.ts  # React Query setup
├── pages/
│   ├── home.tsx
│   ├── login.tsx
│   ├── register.tsx
│   ├── pending.tsx
│   ├── blocked.tsx
│   ├── student-portal.tsx
│   ├── video-player.tsx
│   └── ...
├── services/
│   ├── authService.ts
│   ├── memberService.ts
│   ├── videoService.ts
│   └── resourceService.ts
└── App.tsx
```

## Backend API Endpoints

All endpoints are prefixed with `/api/community/`

### Authentication
- `POST /auth/google` - Initiate Google OAuth
- `POST /auth/google/callback` - Handle Google callback
- `POST /auth/linkedin` - Initiate LinkedIn OAuth
- `POST /auth/linkedin/callback` - Handle LinkedIn callback
- `POST /auth/refresh` - Refresh JWT token
- `POST /auth/logout` - Logout
- `GET /auth/me` - Get current member

### Members
- `GET /members` - List approved members
- `GET /members/{id}` - Get member profile
- `GET /profile` - Get current profile
- `PUT /profile` - Update profile
- `POST /profile/avatar` - Upload avatar
- `POST /register` - Complete registration
- `POST /consultation-booking` - Book consultation

### Videos
- `GET /videos` - List videos
- `GET /videos/{id}` - Get video detail
- `GET /videos/{id}/purchase-status` - Check purchase status
- `POST /videos/{id}/purchase` - Purchase video
- `GET /video-categories` - Get categories

### Resources
- `GET /events` - List events
- `GET /resources` - List resources

## Deployment

### Frontend (talent.atp-global.com.au)

1. Build the application:
```bash
npm run build
```

2. Deploy `dist` folder to web server

3. Configure nginx/apache:
```nginx
server {
    listen 80;
    server_name talent.atp-global.com.au;
    
    root /path/to/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Backend Configuration

Ensure the ATP Laravel backend has:
- JWT authentication configured
- CORS enabled for talent.atp-global.com.au
- Community API routes registered
- OAuth providers configured

## Environment Variables

### Development
- `VITE_API_BASE_URL`: Backend API URL (default: http://localhost:8000)
- `VITE_APP_URL`: Frontend URL (default: http://localhost:5000)

### Production
- `VITE_API_BASE_URL`: https://atp-global.com.au
- `VITE_APP_URL`: https://talent.atp-global.com.au

## Security

- JWT tokens stored in localStorage
- Automatic token refresh on expiration
- CORS configured for specific domains
- OAuth state validation
- Protected routes require authentication

## Features

- ✅ OAuth authentication (Google, LinkedIn)
- ✅ JWT token management
- ✅ Member registration flow
- ✅ Status-based redirects
- ✅ Video browsing and purchases
- ✅ Member directory
- ✅ Profile management
- ✅ Protected routes
- ✅ Responsive design
- ✅ Modern UI with Shadcn

## Tech Stack

- React 19
- TypeScript
- Vite
- Wouter (routing)
- TanStack Query
- Shadcn UI
- Tailwind CSS
- Framer Motion

