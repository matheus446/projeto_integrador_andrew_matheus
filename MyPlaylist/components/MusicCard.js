import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function MusicCard({
  musica,
  onPress,
  onEdit,
  onDelete,
}) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
    >
      <View style={styles.icone}>
        <Text style={styles.nota}>♫</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.titulo}>
          {musica.titulo}
        </Text>

        <Text style={styles.artista}>
          {musica.artista}
        </Text>

        <Text style={styles.genero}>
          {musica.genero}
        </Text>
      </View>

      <View style={styles.acoes}>
        <TouchableOpacity
          onPress={onEdit}
          style={styles.botaoAcao}
        >
          <Text style={styles.acao}>
            ✏️
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onDelete}
          style={styles.botaoAcao}
        >
          <Text style={styles.acao}>
            🗑️
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 12,
    marginBottom: 12,
    elevation: 3,
  },

  icone: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#e9ddff",
    justifyContent: "center",
    alignItems: "center",
  },

  nota: {
    fontSize: 28,
  },

  info: {
    flex: 1,
    marginLeft: 12,
  },

  titulo: {
    fontSize: 17,
    fontWeight: "bold",
  },

  artista: {
    marginTop: 3,
    color: "#666",
  },

  genero: {
    marginTop: 2,
    fontSize: 12,
    color: "#888",
  },

  acoes: {
    flexDirection: "row",
    alignItems: "center",
  },

  botaoAcao: {
    padding: 5,
    marginLeft: 4,
  },

  acao: {
    fontSize: 20,
  },
});