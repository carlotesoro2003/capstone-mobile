import { Button, View, Text, StyleSheet } from "react-native";
import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { supabase } from "app/utils/supabase";
import { useEffect } from "react";

WebBrowser.maybeCompleteAuthSession(); // Required for web only
const redirectTo = makeRedirectUri();

const createSessionFromUrl = async (url) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) throw new Error(errorCode);
  const { access_token, refresh_token } = params;

  if (!access_token) return;

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
  if (error) throw error;
  return data.session;
};

const performOAuth = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github", // Change to your preferred provider
    options: {
      redirectTo,
      skipBrowserRedirect: true,
    },
  });
  if (error) throw error;

  const res = await WebBrowser.openAuthSessionAsync(
    data?.url ?? "",
    redirectTo
  );

  if (res.type === "success") {
    const { url } = res;
    await createSessionFromUrl(url);
  }
};

const sendMagicLink = async (email) => {
  const { error } = await supabase.auth.signInWithOtp({
    email, // Use the user's email input
    options: {
      emailRedirectTo: redirectTo,
    },
  });

  if (error) throw error;
  // Email sent.
};

export default function Auth() {
  // Handle linking into app from email app.
  const url = Linking.useURL();

  useEffect(() => {
    if (url) {
      createSessionFromUrl(url).catch((error) => console.error("Session Error:", error));
    }
  }, [url]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Authenticate</Text>
      <Button onPress={() => performOAuth()} title="Sign in with Github" />
      <Button onPress={() => sendMagicLink("example@email.com")} title="Send Magic Link" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
