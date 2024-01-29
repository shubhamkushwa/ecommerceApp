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
import { PageName } from './styles/PageName';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const BottomTabScreen = () => {
  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      initialRouteName={PageName.HOME}>
      <Tab.Screen options={{headerShown: false}} name={PageName.HOME} component={Home} />
      <Tab.Screen
        options={{headerShown: false}}
        name={PageName.CATEGORY}
        component={ComingSoon}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name={PageName.FAVOURITE}
        component={WishlistPage}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name={PageName.MORE}
        component={ComingSoon}
      />
    </Tab.Navigator>
  );
};

const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={PageName.BOTTOMTAB}>
      <Stack.Screen
        name={PageName.BOTTOMTAB}
        component={BottomTabScreen}
        options={{headerShown: false, title: PageName.BOTTOMTAB}}
      />
      <Stack.Screen
        name={PageName.SINGLEPRODUCT}
        component={ProductDetail}
        options={{headerShown: false, title: PageName.SINGLEPRODUCT}}
      />
      <Stack.Screen
        name={PageName.CHECKOUT}
        component={CheckoutPage}
        options={{headerShown: false, title: PageName.CHECKOUT}}
      />
      <Stack.Screen
        name={PageName.WISHLIST}
        component={WishlistPage}
        options={{headerShown: false, title: PageName.WISHLIST}}
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
