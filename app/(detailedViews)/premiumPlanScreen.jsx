// screens/(account)/premiumPlanScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import axios from 'axios';
import RazorpayCheckout from 'react-native-razorpay';
import { useAuth } from '../../context/authContext';

const API_BASE_URL = 'https://tunenest-backend.onrender.com/api/v1/subscriptions';

const PremiumPlansScreen = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuth();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/plans`);
      setPlans(res.data);
    } catch (error) {
      console.error('Error fetching plans', error);
      Alert.alert('Error', 'Could not load plans');
    } finally {
      setLoading(false);
    }
  };

  const handleRecurringSubscribe = async (plan) => {
    try {
      // Create Razorpay customer
      const { data: customerData } = await axios.post(`${API_BASE_URL}/create-customer`,
        {
          name: `${user.firstName}${user.lastName}`,
          email: user.email,
          contact: user.contact || '9999999999',
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('customer data is ', customerData)
      const { customer } = customerData;

      // Create Razorpay subscription
      const { data: subData } = await axios.post(`${API_BASE_URL}/create-subscription`,
        {
          razorpay_customer_id: customer.id,
          razorpay_plan_id: plan.razorpay_plan_id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const subscription = subData.subscription;

      // Open Razorpay Checkout
      const options = {
        key: 'rzp_test_zQMYm9zY7ExlE2',
        name: 'TuneNest',
        description: `${plan.name} Subscription`,
        subscription_id: subscription.id,
        prefill: {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          contact: user.contact || '9999999999',
        },
        theme: { color: '#2DCEEF' },
      };

      RazorpayCheckout.open(options)
        .then((data) => {
          Alert.alert('Success', `Subscription successful`);
          console.log('Payment success:', data);
        })
        .catch((err) => {
          Alert.alert('Error', `Payment failed`);
          console.error('Payment error:', err);
        });
    } catch (err) {

      console.error('❌ Subscription error:');
      console.error('Message:', err.message);
      console.error('Response Data:', err.response?.data);
      console.error('Status Code:', err.response?.status);
      Alert.alert('Error', 'Something went wrong while subscribing');
      Alert.alert('Error', 'Something went wrong while subscribing');
    }
  };

  const handleOneTimePayment = async (plan) => {
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/order`,
        { planId: plan._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { order } = data;

      const options = {
        name: 'TuneNest',
        description: `${plan.name} Plan`,
        currency: order.currency,
        amount: order.amount,
        order_id: order.id,
        key: process.env.EXPO_PUBLIC_RAZORPAY_KEY_ID,
        prefill: {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          contact: user.contact || '9999999999',
        },
        theme: { color: '#2DCEEF' },
      };

      RazorpayCheckout.open(options)
        .then(async (paymentData) => {
          await axios.post(
            `${API_BASE_URL}/verify`,
            {
              razorpay_payment_id: paymentData.razorpay_payment_id,
              razorpay_order_id: paymentData.razorpay_order_id,
              razorpay_signature: paymentData.razorpay_signature,
              planId: plan._id,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          Alert.alert('Success', 'Plan activated!');
        })
        .catch((err) => {
          Alert.alert('Payment Failed', `${err.description}`);
        });
    } catch (err) {
      console.error('One-time payment error:', err);
      Alert.alert('Error', 'Unable to start payment');
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color="#2DCEEF" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-black px-4 pt-8">
      {plans.map((plan) => (
        <View key={plan._id} className="bg-[#1c1c1c] rounded-2xl p-4 mb-6">
          <Text className="text-yellow-400 font-bold text-xl mb-1">{plan.name}</Text>
          <Text className="text-white font-bold text-base">
            ₹{plan.amount} for {plan.interval_count} {plan.interval}
          </Text>

          {(plan.features || []).map((feature, i) => (
            <Text key={i} className="text-white text-sm mb-1">
              • {feature}
            </Text>
          ))}

          <TouchableOpacity
            className="bg-yellow-400 rounded-full py-2 mt-4 items-center"
            onPress={() => handleRecurringSubscribe(plan)}
          >
            <Text className="text-black font-bold">Subscribe Now</Text>
          </TouchableOpacity>

          {plan.type === 'one_time' && (
            <TouchableOpacity
              className="border border-white rounded-full py-2 mt-2 items-center"
              onPress={() => handleOneTimePayment(plan)}
            >
              <Text className="text-white font-semibold">One-time payment</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

export default PremiumPlansScreen;
