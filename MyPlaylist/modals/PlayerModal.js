import { useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  setAudioModeAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
} from "expo-audio";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

import { obterArquivoMusica } from "../services/audio";

function formatarTempo(segundos) {
  if (!Number.isFinite(segundos) || segundos < 0) {
    return "0:00";
  }

  const minutos = Math.floor(segundos / 60);
  const segundosRestantes = Math.floor(segundos % 60)
    .toString()
    .padStart(2, "0");

  return `${minutos}:${segundosRestantes}`;
}

export default function PlayerModal({
  visible,
  musica,
  onClose,
  onPrevious,
  onNext,
  temMaisDeUmaMusica,
  autoPlay,
}) {
  const fonteAudio = obterArquivoMusica(musica.arquivo);
  const player = useAudioPlayer(fonteAudio, {
    updateInterval: 250,
  });
  const status = useAudioPlayerStatus(player);

  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true,
      interruptionMode: "doNotMix",
    }).catch((error) => {
      console.log("Erro ao configurar o áudio:", error);
    });
  }, []);

  useEffect(() => {
    if (autoPlay && fonteAudio && status.isLoaded) {
      player.play();
    }
  }, [autoPlay, fonteAudio, player, status.isLoaded]);

  useEffect(() => {
    if (status.didJustFinish && temMaisDeUmaMusica) {
      onNext(true);
    }
  }, [status.didJustFinish, temMaisDeUmaMusica, onNext]);

  async function alternarReproducao() {
    if (!fonteAudio) {
      Alert.alert(
        "Arquivo indisponível",
        "O arquivo associado a esta música não foi encontrado.",
      );
      return;
    }

    try {
      if (status.playing) {
        player.pause();
        return;
      }

      if (status.duration > 0 && status.currentTime >= status.duration - 0.2) {
        await player.seekTo(0);
      }

      player.play();
    } catch (error) {
      console.log("Erro ao reproduzir música:", error);
      Alert.alert("Erro no player", "Não foi possível reproduzir esta música.");
    }
  }

  function fecharPlayer() {
    if (status.playing) {
      player.pause();
    }

    onClose();
  }

  function trocarMusica(callback) {
    const continuarReproduzindo = status.playing;

    if (status.playing) {
      player.pause();
    }

    callback(continuarReproduzindo);
  }

  const progresso =
    status.duration > 0 ? Math.min(status.currentTime / status.duration, 1) : 0;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={fecharPlayer}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Tocando agora</Text>

            <TouchableOpacity onPress={fecharPlayer} hitSlop={10}>
              <Ionicons name="close" size={28} color="#4C4554" />
            </TouchableOpacity>
          </View>

          <View style={styles.cover}>
            <Ionicons name="musical-notes" size={64} color="#7B45D3" />
          </View>

          <Text style={styles.title} numberOfLines={2}>
            {musica.titulo}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {musica.artista}
          </Text>
          <Text style={styles.genre}>{musica.genero}</Text>

          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={status.duration || 1}
            value={status.currentTime}
            minimumTrackTintColor="#7B45D3"
            maximumTrackTintColor="#E5DEEB"
            thumbTintColor="#7B45D3"
            disabled={!status.isLoaded}
            onSlidingComplete={async (valor) => {
              await player.seekTo(valor);
            }}
          />

          <View style={styles.times}>
            <Text style={styles.time}>{formatarTempo(status.currentTime)}</Text>
            <Text style={styles.time}>{formatarTempo(status.duration)}</Text>
          </View>

          {status.error ? (
            <Text style={styles.error}>Não foi possível carregar o áudio.</Text>
          ) : !fonteAudio ? (
            <Text style={styles.error}>Arquivo de áudio não encontrado.</Text>
          ) : null}

          <View style={styles.controls}>
            <TouchableOpacity
              style={[
                styles.sideButton,
                !temMaisDeUmaMusica && styles.disabled,
              ]}
              onPress={() => trocarMusica(onPrevious)}
              disabled={!temMaisDeUmaMusica}
              accessibilityRole="button"
              accessibilityLabel="Música anterior"
            >
              <Ionicons name="play-skip-back" size={30} color="#3A3342" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.playButton, !fonteAudio && styles.disabled]}
              onPress={alternarReproducao}
              disabled={!fonteAudio}
              accessibilityRole="button"
              accessibilityLabel={status.playing ? "Pausar" : "Reproduzir"}
            >
              <Ionicons
                name={status.playing ? "pause" : "play"}
                size={34}
                color="#FFFFFF"
                style={!status.playing ? styles.playIcon : undefined}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.sideButton,
                !temMaisDeUmaMusica && styles.disabled,
              ]}
              onPress={() => trocarMusica(onNext)}
              disabled={!temMaisDeUmaMusica}
              accessibilityRole="button"
              accessibilityLabel="Próxima música"
            >
              <Ionicons name="play-skip-forward" size={30} color="#3A3342" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },

  modal: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 34,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#3A3342",
  },

  cover: {
    width: 132,
    height: 132,
    borderRadius: 30,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
    marginBottom: 20,
    backgroundColor: "#E9DDFF",
  },

  title: {
    textAlign: "center",
    fontSize: 23,
    fontWeight: "800",
    color: "#241F2E",
  },

  artist: {
    marginTop: 6,
    textAlign: "center",
    fontSize: 16,
    color: "#4E4657",
  },

  genre: {
    marginTop: 4,
    textAlign: "center",
    fontSize: 13,
    color: "#675F70",
  },

  slider: {
    width: "100%",
    height: 40,
    marginTop: 18,
  },

  times: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 7,
  },

  time: {
    fontSize: 12,
    color: "#675F70",
  },

  error: {
    marginTop: 12,
    textAlign: "center",
    color: "#A13245",
  },

  controls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  sideButton: {
    width: 58,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 18,
  },

  playButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7B45D3",
  },

  playIcon: {
    marginLeft: 3,
  },

  disabled: {
    opacity: 0.35,
  },
});
