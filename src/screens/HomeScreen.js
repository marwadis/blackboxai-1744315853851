import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to MedB2B</Text>
          <Text style={styles.subtitle}>Your trusted wholesale medicine app</Text>
        </View>

        {/* Banners */}
        <View style={styles.banners}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/4041450/pexels-photo-4041450.jpeg' }}
            style={styles.bannerImage}
          />
          <Image
            source={{ uri: 'https://images.pexels.com/photos/4041451/pexels-photo-4041451.jpeg' }}
            style={styles.bannerImage}
          />
        </View>

        {/* Quick Links */}
        <View style={styles.quickLinks}>
          <Text style={styles.quickLinkTitle}>Quick Links</Text>
          <View style={styles.linkContainer}>
            <Text style={styles.link}>OTC Medicines</Text>
            <Text style={styles.link}>Prescription Drugs</Text>
            <Text style={styles.link}>Surgical Items</Text>
            <Text style={styles.link}>Wellness & Supplements</Text>
            <Text style={styles.link}>Diagnostic Kits</Text>
          </View>
        </View>

        {/* Featured Sections */}
        <View style={styles.featuredSections}>
          <Text style={styles.sectionTitle}>Top Brands</Text>
          {/* Carousel or grid of top brands can be implemented here */}
          <Text style={styles.sectionTitle}>Best Deals</Text>
          {/* Carousel or grid of best deals can be implemented here */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SIZES.padding.large,
  },
  header: {
    alignItems: 'center',
    marginBottom: SIZES.padding.large,
  },
  title: {
    fontSize: SIZES.xlarge,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
  },
  banners: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.padding.large,
  },
  bannerImage: {
    width: '48%',
    height: 120,
    borderRadius: SIZES.radius.medium,
  },
  quickLinks: {
    marginBottom: SIZES.padding.large,
  },
  quickLinkTitle: {
    fontSize: SIZES.large,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    marginBottom: SIZES.padding.small,
  },
  linkContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  link: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
    color: COLORS.primary,
    margin: SIZES.padding.small,
  },
  featuredSections: {
    marginBottom: SIZES.padding.large,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    marginBottom: SIZES.padding.small,
  },
});

export default HomeScreen;
