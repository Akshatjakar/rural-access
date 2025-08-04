# GrameenAccess - Rural Community Essential Products Platform

A full-stack web application that helps rural communities access essential products like groceries and medicines with ease.

## Features

- **Authentication System**: JWT-based secure login/signup
- **Product Catalog**: Browse and search essential products
- **Booking System**: Book products for delivery
- **User Dashboard**: Manage profile and view bookings
- **Contact System**: Submit inquiries and feedback
- **Responsive Design**: Works on all devices

## Tech Stack

- **Frontend**: React.js with TypeScript, Tailwind CSS
- **Backend**: Node.js with Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT (JSON Web Tokens)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in `.env`:
   ```
   JWT_SECRET=your_jwt_secret_key
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

### Running the Application

#### Development Mode (Full Stack)
```bash
npm run dev:full
```
This will start both the frontend (port 5173) and backend (port 5000) servers.

#### Frontend Only
```bash
npm run dev
```

#### Backend Only
```bash
npm run server
```

## API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login user
- `GET /api/profile` - Get user profile (authenticated)
- `PUT /api/profile` - Update user profile (authenticated)

### Products & Services
- `GET /api/products` - Get all products
- `GET /api/services` - Get all services
- `GET /api/news` - Get news updates

### Bookings
- `POST /api/bookings` - Create new booking (authenticated)
- `GET /api/bookings` - Get user bookings (authenticated)

### Contact
- `POST /api/contact` - Submit contact form

## Database Models

### User
- name (String)
- email (String, unique)
- password (String, hashed)
- phone (String)

### Product
- name (String)
- price (Number)
- image (String, URL)
- category (String)

### Service
- name (String)
- icon (String)

### Booking
- userId (ObjectId, ref: User)
- productIds (Array of ObjectId, ref: Product)
- totalPrice (Number)

## Deployment

### Frontend (Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify

### Backend (Render/Railway)
1. Deploy the backend to your preferred Node.js hosting service
2. Update frontend API URLs to point to your deployed backend

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.