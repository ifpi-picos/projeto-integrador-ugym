import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DailyExercicices from '@/pages/DailyExercicices';
import Profile from '../pages/Profile';
import CustomTabBar from '../components/CustomTabBar';
import Home from '../pages/home';
import { AuthProvider_list } from '../context/authContext_list';
import AddActivity from "@/pages/AddActivity";

import Settings from '@/pages/settings';
const Tab = createBottomTabNavigator();

export default function BottomRoutes() {
    return (
        <AuthProvider_list>

            <Tab.Navigator
                screenOptions={{ headerShown: false }}
                tabBar={props => <CustomTabBar{...props} />}
            >
                <Tab.Screen
                    name="Home"
                    component={Home} />

                <Tab.Screen
                    name="DailyExercicices"
                    component={DailyExercicices}
                />

                <Tab.Screen
                    name="Profile"
                    component={Profile}
                />
                <Tab.Screen
                    name="Settings"
                    component={Settings} />
                <Tab.Screen
                name="AddActivity"
                component={AddActivity} />
                
            </Tab.Navigator>
        </AuthProvider_list>

    );
}