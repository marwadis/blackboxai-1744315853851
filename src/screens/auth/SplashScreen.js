import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text, Dimensions, Animated } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../../constants/theme';

const { width } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation, fadeAnim, slideAnim]);

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }
        ]}
      >
        {/* Logo Container */}
        <View style={styles.logoContainer}>
          <Image
            source={{ 
              uri: 'https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg' 
            }}
            style={styles.logo}
            resizeMode="cover"
          />
          <View style={styles.logoOverlay} />
        </View>

        {/* Branding */}
        <View style={styles.brandingContainer}>
          <Text style={styles.appName}>MedB2B</Text>
          <Text style={styles.tagline}>India's Trusted B2B Medicine Platform</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Connecting Healthcare Businesses</Text>
          <View style={styles.pillContainer}>
            <View style={styles.pill} />
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  logoContainer: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: SIZES.radius.xlarge,
    overflow: 'hidden',
    ...SHADOWS.large,
    marginBottom: SIZES.padding.xlarge * 1.5,
    position: 'relative',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  logoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(37, 99, 235, 0.1)', // Primary color with opacity
  },
  brandingContainer: {
    alignItems: 'center',
    marginBottom: SIZES.padding.xlarge * 2,
  },
  appName: {
    fontSize: SIZES.xxlarge,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    marginBottom: SIZES.padding.small,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: SIZES.padding.xlarge * 2,
    alignItems: 'center',
  },
  footerText: {
    fontSize: SIZES.small,
    fontFamily: FONTS.light,
    color: COLORS.text.secondary,
    marginBottom: SIZES.padding.medium,
  },
  pillContainer: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.card.border,
    borderRadius: SIZES.radius.full,
    overflow: 'hidden',
  },
  pill: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius.full,
    transform: [{ scaleX: 0.3 }],
  },
});

export default SplashScreen;
