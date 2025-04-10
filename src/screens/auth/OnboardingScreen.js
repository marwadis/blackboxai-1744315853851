import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity, 
  Image,
  Animated 
} from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../../constants/theme';
import { FontAwesome5 } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg',
    title: 'Verified Suppliers',
    description: 'Connect with trusted pharmaceutical distributors and wholesalers across India',
    icon: 'shield-alt'
  },
  {
    id: '2',
    image: 'https://images.pexels.com/photos/3943882/pexels-photo-3943882.jpeg',
    title: 'Bulk Discounts',
    description: 'Get the best prices on bulk orders with exclusive wholesale rates',
    icon: 'percentage'
  },
  {
    id: '3',
    image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg',
    title: 'Fast Delivery',
    description: 'Quick and reliable delivery to your doorstep with real-time order tracking',
    icon: 'shipping-fast'
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentSlideIndex(viewableItems[0]?.index || 0);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentSlideIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentSlideIndex + 1,
        animated: true,
      });
    } else {
      navigation.replace('Login');
    }
  };

  const Slide = ({ item, index }) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
    });

    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [30, 0, 30],
    });

    return (
      <View style={styles.slide}>
        <Animated.View 
          style={[
            styles.imageContainer,
            { transform: [{ scale }, { translateY }] }
          ]}
        >
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.iconOverlay}>
            <FontAwesome5 name={item.icon} size={32} color={COLORS.primary} />
          </View>
        </Animated.View>

        <Animated.View 
          style={[
            styles.textContainer,
            { transform: [{ translateY: translateY }] }
          ]}
        >
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </Animated.View>
      </View>
    );
  };

  const Pagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {slides.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1.4, 0.8],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.4, 1, 0.4],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index.toString()}
              style={[
                styles.dot,
                {
                  transform: [{ scale }],
                  opacity,
                },
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={slides}
        renderItem={({ item, index }) => <Slide item={item} index={index} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.footer}>
        <Pagination />
        
        <TouchableOpacity
          style={styles.nextButton}
          onPress={scrollTo}
          activeOpacity={0.8}
        >
          <Text style={styles.nextButtonText}>
            {currentSlideIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
          <FontAwesome5 
            name={currentSlideIndex === slides.length - 1 ? 'check' : 'arrow-right'} 
            size={16} 
            color={COLORS.background}
            style={styles.buttonIcon}
          />
        </TouchableOpacity>

        {currentSlideIndex !== slides.length - 1 && (
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => navigation.replace('Login')}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>
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
    padding: SIZES.padding.xlarge,
  },
  imageContainer: {
    width: width * 0.85,
    height: height * 0.45,
    marginTop: height * 0.08,
    borderRadius: SIZES.radius.xlarge,
    overflow: 'hidden',
    ...SHADOWS.large,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  iconOverlay: {
    position: 'absolute',
    bottom: SIZES.padding.large,
    right: SIZES.padding.large,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: SIZES.padding.xlarge * 2,
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
    lineHeight: 24,
    paddingHorizontal: SIZES.padding.large,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SIZES.padding.xlarge,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopLeftRadius: SIZES.radius.xlarge,
    borderTopRightRadius: SIZES.radius.xlarge,
    ...SHADOWS.large,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.padding.large,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginHorizontal: 4,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    padding: SIZES.padding.large,
    borderRadius: SIZES.radius.large,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.medium,
  },
  nextButtonText: {
    color: COLORS.background,
    fontSize: SIZES.medium,
    fontFamily: FONTS.medium,
    marginRight: SIZES.padding.small,
  },
  buttonIcon: {
    marginLeft: SIZES.padding.small,
  },
  skipButton: {
    position: 'absolute',
    top: -50,
    right: SIZES.padding.xlarge,
    padding: SIZES.padding.medium,
  },
  skipText: {
    color: COLORS.text.secondary,
    fontSize: SIZES.medium,
    fontFamily: FONTS.medium,
  },
});

export default OnboardingScreen;
