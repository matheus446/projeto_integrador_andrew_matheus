import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MusicCard({ musica, onPress, onFavorite, onMenu }) {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.conteudo}
        onPress={onPress}
        activeOpacity={0.75}
        accessibilityRole="button"
        accessibilityLabel={`Reproduzir ${musica.titulo}`}
      >
        <View style={styles.icone}>
          <Ionicons name="musical-notes" size={25} color="#7B45D3" />
        </View>

        <View style={styles.info}>
          <View style={styles.linhaTitulo}>
            <Text style={styles.titulo} numberOfLines={1}>
              {musica.titulo}
            </Text>
          </View>

          <Text style={styles.artista} numberOfLines={1}>
            {musica.artista}
          </Text>

          <Text style={styles.genero} numberOfLines={1}>
            {musica.genero}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onFavorite}
        style={styles.botaoFavorito}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={
          musica.favorita ? "Desfavoritar música" : "Favoritar música"
        }
        accessibilityState={{ selected: Boolean(musica.favorita) }}
      >
        <Ionicons
          name={musica.favorita ? "heart" : "heart-outline"}
          size={25}
          color={musica.favorita ? "#7B45D3" : "#675F70"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onMenu}
        style={styles.botaoMenu}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={`Opções de ${musica.titulo}`}
      >
        <Ionicons name="ellipsis-vertical" size={25} color="#4E4657" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 12,
    marginBottom: 12,

    borderWidth: 1,
    borderColor: "#EEE9F2",

    elevation: 1,
    shadowColor: "#241F2E",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },

  conteudo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  icone: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#E9DDFF",
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible",
  },

  info: {
    flex: 1,
    marginLeft: 12,
  },

  linhaTitulo: {
    flexDirection: "row",
    alignItems: "center",
  },

  titulo: {
    flexShrink: 1,
    fontSize: 17,
    fontWeight: "bold",
    color: "#241F2E",
  },

  botaoFavorito: {
    minWidth: 40,
    minHeight: 48,
    justifyContent: "center",
    alignItems: "center",
  },

  artista: {
    marginTop: 3,
    color: "#666",
  },

  genero: {
    marginTop: 2,
    fontSize: 12,
    color: "#675F70",
  },

  botaoMenu: {
    minWidth: 40,
    minHeight: 48,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 4,
  },

  menu: {
    fontSize: 28,
    lineHeight: 30,
    color: "#4E4657",
  },
});
