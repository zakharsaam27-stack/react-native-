import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Button } from "react-native-paper";
import { useAuth } from "@/lib/auth-context";

export default function Index() {
  const { signOut } = useAuth();
  return (
    <View style={styles.view}>
      <Text>whatever</Text>
      <Button mode="text" onPress={signOut} icon={"logout"}>
        {" "}
        Sign Out
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  nav_button: {
    width: 100,
    height: 20,
    backgroundColor: "coral",
    borderRadius: 8,
    textAlign: "center",
  },
});
