import { Text } from 'react-native';
import { Tabs } from 'expo-router';
import { Colors } from '../_constants/theme';
import { Home, Car, Receipt, User } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.divider,
          paddingTop: 8,
          height: 60,
          paddingBottom: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => <Home color={color} size={24} strokeWidth={focused ? 2.5 : 2} />,
          tabBarLabel: ({ focused, color }) => focused ? <Text style={{ color, fontSize: 10, marginTop: 4 }}>Home</Text> : null,
        }}
      />
      <Tabs.Screen
        name="parking"
        options={{
          title: 'Parking',
          tabBarIcon: ({ color, focused }) => <Car color={color} size={24} strokeWidth={focused ? 2.5 : 2} />,
          tabBarLabel: ({ focused, color }) => focused ? <Text style={{ color, fontSize: 10, marginTop: 4 }}>Parking</Text> : null,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, focused }) => <Receipt color={color} size={24} strokeWidth={focused ? 2.5 : 2} />,
          tabBarLabel: ({ focused, color }) => focused ? <Text style={{ color, fontSize: 10, marginTop: 4 }}>History</Text> : null,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => <User color={color} size={24} strokeWidth={focused ? 2.5 : 2} />,
          tabBarLabel: ({ focused, color }) => focused ? <Text style={{ color, fontSize: 10, marginTop: 4 }}>Profile</Text> : null,
        }}
      />
    </Tabs>
  );
}
