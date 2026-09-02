import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
          <Text style={styles.nota}>♫</Text>
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
        <Text style={[styles.coracao, musica.favorita && styles.coracaoAtivo]}>
          {musica.favorita ? "♥" : "♡"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onMenu}
        style={styles.botaoMenu}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={`Opções de ${musica.titulo}`}
      >
        <Text style={styles.menu}>⋮</Text>
      </TouchableOpacity>
    </View>
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
    shadowColor: "#241F2E",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
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

  coracao: {
    fontSize: 25,
    color: "#675F70",
  },

  coracaoAtivo: {
    color: "#7B45D3",
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
