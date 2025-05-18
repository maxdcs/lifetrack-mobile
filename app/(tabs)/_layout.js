import { Tabs } from "expo-router"
import { Entypo, Ionicons, MaterialIcons, Fontisto, Foundation, FontAwesome6 } from "@expo/vector-icons"
import { Image } from "react-native"

export default function TabsLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "transparent",
            borderTopWidth: 0,
            height: 80,
            position: "absolute",
          },
          tabBarBackground: () => (
            <Image
              source={require("../../assets/images/tab-bar-background2.png")}
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                bottom: 19,
                padding: 20,
                opacity: 1,
              }}
              resizeMode="cover"
            />
          ),
          tabBarActiveTintColor: "#e6dfcf",
          tabBarInactiveTintColor: "#4f595c",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "",
            tabBarIcon: ({ color, size }) => <Foundation name="home" size={30} color={color} />,
          }}
        />
        <Tabs.Screen
          name="workouts"
          options={{
            title: "",
            tabBarIcon: ({ color, size }) => <FontAwesome6 name="dumbbell" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="statistics"
          options={{
            title: "",
            tabBarIcon: ({ color, size }) => <Ionicons name="stats-chart" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "",
            tabBarIcon: ({ color, size }) => <Ionicons name="options-sharp" size={30} color={color} />,
          }}
        />
      </Tabs>
    </>
  )
}
