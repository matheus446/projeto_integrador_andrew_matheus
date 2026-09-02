import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@myplaylist:musicas";

export async function salvarMusicas(musicas) {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(musicas)
    );
  } catch (error) {
    console.log("Erro ao salvar músicas:", error);
  }
}

export async function carregarMusicas() {
  try {
    const dados = await AsyncStorage.getItem(STORAGE_KEY);

    if (dados) {
      return JSON.parse(dados);
    }

    return [];
  } catch (error) {
    console.log("Erro ao carregar músicas:", error);
    return [];
  }
}