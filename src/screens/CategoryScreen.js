import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../constants/theme';

const categories = [
  {
    id: '1',
    name: 'Antibiotics',
    icon: 'capsules',
    count: '2,500+ items',
  },
  {
    id: '2',
    name: 'Pain Relief',
    icon: 'band-aid',
    count: '1,800+ items',
  },
  {
    id: '3',
    name: 'Cardiac Care',
    icon: 'heartbeat',
    count: '1,200+ items',
  },
  {
    id: '4',
    name: 'Diabetes Care',
    icon: 'syringe',
    count: '900+ items',
  },
  {
    id: '5',
    name: 'Respiratory',
    icon: 'lungs',
    count: '800+ items',
  },
  {
    id: '6',
    name: 'Vitamins',
    icon: 'pills',
    count: '1,500+ items',
  },
  {
    id: '7',
    name: 'Surgical',
    icon: 'stethoscope',
    count: '700+ items',
  },
  {
    id: '8',
    name: 'Ayurvedic',
    icon: 'leaf',
    count: '1,000+ items',
  },
];

const filters = {
  saltComposition: ['Paracetamol', 'Amoxicillin', 'Metformin', 'Omeprazole'],
  brands: ['Sun Pharma', 'Cipla', 'Dr. Reddy\'s', 'Mankind'],
  priceRange: ['Under ₹100', '₹100 - ₹500', '₹500 - ₹1000', 'Above ₹1000'],
  expiryWindow: ['3+ months', '6+ months', '9+ months', '12+ months'],
  availability: ['In Stock', 'Pre-order'],
  sortBy: ['Popularity', 'Price: Low to High', 'Price: High to Low', 'Expiry Date'],
};

const CategoryScreen = ({ navigation }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    saltComposition: [],
    brands: [],
    priceRange: [],
    expiryWindow: [],
    availability: [],
    sortBy: 'Popularity',
  });

  const handleCategoryPress = (category) => {
    navigation.navigate('ProductListing', { category });
  };

  const toggleFilter = (type, value) => {
    setSelectedFilters((prev) => {
      if (type === 'sortBy') {
        return { ...prev, [type]: value };
      }
      const updatedFilters = [...prev[type]];
      const index = updatedFilters.indexOf(value);
      if (index > -1) {
        updatedFilters.splice(index, 1);
      } else {
        updatedFilters.push(value);
      }
      return { ...prev, [type]: updatedFilters };
    });
  };

  const FilterModal = () => (
    <Modal
      visible={showFilters}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowFilters(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filters</Text>
            <TouchableOpacity onPress={() => setShowFilters(false)}>
              <FontAwesome5 name="times" size={20} color={COLORS.text.primary} />
            </TouchableOpacity>
          </View>

          {Object.entries(filters).map(([key, values]) => (
            <View key={key} style={styles.filterSection}>
              <Text style={styles.filterTitle}>
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
              </Text>
              <View style={styles.filterOptions}>
                {values.map((value) => (
                  <TouchableOpacity
                    key={value}
                    style={[
                      styles.filterOption,
                      key === 'sortBy'
                        ? selectedFilters[key] === value && styles.filterOptionSelected
                        : selectedFilters[key].includes(value) && styles.filterOptionSelected,
                    ]}
                    onPress={() => toggleFilter(key, value)}
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        key === 'sortBy'
                          ? selectedFilters[key] === value && styles.filterOptionTextSelected
                          : selectedFilters[key].includes(value) && styles.filterOptionTextSelected,
                      ]}
                    >
                      {value}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}

          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => setShowFilters(false)}
          >
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {/* Header with Filter Button */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <FontAwesome5 name="filter" size={18} color={COLORS.primary} />
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Categories Grid */}
      <ScrollView contentContainerStyle={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryCard}
            onPress={() => handleCategoryPress(category)}
          >
            <FontAwesome5
              name={category.icon}
              size={32}
              color={COLORS.primary}
              style={styles.categoryIcon}
            />
            <Text style={styles.categoryName}>{category.name}</Text>
            <Text style={styles.categoryCount}>{category.count}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FilterModal />
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
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.padding.small,
    borderRadius: SIZES.radius.medium,
    backgroundColor: COLORS.surface,
  },
  filterButtonText: {
    marginLeft: SIZES.padding.small,
    fontSize: SIZES.font,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
  },
  categoriesContainer: {
    padding: SIZES.padding.medium,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    padding: SIZES.padding.large,
    marginBottom: SIZES.padding.medium,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius.medium,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  categoryIcon: {
    marginBottom: SIZES.padding.medium,
  },
  categoryName: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary,
    textAlign: 'center',
    marginBottom: SIZES.padding.small,
  },
  categoryCount: {
    fontSize: SIZES.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: SIZES.radius.large,
    borderTopRightRadius: SIZES.radius.large,
    padding: SIZES.padding.large,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding.large,
  },
  modalTitle: {
    fontSize: SIZES.large,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
  },
  filterSection: {
    marginBottom: SIZES.padding.large,
  },
  filterTitle: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary,
    marginBottom: SIZES.padding.small,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterOption: {
    paddingHorizontal: SIZES.padding.medium,
    paddingVertical: SIZES.padding.small,
    borderRadius: SIZES.radius.medium,
    borderWidth: 1,
    borderColor: COLORS.text.disabled,
    marginRight: SIZES.padding.small,
    marginBottom: SIZES.padding.small,
  },
  filterOptionSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterOptionText: {
    fontSize: SIZES.font,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary,
  },
  filterOptionTextSelected: {
    color: COLORS.background,
  },
  applyButton: {
    backgroundColor: COLORS.primary,
    padding: SIZES.padding.medium,
    borderRadius: SIZES.radius.medium,
    alignItems: 'center',
    marginTop: SIZES.padding.medium,
  },
  applyButtonText: {
    color: COLORS.background,
    fontSize: SIZES.medium,
    fontFamily: FONTS.medium,
  },
});

export default CategoryScreen;
