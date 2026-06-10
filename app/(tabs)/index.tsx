import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={styles.view}>
      <Text>whatever</Text>
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
        textAlign: "center"
      }
});