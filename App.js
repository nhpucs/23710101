import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, TextInput, Button, StyleSheet } from 'react-native';

export default function App() {
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://placehold.co/120x120' }}
        style={{ width: 120, height: 120, marginBottom: 20 }}
      />
      <Text style={styles.title}>Xin chào, {name || 'bạn'}!</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập tên của bạn"
        value={name}
        onChangeText={setName}
      />
      <Button title="Chào tạm biệt" onPress={() => alert(`Bye ${name}!`)} />
      <Button title="Xoá" onPress={() => setName('')} color="#999" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, width: '80%', marginBottom: 16 },
});
