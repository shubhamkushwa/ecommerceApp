import React from 'react';
import {LogBox, StyleSheet} from 'react-native';
import Home from './pages/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyTabBar from './components/MyTabBar';
import ProductDetail from './pages/ProductDetail';
import CheckoutPage from './pages/CheckoutPage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import WishlistPage from './pages/WishlistPage';
import ComingSoon from './pages/ComingSoon';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const BottomTabScreen = () => {
  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      initialRouteName="Home">
      <Tab.Screen options={{headerShown: false}} name="Home" component={Home} />
      <Tab.Screen
        options={{headerShown: false}}
        name="Category"
        component={ComingSoon}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="Favourite"
        component={WishlistPage}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="More"
        component={ComingSoon}
      />
    </Tab.Navigator>
  );
};

const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="BottomTabScreen">
      <Stack.Screen
        name="BottomTabScreen"
        component={BottomTabScreen}
        options={{headerShown: false, title: 'BottomTabScreen'}}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{headerShown: false, title: 'ProductDetail'}}
      />
      <Stack.Screen
        name="CheckoutPage"
        component={CheckoutPage}
        options={{headerShown: false, title: 'CheckoutPage'}}
      />
      <Stack.Screen
        name="WishlistPage"
        component={WishlistPage}
        options={{headerShown: false, title: 'WishlistPage'}}
      />
    </Stack.Navigator>
  );
};

function App(): React.JSX.Element {
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});

export default App;
