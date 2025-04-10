import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  TextInput,
  Animated,
} from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';
import { FontAwesome5 } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const scrollY = new Animated.Value(0);

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [200, 120],
    extrapolate: 'clamp',
  });

  const categories = [
    { id: '1', name: 'OTC Medicines', icon: 'pills' },
    { id: '2', name: 'Prescription', icon: 'file-medical' },
    { id: '3', name: 'Surgical', icon: 'stethoscope' },
    { id: '4', name: 'Wellness', icon: 'heart' },
    { id: '5', name: 'Diagnostic', icon: 'microscope' },
    { id: '6', name: 'More', icon: 'ellipsis-h' },
  ];

  const topBrands = [
    {
      id: '1',
      name: 'Sun Pharma',
      image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg',
      discount: '20% OFF',
    },
    {
      id: '2',
      name: 'Cipla',
      image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg',
      discount: '15% OFF',
    },
    {
      id: '3',
      name: 'Dr. Reddy\'s',
      image: 'https://images.pexels.com/photos/3943882/pexels-photo-3943882.jpeg',
      discount: '25% OFF',
    },
  ];

  const deals = [
    {
      id: '1',
      title: 'Bulk Order Special',
      description: 'Get additional 10% off on orders above ₹10,000',
      backgroundColor: '#E8F5E9',
      icon: 'percentage',
    },
    {
      id: '2',
      title: 'First Order Discount',
      description: 'Flat 20% off on your first order',
      backgroundColor: '#E3F2FD',
      icon: 'gift',
    },
  ];

  const renderHeader = () => (
    <Animated.View style={[styles.header, { height: headerHeight }]}>
      <View style={styles.headerContent}>
        <View style={styles.userInfo}>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.userName}>Pharmacy Store</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <FontAwesome5 name="bell" size={24} color={COLORS.primary} />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <FontAwesome5 name="search" size={20} color={COLORS.text.secondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search medicines, brands, categories..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={COLORS.text.secondary}
        />
      </View>
    </Animated.View>
  );

  const renderCategories = () => (
    <View style={styles.categoriesSection}>
      <Text style={styles.sectionTitle}>Categories</Text>
      <View style={styles.categoriesGrid}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryCard}
            onPress={() => navigation.navigate('Categories')}
          >
            <View style={styles.categoryIcon}>
              <FontAwesome5 name={category.icon} size={24} color={COLORS.primary} />
            </View>
            <Text style={styles.categoryName}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderTopBrands = () => (
    <View style={styles.brandsSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Top Brands</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.brandsScrollContent}
      >
        {topBrands.map((brand) => (
          <TouchableOpacity key={brand.id} style={styles.brandCard}>
            <Image source={{ uri: brand.image }} style={styles.brandImage} />
            <View style={styles.brandInfo}>
              <Text style={styles.brandName}>{brand.name}</Text>
              <Text style={styles.brandDiscount}>{brand.discount}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderDeals = () => (
    <View style={styles.dealsSection}>
      <Text style={styles.sectionTitle}>Special Deals</Text>
      {deals.map((deal) => (
        <TouchableOpacity
          key={deal.id}
          style={[styles.dealCard, { backgroundColor: deal.backgroundColor }]}
        >
          <View style={styles.dealContent}>
            <View>
              <Text style={styles.dealTitle}>{deal.title}</Text>
              <Text style={styles.dealDescription}>{deal.description}</Text>
            </View>
            <View style={styles.dealIcon}>
              <FontAwesome5 name={deal.icon} size={24} color={COLORS.primary} />
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.content}>
          {renderCategories()}
          {renderTopBrands()}
          {renderDeals()}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.background,
    paddingHorizontal: SIZES.padding.large,
    paddingTop: SIZES.padding.xlarge,
    ...SHADOWS.medium,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding.large,
  },
  userInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
  },
  userName: {
    fontSize: SIZES.xlarge,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  notificationBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.error,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius.large,
    paddingHorizontal: SIZES.padding.medium,
    marginBottom: SIZES.padding.medium,
  },
  searchInput: {
    flex: 1,
    height: 48,
    marginLeft: SIZES.padding.medium,
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary,
  },
  content: {
    paddingTop: SIZES.padding.large,
  },
  categoriesSection: {
    paddingHorizontal: SIZES.padding.large,
    marginBottom: SIZES.padding.xlarge,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    marginBottom: SIZES.padding.large,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: (width - SIZES.padding.large * 4) / 3,
    alignItems: 'center',
    marginBottom: SIZES.padding.large,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.padding.small,
    ...SHADOWS.small,
  },
  categoryName: {
    fontSize: SIZES.font,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary,
    textAlign: 'center',
  },
  brandsSection: {
    marginBottom: SIZES.padding.xlarge,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding.large,
    marginBottom: SIZES.padding.large,
  },
  seeAllText: {
    fontSize: SIZES.font,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
  },
  brandsScrollContent: {
    paddingHorizontal: SIZES.padding.large,
  },
  brandCard: {
    width: 160,
    marginRight: SIZES.padding.large,
    borderRadius: SIZES.radius.large,
    backgroundColor: COLORS.surface,
    overflow: 'hidden',
    ...SHADOWS.small,
  },
  brandImage: {
    width: '100%',
    height: 120,
  },
  brandInfo: {
    padding: SIZES.padding.medium,
  },
  brandName: {
    fontSize: SIZES.font,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary,
    marginBottom: SIZES.padding.small,
  },
  brandDiscount: {
    fontSize: SIZES.small,
    fontFamily: FONTS.bold,
    color: COLORS.secondary,
  },
  dealsSection: {
    paddingHorizontal: SIZES.padding.large,
    marginBottom: SIZES.padding.xlarge,
  },
  dealCard: {
    borderRadius: SIZES.radius.large,
    marginBottom: SIZES.padding.medium,
    padding: SIZES.padding.large,
  },
  dealContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dealTitle: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    marginBottom: SIZES.padding.small,
  },
  dealDescription: {
    fontSize: SIZES.font,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    maxWidth: '80%',
  },
  dealIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
});

export default HomeScreen;
