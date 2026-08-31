import { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import MusicForm from "../components/MusicForm";
import FileSelectorModal from "./FileSelectorModal";

export default function AddMusicModal({ visible, onClose, onSubmit }) {
  const [titulo, setTitulo] = useState("");
  const [artista, setArtista] = useState("");
  const [genero, setGenero] = useState("");
  const [arquivo, setArquivo] = useState("");

  const [arquivoModalAberto, setArquivoModalAberto] = useState(false);

  function limparFormulario() {
    setTitulo("");
    setArtista("");
    setGenero("");
    setArquivo("");
  }

  function fecharModal() {
    limparFormulario();
    onClose();
  }

  function adicionarMusica() {
    onSubmit({
      titulo: titulo.trim(),
      artista: artista.trim(),
      genero: genero.trim(),
      arquivo,
    });

    limparFormulario();
    onClose();
  }

  return (
    <>
      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={fecharModal}
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>
            {/* Cabeçalho */}
            <View style={styles.header}>
              <Text style={styles.tituloModal}>Adicionar música</Text>

              <TouchableOpacity onPress={fecharModal} hitSlop={10}>
                <Text style={styles.fechar}>×</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <MusicForm
                titulo={titulo}
                setTitulo={setTitulo}
                artista={artista}
                setArtista={setArtista}
                genero={genero}
                setGenero={setGenero}
                arquivo={arquivo}
                onSelecionarArquivo={() => setArquivoModalAberto(true)}
                onSalvar={adicionarMusica}
                onCancelar={fecharModal}
                textoSalvar="Adicionar"
              />
            </ScrollView>
          </View>
        </View>
      </Modal>

      <FileSelectorModal
        visible={arquivoModalAberto}
        selected={arquivo}
        onSelect={(arquivoSelecionado) => {
          setArquivo(arquivoSelecionado);
        }}
        onClose={() => {
          setArquivoModalAberto(false);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    width: "90%",
    maxHeight: "85%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  tituloModal: {
    fontSize: 22,
    fontWeight: "700",
    color: "#241F2E",
  },

  fechar: {
    fontSize: 30,
    color: "#4C4554",
    lineHeight: 30,
  },
});
