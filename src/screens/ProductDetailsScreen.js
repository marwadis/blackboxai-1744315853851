import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../constants/theme';

const { width } = Dimensions.get('window');

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(product.moq);

  // Sample bulk pricing tiers
  const bulkPricing = [
    { quantity: 100, price: 2.5 },
    { quantity: 500, price: 2.2 },
    { quantity: 1000, price: 2.0 },
    { quantity: 5000, price: 1.8 },
  ];

  const handleQuantityChange = (increment) => {
    const newQuantity = quantity + increment;
    if (newQuantity >= product.moq) {
      setQuantity(newQuantity);
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <FontAwesome5 name="arrow-left" size={20} color={COLORS.text.primary} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Product Details</Text>
      <TouchableOpacity style={styles.shareButton}>
        <FontAwesome5 name="share-alt" size={20} color={COLORS.text.primary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Images */}
        <Image source={{ uri: product.image }} style={styles.productImage} />

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.brandName}>{product.brand}</Text>

          {/* Key Details */}
          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <FontAwesome5 name="prescription-bottle" size={16} color={COLORS.primary} />
              <Text style={styles.detailText}>{product.strength}</Text>
            </View>
            <View style={styles.detailItem}>
              <FontAwesome5 name="box" size={16} color={COLORS.primary} />
              <Text style={styles.detailText}>{product.packSize}</Text>
            </View>
            <View style={styles.detailItem}>
              <FontAwesome5 name="calendar" size={16} color={COLORS.primary} />
              <Text style={styles.detailText}>Exp: {product.expiry}</Text>
            </View>
          </View>

          {/* Pricing Section */}
          <View style={styles.pricingSection}>
            <Text style={styles.sectionTitle}>Pricing</Text>
            <View style={styles.priceRow}>
              <View>
                <Text style={styles.priceLabel}>Price per unit</Text>
                <Text style={styles.price}>₹{product.pricePerUnit}</Text>
              </View>
              <View>
                <Text style={styles.priceLabel}>Box price</Text>
                <Text style={styles.price}>₹{product.boxPrice}</Text>
              </View>
            </View>

            {/* Bulk Pricing */}
            <View style={styles.bulkPricingContainer}>
              <Text style={styles.bulkPricingTitle}>Bulk Pricing Tiers</Text>
              {bulkPricing.map((tier, index) => (
                <View key={index} style={styles.bulkPricingRow}>
                  <Text style={styles.bulkPricingText}>
                    {tier.quantity}+ units
                  </Text>
                  <Text style={styles.bulkPricingPrice}>₹{tier.price}/unit</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Manufacturer Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Manufacturer Details</Text>
            <Text style={styles.manufacturerText}>
              Manufactured by {product.brand} Pharmaceuticals Ltd.
            </Text>
            <Text style={styles.licenseText}>
              License No: DB-123-456-789
            </Text>
          </View>

          {/* GST & Shipping */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>GST & Shipping</Text>
            <Text style={styles.gstText}>GST: 12% included in price</Text>
            <Text style={styles.shippingText}>
              Free shipping on orders above ₹5000
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.quantitySelector}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(-10)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(10)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.addToCartButton]}
            onPress={() => {/* Add to cart logic */}}
          >
            <Text style={styles.actionButtonText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.buyNowButton]}
            onPress={() => navigation.navigate('Checkout', { product, quantity })}
          >
            <Text style={styles.actionButtonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SIZES.padding.large,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surface,
  },
  backButton: {
    padding: SIZES.padding.small,
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
  },
  shareButton: {
    padding: SIZES.padding.small,
  },
  productImage: {
    width: width,
    height: width * 0.8,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: SIZES.padding.large,
  },
  productName: {
    fontSize: SIZES.xlarge,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    marginBottom: SIZES.padding.small,
  },
  brandName: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    marginBottom: SIZES.padding.medium,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.padding.large,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: SIZES.padding.small,
    fontSize: SIZES.font,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary,
  },
  pricingSection: {
    marginBottom: SIZES.padding.large,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    marginBottom: SIZES.padding.medium,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.padding.medium,
  },
  priceLabel: {
    fontSize: SIZES.font,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    marginBottom: 4,
  },
  price: {
    fontSize: SIZES.large,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
  },
  bulkPricingContainer: {
    backgroundColor: COLORS.surface,
    padding: SIZES.padding.medium,
    borderRadius: SIZES.radius.medium,
  },
  bulkPricingTitle: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary,
    marginBottom: SIZES.padding.medium,
  },
  bulkPricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.padding.small,
  },
  bulkPricingText: {
    fontSize: SIZES.font,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
  },
  bulkPricingPrice: {
    fontSize: SIZES.font,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
  },
  section: {
    marginBottom: SIZES.padding.large,
  },
  manufacturerText: {
    fontSize: SIZES.font,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary,
    marginBottom: SIZES.padding.small,
  },
  licenseText: {
    fontSize: SIZES.font,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
  },
  gstText: {
    fontSize: SIZES.font,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary,
    marginBottom: SIZES.padding.small,
  },
  shippingText: {
    fontSize: SIZES.font,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
  },
  bottomBar: {
    flexDirection: 'row',
    padding: SIZES.padding.large,
    borderTopWidth: 1,
    borderTopColor: COLORS.surface,
    backgroundColor: COLORS.background,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SIZES.padding.large,
  },
  quantityButton: {
    width: 36,
    height: 36,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius.small,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    fontSize: SIZES.large,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
  },
  quantityText: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary,
    marginHorizontal: SIZES.padding.medium,
  },
  actionButtons: {
    flex: 1,
    flexDirection: 'row',
  },
  actionButton: {
    flex: 1,
    height: 48,
    borderRadius: SIZES.radius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SIZES.padding.small,
  },
  addToCartButton: {
    backgroundColor: COLORS.surface,
  },
  buyNowButton: {
    backgroundColor: COLORS.primary,
  },
  actionButtonText: {
    fontSize: SIZES.font,
    fontFamily: FONTS.medium,
    color: COLORS.background,
  },
});

export default ProductDetailsScreen;
