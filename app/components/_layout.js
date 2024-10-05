import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'Login' }} />
            <Stack.Screen name="components/Dashboard" options={{ title: 'Dashboard' }} />
        </Stack>
    )
}

export default _layout

const styles = StyleSheet.create({})