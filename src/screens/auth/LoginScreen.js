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
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { FontAwesome5 } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [loginMethod, setLoginMethod] = useState('phone'); // 'phone', 'gst', 'email'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('english');

  const languages = [
    { id: 'english', name: 'English' },
    { id: 'hindi', name: 'हिंदी' },
    { id: 'tamil', name: 'தமிழ்' },
  ];

  const handleLogin = () => {
    if (showOtp) {
      // Verify OTP and navigate to main app
      navigation.replace('MainApp');
    } else {
      // Send OTP
      setShowOtp(true);
    }
  };

  const renderLoginForm = () => {
    switch (loginMethod) {
      case 'phone':
        return (
          <>
            <TextInput
              mode="outlined"
              label="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              left={<TextInput.Affix text="+91" />}
              style={styles.input}
              outlineColor={COLORS.text.secondary}
              activeOutlineColor={COLORS.primary}
            />
            {showOtp && (
              <TextInput
                mode="outlined"
                label="Enter OTP"
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                style={styles.input}
                outlineColor={COLORS.text.secondary}
                activeOutlineColor={COLORS.primary}
                maxLength={6}
              />
            )}
          </>
        );
      case 'gst':
        return (
          <TextInput
            mode="outlined"
            label="GST Number"
            value={gstNumber}
            onChangeText={setGstNumber}
            style={styles.input}
            outlineColor={COLORS.text.secondary}
            activeOutlineColor={COLORS.primary}
          />
        );
      case 'email':
        return (
          <TextInput
            mode="outlined"
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
            outlineColor={COLORS.text.secondary}
            activeOutlineColor={COLORS.primary}
          />
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
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg',
            }}
            style={styles.logo}
          />
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.subText}>
            Login to access your wholesale medicine account
          </Text>
        </View>

        {/* Login Method Selector */}
        <View style={styles.methodSelector}>
          <TouchableOpacity
            style={[
              styles.methodOption,
              loginMethod === 'phone' && styles.methodOptionActive,
            ]}
            onPress={() => setLoginMethod('phone')}>
            <FontAwesome5
              name="phone"
              size={20}
              color={loginMethod === 'phone' ? COLORS.primary : COLORS.text.secondary}
            />
            <Text
              style={[
                styles.methodText,
                loginMethod === 'phone' && styles.methodTextActive,
              ]}>
              Phone
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.methodOption,
              loginMethod === 'gst' && styles.methodOptionActive,
            ]}
            onPress={() => setLoginMethod('gst')}>
            <FontAwesome5
              name="building"
              size={20}
              color={loginMethod === 'gst' ? COLORS.primary : COLORS.text.secondary}
            />
            <Text
              style={[
                styles.methodText,
                loginMethod === 'gst' && styles.methodTextActive,
              ]}>
              GST
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.methodOption,
              loginMethod === 'email' && styles.methodOptionActive,
            ]}
            onPress={() => setLoginMethod('email')}>
            <FontAwesome5
              name="envelope"
              size={20}
              color={loginMethod === 'email' ? COLORS.primary : COLORS.text.secondary}
            />
            <Text
              style={[
                styles.methodText,
                loginMethod === 'email' && styles.methodTextActive,
              ]}>
              Email
            </Text>
          </TouchableOpacity>
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
        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.loginButton}
          contentStyle={styles.loginButtonContent}
          labelStyle={styles.loginButtonText}>
          {showOtp ? 'Verify & Login' : 'Continue'}
        </Button>

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
    padding: SIZES.padding.large,
  },
  header: {
    alignItems: 'center',
    marginVertical: SIZES.padding.xlarge,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: SIZES.padding.large,
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
    marginBottom: SIZES.padding.large,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius.large,
    padding: SIZES.padding.small,
  },
  methodOption: {
    flex: 1,
    alignItems: 'center',
    padding: SIZES.padding.medium,
    borderRadius: SIZES.radius.medium,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  methodOptionActive: {
    backgroundColor: COLORS.background,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
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
  input: {
    marginBottom: SIZES.padding.medium,
    backgroundColor: COLORS.background,
  },
  languageContainer: {
    marginBottom: SIZES.padding.large,
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
    marginBottom: SIZES.padding.large,
    borderRadius: SIZES.radius.medium,
    backgroundColor: COLORS.primary,
  },
  loginButtonContent: {
    height: 48,
  },
  loginButtonText: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.medium,
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
