import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  Pressable,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

export default function App() {
  const [name, setName] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=8')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Lỗi tải sản phẩm:', error))
      .finally(() => setLoading(false));
  }, []);

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

      <Text style={styles.sectionTitle}>Sản phẩm nổi bật</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#ab9c9c" />
      ) : (
        <FlatList
          style={styles.list}
          data={products}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
              onPress={() => alert(item.title)}
            >
              <Image source={{ uri: item.image }} style={styles.cardImage} />
              <Text style={styles.cardTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.cardPrice}>${item.price}</Text>
            </Pressable>
          )}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 60, paddingHorizontal: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, width: '80%', marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 24, marginBottom: 8, alignSelf: 'flex-start' },
  list: { width: '100%' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
  },
  cardPressed: { opacity: 0.6 },
  cardImage: { width: 48, height: 48, marginRight: 12, resizeMode: 'contain' },
  cardTitle: { flex: 1, fontSize: 13 },
  cardPrice: { fontWeight: 'bold', marginLeft: 8 },
});
