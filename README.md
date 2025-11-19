# Car Rental Frontend

This is the frontend application for the Car Rental System, built using Vite and React. The application is structured to facilitate team collaboration and maintainability.

## Project Structure

The project is organized into several directories, each serving a specific purpose:

- **public**: Contains static assets like the Vite logo.
- **src**: The main source code of the application.
  - **assets**: Static assets such as images and icons.
  - **components**: Reusable UI components organized by feature:
    - **common**: Shared components like Header, Footer, Sidebar, and LoadingSpinner.
    - **auth**: Components related to authentication, including LoginForm, RegisterForm, and ProtectedRoute.
    - **vehicles**: Components for vehicle management, including VehicleCard, VehicleList, and VehicleDetail.
    - **bookings**: Components for booking management, including BookingForm, BookingList, and BookingDetail.
    - **payments**: Components for payment management, including PaymentForm and PaymentHistory.
  - **pages**: Main pages of the application:
    - HomePage: The landing page.
    - LoginPage: User login page.
    - RegisterPage: User registration page.
    - VehiclesPage: Displays available vehicles.
    - BookingsPage: Manages bookings.
    - PaymentsPage: Manages payments.
    - ProfilePage: User profile page.
    - AdminDashboard: Dashboard for admin users.
    - NotFoundPage: Page for unknown routes.
  - **services**: Service files for API interactions:
    - api.ts: Centralized API configuration.
    - authService.ts: Authentication-related API calls.
    - vehicleService.ts: Vehicle-related API calls.
    - bookingService.ts: Booking-related API calls.
    - paymentService.ts: Payment-related API calls.
  - **store**: State management setup:
    - index.ts: Configures the Redux store.
    - authSlice.ts: Manages authentication state.
    - vehicleSlice.ts: Manages vehicle state.
    - bookingSlice.ts: Manages booking state.
    - paymentSlice.ts: Manages payment state.
  - **hooks**: Custom hooks for shared logic:
    - useAuth: Authentication logic.
    - useVehicles: Vehicle-related logic.
    - useBookings: Booking-related logic.
    - usePayments: Payment-related logic.
  - **utils**: Utility functions and constants:
    - constants.ts: Constant values used throughout the application.
    - helpers.ts: Helper functions for various tasks.
    - validators.ts: Validation functions for form inputs.
  - **types**: TypeScript type definitions:
    - index.ts: Centralized type definitions.
    - user.ts: User-related data types.
    - vehicle.ts: Vehicle-related data types.
    - booking.ts: Booking-related data types.
    - payment.ts: Payment-related data types.
  - **styles**: Global styles and CSS variables:
    - globals.css: Global styles for the application.
    - variables.css: CSS variables for theming.
  - **App.tsx**: Main application component that sets up routing.
  - **App.css**: Styles specific to the App component.
  - **main.tsx**: Entry point of the application.
  - **vite-env.d.ts**: TypeScript definitions for Vite environment variables.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:
   ```
   git clone <repo-url>
   cd car-rental-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## Contributing

Contributions are welcome! Please follow the standard Git workflow for contributing to this project.

## License

This project is licensed under the MIT License. See the LICENSE file for details.