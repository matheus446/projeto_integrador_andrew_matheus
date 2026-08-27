# 🎵 MyPlaylist — Plano de Desenvolvimento para Dupla

## Projeto Integrador — Programação para Dispositivos Móveis / Persistência de Dados

Este documento foi feito para orientar **duas pessoas trabalhando no mesmo projeto**, com divisão equilibrada de dificuldade e quantidade de trabalho.

A ideia principal é evitar que cada integrante faça arquivos aleatórios sem saber como eles se conectam. Cada tarefa abaixo foi colocada em uma ordem lógica, considerando as dependências entre arquivos.

---

# 1. Objetivo do projeto

O **MyPlaylist** será um aplicativo mobile em React Native + Expo para criar e reproduzir uma playlist local.

O usuário poderá:

- visualizar as músicas cadastradas;
- cadastrar uma música;
- escolher um arquivo `.mp3` disponível no aplicativo;
- editar uma música;
- excluir uma música;
- reproduzir uma música;
- pausar a reprodução;
- avançar para a próxima música;
- voltar para a música anterior;
- fechar o player e continuar vendo a playlist;
- fechar e abrir o aplicativo sem perder as músicas cadastradas.

## Tecnologias principais

- React Native
- Expo
- React Navigation
- `@react-native-async-storage/async-storage`
- `expo-audio`
- JavaScript / JSX

---

# 2. Estrutura do projeto

A estrutura planejada é:

```text
MyPlaylist/
│
├── assets/
│   └── musicas/
│       ├── musica01.mp3
│       ├── musica02.mp3
│       ├── musica03.mp3
│       └── ...
│
├── components/
│   ├── MusicCard.js
│   └── MusicForm.js
│
├── data/
│   └── musicFiles.js
│
├── modals/
│   ├── AddMusicModal.js
│   ├── EditMusicModal.js
│   ├── FileSelectorModal.js
│   └── PlayerModal.js
│
├── navigation/
│   └── AppNavigator.js
│
├── screens/
│   └── HomeScreen.js
│
├── services/
│   ├── audio.js
│   └── storage.js
│
├── App.js
├── app.json
├── package.json
└── README.md
```

---

# 3. Regra principal da arquitetura

Antes de começar, entendam a função de cada pasta.

```text
App.js
→ ponto de entrada

navigation/
→ navegação entre telas

screens/
→ telas completas e estado principal daquela tela

components/
→ componentes reutilizáveis da interface

modals/
→ interações temporárias sobre a tela atual

services/
→ comunicação com recursos externos, persistência e lógica técnica

data/
→ informações fixas usadas pelo aplicativo

assets/
→ arquivos físicos, como os MP3
```

## Regra de ouro

Um arquivo deve fazer **uma coisa principal**.

Evitem transformar `HomeScreen.js` em um arquivo que:

- desenha tudo;
- cria todos os formulários;
- controla todo o player;
- acessa diretamente todos os detalhes do áudio;
- possui todos os estilos;
- possui todo o código de armazenamento.

A tela pode coordenar essas partes, mas não precisa implementar tudo internamente.

---

# 4. Divisão da dupla

## 👤 MEMBRO A — Playlist, CRUD e Persistência

Responsabilidade principal:

- entrada da aplicação;
- navegação;
- tela principal;
- cards das músicas;
- estado da playlist;
- CRUD;
- AsyncStorage;
- integração da playlist com o player.

Arquivos principais:

```text
App.js
navigation/AppNavigator.js
screens/HomeScreen.js
components/MusicCard.js
services/storage.js
```

---

## 👤 MEMBRO B — Formulário, Modais e Áudio

Responsabilidade principal:

- formulário;
- cadastro;
- edição;
- seleção de arquivo;
- arquivos MP3;
- modal do player;
- reprodução de áudio.

Arquivos principais:

```text
components/MusicForm.js
modals/AddMusicModal.js
modals/EditMusicModal.js
modals/FileSelectorModal.js
modals/PlayerModal.js
data/musicFiles.js
services/audio.js
```

---

# 5. Como a divisão funciona

A arquitetura pode ser visualizada assim:

```text
                         App.js
                           │
                           ▼
                  AppNavigator.js
                           │
                           ▼
                     HomeScreen
                           │
              ┌────────────┼────────────┐
              │            │            │
              ▼            ▼            ▼
         MusicCard    AddMusicModal   PlayerModal
                           │            │
                           ▼            ▼
                       MusicForm    expo-audio
                           │
                           ▼
                  FileSelectorModal


HomeScreen
    │
    ▼
storage.js
    │
    ▼
AsyncStorage
```

O mais importante é entender as **fronteiras**:

- O `MusicCard` mostra uma música.
- O `HomeScreen` controla a lista.
- O `MusicForm` coleta dados.
- Os modais controlam interações temporárias.
- O `storage.js` cuida do AsyncStorage.
- O `PlayerModal` cuida da interface e da reprodução.
- O `HomeScreen` sabe qual música está selecionada e qual é a próxima/anterior.

---

# 6. Ordem geral do desenvolvimento

Não desenvolvam o projeto inteiro de uma vez.

