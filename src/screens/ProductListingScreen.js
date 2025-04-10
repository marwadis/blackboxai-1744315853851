import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
  Pressable,
  TextInput,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';

// Sample product data
const products = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    brand: 'Cipla',
    image: 'https://images.pexels.com/photos/139398/thermometer-headache-pain-pills-139398.jpeg',
    strength: '500mg',
    packSize: '10 tablets/strip',
    pricePerUnit: 2.5,
    boxPrice: 225,
    moq: 100,
    discount: '10%',
    expiry: '2024-12',
    stock: 1000,
  },
  {
    id: '2',
    name: 'Amoxicillin',
    brand: 'Sun Pharma',
    image: 'https://images.pexels.com/photos/3683098/pexels-photo-3683098.jpeg',
    strength: '250mg',
    packSize: '6 tablets/strip',
    pricePerUnit: 5.0,
    boxPrice: 450,
    moq: 50,
    discount: '15%',
    expiry: '2024-10',
    stock: 500,
  },
  // Add more sample products as needed
];

const ProductListingScreen = ({ route, navigation }) => {
  const [viewType, setViewType] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const { category } = route.params;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <Text style={styles.headerTitle}>{category.name}</Text>
        <TouchableOpacity
          style={styles.viewToggle}
          onPress={() => setViewType(viewType === 'grid' ? 'list' : 'grid')}
        >
          <FontAwesome5
            name={viewType === 'grid' ? 'list' : 'th'}
            size={20}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <FontAwesome5 name="search" size={18} color={COLORS.text.secondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={COLORS.text.secondary}
        />
      </View>
    </View>
  );

  const ProductCard = ({ item, index }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const itemFadeAnim = useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
      Animated.timing(itemFadeAnim, {
        toValue: 1,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }).start();
    }, []);

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
        onPress={() => navigation.navigate('ProductDetails', { product: item })}
      >
        <Animated.View
          style={[
            styles.productCard,
            viewType === 'list' && styles.productCardList,
            {
              opacity: itemFadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            {item.discount && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{item.discount} OFF</Text>
              </View>
            )}
          </View>
          <View style={styles.productInfo}>
            <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
            <Text style={styles.brandName}>{item.brand}</Text>
            <View style={styles.strengthPack}>
              <Text style={styles.strengthText}>{item.strength}</Text>
              <Text style={styles.packText}>{item.packSize}</Text>
            </View>
            <View style={styles.priceContainer}>
              <View>
                <Text style={styles.priceLabel}>Price per unit</Text>
                <Text style={styles.price}>₹{item.pricePerUnit}</Text>
              </View>
              <View>
                <Text style={styles.priceLabel}>Box price</Text>
                <Text style={styles.price}>₹{item.boxPrice}</Text>
              </View>
            </View>
            <View style={styles.bottomRow}>
              <View style={styles.moqContainer}>
                <Text style={styles.moqLabel}>MOQ: {item.moq} units</Text>
                <Text style={styles.stockText}>In Stock: {item.stock}</Text>
              </View>
              <TouchableOpacity style={styles.addButton}>
                <FontAwesome5 name="plus" size={14} color={COLORS.background} />
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <FlatList
          data={products}
          renderItem={({ item, index }) => <ProductCard item={item} index={index} />}
          keyExtractor={(item) => item.id}
          numColumns={viewType === 'grid' ? 2 : 1}
          key={viewType}
          contentContainerStyle={styles.productList}
          showsVerticalScrollIndicator={false}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SIZES.padding.large,
    backgroundColor: COLORS.background,
    ...SHADOWS.small,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding.medium,
  },
  headerTitle: {
    fontSize: SIZES.xlarge,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
  },
  viewToggle: {
    padding: SIZES.padding.medium,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius.large,
    ...SHADOWS.small,
  },
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
  productList: {
    padding: SIZES.padding.medium,
  },
  productCard: {
    flex: 1,
    margin: SIZES.padding.small,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius.large,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  productCardList: {
    flexDirection: 'row',
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
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
    paddingVertical: SIZES.padding.small / 2,
    borderRadius: SIZES.radius.large,
    ...SHADOWS.small,
  },
  discountText: {
    fontSize: SIZES.small,
    fontFamily: FONTS.bold,
    color: COLORS.background,
  },
  productInfo: {
    padding: SIZES.padding.large,
  },
  productName: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary,
    marginBottom: SIZES.padding.small,
  },
  brandName: {
    fontSize: SIZES.font,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    marginBottom: SIZES.padding.small,
  },
  strengthPack: {
    flexDirection: 'row',
    marginBottom: SIZES.padding.medium,
  },
  strengthText: {
    fontSize: SIZES.small,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary,
    marginRight: SIZES.padding.medium,
    backgroundColor: COLORS.primary + '10',
    paddingHorizontal: SIZES.padding.small,
    paddingVertical: 2,
    borderRadius: SIZES.radius.small,
  },
  packText: {
    fontSize: SIZES.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.padding.medium,
    paddingVertical: SIZES.padding.medium,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.surface,
  },
  priceLabel: {
    fontSize: SIZES.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    marginBottom: 4,
  },
  price: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SIZES.padding.small,
  },
  moqContainer: {
    flex: 1,
  },
  moqLabel: {
    fontSize: SIZES.small,
    fontFamily: FONTS.medium,
    color: COLORS.text.secondary,
  },
  stockText: {
    fontSize: SIZES.small,
    fontFamily: FONTS.regular,
    color: COLORS.secondary,
    marginTop: 2,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.padding.medium,
    paddingVertical: SIZES.padding.small,
    borderRadius: SIZES.radius.large,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  addButtonText: {
    fontSize: SIZES.font,
    fontFamily: FONTS.medium,
    color: COLORS.background,
    marginLeft: SIZES.padding.small,
  },
});

export default ProductListingScreen;
