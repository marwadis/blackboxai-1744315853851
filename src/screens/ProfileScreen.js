import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../constants/theme';

const ProfileScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('english');

  const businessDetails = {
    name: 'City Medical Store',
    ownerName: 'John Doe',
    gstNumber: 'GST1234567890',
    drugLicense: 'DL-123-456-789',
    address: '123, Healthcare Street, Medical Complex, City - 400001',
    phone: '+91 9876543210',
    email: 'citymedical@example.com',
  };

  const languages = [
    { id: 'english', name: 'English' },
    { id: 'hindi', name: 'हिंदी' },
    { id: 'tamil', name: 'தமிழ்' },
  ];

  const menuItems = [
    {
      icon: 'store',
      title: 'Business Profile',
      onPress: () => Alert.alert('Business Profile', 'Edit your business details'),
    },
    {
      icon: 'file-invoice',
      title: 'Orders & Billing',
      onPress: () => navigation.navigate('Orders'),
    },
    {
      icon: 'credit-card',
      title: 'Payment Methods',
      onPress: () => Alert.alert('Payment Methods', 'Manage your payment methods'),
    },
    {
      icon: 'truck',
      title: 'Shipping Addresses',
      onPress: () => Alert.alert('Addresses', 'Manage your shipping addresses'),
    },
    {
      icon: 'file-alt',
      title: 'Documents',
      onPress: () => Alert.alert('Documents', 'View your business documents'),
    },
    {
      icon: 'headset',
      title: 'Help & Support',
      onPress: () => Alert.alert('Support', 'Contact our support team'),
    },
    {
      icon: 'shield-alt',
      title: 'Privacy & Security',
      onPress: () => Alert.alert('Privacy', 'Manage your privacy settings'),
    },
    {
      icon: 'info-circle',
      title: 'About App',
      onPress: () => Alert.alert('About', 'App version 1.0.0'),
    },
  ];

  const renderBusinessDetails = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Business Details</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => Alert.alert('Edit', 'Edit business details')}>
          <FontAwesome5 name="edit" size={16} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.businessCard}>
        <Text style={styles.businessName}>{businessDetails.name}</Text>
        <Text style={styles.businessInfo}>Owner: {businessDetails.ownerName}</Text>
        <Text style={styles.businessInfo}>GST: {businessDetails.gstNumber}</Text>
        <Text style={styles.businessInfo}>
          License: {businessDetails.drugLicense}
        </Text>
        <Text style={styles.businessInfo}>{businessDetails.address}</Text>
        <Text style={styles.businessInfo}>{businessDetails.phone}</Text>
        <Text style={styles.businessInfo}>{businessDetails.email}</Text>
      </View>
    </View>
  );

  const renderMenuItem = ({ icon, title, onPress }) => (
    <TouchableOpacity key={title} style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <FontAwesome5 name={icon} size={20} color={COLORS.primary} />
        <Text style={styles.menuItemText}>{title}</Text>
      </View>
      <FontAwesome5 name="chevron-right" size={16} color={COLORS.text.secondary} />
    </TouchableOpacity>
  );

  const renderSettings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Settings</Text>

      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <FontAwesome5 name="bell" size={20} color={COLORS.primary} />
          <Text style={styles.settingText}>Push Notifications</Text>
        </View>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
          trackColor={{ false: COLORS.text.disabled, true: COLORS.primary }}
          thumbColor={COLORS.background}
        />
      </View>

      <View style={styles.languageSelector}>
        <Text style={styles.languageTitle}>Select Language</Text>
        <View style={styles.languageOptions}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.id}
              style={[
                styles.languageOption,
                language === lang.id && styles.selectedLanguage,
              ]}
              onPress={() => setLanguage(lang.id)}>
              <Text
                style={[
                  styles.languageText,
                  language === lang.id && styles.selectedLanguageText,
                ]}>
                {lang.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderBusinessDetails()}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Menu</Text>
          {menuItems.map(renderMenuItem)}
        </View>

        {renderSettings()}

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate('Login')}>
          <FontAwesome5 name="sign-out-alt" size={20} color={COLORS.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.versionInfo}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
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
  section: {
    padding: SIZES.padding.large,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surface,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding.medium,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    marginBottom: SIZES.padding.medium,
  },
  editButton: {
    padding: SIZES.padding.small,
  },
  businessCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius.medium,
    padding: SIZES.padding.large,
  },
  businessName: {
    fontSize: SIZES.large,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    marginBottom: SIZES.padding.small,
  },
  businessInfo: {
    fontSize: SIZES.font,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    marginBottom: SIZES.padding.small,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SIZES.padding.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surface,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary,
    marginLeft: SIZES.padding.large,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SIZES.padding.large,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary,
    marginLeft: SIZES.padding.large,
  },
  languageSelector: {
    marginTop: SIZES.padding.medium,
  },
  languageTitle: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary,
    marginBottom: SIZES.padding.medium,
  },
  languageOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  languageOption: {
    paddingHorizontal: SIZES.padding.large,
    paddingVertical: SIZES.padding.medium,
    borderRadius: SIZES.radius.medium,
    borderWidth: 1,
    borderColor: COLORS.text.disabled,
    marginRight: SIZES.padding.medium,
    marginBottom: SIZES.padding.small,
  },
  selectedLanguage: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  languageText: {
    fontSize: SIZES.font,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary,
  },
  selectedLanguageText: {
    color: COLORS.background,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.padding.large,
    marginVertical: SIZES.padding.large,
    marginHorizontal: SIZES.padding.large,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius.medium,
  },
  logoutText: {
    marginLeft: SIZES.padding.medium,
    fontSize: SIZES.medium,
    fontFamily: FONTS.medium,
    color: COLORS.error,
  },
  versionInfo: {
    alignItems: 'center',
    paddingBottom: SIZES.padding.large,
  },
  versionText: {
    fontSize: SIZES.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
  },
});

export default ProfileScreen;
