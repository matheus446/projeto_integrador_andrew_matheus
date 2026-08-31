import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";

export default function MusicForm({ onSubmit }) {
  const [titulo, setTitulo] = useState("");
  const [artista, setArtista] = useState("");
  const [genero, setGenero] = useState("");
  const [arquivo, setArquivo] = useState("");

  function handleSubmit() {
    if (!titulo.trim()) {
      Alert.alert("Atenção", "Digite o título da música.");
      return;
    }

    if (!artista.trim()) {
      Alert.alert("Atenção", "Digite o nome do artista.");
      return;
    }

    if (!genero.trim()) {
      Alert.alert("Atenção", "Digite o gênero da música.");
      return;
    }

    if (!arquivo.trim()) {
      Alert.alert("Atenção", "Informe o arquivo da música.");
      return;
    }

    onSubmit({
      titulo,
      artista,
      genero,
      arquivo,
    });

    setTitulo("");
    setArtista("");
    setGenero("");
    setArquivo("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>

      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Digite o título"
      />

      <Text style={styles.label}>Artista</Text>

      <TextInput
        style={styles.input}
        value={artista}
        onChangeText={setArtista}
        placeholder="Digite o artista"
      />

      <Text style={styles.label}>Gênero</Text>

      <TextInput
        style={styles.input}
        value={genero}
        onChangeText={setGenero}
        placeholder="Digite o gênero"
      />

      <Text style={styles.label}>Arquivo</Text>

      <TextInput
        style={styles.input}
        value={arquivo}
        onChangeText={setArquivo}
        placeholder="Informe o arquivo"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Cadastrar música</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    marginBottom: 6,
    marginTop: 12,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },

  button: {
    marginTop: 24,
    height: 48,
    borderRadius: 8,
    backgroundColor: "#4F46E5",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