A ordem recomendada é:

```text
ETAPA 1
Base do projeto
        ↓
ETAPA 2
Home + MusicCard
        ↓
ETAPA 3
MusicForm + AddMusicModal
        ↓
ETAPA 4
FileSelectorModal + musicFiles
        ↓
ETAPA 5
CRUD
        ↓
ETAPA 6
AsyncStorage
        ↓
ETAPA 7
EditMusicModal
        ↓
ETAPA 8
PlayerModal + áudio
        ↓
ETAPA 9
Próxima / anterior
        ↓
ETAPA 10
Validação, testes e acabamento
```

Os integrantes podem trabalhar em paralelo, mas **não pulem as dependências**.

---

# ============================================================
# 👤 MEMBRO A
# ============================================================

# 7. Responsabilidade do Membro A

Você será a pessoa responsável pela **estrutura da aplicação e pelo gerenciamento da playlist**.

Seu trabalho não é controlar diretamente os campos do formulário nem implementar todos os detalhes do áudio.

Seu foco é:

```text
Aplicativo
   ↓
Home
   ↓
Lista
   ↓
CRUD
   ↓
Persistência
```

Você também vai participar da integração do player posteriormente.

---

# 8. A1 — Verificar a base do projeto

Primeiro, abra o projeto e garanta que ele inicia corretamente.

Execute:

```bash
npm install
```

Depois:

```bash
npx expo start
```

O aplicativo precisa abrir sem erro antes de vocês começarem a adicionar funcionalidades.

### O que conferir

- `package.json` existe.
- Dependências estão instaladas.
- Expo inicia.
- O celular/emulador consegue abrir o projeto.
- Não há erro relacionado a importações.

Não comece pelo CRUD se a base ainda estiver quebrada.

---

# 9. A2 — App.js

O `App.js` deve ser mínimo.

Objetivo:

```text
App.js
  ↓
AppNavigator
```

A ideia é:

```jsx
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  return <AppNavigator />;
}
```

## O que NÃO colocar no App.js

Não coloque:

```text
useState da música
useState do formulário
AsyncStorage
FlatList
lógica do player
funções de CRUD
```

O `App.js` só inicia a aplicação.

---

# 10. A3 — AppNavigator.js

O `AppNavigator.js` será responsável pela navegação.

Inicialmente vocês podem ter somente:

```text
Home
```

O conceito é:

```jsx
<NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen
            name="Home"
            component={HomeScreen}
        />
    </Stack.Navigator>
</NavigationContainer>
```

## Por que usar Navigation se temos uma única tela?

Porque o objetivo é manter uma arquitetura correta.

Caso futuramente vocês criem:

```text
Configurações
Sobre
Detalhes
```

o Navigator já é o responsável por isso.

Enquanto os Modais continuam sendo utilizados para:

```text
Adicionar música
Editar música
Selecionar arquivo
Player
```

---

# 11. A4 — Criar o HomeScreen básico

Arquivo:

```text
screens/HomeScreen.js
```

Primeiro crie somente:

```text
HomeScreen
├── título
├── botão adicionar
└── FlatList
```

Ainda não precisa de AsyncStorage.

Ainda não precisa do player.

Ainda não precisa de edição.

## Estado inicial

Comece com uma lista temporária:

```jsx
const [musicas, setMusicas] = useState([
  {
    id: 1,
    titulo: "Believer",
    artista: "Imagine Dragons",
    genero: "Rock",
    arquivo: "musica01.mp3",
  }
]);
```

Isso serve somente para testar a interface.

Depois esse array será substituído pelos dados reais carregados do AsyncStorage.

---

# 12. A5 — Criar MusicCard.js

Arquivo:

```text
components/MusicCard.js
```

O `MusicCard` recebe uma música através de `props`.

Exemplo de estrutura:

```jsx
function MusicCard({
  musica,
  onPress,
  onEdit,
  onDelete
}) {
```

O card pode mostrar:

```text
🎵 Título
   Artista
   Gênero

   ⋮
```

E ter ações:

```text
clicar no card
→ abrir player

editar
→ abrir edição

excluir
→ excluir música
```

## Regra importante

O card **não deve salvar nada**.

Evite:

```jsx
// NÃO faça isso dentro do MusicCard
AsyncStorage.setItem(...)
```

O componente apenas informa:

```text
"Usuário clicou em excluir."
```

E o `HomeScreen` decide o que fazer.

---

# 13. A6 — Conectar MusicCard ao FlatList

No `HomeScreen`:

```jsx
<FlatList
  data={musicas}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <MusicCard
      musica={item}
      onPress={() => abrirPlayer(item)}
      onEdit={() => abrirEdicao(item)}
      onDelete={() => excluirMusica(item.id)}
    />
  )}
/>
```

Você pode criar primeiro essas funções como placeholders:

```jsx
function abrirPlayer(musica) {
  console.log(musica);
}

function abrirEdicao(musica) {
  console.log(musica);
}

function excluirMusica(id) {
  console.log(id);
}
```

Não precisa implementar tudo imediatamente.

---

# 14. A7 — Implementar storage.js

