# UI/UX Enhancements Documentation with Examples

## Design System (theme.js)

```javascript
// Modern Color System
export const COLORS = {
  primary: '#2563EB',     // Trust-building blue
  secondary: '#10B981',   // Fresh green
  accent: '#F59E0B',      // Warm orange
  background: '#FFFFFF',  
  surface: '#F8FAFC',    // Light gray background
  text: {
    primary: '#1E293B',   // Slate-900
    secondary: '#64748B', // Slate-500
    disabled: '#CBD5E1',  // Slate-300
  }
};

// Shadow System
export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    // ... medium shadow properties
  },
  large: {
    // ... large shadow properties
  }
};
```

## Animation Examples

### 1. Fade-In Animation
```javascript
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
```

### 2. Press Animation
```javascript
const PressableCard = ({ children }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        {children}
      </Animated.View>
    </Pressable>
  );
};
```

## Modern UI Components

### 1. Custom Button
```javascript
const CustomButton = ({ 
  label, 
  onPress, 
  variant = 'primary',
  loading = false 
}) => (
  <TouchableOpacity
    style={[
      styles.button,
      styles[variant],
      loading && styles.buttonLoading
    ]}
    onPress={onPress}
    disabled={loading}
  >
    {loading ? (
      <ActivityIndicator color={COLORS.background} />
    ) : (
      <Text style={styles.buttonText}>{label}</Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    padding: SIZES.padding.large,
    borderRadius: SIZES.radius.large,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.medium,
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  buttonLoading: {
    opacity: 0.8,
  },
});
```

### 2. Search Bar
```javascript
const SearchBar = ({ value, onChangeText }) => (
  <View style={styles.searchContainer}>
    <FontAwesome5 
      name="search" 
      size={18} 
      color={COLORS.text.secondary} 
    />
    <TextInput
      style={styles.searchInput}
      placeholder="Search..."
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor={COLORS.text.secondary}
    />
  </View>
);

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius.large,
    paddingHorizontal: SIZES.padding.medium,
    ...SHADOWS.small,
  },
  searchInput: {
    flex: 1,
    height: 45,
    marginLeft: SIZES.padding.medium,
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary,
  },
});
```

## Screen Examples

### 1. Product Card
```javascript
const ProductCard = ({ product, onPress }) => (
  <PressableCard onPress={onPress}>
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: product.image }} 
          style={styles.image} 
        />
        {product.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              {product.discount} OFF
            </Text>
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>₹{product.price}</Text>
      </View>
    </View>
  </PressableCard>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius.large,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: SIZES.padding.medium,
    right: SIZES.padding.medium,
    backgroundColor: COLORS.accent,
    paddingHorizontal: SIZES.padding.medium,
    borderRadius: SIZES.radius.large,
    ...SHADOWS.small,
  },
});
```

## Loading States

### 1. Skeleton Loading
```javascript
const SkeletonCard = () => {
  const opacityAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0.7,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View 
      style={[
        styles.skeletonCard,
        { opacity: opacityAnim }
      ]} 
    />
  );
};
```

## Error Handling

### 1. Error Message Component
```javascript
const ErrorMessage = ({ message, onRetry }) => (
  <View style={styles.errorContainer}>
    <FontAwesome5 
      name="exclamation-circle" 
      size={48} 
      color={COLORS.error} 
    />
    <Text style={styles.errorText}>{message}</Text>
    {onRetry && (
      <CustomButton 
        label="Retry" 
        onPress={onRetry}
        variant="secondary" 
      />
    )}
  </View>
);
```

## Best Practices Implementation

### 1. Responsive Layout
```javascript
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    maxWidth: 400,
    alignSelf: 'center',
  },
  image: {
    width: width * 0.8,
    height: height * 0.3,
    maxHeight: 300,
  },
});
```

### 2. Accessibility
```javascript
<TouchableOpacity
  accessible={true}
  accessibilityLabel="Add to cart button"
  accessibilityHint="Adds this product to your shopping cart"
  accessibilityRole="button"
>
  <Text>Add to Cart</Text>
</TouchableOpacity>
```

These code examples demonstrate the practical implementation of our UI/UX enhancements, showing how we achieve modern design, smooth animations, and responsive layouts while maintaining clean, maintainable code.

## Testing Checklist

- [ ] Animation performance on low-end devices
- [ ] Touch target sizes (minimum 44x44 points)
- [ ] Color contrast ratios
- [ ] Screen reader compatibility
- [ ] Responsive layout on different screen sizes
- [ ] Loading state visual feedback
- [ ] Error state handling
- [ ] Network state handling

## Resources

- Font Awesome Icons: [https://fontawesome.com/icons](https://fontawesome.com/icons)
- Google Fonts (Inter): [https://fonts.google.com/specimen/Inter](https://fonts.google.com/specimen/Inter)
- React Native Animated: [https://reactnative.dev/docs/animated](https://reactnative.dev/docs/animated)
