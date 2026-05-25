import { supabase } from "@/lib/supabase";
import { Tabs } from "expo-router";
import { Car, Home, Receipt, User } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { Colors } from "../_constants/theme";

export default function TabLayout() {
     const [activePark, setActivePark] = useState<any | null>();

     useEffect(() => {
          async function fetchData() {
               const { data, error } = await supabase
                    .from("active_transaction")
                    .select();

               setActivePark(data != null ? data[0] : null);
          }

          fetchData();
     }, []);

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
                         title: "Home",
                         tabBarIcon: ({ color, focused }) => (
                              <Home
                                   color={color}
                                   size={24}
                                   strokeWidth={focused ? 2.5 : 2}
                              />
                         ),
                         tabBarLabel: ({ focused, color }) =>
                              focused ? (
                                   <Text
                                        style={{
                                             color,
                                             fontSize: 10,
                                             marginTop: 4,
                                        }}
                                   >
                                        Home
                                   </Text>
                              ) : null,
                    }}
               />
               <Tabs.Screen
                    name="parking"
                    options={{
                         title: "Parking",
                         tabBarIcon: ({ color, focused }) => (
                              <Car
                                   color={color}
                                   size={24}
                                   strokeWidth={focused ? 2.5 : 2}
                              />
                         ),
                         tabBarLabel: ({ focused, color }) =>
                              focused ? (
                                   <Text
                                        style={{
                                             color,
                                             fontSize: 10,
                                             marginTop: 4,
                                        }}
                                   >
                                        Parking
                                   </Text>
                              ) : null,
                    }}
               />
               <Tabs.Screen
                    name="history"
                    options={{
                         title: "History",
                         tabBarIcon: ({ color, focused }) => (
                              <Receipt
                                   color={color}
                                   size={24}
                                   strokeWidth={focused ? 2.5 : 2}
                              />
                         ),
                         tabBarLabel: ({ focused, color }) =>
                              focused ? (
                                   <Text
                                        style={{
                                             color,
                                             fontSize: 10,
                                             marginTop: 4,
                                        }}
                                   >
                                        History
                                   </Text>
                              ) : null,
                    }}
               />
               <Tabs.Screen
                    name="profile"
                    options={{
                         title: "Profile",
                         tabBarIcon: ({ color, focused }) => (
                              <User
                                   color={color}
                                   size={24}
                                   strokeWidth={focused ? 2.5 : 2}
                              />
                         ),
                         tabBarLabel: ({ focused, color }) =>
                              focused ? (
                                   <Text
                                        style={{
                                             color,
                                             fontSize: 10,
                                             marginTop: 4,
                                        }}
                                   >
                                        Profile
                                   </Text>
                              ) : null,
                    }}
               />
          </Tabs>
     );
}
