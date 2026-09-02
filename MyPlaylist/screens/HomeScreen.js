import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useEffect, useState } from "react";

import MusicCard from "../components/MusicCard";

import AddMusicModal from "../modals/AddMusicModal";
import EditMusicModal from "../modals/EditMusicModal";

import {
  carregarMusicas,
  salvarMusicas,
} from "../services/storage";

export default function HomeScreen() {
  const [musicas, setMusicas] = useState([]);

  const [modalAdicionarAberto, setModalAdicionarAberto] =
    useState(false);

  const [modalEditarAberto, setModalEditarAberto] =
    useState(false);

  const [musicaSelecionada, setMusicaSelecionada] =
    useState(null);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const dados = await carregarMusicas();

    setMusicas(dados);
  }

  async function adicionarMusica(dados) {
    const novaMusica = {
      id: Date.now(),
      ...dados,
    };

    const novaLista = [...musicas, novaMusica];

    setMusicas(novaLista);

    await salvarMusicas(novaLista);

    setModalAdicionarAberto(false);
  }

  function abrirEdicao(musica) {
    setMusicaSelecionada(musica);
    setModalEditarAberto(true);
  }

  function fecharEdicao() {
    setModalEditarAberto(false);
    setMusicaSelecionada(null);
  }

  async function editarMusica(dados) {
    const musicaEditada = {
      ...musicaSelecionada,
      ...dados,
    };

    const novaLista = musicas.map((item) =>
      item.id === musicaEditada.id ? musicaEditada : item
    );

    setMusicas(novaLista);

    await salvarMusicas(novaLista);

    fecharEdicao();
  }

  function excluirMusica(id) {
    Alert.alert(
      "Excluir música",
      "Tem certeza de que deseja excluir esta música?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            const novaLista = musicas.filter(
              (item) => item.id !== id
            );

            setMusicas(novaLista);

            await salvarMusicas(novaLista);
          },
        },
      ]
    );
  }

  function abrirMenu(musica) {
    Alert.alert(
      musica.titulo,
      "Escolha uma opção",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Editar",
          onPress: () => abrirEdicao(musica),
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => excluirMusica(musica.id),
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        MyPlaylist
      </Text>

      <View style={styles.cabecalho}>
        <Text style={styles.subtitulo}>
          Minhas músicas
        </Text>

        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={() => setModalAdicionarAberto(true)}
        >
          <Text style={styles.textoBotao}>
            + Adicionar
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={musicas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MusicCard
            musica={item}
            onPress={() =>
              console.log("Tocou:", item.titulo)
            }
            onEdit={() => abrirMenu(item)}
            onDelete={() => excluirMusica(item.id)}
          />
        )}
        contentContainerStyle={
          musicas.length === 0
            ? styles.listaVazia
            : undefined
        }
        ListEmptyComponent={
          <Text style={styles.vazio}>
            Nenhuma música cadastrada.
          </Text>
        }
      />

      <AddMusicModal
        visible={modalAdicionarAberto}
        onClose={() => setModalAdicionarAberto(false)}
        onSubmit={adicionarMusica}
      />

      {musicaSelecionada && (
        <EditMusicModal
          visible={modalEditarAberto}
          musica={musicaSelecionada}
          onClose={fecharEdicao}
          onSubmit={editarMusica}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F7F4FA",
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#241F2E",
    marginBottom: 18,
  },

  cabecalho: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  subtitulo: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3A3342",
  },

  botaoAdicionar: {
    backgroundColor: "#7B45D3",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },

  textoBotao: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  listaVazia: {
    flexGrow: 1,
  },

  vazio: {
    textAlign: "center",
    marginTop: 30,
    color: "#777",
  },
});