Arquivo:

```text
services/storage.js
```

Esse arquivo cuida do AsyncStorage.

A lógica básica será:

```jsx
const STORAGE_KEY = "@myplaylist:musicas";
```

Salvar:

```jsx
await AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(musicas)
);
```

Carregar:

```jsx
const dados = await AsyncStorage.getItem(STORAGE_KEY);

return dados ? JSON.parse(dados) : [];
```

## Conceito que precisa ser entendido

O AsyncStorage trabalha com texto.

Por isso:

```text
Array JS
    ↓
JSON.stringify()
    ↓
String
    ↓
AsyncStorage
```

E na leitura:

```text
AsyncStorage
    ↓
String
    ↓
JSON.parse()
    ↓
Array JS
```

---

# 15. A8 — Criar o carregamento inicial

No `HomeScreen`, use `useEffect`.

Conceito:

```jsx
useEffect(() => {
    carregar();
}, []);
```

E:

```jsx
async function carregar() {
    const dados = await carregarMusicas();
    setMusicas(dados);
}
```

## O que isso significa?

Quando o `HomeScreen` é montado:

```text
Home abre
   ↓
carregar()
   ↓
storage.js
   ↓
AsyncStorage
   ↓
dados
   ↓
setMusicas()
   ↓
FlatList atualiza
```

---

# 16. A9 — Implementar CREATE

Quando o Membro B terminar o `AddMusicModal`, ele enviará para você os dados preenchidos.

Você receberá algo semelhante a:

```js
{
    titulo: "Believer",
    artista: "Imagine Dragons",
    genero: "Rock",
    arquivo: "musica01.mp3"
}
```

Você deve adicionar um ID:

```jsx
const novaMusica = {
    id: Date.now(),
    ...dados
};
```

Depois crie uma nova lista:

```jsx
const novaLista = [
    ...musicas,
    novaMusica
];
```

E faça:

```jsx
setMusicas(novaLista);
await salvarMusicas(novaLista);
```

## Por que criar uma nova lista?

Porque é importante atualizar o estado com uma nova referência.

Evite alterar diretamente:

```js
musicas.push(novaMusica);
```

Prefira:

```js
const novaLista = [...musicas, novaMusica];
```

---

# 17. A10 — Implementar READ

O READ acontece em dois lugares:

### Listagem

O `FlatList` lê:

```jsx
data={musicas}
```

### Persistência

O `HomeScreen` lê do AsyncStorage através de:

```jsx
carregarMusicas()
```

Então o fluxo completo é:

```text
AsyncStorage
   ↓
carregarMusicas()
   ↓
setMusicas()
   ↓
FlatList
```

---

# 18. A11 — Implementar DELETE

Use `filter()`.

Exemplo:

```jsx
const novaLista = musicas.filter(
    item => item.id !== id
);

setMusicas(novaLista);
await salvarMusicas(novaLista);
```

O fluxo:

```text
Usuário toca excluir
        ↓
MusicCard dispara onDelete
        ↓
HomeScreen recebe ID
        ↓
filter()
        ↓
setMusicas()
        ↓
salvarMusicas()
```

## Recomendação

Antes de excluir, vocês podem usar um `Alert.alert()` de confirmação.

Não é obrigatório, mas evita exclusão acidental.

---

# 19. A12 — Implementar UPDATE

O UPDATE será usado pelo `EditMusicModal`.

Você receberá a música já alterada:

```js
{
    id: 1,
    titulo: "Novo título",
    artista: "Novo artista",
    genero: "Pop",
    arquivo: "musica02.mp3"
}
```

Use `map()`:

```jsx
const novaLista = musicas.map(item =>
    item.id === musicaEditada.id
        ? musicaEditada
        : item
);
```

Depois:

```jsx
setMusicas(novaLista);
await salvarMusicas(novaLista);
```

## Entenda a ideia

`map()` passa por todas as músicas.

Quando encontra a música com o mesmo ID:

```text
ID igual
→ substitui
```

Caso contrário:

```text
ID diferente
→ mantém
```

---

# 20. A13 — Estado da música selecionada

Agora você começará a preparar a integração com os Modais.

Use algo como:

```jsx
const [musicaSelecionada, setMusicaSelecionada] =
    useState(null);
```

Quando o usuário tocar uma música:

```jsx
setMusicaSelecionada(musica);
```

E depois:

```jsx
setPlayerAberto(true);
```

O conceito é:

```text
clicou em Believer
        ↓
musicaSelecionada = Believer
        ↓
playerAberto = true
```

---

# 21. A14 — Próxima e anterior

A playlist pertence ao `HomeScreen`, então o cálculo da próxima e anterior fica aqui.

Para descobrir a posição:

```jsx
const indiceAtual = musicas.findIndex(
    item => item.id === musicaSelecionada.id
);
```

Próxima:

```jsx
const proxima = musicas[indiceAtual + 1];
```

Anterior:

```jsx
const anterior = musicas[indiceAtual - 1];
```

## Atenção aos limites

Se a música for a última:

```text
indiceAtual + 1
```

pode não existir.

Você precisa decidir uma regra.

