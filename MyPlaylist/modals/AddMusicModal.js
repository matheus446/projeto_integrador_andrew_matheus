import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import MusicForm from "../components/MusicForm";

export default function AddMusicModal({ visible, onClose, onSubmit }) {
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
            <Text style={styles.title}>Adicionar música</Text>

            <TouchableOpacity onPress={onClose} hitSlop={10}>
              <Text style={styles.close}>×</Text>
            </TouchableOpacity>
          </View>

          <MusicForm
            onSubmit={onSubmit}
            onCancel={onClose}
            textoSalvar="Adicionar"
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

  close: {
    fontSize: 30,
    lineHeight: 30,
    color: "#4C4554",
  },
});
