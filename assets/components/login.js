import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import connectToMongoDB from './connectToMongoDB';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    connectToMongoDB();
  }, []);


  const handleLogin = () => {
    // Perform form validation
    if (!username || !password) {
      setError('Please enter a username and password');
    } else {
      // Call login API here
      // Example API call using fetch
      fetch('https://your-api-endpoint.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            // Handle successful login
          } else {
            setError(data.error);
          }
        })
        .catch((error) => {
          Alert.alert('Error', 'An error occurred while trying to log in');
          console.error(error);
        });
    }
  };

  const forgotPassword = ()=>{
    navigation.navigate('Register');
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>Username</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.loginButtonText}>
      {/* <TouchableOpacity onPress={()=><Register/>}> */}
        <Text style={styles.link} onPress={()=> navigation.navigate('Register')}>Register Here?</Text>
      {/* </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
    },
    link: {
        color: 'blue',
        marginTop: 20,
        alignContent:'center',
        justifyContent:'center',
        alignItems:'center',
        textDecorationLine: 'none',
      },
    inputContainer: {
      marginBottom: 10,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      padding: 10,
    },
    errorText: {
      color: 'red',
      marginTop: 10,
    },
    loginButton: {
      backgroundColor: 'blue',
      padding: 15,
      alignItems: 'center',
      marginTop: 20,
    },
    loginButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });
  

export default Login;
