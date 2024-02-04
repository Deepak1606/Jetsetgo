import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/home";
import Search from "../screens/search";
import Filter from "../screens/filter";

const NavigationStack = (props) => {

    const StackNav = createStackNavigator()
    return(
        <NavigationContainer>
            <StackNav.Navigator screenOptions={{headerShown: false}}>
                <StackNav.Screen name="Home" component={Home} />
                <StackNav.Screen name="Search" component={Search} />
                <StackNav.Screen name="Filter" component={Filter} />
            </StackNav.Navigator>
        </NavigationContainer>
    )
}

export default NavigationStack