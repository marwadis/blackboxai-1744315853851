import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

// Auth Screens (these will be created next)
const SplashScreen = () => null;
const OnboardingScreen = () => null;
const LoginScreen = () => null;
const HomeScreen = () => null;
const CategoryScreen = () => null;
const ProductListingScreen = () => null;
const ProductDetailsScreen = () => null;
const CartScreen = () => null;
const CheckoutScreen = () => null;
const OrdersScreen = () => null;
const ProfileScreen = () => null;

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.text.secondary,
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Categories" 
        component={CategoryScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="th-large" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Cart" 
        component={CartScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="shopping-cart" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Orders" 
        component={OrdersScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="clipboard-list" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Auth Stack */}
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      
      {/* Main App Stack */}
      <Stack.Screen name="MainApp" component={MainTabs} />
      <Stack.Screen 
        name="ProductDetails" 
        component={ProductDetailsScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen 
        name="ProductListing" 
        component={ProductListingScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen 
        name="Checkout" 
        component={CheckoutScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
