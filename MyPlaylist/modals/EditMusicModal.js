import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import MusicForm from "../components/MusicForm";

export default function EditMusicModal({ visible, musica, onClose, onSubmit }) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Editar música</Text>

            <TouchableOpacity onPress={onClose} hitSlop={10}>
              <Ionicons name="close" size={28} color="#4C4554" />
            </TouchableOpacity>
          </View>

          <MusicForm
            musicaInicial={musica}
            onSubmit={onSubmit}
            onCancel={onClose}
            textoSalvar="Salvar"
          />
        </View>
      </View>
    </Modal>
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
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#241F2E",
  },
});
