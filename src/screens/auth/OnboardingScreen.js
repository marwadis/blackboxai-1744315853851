import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Dimensions, 
  TouchableOpacity, 
  Image 
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg',
    title: 'Verified Suppliers',
    description: 'Connect with trusted pharmaceutical distributors and wholesalers across India',
  },
  {
    id: '2',
    image: 'https://images.pexels.com/photos/3943882/pexels-photo-3943882.jpeg',
    title: 'Bulk Discounts',
    description: 'Get the best prices on bulk orders with exclusive wholesale rates',
  },
  {
    id: '3',
    image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg',
    title: 'Fast Delivery',
    description: 'Quick and reliable delivery to your doorstep with real-time order tracking',
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const flatListRef = useRef(null);

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex < slides.length) {
      flatListRef.current.scrollToIndex({
        index: nextSlideIndex,
        animated: true,
      });
      setCurrentSlideIndex(nextSlideIndex);
    }
  };

  const skip = () => {
    navigation.replace('Login');
  };

  const Footer = () => {
    return (
      <View style={styles.footer}>
        {/* Pagination dots */}
        <View style={styles.indicatorContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex === index && styles.activeIndicator,
              ]}
            />
          ))}
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          {currentSlideIndex === slides.length - 1 ? (
            <TouchableOpacity
              style={[styles.button, styles.buttonPrimary]}
              onPress={skip}>
              <Text style={[styles.buttonText, styles.buttonTextPrimary]}>
                Get Started
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.buttonSecondary]}
                onPress={skip}>
                <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
                  Skip
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonPrimary]}
                onPress={goToNextSlide}>
                <Text style={[styles.buttonText, styles.buttonTextPrimary]}>
                  Next
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  const Slide = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={({ item }) => <Slide item={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        keyExtractor={(item) => item.id}
      />
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  slide: {
    width,
    height,
    alignItems: 'center',
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
    marginTop: height * 0.1,
    borderRadius: SIZES.radius.xlarge,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: SIZES.padding.xlarge,
  },
  title: {
    fontSize: SIZES.xlarge,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: SIZES.padding.medium,
  },
  description: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    textAlign: 'center',
    paddingHorizontal: SIZES.padding.large,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: SIZES.padding.xlarge,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: SIZES.padding.large,
  },
  indicator: {
    height: 8,
    width: 8,
    backgroundColor: COLORS.text.disabled,
    marginHorizontal: 5,
    borderRadius: 4,
  },
  activeIndicator: {
    width: 20,
    backgroundColor: COLORS.primary,
  },
  buttonContainer: {
    marginBottom: SIZES.padding.large,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: SIZES.padding.medium,
    paddingHorizontal: SIZES.padding.xlarge,
    borderRadius: SIZES.radius.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: COLORS.primary,
    minWidth: 120,
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    minWidth: 120,
  },
  buttonText: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.medium,
  },
  buttonTextPrimary: {
    color: COLORS.background,
  },
  buttonTextSecondary: {
    color: COLORS.text.secondary,
  },
});

export default OnboardingScreen;
