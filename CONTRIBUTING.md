# Contributing to MedB2B

Thank you for your interest in contributing to MedB2B! This guide will help you maintain our UI/UX standards while contributing to the project.

## UI/UX Guidelines

### Design System

#### Colors
Always use the predefined colors from `theme.js`:
```javascript
import { COLORS } from '../constants/theme';

// Good
backgroundColor: COLORS.primary

// Bad
backgroundColor: '#2563EB'
```

#### Typography
Use the predefined font families and sizes:
```javascript
import { FONTS, SIZES } from '../constants/theme';

// Good
fontSize: SIZES.medium,
fontFamily: FONTS.regular

// Bad
fontSize: 16,
fontFamily: 'Roboto'
```

#### Spacing
Follow the spacing system:
```javascript
import { SIZES } from '../constants/theme';

// Good
padding: SIZES.padding.medium
margin: SIZES.padding.large

// Bad
padding: 15
margin: 20
```

### Component Guidelines

#### 1. Animation Implementation
```javascript
// Good
const FadeInView = ({ children }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      {children}
    </Animated.View>
  );
};

// Bad
const FadeInView = ({ children }) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setOpacity(1);
  }, []);

  return (
    <View style={{ opacity }}>
      {children}
    </View>
  );
};
```

#### 2. Touch Feedback
Always include touch feedback:
```javascript
// Good
<TouchableOpacity
  activeOpacity={0.7}
  style={[styles.button, pressed && styles.buttonPressed]}
>
  <Text>Press Me</Text>
</TouchableOpacity>

// Bad
<TouchableOpacity>
  <Text>Press Me</Text>
</TouchableOpacity>
```

#### 3. Loading States
Include loading states for async operations:
```javascript
// Good
const Button = ({ loading, onPress, children }) => (
  <TouchableOpacity 
    disabled={loading}
    style={[styles.button, loading && styles.buttonLoading]}
    onPress={onPress}
  >
    {loading ? (
      <ActivityIndicator color={COLORS.background} />
    ) : children}
  </TouchableOpacity>
);

// Bad
const Button = ({ onPress, children }) => (
  <TouchableOpacity onPress={onPress}>
    {children}
  </TouchableOpacity>
);
```

### Accessibility Guidelines

#### 1. Touch Targets
Ensure adequate touch target sizes:
```javascript
// Good
const styles = StyleSheet.create({
  button: {
    minWidth: 44,
    minHeight: 44,
    padding: SIZES.padding.medium,
  }
});

// Bad
const styles = StyleSheet.create({
  button: {
    padding: 5,
  }
});
```

#### 2. Screen Reader Support
Include accessibility props:
```javascript
// Good
<TouchableOpacity
  accessible={true}
  accessibilityLabel="Add to cart"
  accessibilityHint="Adds this item to your shopping cart"
  accessibilityRole="button"
>
  <Text>Add to Cart</Text>
</TouchableOpacity>

// Bad
<TouchableOpacity>
  <Text>Add to Cart</Text>
</TouchableOpacity>
```

### Performance Guidelines

#### 1. Image Optimization
```javascript
// Good
<Image
  source={{ uri: imageUrl }}
  style={styles.image}
  resizeMode="cover"
  fadeDuration={300}
  onLoadStart={() => setLoading(true)}
  onLoadEnd={() => setLoading(false)}
/>

// Bad
<Image
  source={{ uri: imageUrl }}
  style={{ width: '100%', height: 200 }}
/>
```

#### 2. List Rendering
Use FlatList for better performance:
```javascript
// Good
<FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={item => item.id}
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={5}
/>

// Bad
<ScrollView>
  {items.map(item => (
    <ItemComponent key={item.id} item={item} />
  ))}
</ScrollView>
```

## Pull Request Process

1. Create a feature branch:
```bash
git checkout -b feature/your-feature-name
```

2. Follow commit message convention:
```
feat(component): add new button component
fix(screen): resolve navigation issue
style(theme): update color palette
```

3. Update documentation:
- Add comments to your code
- Update README.md if needed
- Update CHANGELOG.md
- Add UI/UX implementation details

4. Test your changes:
- Visual consistency
- Animation performance
- Touch interactions
- Accessibility
- Cross-device compatibility

5. Create pull request:
- Describe UI/UX changes
- Include screenshots/videos
- List breaking changes
- Mention related issues

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/medb2b.git
cd medb2b
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

## Code Review Guidelines

### UI/UX Checklist
- [ ] Follows design system
- [ ] Implements proper animations
- [ ] Includes loading states
- [ ] Handles errors gracefully
- [ ] Maintains accessibility
- [ ] Optimizes performance
- [ ] Responsive layout
- [ ] Touch feedback
- [ ] Documentation updated

### Common Review Comments
- Use theme constants instead of hard-coded values
- Add loading states for async operations
- Implement proper error handling
- Include accessibility props
- Optimize list rendering
- Add touch feedback
- Document complex animations
- Test on different devices

## Style Guide

### Component Structure
```javascript
// ComponentName.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';

const ComponentName = ({ prop1, prop2 }) => {
  // State and hooks

  // Helper functions

  // Render methods

  return (
    <View style={styles.container}>
      {/* Component content */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // styles
  },
});

export default ComponentName;
```

### File Organization
```
src/
├── components/
│   ├── common/
│   │   ├── Button.js
│   │   ├── Card.js
│   │   └── Input.js
│   └── screens/
│       ├── HomeComponents/
│       └── ProductComponents/
├── screens/
├── navigation/
└── constants/
```

## Questions?

Feel free to open an issue for:
- UI/UX clarifications
- Design system questions
- Implementation guidance
- Best practices discussion

## Additional Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Navigation](https://reactnavigation.org/)
- [Animated API](https://reactnative.dev/docs/animated)
- [Accessibility](https://reactnative.dev/docs/accessibility)
