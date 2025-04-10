import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text, Dimensions } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const { width } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Navigate to Onboarding after 2 seconds
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={{ 
            uri: 'https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg' 
          }}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* App Name */}
      <Text style={styles.appName}>MedB2B</Text>

      {/* Tagline */}
      <Text style={styles.tagline}>India's trusted wholesale medicine app</Text>

      {/* Loading indicator or additional branding elements can be added here */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Connecting Healthcare Businesses</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.padding.large,
  },
  logoContainer: {
    width: width * 0.4,
    height: width * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.padding.xlarge,
    borderRadius: width * 0.2,
    overflow: 'hidden',
    backgroundColor: COLORS.surface,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  appName: {
    fontSize: SIZES.xlarge * 1.5,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    marginBottom: SIZES.padding.small,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: SIZES.padding.xlarge,
  },
  footer: {
    position: 'absolute',
    bottom: SIZES.padding.xlarge,
    alignItems: 'center',
  },
  footerText: {
    fontSize: SIZES.small,
    fontFamily: FONTS.light,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
});

export default SplashScreen;