A opção mais simples:

```text
primeira música
→ anterior desabilitado

última música
→ próxima desabilitada
```

Isso é mais simples do que criar repetição automática da playlist.

---

# 22. Checklist do Membro A

Antes de considerar sua parte principal pronta:

```text
[ ] App.js funciona
[ ] AppNavigator funciona
[ ] HomeScreen aparece
[ ] FlatList funciona
[ ] MusicCard aparece
[ ] Criar funciona
[ ] Listar funciona
[ ] Editar funciona
[ ] Excluir funciona
[ ] AsyncStorage salva
[ ] AsyncStorage carrega
[ ] Dados permanecem depois de fechar o app
[ ] Música selecionada pode ser armazenada no estado
[ ] Próxima/anterior podem ser calculadas
```

---

# ============================================================
# 👤 MEMBRO B
# ============================================================

# 23. Responsabilidade do Membro B

Você será responsável pela parte de **interação, formulários e reprodução de áudio**.

Seu fluxo principal é:

```text
Formulário
   ↓
Cadastro / Edição
   ↓
Seleção do MP3
   ↓
Player
   ↓
Áudio
```

---

# 24. B1 — Criar a pasta de arquivos MP3

Primeiro, adicionem:

```text
assets/
└── musicas/
```

Coloque alguns MP3 de teste.

Recomendação:

Comece com:

```text
musica01.mp3
musica02.mp3
musica03.mp3
```

Não comecem com 30 músicas.

Quanto menos arquivos existirem no começo, mais fácil será descobrir erros.

---

# 25. B2 — Criar data/musicFiles.js

Esse arquivo terá a relação entre:

```text
nome que o usuário vê
        +
arquivo físico usado pelo Expo
```

Exemplo:

```jsx
const musicFiles = [
    {
        nome: "musica01.mp3",
        arquivo: require("../assets/musicas/musica01.mp3")
    },
    {
        nome: "musica02.mp3",
        arquivo: require("../assets/musicas/musica02.mp3")
    }
];

export default musicFiles;
```

## Regra importante

Não tentem fazer:

```jsx
require("../assets/musicas/" + nome)
```

O React Native/Metro precisa conhecer estaticamente os arquivos empacotados.

Por isso mantenham os `require()` escritos diretamente no arquivo.

---

# 26. B3 — Criar MusicForm.js

Arquivo:

```text
components/MusicForm.js
```

Esse componente será responsável pelos campos:

```text
Título
Artista
Gênero
Arquivo
```

Os estados podem ser locais:

```jsx
const [titulo, setTitulo] = useState("");
const [artista, setArtista] = useState("");
const [genero, setGenero] = useState("");
const [arquivo, setArquivo] = useState("");
```

---

# 27. Como o formulário deve funcionar

O formulário não deve decidir o que acontece depois de salvar.

Ele recebe uma função:

```jsx
onSubmit
```

Quando o usuário terminar:

```jsx
onSubmit({
    titulo,
    artista,
    genero,
    arquivo
});
```

Dessa maneira:

```text
MusicForm
   ↓
gera dados
   ↓
onSubmit()
```

E quem decide o que fazer com esses dados será o componente acima dele.

---

# 28. B4 — Validação do formulário

Antes de chamar `onSubmit`, verifique os campos.

Exemplo:

```jsx
if (!titulo.trim()) {
    Alert.alert(
        "Atenção",
        "Digite o título da música."
    );
    return;
}
```

Faça algo semelhante para:

```text
artista
gênero
arquivo
```

Não permita cadastrar uma música completamente vazia.

---

# 29. B5 — Criar AddMusicModal.js

Arquivo:

```text
modals/AddMusicModal.js
```

Esse modal deve conter o `MusicForm`.

A estrutura:

```text
AddMusicModal
      │
      ▼
  MusicForm
      │
      ├── Título
      ├── Artista
      ├── Gênero
      └── Arquivo
```

O modal também pode possuir:

```text
Cancelar
Adicionar
```

## O que o modal faz?

Ele controla a abertura/fechamento da janela.

O formulário controla os campos.

O HomeScreen controla o cadastro final.

---

# 30. B6 — Conexão entre AddMusicModal e HomeScreen

O `HomeScreen` deverá controlar:

```jsx
const [adicionarAberto, setAdicionarAberto] =
    useState(false);
```

E renderizar:

```jsx
<AddMusicModal
    visible={adicionarAberto}
    onClose={() => setAdicionarAberto(false)}
    onSubmit={cadastrarMusica}
/>
```

A função `cadastrarMusica` pertence ao `HomeScreen`.

Então:

```text
Membro B
AddMusicModal
      ↓
onSubmit(dados)
      ↓
Membro A
HomeScreen
      ↓
CRUD
      ↓
AsyncStorage
```

Não faça o AsyncStorage dentro do `AddMusicModal`.

---

# 31. B7 — Criar FileSelectorModal.js

Quando o usuário toca em:

```text
Arquivo ▼
```

deve aparecer uma lista.

Exemplo:

```text
Selecionar arquivo

○ musica01.mp3
○ musica02.mp3
○ musica03.mp3
```

