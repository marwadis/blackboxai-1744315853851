import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../constants/theme';

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
  const [viewType, setViewType] = useState('grid'); // 'grid' or 'list'
  const { category } = route.params;

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{category.name}</Text>
      <View style={styles.headerRight}>
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
    </View>
  );

  const renderProductCard = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.productCard,
        viewType === 'list' && styles.productCardList,
      ]}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
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
            {item.discount && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{item.discount} OFF</Text>
              </View>
            )}
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlatList
        data={products}
        renderItem={renderProductCard}
        keyExtractor={(item) => item.id}
        numColumns={viewType === 'grid' ? 2 : 1}
        key={viewType} // Force re-render when view type changes
        contentContainerStyle={styles.productList}
      />
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
    fontSize: SIZES.large,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewToggle: {
    padding: SIZES.padding.small,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius.medium,
  },
  productList: {
    padding: SIZES.padding.medium,
  },
  productCard: {
    flex: 1,
    margin: SIZES.padding.small,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius.medium,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  productCardList: {
    flexDirection: 'row',
    flex: 1,
    margin: SIZES.padding.small,
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: SIZES.padding.medium,
  },
  productName: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary,
    marginBottom: SIZES.padding.small / 2,
  },
  brandName: {
    fontSize: SIZES.font,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    marginBottom: SIZES.padding.small,
  },
  strengthPack: {
    flexDirection: 'row',
    marginBottom: SIZES.padding.small,
  },
  strengthText: {
    fontSize: SIZES.small,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary,
    marginRight: SIZES.padding.medium,
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
  },
  priceLabel: {
    fontSize: SIZES.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    marginBottom: 2,
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
  },
  moqContainer: {
    flex: 1,
  },
  moqLabel: {
    fontSize: SIZES.small,
    fontFamily: FONTS.medium,
    color: COLORS.text.secondary,
  },
  discountBadge: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: SIZES.padding.small,
    paddingVertical: 2,
    borderRadius: SIZES.radius.small,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  discountText: {
    fontSize: SIZES.small,
    fontFamily: FONTS.medium,
    color: COLORS.background,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.padding.medium,
    paddingVertical: SIZES.padding.small,
    borderRadius: SIZES.radius.medium,
  },
  addButtonText: {
    fontSize: SIZES.font,
    fontFamily: FONTS.medium,
    color: COLORS.background,
  },
});

export default ProductListingScreen;
