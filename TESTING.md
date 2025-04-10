# UI/UX Testing Guide

This guide outlines testing procedures for ensuring high-quality UI/UX implementation in the MedB2B application.

## Visual Testing

### Component Rendering
```javascript
import { render } from '@testing-library/react-native';

describe('Button Component', () => {
  test('renders correctly with different variants', () => {
    const { getByText } = render(
      <Button variant="primary">Click Me</Button>
    );
    
    const button = getByText('Click Me');
    expect(button).toBeTruthy();
    expect(button.props.style).toMatchSnapshot();
  });
});
```

### Theme Compliance
```javascript
describe('Theme Compliance', () => {
  test('uses correct colors from theme', () => {
    const { getByTestId } = render(
      <View testID="container" style={{ backgroundColor: COLORS.primary }} />
    );
    
    const container = getByTestId('container');
    expect(container.props.style.backgroundColor).toBe('#2563EB');
  });
});
```

## Animation Testing

### Basic Animation
```javascript
import { act } from '@testing-library/react-native';

describe('FadeIn Animation', () => {
  test('animates from 0 to 1 opacity', () => {
    const { getByTestId } = render(<FadeInView testID="fade" />);
    const view = getByTestId('fade');
    
    expect(view.props.style.opacity).toBe(0);
    
    act(() => {
      jest.runAllTimers();
    });
    
    expect(view.props.style.opacity).toBe(1);
  });
});
```

### Interaction Animation
```javascript
describe('Press Animation', () => {
  test('scales down on press', async () => {
    const { getByTestId } = render(<PressableCard testID="card" />);
    const card = getByTestId('card');
    
    await act(async () => {
      fireEvent.pressIn(card);
      jest.runAllTimers();
    });
    
    expect(card.props.style.transform[0].scale).toBe(0.95);
  });
});
```

## Interaction Testing

### Touch Events
```javascript
describe('Button Interactions', () => {
  test('handles press events', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button onPress={onPress}>Press Me</Button>
    );
    
    fireEvent.press(getByText('Press Me'));
    expect(onPress).toHaveBeenCalled();
  });
});
```

### Form Interactions
```javascript
describe('Form Input', () => {
  test('handles text input', () => {
    const { getByPlaceholderText } = render(
      <TextInput placeholder="Enter text" />
    );
    
    const input = getByPlaceholderText('Enter text');
    fireEvent.changeText(input, 'Hello');
    expect(input.props.value).toBe('Hello');
  });
});
```

## Accessibility Testing

### Screen Reader
```javascript
describe('Accessibility', () => {
  test('has correct accessibility props', () => {
    const { getByRole } = render(
      <TouchableOpacity
        accessible={true}
        accessibilityLabel="Add to cart"
        accessibilityRole="button"
      >
        <Text>Add</Text>
      </TouchableOpacity>
    );
    
    const button = getByRole('button');
    expect(button.props.accessibilityLabel).toBe('Add to cart');
  });
});
```

### Color Contrast
```javascript
import { checkContrast } from '../utils/accessibility';

describe('Color Contrast', () => {
  test('meets WCAG standards', () => {
    const backgroundColor = COLORS.primary;
    const textColor = COLORS.background;
    
    expect(checkContrast(backgroundColor, textColor)).toBeGreaterThan(4.5);
  });
});
```

## Responsive Testing

### Screen Sizes
```javascript
describe('Responsive Layout', () => {
  test('adapts to different screen sizes', () => {
    const { rerender, getByTestId } = render(
      <ResponsiveView testID="view" width={375} />
    );
    
    let view = getByTestId('view');
    expect(view.props.style.flexDirection).toBe('column');
    
    rerender(<ResponsiveView testID="view" width={768} />);
    view = getByTestId('view');
    expect(view.props.style.flexDirection).toBe('row');
  });
});
```

## Performance Testing

### Render Performance
```javascript
describe('List Performance', () => {
  test('renders efficiently', () => {
    const startTime = performance.now();
    
    render(
      <FlatList
        data={Array(100).fill({})}
        renderItem={() => <ListItem />}
      />
    );
    
    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThan(100);
  });
});
```

### Animation Performance
```javascript
describe('Animation Performance', () => {
  test('uses native driver when possible', () => {
    const animation = new Animated.Value(0);
    const config = Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    
    expect(config.useNativeDriver).toBe(true);
  });
});
```

## Error State Testing

### Loading States
```javascript
describe('Loading States', () => {
  test('shows loading indicator', async () => {
    const { getByTestId } = render(<AsyncComponent />);
    
    expect(getByTestId('loading')).toBeTruthy();
    
    await waitForElementToBeRemoved(() => getByTestId('loading'));
    expect(getByTestId('content')).toBeTruthy();
  });
});
```

### Error Handling
```javascript
describe('Error States', () => {
  test('displays error message', async () => {
    const { getByText } = render(<ErrorComponent error="Failed to load" />);
    
    expect(getByText('Failed to load')).toBeTruthy();
    expect(getByText('Retry')).toBeTruthy();
  });
});
```

## Integration Testing

### Navigation Flow
```javascript
describe('Navigation', () => {
  test('navigates through app flow', async () => {
    const { getByText, findByText } = render(<App />);
    
    fireEvent.press(getByText('Login'));
    expect(await findByText('Welcome')).toBeTruthy();
    
    fireEvent.press(getByText('Categories'));
    expect(await findByText('Products')).toBeTruthy();
  });
});
```

### User Flows
```javascript
describe('Shopping Flow', () => {
  test('completes purchase flow', async () => {
    const { getByText, findByText } = render(<App />);
    
    // Add to cart
    fireEvent.press(getByText('Add to Cart'));
    expect(await findByText('Cart (1)')).toBeTruthy();
    
    // Checkout
    fireEvent.press(getByText('Checkout'));
    expect(await findByText('Payment')).toBeTruthy();
    
    // Complete purchase
    fireEvent.press(getByText('Pay Now'));
    expect(await findByText('Order Confirmed')).toBeTruthy();
  });
});
```

## Test Coverage Requirements

### Minimum Coverage
- Components: 90%
- Screens: 85%
- Animations: 80%
- User Interactions: 90%
- Accessibility: 95%

### Critical Paths
- Authentication flow
- Product browsing
- Cart management
- Checkout process
- Error handling

## Running Tests

### Setup
```bash
# Install dependencies
npm install --save-dev @testing-library/react-native

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

### Watch Mode
```bash
# Watch mode for development
npm test -- --watch
```

## Continuous Integration

### GitHub Actions
```yaml
name: UI Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
```

## Best Practices

### Writing Tests
1. Test component rendering
2. Test user interactions
3. Test animations
4. Test accessibility
5. Test responsiveness
6. Test error states
7. Test loading states
8. Test edge cases

### Test Organization
```javascript
describe('ComponentName', () => {
  describe('Rendering', () => {
    // Rendering tests
  });
  
  describe('Interactions', () => {
    // Interaction tests
  });
  
  describe('Animations', () => {
    // Animation tests
  });
  
  describe('Accessibility', () => {
    // Accessibility tests
  });
});
```

## Resources

- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Animations](https://reactnative.dev/docs/animated#testing)
- [Accessibility Testing](https://reactnative.dev/docs/accessibility)
