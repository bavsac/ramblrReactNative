import React from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { useState, useEffect } from 'react-native'

export default function Friends (props) {

        return (
            <View>
                <Button title="Friends List" onPress={(props) => {
                console.log(props)
                }}/>
            </View>
        )
    }

const styles = StyleSheet.create({})