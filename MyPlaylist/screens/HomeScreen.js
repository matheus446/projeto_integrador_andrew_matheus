import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useEffect, useState } from "react";

import MusicCard from "../components/MusicCard";

import AddMusicModal from "../modals/AddMusicModal";
import EditMusicModal from "../modals/EditMusicModal";
import PlayerModal from "../modals/PlayerModal";

import { carregarMusicas, salvarMusicas } from "../services/storage";

export default function HomeScreen() {
  const [musicas, setMusicas] = useState([]);

  const [modalAdicionarAberto, setModalAdicionarAberto] = useState(false);

  const [modalEditarAberto, setModalEditarAberto] = useState(false);

  const [modalPlayerAberto, setModalPlayerAberto] = useState(false);

  const [reproduzirAutomaticamente, setReproduzirAutomaticamente] =
    useState(false);

  const [musicaSelecionada, setMusicaSelecionada] = useState(null);

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
      favorita: false,
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

  function abrirPlayer(musica) {
    setMusicaSelecionada(musica);
    setReproduzirAutomaticamente(false);
    setModalPlayerAberto(true);
  }

  function fecharPlayer() {
    setModalPlayerAberto(false);
    setReproduzirAutomaticamente(false);
    setMusicaSelecionada(null);
  }

  async function editarMusica(dados) {
    const musicaEditada = {
      ...musicaSelecionada,
      ...dados,
    };

    const novaLista = musicas.map((item) =>
      item.id === musicaEditada.id ? musicaEditada : item,
    );

    setMusicas(novaLista);

    await salvarMusicas(novaLista);

    fecharEdicao();
  }

  async function alternarFavorita(id) {
    const novaLista = musicas.map((item) =>
      item.id === id ? { ...item, favorita: !item.favorita } : item,
    );

    setMusicas(novaLista);
    await salvarMusicas(novaLista);
  }

  function trocarMusica(direcao, reproduzir = false) {
    if (!musicaSelecionada || musicas.length === 0) {
      return;
    }

    const indiceAtual = musicas.findIndex(
      (item) => item.id === musicaSelecionada.id,
    );
    const proximoIndice =
      (indiceAtual + direcao + musicas.length) % musicas.length;

    setReproduzirAutomaticamente(reproduzir);
    setMusicaSelecionada(musicas[proximoIndice]);
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
            const novaLista = musicas.filter((item) => item.id !== id);

            setMusicas(novaLista);

            await salvarMusicas(novaLista);

            if (musicaSelecionada?.id === id) {
              fecharPlayer();
            }
          },
        },
      ],
    );
  }

  function abrirMenu(musica) {
    Alert.alert(musica.titulo, "Escolha uma opção", [
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
    ]);
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <Text style={styles.titulo}>MyPlaylist</Text>

      <View style={styles.cabecalho}>
        <Text style={styles.subtitulo}>Minhas músicas</Text>

        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={() => setModalAdicionarAberto(true)}
        >
          <Text style={styles.textoBotao}>+ Adicionar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={musicas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MusicCard
            musica={item}
            onPress={() => abrirPlayer(item)}
            onFavorite={() => alternarFavorita(item.id)}
            onMenu={() => abrirMenu(item)}
          />
        )}
        contentContainerStyle={
          musicas.length === 0 ? styles.listaVazia : undefined
        }
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhuma música cadastrada.</Text>
        }
      />

      {modalAdicionarAberto && (
        <AddMusicModal
          visible={modalAdicionarAberto}
          onClose={() => setModalAdicionarAberto(false)}
          onSubmit={adicionarMusica}
        />
      )}

      {musicaSelecionada && modalEditarAberto && (
        <EditMusicModal
          visible={modalEditarAberto}
          musica={musicaSelecionada}
          onClose={fecharEdicao}
          onSubmit={editarMusica}
        />
      )}

      {musicaSelecionada && modalPlayerAberto && (
        <PlayerModal
          key={musicaSelecionada.id}
          visible={modalPlayerAberto}
          musica={musicaSelecionada}
          onClose={fecharPlayer}
          onPrevious={(reproduzir) => trocarMusica(-1, reproduzir)}
          onNext={(reproduzir) => trocarMusica(1, reproduzir)}
          temMaisDeUmaMusica={musicas.length > 1}
          autoPlay={reproduzirAutomaticamente}
        />
      )}
    </SafeAreaView>
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
    color: "#675F70",
  },
});
