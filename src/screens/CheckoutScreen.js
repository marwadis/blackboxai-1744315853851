import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../constants/theme';

const CheckoutScreen = ({ navigation }) => {
  const [activeStep, setActiveStep] = useState(1); // 1: Address, 2: Payment, 3: Review
  const [deliveryAddress, setDeliveryAddress] = useState({
    storeName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    gstNumber: '',
    contactPerson: '',
    phone: '',
  });
  const [selectedPayment, setSelectedPayment] = useState('upi');

  const paymentMethods = [
    { id: 'upi', name: 'UPI Payment', icon: 'mobile-alt' },
    { id: 'netbanking', name: 'Net Banking', icon: 'university' },
    { id: 'cod', name: 'Cash on Delivery', icon: 'money-bill-alt' },
  ];

  const validateAddress = () => {
    const required = ['storeName', 'address', 'city', 'state', 'pincode', 'phone'];
    const missing = required.filter(field => !deliveryAddress[field]);
    
    if (missing.length > 0) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (activeStep === 1 && !validateAddress()) return;
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    } else {
      // Place order logic here
      Alert.alert(
        'Order Placed Successfully',
        'Your order has been placed successfully. You will receive a confirmation shortly.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Orders'),
          },
        ]
      );
    }
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {[1, 2, 3].map((step) => (
        <View key={step} style={styles.stepContainer}>
          <View
            style={[
              styles.stepCircle,
              activeStep >= step && styles.activeStepCircle,
            ]}>
            <Text
              style={[
                styles.stepNumber,
                activeStep >= step && styles.activeStepNumber,
              ]}>
              {step}
            </Text>
          </View>
          <Text style={styles.stepText}>
            {step === 1 ? 'Address' : step === 2 ? 'Payment' : 'Review'}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderAddressForm = () => (
    <View style={styles.formContainer}>
      <TextInput
        mode="outlined"
        label="Store Name *"
        value={deliveryAddress.storeName}
        onChangeText={(text) =>
          setDeliveryAddress({ ...deliveryAddress, storeName: text })
        }
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Complete Address *"
        value={deliveryAddress.address}
        onChangeText={(text) =>
          setDeliveryAddress({ ...deliveryAddress, address: text })
        }
        multiline
        numberOfLines={3}
        style={styles.input}
      />
      <View style={styles.row}>
        <TextInput
          mode="outlined"
          label="City *"
          value={deliveryAddress.city}
          onChangeText={(text) =>
            setDeliveryAddress({ ...deliveryAddress, city: text })
          }
          style={[styles.input, styles.halfInput]}
        />
        <TextInput
          mode="outlined"
          label="State *"
          value={deliveryAddress.state}
          onChangeText={(text) =>
            setDeliveryAddress({ ...deliveryAddress, state: text })
          }
          style={[styles.input, styles.halfInput]}
        />
      </View>
      <TextInput
        mode="outlined"
        label="PIN Code *"
        value={deliveryAddress.pincode}
        onChangeText={(text) =>
          setDeliveryAddress({ ...deliveryAddress, pincode: text })
        }
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="GST Number"
        value={deliveryAddress.gstNumber}
        onChangeText={(text) =>
          setDeliveryAddress({ ...deliveryAddress, gstNumber: text })
        }
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Contact Person Name"
        value={deliveryAddress.contactPerson}
        onChangeText={(text) =>
          setDeliveryAddress({ ...deliveryAddress, contactPerson: text })
        }
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Phone Number *"
        value={deliveryAddress.phone}
        onChangeText={(text) =>
          setDeliveryAddress({ ...deliveryAddress, phone: text })
        }
        keyboardType="phone-pad"
        style={styles.input}
      />
    </View>
  );

  const renderPaymentMethods = () => (
    <View style={styles.paymentContainer}>
      {paymentMethods.map((method) => (
        <TouchableOpacity
          key={method.id}
          style={[
            styles.paymentMethod,
            selectedPayment === method.id && styles.selectedPayment,
          ]}
          onPress={() => setSelectedPayment(method.id)}>
          <FontAwesome5
            name={method.icon}
            size={24}
            color={
              selectedPayment === method.id
                ? COLORS.primary
                : COLORS.text.secondary
            }
          />
          <Text
            style={[
              styles.paymentMethodText,
              selectedPayment === method.id && styles.selectedPaymentText,
            ]}>
            {method.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderOrderSummary = () => (
    <View style={styles.summaryContainer}>
      <View style={styles.summarySection}>
        <Text style={styles.summaryTitle}>Delivery Address</Text>
        <Text style={styles.summaryText}>{deliveryAddress.storeName}</Text>
        <Text style={styles.summaryText}>{deliveryAddress.address}</Text>
        <Text style={styles.summaryText}>
          {deliveryAddress.city}, {deliveryAddress.state} - {deliveryAddress.pincode}
        </Text>
        <Text style={styles.summaryText}>Phone: {deliveryAddress.phone}</Text>
      </View>

      <View style={styles.summarySection}>
        <Text style={styles.summaryTitle}>Payment Method</Text>
        <Text style={styles.summaryText}>
          {paymentMethods.find((method) => method.id === selectedPayment)?.name}
        </Text>
      </View>

      <View style={styles.summarySection}>
        <Text style={styles.summaryTitle}>Order Details</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>₹2,500.00</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>GST (12%)</Text>
          <Text style={styles.summaryValue}>₹300.00</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Shipping</Text>
          <Text style={styles.summaryValue}>Free</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>₹2,800.00</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderStepIndicator()}
      
      <ScrollView style={styles.content}>
        {activeStep === 1 && renderAddressForm()}
        {activeStep === 2 && renderPaymentMethods()}
        {activeStep === 3 && renderOrderSummary()}
      </ScrollView>

      <View style={styles.footer}>
        {activeStep > 1 && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setActiveStep(activeStep - 1)}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {activeStep === 3 ? 'Place Order' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: SIZES.padding.large,
    backgroundColor: COLORS.surface,
  },
  stepContainer: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.surface,
    borderWidth: 2,
    borderColor: COLORS.text.disabled,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.padding.small,
  },
  activeStepCircle: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  stepNumber: {
    fontSize: SIZES.font,
    fontFamily: FONTS.medium,
    color: COLORS.text.disabled,
  },
  activeStepNumber: {
    color: COLORS.background,
  },
  stepText: {
    fontSize: SIZES.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
  },
  content: {
    flex: 1,
    padding: SIZES.padding.large,
  },
  formContainer: {
    marginBottom: SIZES.padding.large,
  },
  input: {
    marginBottom: SIZES.padding.medium,
    backgroundColor: COLORS.background,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  paymentContainer: {
    marginBottom: SIZES.padding.large,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.padding.large,
    marginBottom: SIZES.padding.medium,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius.medium,
    borderWidth: 1,
    borderColor: COLORS.surface,
  },
  selectedPayment: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.background,
  },
  paymentMethodText: {
    marginLeft: SIZES.padding.large,
    fontSize: SIZES.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.secondary,
  },
  selectedPaymentText: {
    color: COLORS.primary,
  },
  summaryContainer: {
    marginBottom: SIZES.padding.large,
  },
  summarySection: {
    marginBottom: SIZES.padding.large,
    padding: SIZES.padding.large,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius.medium,
  },
  summaryTitle: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    marginBottom: SIZES.padding.medium,
  },
  summaryText: {
    fontSize: SIZES.font,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    marginBottom: SIZES.padding.small,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.padding.small,
  },
  summaryLabel: {
    fontSize: SIZES.font,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
  },
  summaryValue: {
    fontSize: SIZES.font,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary,
  },
  totalRow: {
    marginTop: SIZES.padding.medium,
    paddingTop: SIZES.padding.medium,
    borderTopWidth: 1,
    borderTopColor: COLORS.text.disabled,
  },
  totalLabel: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
  },
  totalValue: {
    fontSize: SIZES.large,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
  },
  footer: {
    flexDirection: 'row',
    padding: SIZES.padding.large,
    borderTopWidth: 1,
    borderTopColor: COLORS.surface,
    backgroundColor: COLORS.background,
  },
  backButton: {
    flex: 1,
    padding: SIZES.padding.large,
    marginRight: SIZES.padding.medium,
    borderRadius: SIZES.radius.medium,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary,
  },
  nextButton: {
    flex: 2,
    padding: SIZES.padding.large,
    borderRadius: SIZES.radius.medium,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.medium,
    color: COLORS.background,
  },
});

export default CheckoutScreen;
