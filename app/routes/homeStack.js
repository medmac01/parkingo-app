import { createStackNavigator } from  'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import WelcomeScreen from '../screens/WelcomeScreen';
import Map from '../screens/Map';

const screens = {
    welcomeScreen: {
        screen: WelcomeScreen
    },
    mainScreen : {
        screen: Map
    }
}
const homeStack = createStackNavigator(screens);

export default createAppContainer(homeStack);