import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import musicFiles from "../data/musicFiles";

export default function FileSelectorModal({
  visible,
  selected,
  onSelect,
  onClose,
}) {
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
            <Text style={styles.title}>Selecionar arquivo</Text>

            <TouchableOpacity onPress={onClose} hitSlop={10}>
              <Ionicons name="close" size={28} color="#4C4554" />
            </TouchableOpacity>
          </View>

          {musicFiles.length === 0 ? (
            <Text style={styles.empty}>
              Nenhum arquivo de música está disponível.
            </Text>
          ) : (
            musicFiles.map((item) => (
              <TouchableOpacity
                key={item.nome}
                style={styles.option}
                onPress={() => onSelect(item.nome)}
              >
                <Ionicons
                  name="musical-note"
                  size={23}
                  color="#7B45D3"
                  style={{ width: 35 }}
                />

                <Text style={styles.fileName}>{item.nome}</Text>

                <View
                  style={[
                    styles.radio,
                    selected === item.nome && styles.radioSelected,
                  ]}
                />
              </TouchableOpacity>
            ))
          )}

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
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
    width: "88%",
    maxHeight: "80%",
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

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#241F2E",
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#ECE8F0",
  },

  fileName: {
    flex: 1,
    fontSize: 15,
    color: "#342D3B",
  },

  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#9A91A4",
  },

  radioSelected: {
    borderColor: "#7B45D3",
    backgroundColor: "#DCCDF4",
  },

  empty: {
    color: "#71687A",
    fontSize: 14,
    lineHeight: 20,
    paddingVertical: 15,
  },

  closeButton: {
    alignSelf: "flex-end",
    marginTop: 18,
    backgroundColor: "#7B45D3",
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 11,
  },

  closeButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
