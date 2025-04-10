import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Animated,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { COLORS, FONTS, SIZES, SHADOWS } from '../../constants/theme';
import { FontAwesome5 } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [loginMethod, setLoginMethod] = useState('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [isLoading, setIsLoading] = useState(false);

  const languages = [
    { id: 'english', name: 'English' },
    { id: 'hindi', name: 'हिंदी' },
    { id: 'tamil', name: 'தமிழ்' },
  ];

  const handleLogin = () => {
    setIsLoading(true);
    if (showOtp) {
      setTimeout(() => {
        setIsLoading(false);
        navigation.replace('MainApp');
      }, 1500);
    } else {
      setTimeout(() => {
        setIsLoading(false);
        setShowOtp(true);
      }, 1000);
    }
  };

  const renderLoginForm = () => {
    switch (loginMethod) {
      case 'phone':
        return (
          <View style={styles.formGroup}>
            <TextInput
              mode="outlined"
              label="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              left={<TextInput.Affix text="+91" />}
              style={styles.input}
              outlineColor={COLORS.text.disabled}
              activeOutlineColor={COLORS.primary}
              theme={{ roundness: SIZES.radius.medium }}
            />
            {showOtp && (
              <Animated.View 
                entering={Animated.FadeInDown}
                style={styles.otpContainer}
              >
                <TextInput
                  mode="outlined"
                  label="Enter OTP"
                  value={otp}
                  onChangeText={setOtp}
                  keyboardType="number-pad"
                  style={styles.input}
                  outlineColor={COLORS.text.disabled}
                  activeOutlineColor={COLORS.primary}
                  theme={{ roundness: SIZES.radius.medium }}
                  maxLength={6}
                />
                <Text style={styles.otpHint}>OTP sent to +91 {phoneNumber}</Text>
              </Animated.View>
            )}
          </View>
        );
      case 'gst':
        return (
          <View style={styles.formGroup}>
            <TextInput
              mode="outlined"
              label="GST Number"
              value={gstNumber}
              onChangeText={setGstNumber}
              style={styles.input}
              outlineColor={COLORS.text.disabled}
              activeOutlineColor={COLORS.primary}
              theme={{ roundness: SIZES.radius.medium }}
            />
          </View>
        );
      case 'email':
        return (
          <View style={styles.formGroup}>
            <TextInput
              mode="outlined"
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              style={styles.input}
              outlineColor={COLORS.text.disabled}
              activeOutlineColor={COLORS.primary}
              theme={{ roundness: SIZES.radius.medium }}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Logo and Welcome Text */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg',
              }}
              style={styles.logo}
            />
            <View style={styles.logoOverlay} />
          </View>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.subText}>
            Login to access your wholesale medicine account
          </Text>
        </View>

        {/* Login Method Selector */}
        <View style={styles.methodSelector}>
          {['phone', 'gst', 'email'].map((method) => (
            <TouchableOpacity
              key={method}
              style={[
                styles.methodOption,
                loginMethod === method && styles.methodOptionActive,
              ]}
              onPress={() => {
                setLoginMethod(method);
                setShowOtp(false);
              }}>
              <FontAwesome5
                name={
                  method === 'phone'
                    ? 'phone'
                    : method === 'gst'
                    ? 'building'
                    : 'envelope'
                }
                size={20}
                color={
                  loginMethod === method
                    ? COLORS.primary
                    : COLORS.text.secondary
                }
              />
              <Text
                style={[
                  styles.methodText,
                  loginMethod === method && styles.methodTextActive,
                ]}>
                {method.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Login Form */}
        <View style={styles.formContainer}>{renderLoginForm()}</View>

        {/* Language Selector */}
        <View style={styles.languageContainer}>
          <Text style={styles.languageLabel}>Select Language:</Text>
          <View style={styles.languageOptions}>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.id}
                style={[
                  styles.languageOption,
                  selectedLanguage === lang.id && styles.languageOptionActive,
                ]}
                onPress={() => setSelectedLanguage(lang.id)}>
                <Text
                  style={[
                    styles.languageText,
                    selectedLanguage === lang.id && styles.languageTextActive,
                  ]}>
                  {lang.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={[
            styles.loginButton,
            isLoading && styles.loginButtonLoading,
          ]}
          onPress={handleLogin}
          disabled={isLoading}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <FontAwesome5 name="spinner" size={24} color={COLORS.background} />
            </View>
          ) : (
            <Text style={styles.loginButtonText}>
              {showOtp ? 'Verify & Login' : 'Continue'}
            </Text>
          )}
        </TouchableOpacity>

        {/* Terms and Privacy */}
        <Text style={styles.termsText}>
          By continuing, you agree to our{' '}
          <Text style={styles.linkText}>Terms of Service</Text> and{' '}
          <Text style={styles.linkText}>Privacy Policy</Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: SIZES.padding.xlarge,
  },
  header: {
    alignItems: 'center',
    marginVertical: SIZES.padding.xlarge,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    ...SHADOWS.large,
    marginBottom: SIZES.padding.large,
    position: 'relative',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  logoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
  },
  welcomeText: {
    fontSize: SIZES.xlarge,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    marginBottom: SIZES.padding.small,
  },
  subText: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
  methodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius.large,
    padding: SIZES.padding.small,
    marginBottom: SIZES.padding.large,
    ...SHADOWS.small,
  },
  methodOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.padding.medium,
    borderRadius: SIZES.radius.medium,
  },
  methodOptionActive: {
    backgroundColor: COLORS.background,
    ...SHADOWS.small,
  },
  methodText: {
    marginLeft: SIZES.padding.small,
    fontSize: SIZES.font,
    fontFamily: FONTS.medium,
    color: COLORS.text.secondary,
  },
  methodTextActive: {
    color: COLORS.primary,
  },
  formContainer: {
    marginBottom: SIZES.padding.large,
  },
  formGroup: {
    marginBottom: SIZES.padding.medium,
  },
  input: {
    backgroundColor: COLORS.background,
    marginBottom: SIZES.padding.small,
  },
  otpContainer: {
    marginTop: SIZES.padding.medium,
  },
  otpHint: {
    fontSize: SIZES.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    marginTop: SIZES.padding.small,
  },
  languageContainer: {
    marginBottom: SIZES.padding.xlarge,
  },
  languageLabel: {
    fontSize: SIZES.font,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary,
    marginBottom: SIZES.padding.small,
  },
  languageOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SIZES.padding.small,
  },
  languageOption: {
    paddingHorizontal: SIZES.padding.medium,
    paddingVertical: SIZES.padding.small,
    borderRadius: SIZES.radius.medium,
    borderWidth: 1,
    borderColor: COLORS.text.disabled,
    marginRight: SIZES.padding.small,
    marginBottom: SIZES.padding.small,
  },
  languageOptionActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  languageText: {
    fontSize: SIZES.font,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary,
  },
  languageTextActive: {
    color: COLORS.background,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    padding: SIZES.padding.large,
    borderRadius: SIZES.radius.large,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.padding.large,
    ...SHADOWS.medium,
  },
  loginButtonLoading: {
    opacity: 0.8,
  },
  loginButtonText: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.medium,
    color: COLORS.background,
  },
  loadingContainer: {
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  termsText: {
    fontSize: SIZES.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
  linkText: {
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