O `FileSelectorModal` recebe os arquivos:

```jsx
musicFiles
```

e uma função:

```jsx
onSelect
```

Quando escolher:

```jsx
onSelect("musica02.mp3");
```

---

# 32. B8 — Como o arquivo selecionado volta ao formulário

O fluxo será:

```text
MusicForm
     ↓
usuário toca "Arquivo"
     ↓
FileSelectorModal
     ↓
usuário seleciona musica02.mp3
     ↓
onSelect()
     ↓
setArquivo("musica02.mp3")
     ↓
campo do formulário atualiza
```

O `MusicForm` deve mostrar:

```text
Arquivo
[musica02.mp3        ▼]
```

---

# 33. B9 — Criar EditMusicModal.js

O EditMusicModal reutilizará o mesmo `MusicForm`.

A ideia é:

```text
AddMusicModal
      ↓
   MusicForm

EditMusicModal
      ↓
   MusicForm
```

Isso evita duplicação.

---

# 34. Como preencher o formulário na edição

Quando o modal recebe:

```js
musica
```

ele deve preencher:

```text
Título → musica.titulo
Artista → musica.artista
Gênero → musica.genero
Arquivo → musica.arquivo
```

O formulário deve funcionar tanto para:

```text
modo criar
```

quanto:

```text
modo editar
```

Uma solução simples é passar valores iniciais e, quando o objeto de edição mudar, atualizar os estados.

Conceito:

```jsx
useEffect(() => {
    if (musicaInicial) {
        setTitulo(musicaInicial.titulo);
        setArtista(musicaInicial.artista);
        setGenero(musicaInicial.genero);
        setArquivo(musicaInicial.arquivo);
    }
}, [musicaInicial]);
```

---

# 35. B10 — PlayerModal.js

Esse será o arquivo tecnicamente mais delicado da sua parte.

Estrutura visual:

```text
┌──────────────────────────────┐
│                              │
│          🎵                  │
│       Believer               │
│     Imagine Dragons          │
│                              │
│     ━━━━━━━●────────         │
│                              │
│      ⏮️   ⏸️   ⏭️             │
│                              │
│            Fechar            │
└──────────────────────────────┘
```

O modal deve aparecer sobre a tela principal sem substituir a playlist.

---

# 36. B11 — Primeiramente faça somente Play/Pause

Não tente criar tudo de uma vez.

Primeiro:

```text
abrir música
      ↓
carregar áudio
      ↓
play
      ↓
pause
```

Somente quando isso funcionar, implemente:

```text
próxima
anterior
progresso
```

---

# 37. B12 — expo-audio

No player, vocês utilizarão a API de áudio do Expo.

O conceito básico é:

```jsx
const player = useAudioPlayer(source);
```

E o controle:

```jsx
player.play();
```

Pausa:

```jsx
player.pause();
```

Acompanhar o estado:

```jsx
const status = useAudioPlayerStatus(player);
```

A implementação exata deve ser feita conforme a versão instalada do `expo-audio`, porque APIs podem mudar entre versões.

## Regra

Não copie códigos antigos de `expo-av` encontrados aleatoriamente na internet.

O projeto está sendo construído com `expo-audio`.

---

# 38. B13 — Encontrar o arquivo físico da música

Aqui existe uma diferença importante:

No AsyncStorage salvaremos:

```text
"musica02.mp3"
```

Mas o player precisa receber o recurso:

```text
require("../assets/musicas/musica02.mp3")
```

Por isso `musicFiles.js` existe.

Você pode procurar:

```jsx
const arquivoAtual = musicFiles.find(
    item => item.nome === musica.arquivo
);
```

Então:

```text
musica.arquivo
      ↓
"musica02.mp3"
      ↓
musicFiles
      ↓
require(...)
      ↓
player
```

Esse é um dos principais pontos de integração do projeto.

---

# 39. B14 — Barra de progresso

Depois do Play/Pause funcionando, utilizem o estado do player para descobrir:

```text
currentTime
duration
```

Visualmente:

```text
00:34 ━━━━━━━●──────── 03:24
```

Não é obrigatório que a barra seja sofisticada.

Uma simples `View` ou componente de progresso já pode funcionar.

Primeiro faça a informação aparecer corretamente.

Depois pense em tornar a barra clicável, caso ainda haja tempo.

---

# 40. B15 — Player recebe a música do HomeScreen

O `HomeScreen` vai passar:

```jsx
<PlayerModal
    visible={playerAberto}
    musica={musicaSelecionada}
    onClose={fecharPlayer}
    onProxima={proximaMusica}
    onAnterior={musicaAnterior}
/>
```

O player então recebe a música atual.

Você não precisa descobrir qual é a próxima música sozinho.

O `HomeScreen` sabe disso porque conhece:

```text
lista completa
índice atual
```

Isso mantém a responsabilidade bem separada.

---

# 41. Checklist do Membro B

Antes de considerar sua parte principal pronta:

