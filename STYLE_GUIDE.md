# MedB2B Style Guide

## Design Language

### Brand Identity
- Modern and professional
- Trust-building
- Clean and organized
- User-friendly
- Healthcare-focused

## Color System

### Primary Colors
```javascript
primary: '#2563EB'    // Trust-building blue
secondary: '#10B981'  // Success green
accent: '#F59E0B'     // Warning/CTA orange
```

### Text Colors
```javascript
text: {
  primary: '#1E293B',   // Main text
  secondary: '#64748B', // Subdued text
  disabled: '#CBD5E1',  // Disabled state
}
```

### Status Colors
```javascript
error: '#EF4444',    // Error/Danger
success: '#10B981',  // Success/Complete
warning: '#F59E0B',  // Warning/Alert
info: '#3B82F6',     // Information
```

### Usage Guidelines
- Use primary color for main actions and branding
- Use secondary color for success states and positive actions
- Use accent color for calls-to-action and highlights
- Maintain proper contrast ratios (minimum 4.5:1)

## Typography

### Font Family
```javascript
fonts: {
  regular: 'Inter-Regular',
  medium: 'Inter-Medium',
  bold: 'Inter-Bold',
  light: 'Inter-Light',
}
```

### Font Sizes
```javascript
sizes: {
  small: 12,    // Fine print, captions
  font: 14,     // Body text
  medium: 16,   // Subheadings
  large: 18,    // Section headers
  xlarge: 24,   // Screen titles
  xxlarge: 32,  // Hero text
}
```

### Usage Guidelines
- Use consistent font sizes across similar elements
- Maintain clear hierarchy with font weights
- Ensure readability with proper line height
- Use appropriate font weights for emphasis

## Spacing System

### Base Units
```javascript
spacing: {
  small: 10,    // Minimal spacing
  medium: 15,   // Standard spacing
  large: 20,    // Section spacing
  xlarge: 25,   // Screen padding
  xxlarge: 30,  // Major sections
}
```

### Usage Guidelines
- Use consistent spacing for similar elements
- Maintain proper whitespace for readability
- Use larger spacing for major section breaks
- Keep spacing proportional to content

## Component Styling

### Buttons

#### Primary Button
```javascript
primaryButton: {
  backgroundColor: COLORS.primary,
  padding: SIZES.padding.large,
  borderRadius: SIZES.radius.large,
  ...SHADOWS.medium,
}
```

#### Secondary Button
```javascript
secondaryButton: {
  backgroundColor: COLORS.surface,
  borderWidth: 1,
  borderColor: COLORS.primary,
  padding: SIZES.padding.large,
  borderRadius: SIZES.radius.large,
}
```

#### Button States
- Normal: Full opacity
- Pressed: 90% opacity
- Disabled: 50% opacity
- Loading: Show activity indicator

### Cards

#### Standard Card
```javascript
card: {
  backgroundColor: COLORS.surface,
  borderRadius: SIZES.radius.large,
  padding: SIZES.padding.large,
  ...SHADOWS.medium,
}
```

#### Interactive Card
```javascript
interactiveCard: {
  backgroundColor: COLORS.surface,
  borderRadius: SIZES.radius.large,
  padding: SIZES.padding.large,
  ...SHADOWS.medium,
  transform: [{ scale: 1 }], // Animate on press
}
```

### Input Fields

#### Text Input
```javascript
input: {
  height: 48,
  backgroundColor: COLORS.surface,
  borderRadius: SIZES.radius.medium,
  paddingHorizontal: SIZES.padding.medium,
  fontSize: SIZES.medium,
}
```

#### Input States
- Normal: Light border
- Focused: Primary color border
- Error: Error color border
- Disabled: Reduced opacity

## Layout Guidelines

### Screen Layout
```javascript
screen: {
  flex: 1,
  backgroundColor: COLORS.background,
  padding: SIZES.padding.large,
}
```

### Section Layout
```javascript
section: {
  marginBottom: SIZES.padding.xlarge,
}
```

### List Layout
```javascript
list: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
}
```

## Animation Guidelines

### Timing
- Quick feedback: 200ms
- Standard transitions: 300ms
- Complex animations: 500ms

### Easing
```javascript
Easing: {
  standard: Easing.bezier(0.4, 0, 0.2, 1),
  accelerate: Easing.bezier(0.4, 0, 1, 1),
  decelerate: Easing.bezier(0, 0, 0.2, 1),
}
```

### Common Animations
```javascript
fadeIn: {
  from: { opacity: 0 },
  to: { opacity: 1 },
  duration: 300,
}

scale: {
  from: { scale: 0.9 },
  to: { scale: 1 },
  duration: 200,
}

slideUp: {
  from: { translateY: 20 },
  to: { translateY: 0 },
  duration: 300,
}
```

## Icons and Images

### Icon Guidelines
- Use Font Awesome icons consistently
- Maintain consistent icon sizes
- Use appropriate icon colors
- Include proper padding

### Image Guidelines
- Use proper aspect ratios
- Implement lazy loading
- Show loading placeholders
- Handle error states
- Optimize for performance

## Accessibility Guidelines

### Touch Targets
- Minimum size: 44x44 points
- Proper spacing between targets
- Clear visual feedback
- Adequate hit areas

### Color Contrast
- Text: 4.5:1 minimum ratio
- Large text: 3:1 minimum ratio
- Interactive elements: 3:1 minimum
- Status indicators: 3:1 minimum

### Screen Reader Support
- Meaningful labels
- Proper heading hierarchy
- Action descriptions
- State announcements

## Responsive Design

### Breakpoints
```javascript
breakpoints: {
  phone: 0,
  tablet: 768,
  desktop: 1024,
}
```

### Responsive Patterns
- Fluid grids
- Flexible images
- Adaptive layouts
- Dynamic spacing

## Loading States

### Skeleton Loading
```javascript
skeleton: {
  backgroundColor: COLORS.surface,
  borderRadius: SIZES.radius.medium,
  opacity: 0.3,
}
```

### Progress Indicators
- Use for longer operations
- Show meaningful progress
- Maintain consistency
- Provide feedback

## Error States

### Error Messages
```javascript
errorMessage: {
  color: COLORS.error,
  fontSize: SIZES.font,
  marginTop: SIZES.padding.small,
}
```

### Error Visuals
- Clear error indicators
- Helpful error messages
- Recovery actions
- Consistent styling

## Best Practices

### Code Organization
- Group related styles
- Use meaningful names
- Maintain consistency
- Document exceptions

### Performance
- Optimize animations
- Minimize style calculations
- Use static styles
- Implement caching

### Maintenance
- Regular style audits
- Document changes
- Version control
- Style testing

## Resources

### Design Assets
- Color palette
- Typography guide
- Icon library
- Component library

### Tools
- Design system
- Style linting
- Testing utilities
- Documentation

### References
- [React Native Style Guide](https://reactnative.dev/docs/style)
- [Accessibility Guidelines](https://reactnative.dev/docs/accessibility)
- [Animation Guide](https://reactnative.dev/docs/animations)
