import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {HomeView} from '../screens';
import { COLORS } from '@/theme/colors';

const Stack = createStackNavigator();

const stackScreenOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: COLORS.primary,  
  },
  headerTintColor: COLORS.primary,  
};

function ApplicationNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={stackScreenOptions}>
        <Stack.Screen name="HomeView" component={HomeView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ApplicationNavigator;