```text
[ ] MP3s estão em assets/musicas
[ ] musicFiles.js funciona
[ ] MusicForm funciona
[ ] Validação funciona
[ ] AddMusicModal funciona
[ ] FileSelectorModal funciona
[ ] Arquivo escolhido aparece no formulário
[ ] EditMusicModal funciona
[ ] Formulário pode carregar valores antigos
[ ] PlayerModal abre
[ ] Play funciona
[ ] Pause funciona
[ ] Próxima funciona
[ ] Anterior funciona
[ ] Barra de progresso funciona
[ ] Player pode ser fechado
```

---

# ============================================================
# 🔗 INTEGRAÇÃO DOS DOIS
# ============================================================

# 42. Primeiro ponto de integração — Cadastro

Quando:

- Membro A tiver `HomeScreen`;
- Membro B tiver `MusicForm` + `AddMusicModal`;

façam a primeira integração.

Fluxo:

```text
HomeScreen
   ↓
Adicionar música
   ↓
AddMusicModal
   ↓
MusicForm
   ↓
usuário preenche
   ↓
onSubmit(dados)
   ↓
HomeScreen
   ↓
cria objeto com ID
   ↓
setMusicas()
   ↓
FlatList
```

## Teste

Cadastrem:

```text
Título: Believer
Artista: Imagine Dragons
Gênero: Rock
Arquivo: musica01.mp3
```

A música precisa aparecer imediatamente na lista.

---

# 43. Segundo ponto de integração — Persistência

Depois do cadastro estar funcionando:

```text
HomeScreen
   ↓
salvarMusicas()
   ↓
AsyncStorage
```

Teste:

```text
1. Cadastre uma música.
2. Feche o aplicativo.
3. Abra novamente.
4. A música deve continuar lá.
```

Se ela sumir, não avancem para o player ainda.

Primeiro resolvam a persistência.

---

# 44. Terceiro ponto de integração — Edição

Fluxo:

```text
MusicCard
   ↓
Editar
   ↓
EditMusicModal
   ↓
MusicForm preenchido
   ↓
alteração
   ↓
onSubmit()
   ↓
HomeScreen
   ↓
map()
   ↓
salvarMusicas()
```

Teste:

```text
Believer
↓
alterar gênero para Pop
↓
Salvar
↓
lista mostra Pop
↓
fechar app
↓
abrir
↓
Pop continua
```

---

# 45. Quarto ponto de integração — Exclusão

Fluxo:

```text
MusicCard
   ↓
Excluir
   ↓
HomeScreen
   ↓
filter()
   ↓
salvarMusicas()
```

Teste:

```text
Excluir
↓
música desapareceu
↓
fechar app
↓
abrir
↓
música continua excluída
```

---

# 46. Quinto ponto de integração — Player

Somente depois do CRUD funcionar.

Fluxo:

```text
MusicCard
   ↓
onPress()
   ↓
HomeScreen
   ↓
musicaSelecionada
   ↓
PlayerModal
   ↓
musicFiles.js
   ↓
arquivo MP3
   ↓
expo-audio
```

---

# 47. Próxima e anterior

Essa parte deve ser feita em conjunto.

## Membro A

Calcula:

```text
música atual
índice atual
próxima
anterior
```

## Membro B

Faz:

```text
PlayerModal
↓
recebe nova música
↓
carrega o novo áudio
```

### Regra importante

Quando mudar de música, o player precisa deixar de tocar a música antiga e passar a tocar a nova.

Não permitam que duas músicas sejam reproduzidas simultaneamente.

---

# 48. Comunicação entre componentes

Vocês precisam entender `props` e callbacks.

Exemplo:

```text
HomeScreen
    ↓
passa musica
    ↓
MusicCard
```

E:

```text
MusicCard
    ↓
onPress()
    ↓
HomeScreen
```

Isso significa:

```text
Pai
 ↓
passa dados
 ↓
Filho

Filho
 ↓
callback
 ↓
Pai
```

Esse padrão aparecerá no projeto inteiro.

---

# 49. Estados que pertencem a cada lugar

Para evitar confusão, usem esta regra.

## HomeScreen

Pode controlar:

```text
musicas
musicaSelecionada
modal aberto/fechado
```

## MusicForm

Pode controlar:

```text
titulo
artista
genero
arquivo
```

## PlayerModal

Pode controlar:

```text
estado da reprodução
progresso
```

## AppNavigator

Não deve controlar dados da playlist.

## App.js

Não deve controlar dados da playlist.

---

# 50. O que NÃO fazer

## ❌ Não colocar AsyncStorage no MusicCard

Errado:

```text
MusicCard
    ↓
AsyncStorage
```

Certo:

```text
MusicCard
    ↓
callback
    ↓
HomeScreen
    ↓
storage.js
```

---

## ❌ Não colocar todo o formulário no HomeScreen

Evitem:

```text
HomeScreen
├── titulo
├── artista
├── genero
├── arquivo
├── validação
├── seletor
├── modal
└── ...
```

Use:

```text
HomeScreen
   ↓
AddMusicModal
   ↓
MusicForm
```

---

## ❌ Não colocar toda a aplicação no App.js

`App.js` deve ser pequeno.

---

## ❌ Não criar uma tela para cada pequeno comportamento

