import { Redirect } from "expo-router";
import { useSelector } from "react-redux";

export default function Index() { // handles "where should the user go based on the state of authorization?"
  const { token } = useSelector((state) => state.auth);
  
  if (token) {
    return <Redirect href="/(tabs)" />;
  } else {
    return <Redirect href="/(auth)" />;
  }
}