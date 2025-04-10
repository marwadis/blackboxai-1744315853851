import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  Pressable,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';

const { width } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = width * 0.8;
const HEADER_MIN_HEIGHT = 80;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(product.moq);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isLiked, setIsLiked] = useState(false);
  const likeAnim = useRef(new Animated.Value(1)).current;

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

  const handleLikePress = () => {
    Animated.sequence([
      Animated.timing(likeAnim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(likeAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
    setIsLiked(!isLiked);
  };

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });

  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });

  const renderHeader = () => (
    <Animated.View style={[styles.header, { height: headerHeight }]}>
      <Animated.Image
        source={{ uri: product.image }}
        style={[styles.productImage, { opacity: imageOpacity }]}
      />
      <View style={styles.headerOverlay}>
        <Animated.View
          style={[
            styles.headerContent,
            {
              opacity: headerTitleOpacity,
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [0, HEADER_SCROLL_DISTANCE],
                    outputRange: [60, 0],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {product.name}
          </Text>
        </Animated.View>
      </View>
      <View style={styles.headerActions}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}>
          <FontAwesome5 name="arrow-left" size={20} color={COLORS.text.primary} />
        </TouchableOpacity>
        <View style={styles.headerRightButtons}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleLikePress}>
            <Animated.View style={{ transform: [{ scale: likeAnim }] }}>
              <FontAwesome5
                name={isLiked ? 'heart' : 'heart'}
                solid={isLiked}
                size={20}
                color={isLiked ? COLORS.accent : COLORS.text.primary}
              />
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <FontAwesome5 name="share" size={20} color={COLORS.text.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );

  const renderQuantitySelector = () => (
    <View style={styles.quantitySelector}>
      <TouchableOpacity
        style={[styles.quantityButton, quantity <= product.moq && styles.quantityButtonDisabled]}
        onPress={() => handleQuantityChange(-10)}
        disabled={quantity <= product.moq}>
        <FontAwesome5
          name="minus"
          size={16}
          color={quantity <= product.moq ? COLORS.text.disabled : COLORS.primary}
        />
      </TouchableOpacity>
      <View style={styles.quantityDisplay}>
        <Text style={styles.quantityText}>{quantity}</Text>
        <Text style={styles.moqText}>MOQ: {product.moq}</Text>
      </View>
      <TouchableOpacity
        style={styles.quantityButton}
        onPress={() => handleQuantityChange(10)}>
        <FontAwesome5 name="plus" size={16} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}>
        <View style={styles.contentContainer}>
          {/* Product Info */}
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{product.name}</Text>
            <View style={styles.brandContainer}>
              <Text style={styles.brandName}>{product.brand}</Text>
              {product.discount && (
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>{product.discount} OFF</Text>
                </View>
              )}
            </View>
          </View>

          {/* Key Details */}
          <View style={styles.detailsCard}>
            <View style={styles.detailItem}>
              <FontAwesome5 name="prescription-bottle" size={20} color={COLORS.primary} />
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Strength</Text>
                <Text style={styles.detailValue}>{product.strength}</Text>
              </View>
            </View>
            <View style={styles.detailDivider} />
            <View style={styles.detailItem}>
              <FontAwesome5 name="box" size={20} color={COLORS.primary} />
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Pack Size</Text>
                <Text style={styles.detailValue}>{product.packSize}</Text>
              </View>
            </View>
            <View style={styles.detailDivider} />
            <View style={styles.detailItem}>
              <FontAwesome5 name="calendar-check" size={20} color={COLORS.primary} />
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Expiry</Text>
                <Text style={styles.detailValue}>{product.expiry}</Text>
              </View>
            </View>
          </View>

          {/* Pricing Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pricing Details</Text>
            <View style={styles.priceCard}>
              <View style={styles.priceRow}>
                <View>
                  <Text style={styles.priceLabel}>Price per unit</Text>
                  <Text style={styles.price}>₹{product.pricePerUnit}</Text>
                </View>
                <View style={styles.verticalDivider} />
                <View>
                  <Text style={styles.priceLabel}>Box price</Text>
                  <Text style={styles.price}>₹{product.boxPrice}</Text>
                </View>
              </View>
            </View>

            {/* Bulk Pricing */}
            <View style={styles.bulkPricingCard}>
              <View style={styles.bulkPricingHeader}>
                <FontAwesome5 name="tags" size={16} color={COLORS.primary} />
                <Text style={styles.bulkPricingTitle}>Bulk Pricing Tiers</Text>
              </View>
              {bulkPricing.map((tier, index) => (
                <View key={index} style={styles.bulkPricingRow}>
                  <View style={styles.bulkQuantity}>
                    <FontAwesome5 name="box" size={12} color={COLORS.text.secondary} />
                    <Text style={styles.bulkPricingText}>{tier.quantity}+ units</Text>
                  </View>
                  <Text style={styles.bulkPricingPrice}>₹{tier.price}/unit</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Additional Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Information</Text>
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <FontAwesome5 name="building" size={16} color={COLORS.primary} />
                <Text style={styles.infoText}>
                  Manufactured by {product.brand} Pharmaceuticals Ltd.
                </Text>
              </View>
              <View style={styles.infoRow}>
                <FontAwesome5 name="certificate" size={16} color={COLORS.primary} />
                <Text style={styles.infoText}>License No: DB-123-456-789</Text>
              </View>
              <View style={styles.infoRow}>
                <FontAwesome5 name="percentage" size={16} color={COLORS.primary} />
                <Text style={styles.infoText}>GST: 12% included in price</Text>
              </View>
              <View style={styles.infoRow}>
                <FontAwesome5 name="truck" size={16} color={COLORS.primary} />
                <Text style={styles.infoText}>Free shipping above ₹5000</Text>
              </View>
            </View>
          </View>

          {/* Bottom Spacing */}
          <View style={styles.bottomPadding} />
        </View>
      </Animated.ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        {renderQuantitySelector()}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.cartButton]}
            onPress={() => {}}>
            <FontAwesome5 name="shopping-cart" size={18} color={COLORS.primary} />
            <Text style={styles.cartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.buyButton]}
            onPress={() => navigation.navigate('Checkout', { product, quantity })}>
            <Text style={styles.buyButtonText}>Buy Now</Text>
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background,
    overflow: 'hidden',
    zIndex: 1,
    elevation: 4,
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  headerContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: HEADER_MIN_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.padding.large,
  },
  headerActions: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding.medium,
    zIndex: 2,
  },
  headerRightButtons: {
    flexDirection: 'row',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    ...SHADOWS.small,
  },
  productImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  contentContainer: {
    marginTop: HEADER_MAX_HEIGHT,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: SIZES.radius.xlarge,
    borderTopRightRadius: SIZES.radius.xlarge,
    paddingTop: SIZES.padding.large,
  },
  productInfo: {
    paddingHorizontal: SIZES.padding.large,
    marginBottom: SIZES.padding.large,
  },
  productName: {
    fontSize: SIZES.xlarge,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    marginBottom: SIZES.padding.small,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandName: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.secondary,
  },
  discountBadge: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: SIZES.padding.medium,
    paddingVertical: SIZES.padding.small / 2,
    borderRadius: SIZES.radius.large,
    ...SHADOWS.small,
  },
  discountText: {
    color: COLORS.background,
    fontSize: SIZES.small,
    fontFamily: FONTS.bold,
  },
  detailsCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    marginHorizontal: SIZES.padding.large,
    borderRadius: SIZES.radius.large,
    padding: SIZES.padding.large,
    marginBottom: SIZES.padding.large,
    ...SHADOWS.small,
  },
  detailItem: {
    flex: 1,
    alignItems: 'center',
  },
  detailTextContainer: {
    alignItems: 'center',
    marginTop: SIZES.padding.small,
  },
  detailLabel: {
    fontSize: SIZES.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: SIZES.font,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary,
    textAlign: 'center',
  },
  detailDivider: {
    width: 1,
    height: '100%',
    backgroundColor: COLORS.text.disabled,
    marginHorizontal: SIZES.padding.medium,
  },
  section: {
    marginBottom: SIZES.padding.xlarge,
    paddingHorizontal: SIZES.padding.large,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    marginBottom: SIZES.padding.medium,
  },
  priceCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius.large,
    padding: SIZES.padding.large,
    ...SHADOWS.small,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  verticalDivider: {
    width: 1,
    height: '100%',
    backgroundColor: COLORS.text.disabled,
  },
  priceLabel: {
    fontSize: SIZES.font,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    marginBottom: 4,
    textAlign: 'center',
  },
  price: {
    fontSize: SIZES.large,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    textAlign: 'center',
  },
  bulkPricingCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius.large,
    padding: SIZES.padding.large,
    marginTop: SIZES.padding.medium,
    ...SHADOWS.small,
  },
  bulkPricingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.padding.medium,
  },
  bulkPricingTitle: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary,
    marginLeft: SIZES.padding.small,
  },
  bulkPricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.padding.small,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.text.disabled + '20',
  },
  bulkQuantity: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bulkPricingText: {
    fontSize: SIZES.font,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    marginLeft: SIZES.padding.small,
  },
  bulkPricingPrice: {
    fontSize: SIZES.font,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
  },
  infoCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius.large,
    padding: SIZES.padding.large,
    ...SHADOWS.small,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.padding.medium,
  },
  infoText: {
    fontSize: SIZES.font,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary,
    marginLeft: SIZES.padding.medium,
    flex: 1,
  },
  bottomPadding: {
    height: 100,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.surface,
    padding: SIZES.padding.large,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.large,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius.large,
    padding: SIZES.padding.small,
    marginRight: SIZES.padding.medium,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.small,
  },
  quantityButtonDisabled: {
    backgroundColor: COLORS.text.disabled + '20',
  },
  quantityDisplay: {
    alignItems: 'center',
    paddingHorizontal: SIZES.padding.medium,
  },
  quantityText: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
  },
  moqText: {
    fontSize: SIZES.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    marginTop: 2,
  },
  actionButtons: {
    flex: 1,
    flexDirection: 'row',
  },
  actionButton: {
    flex: 1,
    height: 48,
    borderRadius: SIZES.radius.large,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: SIZES.padding.small,
    ...SHADOWS.small,
  },
  cartButton: {
    backgroundColor: COLORS.primary + '10',
  },
  cartButtonText: {
    marginLeft: SIZES.padding.small,
    fontSize: SIZES.font,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
  },
  buyButton: {
    backgroundColor: COLORS.primary,
  },
  buyButtonText: {
    fontSize: SIZES.font,
    fontFamily: FONTS.medium,
    color: COLORS.background,
  },
});

export default ProductDetailsScreen;
