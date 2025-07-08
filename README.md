<p align="center">
  <img src="https://i.imgur.com/uTfn6RP.png" alt="Signal Admin Preview" />
</p>

# Signal Admin Panel

A modern admin panel built with Angular 20, Angular Material, and TailwindCSS. Features a responsive design with collapsible sidebar, user management, forms, and UI components.

## Features

- **Modern Stack**: Angular 20 with standalone components and lazy loading
- **UI Framework**: Angular Material with TailwindCSS for styling
- **Responsive Design**: Mobile-first approach with collapsible sidebar
- **Authentication**: Mock login/signup with route guards
- **User Management**: CRUD operations with search and filtering
- **Form Components**: Comprehensive form examples with validation
- **UI Components**: Showcase of various Material Design components
- **Mock API**: json-server for development and testing

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── models/          # Data models
│   │   ├── services/        # Core services
│   │   └── guards/          # Route guards
│   ├── features/
│   │   ├── dashboard/       # Dashboard feature
│   │   ├── user/           # User management
│   │   └── admin/          # Admin features
│   ├── layouts/
│   │   ├── auth-layout/    # Authentication layout
│   │   └── main-layout/    # Main app layout
│   ├── pages/
│   │   ├── login/          # Login page
│   │   └── signup/         # Signup page
│   └── shared/             # Shared components
├── assets/
│   └── mock-api/           # Mock API data
└── environments/           # Environment configs
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/codebangla/signal-admin.git
cd signal-admin
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Start the mock API server (in a separate terminal):

```bash
npm run api
```

The application will be available at `http://localhost:4200`

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run api` - Start json-server mock API
- `npm run test` - Run unit tests
- `npm run lint` - Run ESLint

## Authentication

The app includes mock authentication with the following credentials:

- **Email**: admin@example.com
- **Password**: admin123

## Features Overview

### Dashboard

- Overview cards with key metrics
- Recent activity feed
- Quick action buttons

### User Management

- User list with search and filtering
- Add/Edit/Delete operations
- Role-based status indicators
- Avatar support

### Forms

- Comprehensive form examples
- Validation patterns
- Various input types (text, email, select, date, etc.)
- Form submission handling

### UI Components

- Buttons, cards, chips
- Progress indicators
- Badges and icons
- Lists and tabs
- Expansion panels

## Mock API

The project includes a json-server setup with the following endpoints:

- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

## Styling

The project uses:

- **TailwindCSS 3.4.0** for utility classes
- **Angular Material** for components
- **Custom CSS** for specific styling needs

## Development

### Adding New Features

1. Create feature folder in `src/app/features/`
2. Add routes to appropriate layout
3. Create standalone components
4. Add to navigation if needed

### Component Structure

All components are standalone and follow this pattern:

```typescript
@Component({
  selector: "app-component-name",
  standalone: true,
  imports: [
    /* Material modules */
  ],
  template: `/* Inline template */`,
})
export class ComponentName {}
```

## Deployment

1. Build the application:

```bash
npm run build
```

2. Deploy the `dist/signal-admin` folder to your hosting provider.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
