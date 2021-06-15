import React from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { useState, useEffect } from 'react-native'

export default function Friends (props) {
                console.log(props, "<< props inside Friends Component")
        return (
            <View>
                <Button title="Friends List" onPress={() => {
                }}/>

            </View>
        )
    }

const styles = StyleSheet.create({})