Não precisa:

```text
ArquivoScreen
PlayerScreen
EditarScreen
AdicionarScreen
```

quando a proposta é justamente usar modais.

---

## ❌ Não implementar o player primeiro

O player é a parte tecnicamente mais sensível.

Primeiro:

```text
CRUD
↓
AsyncStorage
↓
Player
```

---

# 51. Estratégia de Git para os dois

Cada integrante deve fazer commits próprios.

## Membro A

Exemplos:

```bash
git add .
git commit -m "feat: cria estrutura de navegacao"
```

```bash
git commit -m "feat: cria tela principal e lista de musicas"
```

```bash
git commit -m "feat: adiciona MusicCard"
```

```bash
git commit -m "feat: implementa persistencia com AsyncStorage"
```

```bash
git commit -m "feat: implementa CRUD de musicas"
```

---

## Membro B

Exemplos:

```bash
git add .
git commit -m "feat: cria MusicForm"
```

```bash
git commit -m "feat: cria modal de cadastro"
```

```bash
git commit -m "feat: adiciona seletor de arquivos"
```

```bash
git commit -m "feat: cria modal de edicao"
```

```bash
git commit -m "feat: implementa player de audio"
```

---

# 52. Não façam um único commit gigante

Evitem:

```text
"projeto pronto"
```

com centenas de alterações.

O professor quer histórico dos dois integrantes.

Commits pequenos mostram claramente:

```text
quem fez o quê
quando foi feito
como o projeto evoluiu
```

---

# 53. Como integrar branches sem bagunça

Exemplo:

```text
main
│
├── feature/membro-a
└── feature/membro-b
```

Cada um trabalha na sua branch.

Quando uma parte estiver pronta:

```text
commit
↓
push
↓
Pull Request
↓
revisão
↓
merge
```

Se vocês ainda não tiverem experiência com Pull Request, podem usar merge direto, desde que mantenham as branches organizadas.

---

# 54. Ordem recomendada dos merges

Uma ordem segura:

```text
1. Membro A → base + Home + MusicCard
          ↓
2. Membro B → Form + AddModal + FileSelector
          ↓
3. integração do cadastro
          ↓
4. Membro A → storage + CRUD
          ↓
5. Membro B → EditModal
          ↓
6. integração da edição
          ↓
7. Membro B → Player
          ↓
8. integração do player
```

---

# 55. Teste de instalação limpa

Antes da entrega, ambos devem fazer o teste.

A ideia é garantir que o projeto não funciona apenas porque alguma coisa ficou instalada na máquina de um dos dois.

Façam:

```bash
npm install
```

Depois:

```bash
npx expo start
```

E testem no dispositivo.

---

# 56. Checklist final do projeto

## Interface

```text
[ ] Home organizada
[ ] FlatList funcionando
[ ] Cards funcionando
[ ] Modal de cadastro funcionando
[ ] Modal de edição funcionando
[ ] Seletor de arquivos funcionando
[ ] Player funcionando
```

## CRUD

```text
[ ] Create
[ ] Read
[ ] Update
[ ] Delete
```

## Persistência

```text
[ ] Salva
[ ] Carrega
[ ] Dados continuam após fechar o app
```

## Player

```text
[ ] Play
[ ] Pause
[ ] Próxima
[ ] Anterior
[ ] Fechar player
[ ] Não toca duas músicas ao mesmo tempo
```

## Código

```text
[ ] App.js pequeno
[ ] Navegação separada
[ ] Componentes separados
[ ] Modais separados
[ ] Persistência separada
[ ] Sem código duplicado desnecessariamente
[ ] Nomes de funções claros
```

## GitHub

```text
[ ] Membro A possui commits
[ ] Membro B possui commits
[ ] Histórico mostra participação dos dois
[ ] Projeto sobe corretamente para o GitHub
```

---

# 57. Perguntas que cada membro deve conseguir responder

O professor pode perguntar qualquer coisa do projeto para qualquer integrante.

Os dois precisam saber responder:

### Por que usaram AsyncStorage?

Porque os dados da playlist são simples, pequenos e locais. Não existe necessidade de um banco relacional complexo para o escopo do projeto.

### Por que não salvar o MP3 no AsyncStorage?

Porque o AsyncStorage é usado para os dados da aplicação, como título, artista, gênero e nome do arquivo. Os MP3 são recursos do próprio aplicativo e ficam em `assets`.

### Por que usar FlatList?

Porque precisamos renderizar uma lista de músicas de forma apropriada no React Native.

### Por que criar MusicCard?

Porque cada música possui a mesma estrutura visual e o componente pode ser reutilizado para todos os itens da lista.

### Por que usar Modals?

Porque cadastro, edição, seleção de arquivo e player são interações temporárias que não precisam substituir a tela principal.

### Por que o estado do formulário está no MusicForm?

Porque título, artista, gênero e arquivo pertencem diretamente ao formulário.

### Por que o estado da playlist fica no HomeScreen?

Porque a tela principal precisa coordenar a lista, CRUD e comunicação com os outros componentes.

### Por que o App.js é pequeno?

