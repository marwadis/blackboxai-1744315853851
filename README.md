# MedB2B - Wholesale Medicine Marketplace

A modern B2B marketplace application for wholesale medicine distribution, built with React Native.

## Features

- 🔐 Secure Authentication (Phone, GST, Email)
- 🏪 Product Catalog & Categories
- 🛒 Shopping Cart & Checkout
- 📦 Order Management
- 💰 Bulk Pricing
- 📱 Modern UI/UX

## Tech Stack

- React Native
- React Navigation
- React Native Paper
- Font Awesome Icons
- Google Fonts (Inter)

## Project Structure

```
src/
├── constants/
│   └── theme.js          # Design system & theme configuration
├── navigation/
│   └── index.js          # Navigation configuration
├── screens/
│   ├── auth/
│   │   ├── SplashScreen.js
│   │   ├── OnboardingScreen.js
│   │   └── LoginScreen.js
│   ├── HomeScreen.js
│   ├── CategoryScreen.js
│   ├── ProductListingScreen.js
│   ├── ProductDetailsScreen.js
│   ├── CartScreen.js
│   ├── CheckoutScreen.js
│   ├── OrdersScreen.js
│   └── ProfileScreen.js
```

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- React Native development environment

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/medb2b.git
cd medb2b
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Run on iOS:
```bash
npm run ios
# or
yarn ios
```

5. Run on Android:
```bash
npm run android
# or
yarn android
```

## UI/UX Features

### Modern Design System
- Consistent color palette
- Typography hierarchy
- Spacing system
- Shadow levels
- Border radius consistency

### Interactive Elements
- Smooth animations
- Press feedback
- Loading states
- Error handling
- Form validation

### Screen Features

#### Authentication
- Multi-method login (Phone, GST, Email)
- OTP verification
- Language selection
- Form validation

#### Home Screen
- Category navigation
- Featured products
- Special deals
- Search functionality

#### Category Screen
- Grid/List view toggle
- Filter system
- Search integration
- Animated transitions

#### Product Listing
- Modern card design
- Quick add to cart
- Price comparison
- Stock status
- Bulk pricing

#### Product Details
- Image gallery
- Detailed information
- Quantity selection
- Related products
- Share functionality

#### Cart & Checkout
- Order summary
- Address management
- Payment integration
- Order confirmation

## Documentation

For detailed documentation about the UI/UX enhancements and implementation details, please refer to:

- [UI/UX Enhancements](./UI_UX_ENHANCEMENTS.md)
- [UI/UX Examples & Code](./UI_UX_ENHANCEMENTS_WITH_EXAMPLES.md)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Best Practices

### Code Style
- Consistent naming conventions
- Component modularity
- Props validation
- Error boundaries
- Performance optimization

### UI/UX
- Accessibility compliance
- Responsive design
- Touch target sizes
- Loading states
- Error feedback
- Visual hierarchy

### Testing
- Component testing
- Integration testing
- UI testing
- Performance testing
- Accessibility testing

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React Native](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [Font Awesome](https://fontawesome.com/)
- [Google Fonts](https://fonts.google.com/)
