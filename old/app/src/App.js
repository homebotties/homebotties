import React, { useState, useEffect } from 'react';
import { Text, Button, View, StyleSheet, TouchableHighlight } from 'react-native';

async function graphql(query) {
  let res = await fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  })
  return await res.json()
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  }
});

export default function App() {
  const [lights, setLights] = useState([]);
  useEffect(() => {
    graphql(`{ lights { name id }}`).then(res => {
      setLights(res.data.lights);
    });
  });
  return (
    <View style={styles.container}>
      {lights.map(light =>
        <Light2 key={light.id} {...light} />
      )}
    </View>
  )
}

function Light({ name }) {
  return (
    <Button
      onPress={() => { graphql(`mutation { alert(name:"${name}") }`)}}
      title={name}
      style={{width: 50, height: 50, backgroundColor: 'steelblue'}}
    />
  )
}

function Light2({ name }) {
  return (
    <TouchableHighlight onPress={() => { graphql(`mutation { alert(name:"${name}") }`)}} underlayColor="white">
      <View style={styles.button}>
        <Text style={styles.buttonText}>{name}</Text>
      </View>
    </TouchableHighlight>
  )
}
