import musicFiles from "../data/musicFiles";

export function obterArquivoMusica(nomeArquivo) {
  const musicaEncontrada = musicFiles.find((item) => item.nome === nomeArquivo);

  return musicaEncontrada?.arquivo || null;
}
