import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../constants/theme';

// Sample cart data
const initialCartItems = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    brand: 'Cipla',
    image: 'https://images.pexels.com/photos/139398/thermometer-headache-pain-pills-139398.jpeg',
    strength: '500mg',
    packSize: '10 tablets/strip',
    pricePerUnit: 2.5,
    quantity: 100,
    maxQuantity: 1000,
  },
  {
    id: '2',
    name: 'Amoxicillin',
    brand: 'Sun Pharma',
    image: 'https://images.pexels.com/photos/3683098/pexels-photo-3683098.jpeg',
    strength: '250mg',
    packSize: '6 tablets/strip',
    pricePerUnit: 5.0,
    quantity: 50,
    maxQuantity: 500,
  },
];

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState('');

  const updateQuantity = (id, increment) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + increment;
          if (newQuantity > 0 && newQuantity <= item.maxQuantity) {
            return { ...item, quantity: newQuantity };
          }
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.pricePerUnit * item.quantity,
      0
    );
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.12; // 12% GST
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal >= 5000 ? 0 : 100; // Free shipping above ₹5000
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateShipping();
  };

  const renderCartItem = (item) => (
    <View key={item.id} style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <View style={styles.productHeader}>
          <View>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.brandName}>{item.brand}</Text>
          </View>
          <TouchableOpacity
            onPress={() => removeItem(item.id)}
            style={styles.removeButton}
          >
            <FontAwesome5 name="trash" size={16} color={COLORS.error} />
          </TouchableOpacity>
        </View>

        <View style={styles.productDetails}>
          <Text style={styles.strengthText}>
            {item.strength} • {item.packSize}
          </Text>
          <Text style={styles.priceText}>₹{item.pricePerUnit}/unit</Text>
        </View>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, -10)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, 10)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
          <Text style={styles.totalPrice}>
            ₹{(item.pricePerUnit * item.quantity).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        <Text style={styles.itemCount}>{cartItems.length} items</Text>
      </View>

      {cartItems.length > 0 ? (
        <>
          <ScrollView style={styles.cartList}>
            {cartItems.map(renderCartItem)}

            {/* Promo Code Section */}
            <View style={styles.promoSection}>
              <TextInput
                mode="outlined"
                label="Promo Code"
                value={promoCode}
                onChangeText={setPromoCode}
                style={styles.promoInput}
                right={
                  <TextInput.Icon
                    icon="tag"
                    color={COLORS.primary}
                    onPress={() => {/* Apply promo code logic */}}
                  />
                }
              />
            </View>

            {/* Order Summary */}
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryTitle}>Order Summary</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>
                  ₹{calculateSubtotal().toFixed(2)}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>GST (12%)</Text>
                <Text style={styles.summaryValue}>
                  ₹{calculateTax().toFixed(2)}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Shipping</Text>
                <Text style={styles.summaryValue}>
                  {calculateShipping() === 0
                    ? 'Free'
                    : `₹${calculateShipping().toFixed(2)}`}
                </Text>
              </View>
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>
                  ₹{calculateTotal().toFixed(2)}
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* Checkout Button */}
          <View style={styles.checkoutContainer}>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => navigation.navigate('Checkout')}
            >
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
              <FontAwesome5 name="arrow-right" size={16} color={COLORS.background} />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.emptyCart}>
          <FontAwesome5 name="shopping-cart" size={64} color={COLORS.text.disabled} />
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
          <TouchableOpacity
            style={styles.continueShoppingButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.continueShoppingText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.padding.large,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surface,
  },
  headerTitle: {
    fontSize: SIZES.xlarge,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
  },
  itemCount: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
  },
  cartList: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    padding: SIZES.padding.large,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surface,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: SIZES.radius.medium,
    marginRight: SIZES.padding.medium,
  },
  productInfo: {
    flex: 1,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  productName: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  brandName: {
    fontSize: SIZES.font,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
  },
  removeButton: {
    padding: SIZES.padding.small,
  },
  productDetails: {
    marginVertical: SIZES.padding.small,
  },
  strengthText: {
    fontSize: SIZES.font,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    marginBottom: 2,
  },
  priceText: {
    fontSize: SIZES.font,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius.small,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
  },
  quantityText: {
    fontSize: SIZES.font,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary,
    marginHorizontal: SIZES.padding.medium,
    minWidth: 40,
    textAlign: 'center',
  },
  totalPrice: {
    flex: 1,
    fontSize: SIZES.medium,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    textAlign: 'right',
  },
  promoSection: {
    padding: SIZES.padding.large,
  },
  promoInput: {
    backgroundColor: COLORS.background,
  },
  summaryContainer: {
    padding: SIZES.padding.large,
    backgroundColor: COLORS.surface,
    margin: SIZES.padding.large,
    borderRadius: SIZES.radius.medium,
  },
  summaryTitle: {
    fontSize: SIZES.large,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    marginBottom: SIZES.padding.medium,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.padding.small,
  },
  summaryLabel: {
    fontSize: SIZES.font,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
  },
  summaryValue: {
    fontSize: SIZES.font,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary,
  },
  totalRow: {
    marginTop: SIZES.padding.medium,
    paddingTop: SIZES.padding.medium,
    borderTopWidth: 1,
    borderTopColor: COLORS.text.disabled,
  },
  totalLabel: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
  },
  totalValue: {
    fontSize: SIZES.large,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
  },
  checkoutContainer: {
    padding: SIZES.padding.large,
    borderTopWidth: 1,
    borderTopColor: COLORS.surface,
    backgroundColor: COLORS.background,
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.padding.large,
    borderRadius: SIZES.radius.medium,
  },
  checkoutButtonText: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.medium,
    color: COLORS.background,
    marginRight: SIZES.padding.medium,
  },
  emptyCart: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.padding.xlarge,
  },
  emptyCartText: {
    fontSize: SIZES.large,
    fontFamily: FONTS.medium,
    color: COLORS.text.secondary,
    marginTop: SIZES.padding.large,
    marginBottom: SIZES.padding.xlarge,
  },
  continueShoppingButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.padding.xlarge,
    paddingVertical: SIZES.padding.medium,
    borderRadius: SIZES.radius.medium,
  },
  continueShoppingText: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.medium,
    color: COLORS.background,
  },
});

export default CartScreen;
