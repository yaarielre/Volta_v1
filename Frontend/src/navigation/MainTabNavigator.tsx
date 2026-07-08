import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import type { MainTabParamList } from "../types/navigation";
import HomeScreen from "../screens/main/HomeScreen";
import ActivityScreen from "../screens/main/ActivityScreen";
import ProfileScreen from "../screens/main/ProfileScreen";

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          const icons: Record<
            keyof MainTabParamList,
            keyof typeof Ionicons.glyphMap
          > = {
            Home: "home",
            Activity: "time",
            Profile: "person",
          };
          return (
            <Ionicons name={icons[route.name]} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#999",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="Activity"
        component={ActivityScreen}
        options={{ title: "Actividad" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Perfil" }}
      />
    </Tab.Navigator>
  );
}
