import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useEffect, useState } from "react";

import MusicCard from "../components/MusicCard";

import {
  carregarMusicas,
  salvarMusicas,
} from "../services/storage";

export default function HomeScreen() {
  const [musicas, setMusicas] = useState([]);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const dados = await carregarMusicas();

    setMusicas(dados);
  }

  async function testeStorage() {
    const musicasTeste = [
      {
        id: 1,
        titulo: "Believer",
        artista: "Imagine Dragons",
        genero: "Rock",
        arquivo: "musica01.mp3",
      },
    ];

    await salvarMusicas(musicasTeste);

    const dados = await carregarMusicas();

    setMusicas(dados);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        MyPlaylist
      </Text>

      <Text style={styles.subtitulo}>
        Minhas músicas
      </Text>

      <Button
        title="Testar armazenamento"
        onPress={testeStorage}
      />

      <FlatList
        data={musicas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MusicCard
            musica={item}
            onPress={() =>
              console.log("Tocou:", item.titulo)
            }
            onEdit={() =>
              console.log("Editar:", item.titulo)
            }
            onDelete={() =>
              console.log("Excluir:", item.id)
            }
          />
        )}
        ListEmptyComponent={
          <Text style={styles.vazio}>
            Nenhuma música cadastrada.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },

  subtitulo: {
    fontSize: 16,
    marginBottom: 15,
  },

  vazio: {
    textAlign: "center",
    marginTop: 30,
    color: "#777",
  },
});