Porque ele funciona apenas como ponto de entrada. A navegação e a lógica da aplicação são separadas em arquivos próprios.

### Por que musicFiles.js existe?

Porque precisamos relacionar o nome salvo da música ao arquivo físico empacotado no aplicativo.

---

# 58. Dificuldade esperada

## Membro A

### Aproximadamente 3/5

Partes mais trabalhosas:

```text
HomeScreen
CRUD
AsyncStorage
Integração
```

O maior desafio é organizar corretamente o estado.

---

## Membro B

### Aproximadamente 3,5–4/5

Partes mais trabalhosas:

```text
PlayerModal
expo-audio
seleção do arquivo
integração do player com a lista
```

A quantidade de arquivos é maior, mas muitos deles são pequenos.

---

# 59. Ordem de prioridade

Caso vocês estejam com pouco tempo, sigam esta prioridade:

## Obrigatório

```text
1. Home
2. FlatList
3. Cadastro
4. Listagem
5. Edição
6. Exclusão
7. AsyncStorage
```

## Diferencial principal

```text
8. Play
9. Pause
10. Próxima
11. Anterior
```

## Melhorias

```text
12. Barra de progresso
13. Melhorias visuais
14. Validações mais completas
15. Animações
```

Nunca sacrifiquem o CRUD para colocar um player cheio de funções.

O trabalho será avaliado primeiro pelo que foi exigido.

---

# 60. Resultado final esperado

Quando estiver tudo pronto, o fluxo será:

```text
                    ┌───────────────┐
                    │  MyPlaylist   │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │ HomeScreen    │
                    └───────┬───────┘
                            │
              ┌─────────────┼──────────────┐
              │             │              │
              ▼             ▼              ▼
         Adicionar       MusicCard       Player
              │             │              │
              ▼             │              ▼
        AddMusicModal       │          PlayerModal
              │             │              │
              ▼             │              ▼
         MusicForm          │         expo-audio
              │             │
              ▼             │
       FileSelector         │
              │             │
              └──────┬──────┘
                     ▼
                 HomeScreen
                     │
             ┌───────┼────────┐
             ▼       ▼        ▼
           Criar   Editar   Excluir
             │       │        │
             └───────┼────────┘
                     ▼
                 storage.js
                     │
                     ▼
               AsyncStorage
```

---

# 61. Regra final para a dupla

A divisão do trabalho existe para vocês conseguirem desenvolver mais rápido.

Ela **não significa que um integrante pode ignorar a parte do outro**.

Antes da apresentação, os dois devem conseguir explicar:

- como a navegação funciona;
- como a `FlatList` recebe os dados;
- como uma música é criada;
- como ela é atualizada;
- como ela é excluída;
- como o AsyncStorage funciona;
- por que o MP3 fica em `assets`;
- como o arquivo selecionado é relacionado à música;
- como o player recebe a música;
- como próxima/anterior são calculadas.

O objetivo é que, na hora das perguntas, vocês consigam explicar o projeto de verdade, e não apenas dizer:

> "Essa parte foi meu colega que fez."

---

# 62. Sequência prática para começar

## Membro A

Faça nesta ordem:

```text
1. App.js
2. AppNavigator.js
3. HomeScreen.js
4. MusicCard.js
5. FlatList funcionando
6. Dados temporários
7. storage.js
8. carregar dados
9. CREATE
10. DELETE
11. UPDATE
12. estado da música atual
13. próxima/anterior
```

## Membro B

Faça nesta ordem:

```text
1. assets/musicas
2. musicFiles.js
3. MusicForm.js
4. validação
5. AddMusicModal.js
6. FileSelectorModal.js
7. integração do cadastro
8. EditMusicModal.js
9. PlayerModal.js
10. Play/Pause
11. próxima/anterior
12. progresso
```

## Depois os dois

```text
1. integrar
2. testar CRUD
3. testar persistência
4. testar player
5. corrigir erros
6. melhorar visual
7. revisar Git
8. revisar README
9. estudar o projeto inteiro
10. preparar perguntas da apresentação
```

---

# 63. Estado final da arquitetura

Ao final, a responsabilidade de cada arquivo deverá ser aproximadamente esta:

| Arquivo | Responsabilidade |
|---|---|
| `App.js` | Inicialização |
| `AppNavigator.js` | Navegação |
| `HomeScreen.js` | Playlist e coordenação |
| `MusicCard.js` | Visualização de uma música |
| `MusicForm.js` | Campos e validação do formulário |
| `AddMusicModal.js` | Modal de cadastro |
| `EditMusicModal.js` | Modal de edição |
| `FileSelectorModal.js` | Escolha do MP3 |
| `PlayerModal.js` | Interface e controle do player |
| `storage.js` | AsyncStorage |
| `audio.js` | Funções auxiliares relacionadas ao áudio |
| `musicFiles.js` | Arquivos MP3 disponíveis |
| `assets/musicas/` | Arquivos de áudio |

Essa organização é simples o bastante para um Projeto Integrador, mas estruturada o suficiente para demonstrar **componentização, separação de responsabilidades, CRUD, persistência e uso de biblioteca nativa/mobile**.
