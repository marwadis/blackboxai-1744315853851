import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../constants/theme';

// Sample orders data
const orders = [
  {
    id: 'ORD001',
    date: '2024-01-15',
    status: 'delivered',
    items: [
      {
        name: 'Paracetamol 500mg',
        quantity: 100,
        price: 250,
        image: 'https://images.pexels.com/photos/139398/thermometer-headache-pain-pills-139398.jpeg',
      },
      {
        name: 'Amoxicillin 250mg',
        quantity: 50,
        price: 450,
        image: 'https://images.pexels.com/photos/3683098/pexels-photo-3683098.jpeg',
      },
    ],
    total: 700,
    deliveryAddress: '123 Medical Store, Healthcare Street, City - 123456',
  },
  {
    id: 'ORD002',
    date: '2024-01-18',
    status: 'processing',
    items: [
      {
        name: 'Vitamin C 500mg',
        quantity: 200,
        price: 600,
        image: 'https://images.pexels.com/photos/3683098/pexels-photo-3683098.jpeg',
      },
    ],
    total: 600,
    deliveryAddress: '456 Pharmacy Lane, Medical Complex, City - 789012',
  },
];

const OrdersScreen = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [expandedOrder, setExpandedOrder] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return COLORS.success;
      case 'processing':
        return COLORS.warning;
      case 'cancelled':
        return COLORS.error;
      default:
        return COLORS.text.secondary;
    }
  };

  const renderOrderStatus = (status) => {
    const statusSteps = ['confirmed', 'processing', 'shipped', 'delivered'];
    const currentStep = statusSteps.indexOf(status);

    return (
      <View style={styles.statusContainer}>
        {statusSteps.map((step, index) => (
          <View key={step} style={styles.statusStep}>
            <View
              style={[
                styles.statusDot,
                {
                  backgroundColor:
                    index <= currentStep
                      ? COLORS.primary
                      : COLORS.text.disabled,
                },
              ]}
            />
            <Text
              style={[
                styles.statusText,
                {
                  color:
                    index <= currentStep
                      ? COLORS.text.primary
                      : COLORS.text.disabled,
                },
              ]}>
              {step.charAt(0).toUpperCase() + step.slice(1)}
            </Text>
            {index < statusSteps.length - 1 && (
              <View
                style={[
                  styles.statusLine,
                  {
                    backgroundColor:
                      index < currentStep
                        ? COLORS.primary
                        : COLORS.text.disabled,
                  },
                ]}
              />
            )}
          </View>
        ))}
      </View>
    );
  };

  const renderOrderCard = (order) => {
    const isExpanded = expandedOrder === order.id;

    return (
      <TouchableOpacity
        key={order.id}
        style={styles.orderCard}
        onPress={() => setExpandedOrder(isExpanded ? null : order.id)}>
        <View style={styles.orderHeader}>
          <View>
            <Text style={styles.orderId}>Order #{order.id}</Text>
            <Text style={styles.orderDate}>{order.date}</Text>
          </View>
          <View style={styles.orderStatusBadge}>
            <Text
              style={[
                styles.orderStatusText,
                { color: getStatusColor(order.status) },
              ]}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Text>
          </View>
        </View>

        <View style={styles.orderSummary}>
          <Text style={styles.itemCount}>
            {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
          </Text>
          <Text style={styles.orderTotal}>₹{order.total}</Text>
        </View>

        {isExpanded && (
          <View style={styles.expandedContent}>
            {renderOrderStatus(order.status)}

            <View style={styles.itemsList}>
              {order.items.map((item, index) => (
                <View key={index} style={styles.orderItem}>
                  <Image source={{ uri: item.image }} style={styles.itemImage} />
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemQuantity}>
                      Quantity: {item.quantity}
                    </Text>
                    <Text style={styles.itemPrice}>₹{item.price}</Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.deliveryInfo}>
              <Text style={styles.deliveryTitle}>Delivery Address</Text>
              <Text style={styles.deliveryAddress}>{order.deliveryAddress}</Text>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton}>
                <FontAwesome5 name="file-invoice" size={16} color={COLORS.primary} />
                <Text style={styles.actionButtonText}>Invoice</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <FontAwesome5 name="redo" size={16} color={COLORS.primary} />
                <Text style={styles.actionButtonText}>Reorder</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <FontAwesome5 name="headset" size={16} color={COLORS.primary} />
                <Text style={styles.actionButtonText}>Support</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <TouchableOpacity
          style={styles.expandButton}
          onPress={() => setExpandedOrder(isExpanded ? null : order.id)}>
          <FontAwesome5
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={16}
            color={COLORS.text.secondary}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'active' && styles.activeTab]}
          onPress={() => setActiveTab('active')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'active' && styles.activeTabText,
            ]}>
            Active Orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'delivered' && styles.activeTab]}
          onPress={() => setActiveTab('delivered')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'delivered' && styles.activeTabText,
            ]}>
            Delivered
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'cancelled' && styles.activeTab]}
          onPress={() => setActiveTab('cancelled')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'cancelled' && styles.activeTabText,
            ]}>
            Cancelled
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.ordersList}>
        {orders.map(renderOrderCard)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  tabContainer: {
    flexDirection: 'row',
    padding: SIZES.padding.medium,
    backgroundColor: COLORS.surface,
  },
  tab: {
    flex: 1,
    paddingVertical: SIZES.padding.medium,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: SIZES.font,
    fontFamily: FONTS.medium,
    color: COLORS.text.secondary,
  },
  activeTabText: {
    color: COLORS.primary,
  },
  ordersList: {
    flex: 1,
    padding: SIZES.padding.medium,
  },
  orderCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius.medium,
    marginBottom: SIZES.padding.medium,
    padding: SIZES.padding.large,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding.medium,
  },
  orderId: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
  },
  orderDate: {
    fontSize: SIZES.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    marginTop: 2,
  },
  orderStatusBadge: {
    paddingHorizontal: SIZES.padding.medium,
    paddingVertical: SIZES.padding.small,
    borderRadius: SIZES.radius.small,
    backgroundColor: COLORS.background,
  },
  orderStatusText: {
    fontSize: SIZES.small,
    fontFamily: FONTS.medium,
  },
  orderSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemCount: {
    fontSize: SIZES.font,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
  },
  orderTotal: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
  },
  expandedContent: {
    marginTop: SIZES.padding.large,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding.large,
  },
  statusStep: {
    alignItems: 'center',
    flex: 1,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 4,
  },
  statusText: {
    fontSize: SIZES.small,
    fontFamily: FONTS.regular,
    textAlign: 'center',
  },
  statusLine: {
    position: 'absolute',
    top: 6,
    left: '50%',
    right: -'50%',
    height: 2,
  },
  itemsList: {
    marginBottom: SIZES.padding.large,
  },
  orderItem: {
    flexDirection: 'row',
    marginBottom: SIZES.padding.medium,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: SIZES.radius.medium,
    marginRight: SIZES.padding.medium,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: SIZES.font,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  itemQuantity: {
    fontSize: SIZES.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    marginBottom: 2,
  },
  itemPrice: {
    fontSize: SIZES.font,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
  },
  deliveryInfo: {
    marginBottom: SIZES.padding.large,
  },
  deliveryTitle: {
    fontSize: SIZES.font,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary,
    marginBottom: SIZES.padding.small,
  },
  deliveryAddress: {
    fontSize: SIZES.font,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: COLORS.text.disabled,
    paddingTop: SIZES.padding.large,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtonText: {
    marginLeft: SIZES.padding.small,
    fontSize: SIZES.font,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
  },
  expandButton: {
    alignItems: 'center',
    marginTop: SIZES.padding.medium,
  },
});

export default OrdersScreen;
