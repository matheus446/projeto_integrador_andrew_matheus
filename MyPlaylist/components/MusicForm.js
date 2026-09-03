import { useState, useEffect } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import FileSelectorModal from "../modals/FileSelectorModal";

export default function MusicForm({
  onSubmit,
  onCancel,
  textoSalvar = "Salvar",
  musicaInicial = null,
}) {
  const [titulo, setTitulo] = useState(musicaInicial?.titulo || "");

  const [artista, setArtista] = useState(musicaInicial?.artista || "");

  const [genero, setGenero] = useState(musicaInicial?.genero || "");

  const [arquivo, setArquivo] = useState(musicaInicial?.arquivo || "");

  const [seletorAberto, setSeletorAberto] = useState(false);

  useEffect(() => {
    if (musicaInicial) {
      setTitulo(musicaInicial.titulo || "");
      setArtista(musicaInicial.artista || "");
      setGenero(musicaInicial.genero || "");
      setArquivo(musicaInicial.arquivo || "");
    } else {
      setTitulo("");
      setArtista("");
      setGenero("");
      setArquivo("");
    }
  }, [musicaInicial]);

  function validarFormulario() {
    if (!titulo.trim()) {
      Alert.alert("Campo obrigatório", "Digite o título da música.");
      return false;
    }

    if (!artista.trim()) {
      Alert.alert("Campo obrigatório", "Digite o nome do artista.");
      return false;
    }

    if (!genero.trim()) {
      Alert.alert("Campo obrigatório", "Digite o gênero da música.");
      return false;
    }

    if (!arquivo) {
      Alert.alert("Campo obrigatório", "Selecione um arquivo de música.");
      return false;
    }

    return true;
  }

  function enviarFormulario() {
    if (!validarFormulario()) {
      return;
    }

    onSubmit({
      titulo: titulo.trim(),
      artista: artista.trim(),
      genero: genero.trim(),
      arquivo,
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex.: Believer"
        value={titulo}
        onChangeText={setTitulo}
        autoCapitalize="sentences"
      />

      <Text style={styles.label}>Artista</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex.: Imagine Dragons"
        value={artista}
        onChangeText={setArtista}
        autoCapitalize="words"
      />

      <Text style={styles.label}>Gênero</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex.: Rock"
        value={genero}
        onChangeText={setGenero}
        autoCapitalize="words"
      />

      <Text style={styles.label}>Arquivo</Text>

      <TouchableOpacity
        style={styles.fileButton}
        onPress={() => setSeletorAberto(true)}
        activeOpacity={0.8}
      >
        <Text
          style={arquivo ? styles.fileText : styles.placeholder}
          numberOfLines={1}
        >
          {arquivo || "Selecionar arquivo"}
        </Text>

        <Ionicons name="chevron-down" size={18} color="#625A6D" />
      </TouchableOpacity>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={onCancel}
          activeOpacity={0.8}
        >
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={enviarFormulario}
          activeOpacity={0.8}
        >
          <Text style={styles.saveText}>{textoSalvar}</Text>
        </TouchableOpacity>
      </View>

      <FileSelectorModal
        visible={seletorAberto}
        selected={arquivo}
        onSelect={(arquivoSelecionado) => {
          setArquivo(arquivoSelecionado);
          setSeletorAberto(false);
        }}
        onClose={() => {
          setSeletorAberto(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3A3342",
    marginBottom: 6,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#D8D1E0",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 15,
    backgroundColor: "#FAF9FC",
    fontSize: 15,
    color: "#2A2530",
  },

  fileButton: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: "#D8D1E0",
    borderRadius: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FAF9FC",
    marginBottom: 20,
  },

  fileText: {
    flex: 1,
    fontSize: 15,
    color: "#2A2530",
    marginRight: 10,
  },

  placeholder: {
    flex: 1,
    fontSize: 15,
    color: "#8C8494",
    marginRight: 10,
  },

  arrow: {
    fontSize: 13,
    color: "#625A6D",
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  cancelButton: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginRight: 8,
  },

  cancelText: {
    color: "#4E4657",
    fontSize: 14,
    fontWeight: "600",
  },

  saveButton: {
    backgroundColor: "#7B45D3",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
  },

  saveText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});
