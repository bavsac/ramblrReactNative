import React from 'react'
import { Button, StyleSheet, View } from 'react-native'

export default function Friends (info) {
                console.log(info, "<< props inside Friends Component")
        return (
            <View>
                <Button title="Friends List" onPress={() => {
                }}/>

            </View>
        )
    }


    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        },
      });