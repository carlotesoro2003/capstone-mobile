import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { useUser } from "@supabase/auth-helpers-react";
import { supabase } from "../../supabaseClient";

const CustomDrawerContent = (props) => {
  const user = useUser();
  const [profile, setProfile] = useState({ firstName: '', lastName: '', role: '', profilePic: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('first_name, last_name, role, profile_pic') // Include profile_pic in the select statement
          .eq('id', user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error.message);
        } else if (data) {
          setProfile({ 
            firstName: data.first_name || '', 
            lastName: data.last_name || '', 
            role: data.role || '', 
            profilePic: data.profile_pic || '' // Set profile_pic to the state
          });
        }
      }
    };

    fetchProfile();
  }, [user]);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileContainer}>
        {profile.profilePic ? ( // Display the user's profile picture if available
          <Image 
            source={{ uri: profile.profilePic }} 
            style={styles.profileImage} 
          />
        ) : (
          <Image 
            source={{ uri: 'https://via.placeholder.com/80' }} // Placeholder if no profile picture
            style={styles.profileImage} 
          />
        )}
        <Text style={styles.profileName}>
          {profile.firstName} {profile.lastName}
        </Text>
        <Text style={styles.profileRole}>
          {profile.role ? profile.role.charAt(0).toUpperCase() + profile.role.slice(1) : 'User'}
        </Text>
      </View>

      {/* Horizontal line divider */}
      <View style={styles.divider} />

      {/* Drawer items */}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    padding: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileRole: {
    fontSize: 14,
  },
  divider: {
    borderBottomColor: '#ccc',  
    borderBottomWidth: 1,      
    marginHorizontal: 20,       
    marginBottom: 20,          
  },
});

export default CustomDrawerContent;
