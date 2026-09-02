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
              <Text style={styles.close}>×</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.cover}>
            <Text style={styles.note}>♫</Text>
          </View>

          <Text style={styles.title} numberOfLines={2}>
            {musica.titulo}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {musica.artista}
          </Text>
          <Text style={styles.genre}>{musica.genero}</Text>

          <View style={styles.progressBackground}>
            <View style={[styles.progress, { width: `${progresso * 100}%` }]} />
          </View>

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
              <Text style={styles.sideIcon}>⏮</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.playButton, !fonteAudio && styles.disabled]}
              onPress={alternarReproducao}
              disabled={!fonteAudio}
              accessibilityRole="button"
              accessibilityLabel={status.playing ? "Pausar" : "Reproduzir"}
            >
              <Text style={styles.playIcon}>{status.playing ? "⏸" : "▶"}</Text>
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
              <Text style={styles.sideIcon}>⏭</Text>
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

  close: {
    fontSize: 30,
    lineHeight: 30,
    color: "#4C4554",
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

  note: {
    fontSize: 66,
    color: "#7B45D3",
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

  progressBackground: {
    height: 6,
    marginTop: 28,
    borderRadius: 3,
    overflow: "hidden",
    backgroundColor: "#E5DEEB",
  },

  progress: {
    height: "100%",
    borderRadius: 3,
    backgroundColor: "#7B45D3",
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

  sideIcon: {
    fontSize: 30,
    color: "#3A3342",
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
    fontSize: 30,
    color: "#FFFFFF",
  },

  disabled: {
    opacity: 0.35,
  },
});
