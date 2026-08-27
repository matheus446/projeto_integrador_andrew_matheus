# 🎵 MyPlaylist

Projeto Integrador — Programação para Dispositivos Móveis • Persistência de Dados

Aplicativo mobile para cadastrar e organizar uma playlist local de músicas. A proposta é manter o projeto simples o bastante para ser desenvolvido em dupla, mas completo o suficiente para demonstrar os requisitos técnicos do Projeto Integrador.

## 📌 Objetivo

O aplicativo permitirá:

- cadastrar músicas;
- listar músicas em uma `FlatList`;
- editar os dados de uma música;
- excluir músicas;
- marcar/desmarcar como favorita;
- escolher um arquivo `.mp3` entre os arquivos incluídos no próprio aplicativo;
- manter os dados cadastrados entre sessões usando AsyncStorage;
- reproduzir as músicas usando `expo-audio` na etapa final do projeto.

> **Importante:** esta versão é um esqueleto funcional de arquitetura. O CRUD e a persistência já estão estruturados, e o modal do player está preparado. A reprodução real com `expo-audio` deve ser ligada depois que o cadastro, a lista e o armazenamento estiverem estáveis.

---

## 🧱 Arquitetura

A organização foi feita para evitar colocar toda a lógica no `App.js`.

```text
MyPlaylist/
│
├── assets/
│   └── musicas/
│       └── seus-arquivos.mp3
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

### Responsabilidade de cada pasta

| Pasta/arquivo | Responsabilidade |
|---|---|
| `App.js` | Ponto de entrada da aplicação. Não concentra regras do app. |
| `navigation/` | Controle de navegação entre telas. |
| `screens/` | Telas principais e estado relacionado ao fluxo da tela. |
| `components/` | Componentes visuais reutilizáveis. |
| `modals/` | Modais para ações temporárias sobre a tela principal. |
| `services/` | Persistência e integração com recursos externos/bibliotecas. |
| `data/` | Dados fixos necessários pelo aplicativo. |
| `assets/musicas/` | Arquivos de áudio incluídos no projeto. |

---

## 🧭 Como a navegação funciona

O `App.js` chama apenas:

```jsx
<AppNavigator />
```

O `AppNavigator.js` usa React Navigation para registrar as telas.

No estado inicial do projeto existe apenas a `HomeScreen`, porque o cadastro, a edição, a seleção do arquivo e o player foram planejados como **modais**, não como telas independentes.

Isso deixa o fluxo mais simples:

```text
App
 ↓
AppNavigator
 ↓
HomeScreen
 ├── AddMusicModal
 ├── EditMusicModal
 ├── FileSelectorModal
 └── PlayerModal
```

---

## 💾 Por que AsyncStorage?

Os dados da playlist são pequenos: título, artista, gênero, nome do arquivo e alguns estados simples. Não existe necessidade de consultas relacionais ou grande volume de dados.

Por isso, o projeto usa `@react-native-async-storage/async-storage`.

O AsyncStorage oferece armazenamento persistente de chave/valor. Os objetos das músicas são convertidos para JSON antes do salvamento.

### O que é salvo?

Exemplo:

```js
{
  id: "1",
  titulo: "Believer",
  artista: "Imagine Dragons",
  genero: "Rock",
  arquivo: "musica01.mp3",
  favorita: false
}
```

### O que NÃO é salvo no AsyncStorage?

O arquivo `.mp3` não é colocado dentro do AsyncStorage.

O áudio fica em:

```text
assets/musicas/
```

O AsyncStorage guarda apenas o nome do arquivo associado à música.

---

## 🎧 Como os arquivos de música funcionam

Os arquivos não serão procurados na internet nem em um servidor. Eles serão incluídos no próprio projeto.

Exemplo:

```text
assets/
└── musicas/
    ├── musica01.mp3
    ├── musica02.mp3
    └── musica03.mp3
```

Depois, registre os arquivos em `data/musicFiles.js`:

```js
const musicFiles = [
  {
    nome: "musica01.mp3",
    arquivo: require("../assets/musicas/musica01.mp3"),
  },
  {
    nome: "musica02.mp3",
    arquivo: require("../assets/musicas/musica02.mp3"),
  },
];

export default musicFiles;
```

### ⚠️ Muito importante

Não tente fazer isto:

```js
require(`../assets/musicas/${nomeArquivo}.mp3`)
```

O React Native precisa conhecer os assets estáticos no bundle. Por isso cada arquivo deve ser registrado explicitamente no `musicFiles.js`.

---

# 🚀 Instalação

## 1. Pré-requisitos

Use Node.js compatível com o Expo SDK utilizado pelo projeto.

O esqueleto foi preparado para **Expo SDK 57**, que usa React Native 0.86 e React 19.2.x.

## 2. Instalar dependências

Dentro da pasta do projeto:

```bash
npm install
```

Caso algum pacote apresente incompatibilidade de versão, prefira:

```bash
npx expo install
```

ou ajuste os pacotes usando o instalador do Expo.

## 3. Rodar o projeto

```bash
npx expo start
```

Depois abra no emulador/dispositivo conforme a configuração do ambiente.

---

# 🪜 Ordem recomendada de desenvolvimento

Não tentem implementar tudo de uma vez. A ordem abaixo reduz bastante a chance de erro.

## Etapa 1 — Interface

Verifique primeiro se a `HomeScreen` abre corretamente.

Objetivo:

- título;
- botão de adicionar;
- `FlatList`;
- `MusicCard`;
- estado vazio.

Ainda não precisa pensar no áudio.

## Etapa 2 — Cadastro

Testar:

```text
+ Adicionar música
        ↓
AddMusicModal
        ↓
Título
Artista
Gênero
Arquivo
        ↓
Adicionar
```

Quando clicar em adicionar, o novo card deve aparecer na lista.

## Etapa 3 — CRUD

Garantir os quatro pontos:

```text
CREATE  → adicionar
READ    → listar
UPDATE  → editar/favoritar
DELETE  → excluir
```

Não avance para o player enquanto isso não estiver funcionando.

## Etapa 4 — Persistência

O `HomeScreen` usa:

```js
carregarMusicas()
salvarMusicas()
```

Teste fechando o aplicativo e abrindo novamente.

As músicas devem continuar na lista.

## Etapa 5 — Player

Agora conectar o `PlayerModal` ao `expo-audio`.

Primeiro implementem apenas:

```text
▶ Play
⏸ Pause
```

Depois:

```text
⏮ Música anterior
⏭ Próxima música
```

Por último, se houver tempo:

```text
barra de progresso
```

---

# 📱 Fluxo esperado do aplicativo

## Tela principal

```text
MyPlaylist

[ + Adicionar música ]

┌──────────────────────────┐
│ ♫  Believer          ⋮  │
│    Imagine Dragons       │
│    Rock                  │
└──────────────────────────┘

┌──────────────────────────┐
│ ♫  Numb              ⋮  │
│    Linkin Park           │
│    Rock                  │
└──────────────────────────┘
```

## Cadastro

```text
Adicionar música

Título    [____________]
Artista   [____________]
Gênero    [____________]
Arquivo   [ musica01.mp3 ▼ ]

[Cancelar] [Adicionar]
```

## Seleção do arquivo

```text
Selecionar arquivo

○ musica01.mp3
○ musica02.mp3
○ musica03.mp3

[Fechar]
```

## Menu da música

```text
Favoritar
Editar
Excluir
Cancelar
```

## Player

```text
Tocando agora
Believer
Imagine Dragons

━━━━━━━━●━━━━━━

⏮      ▶      ⏭
```

---

# 🧩 Onde cada estado deve ficar?

Uma das regras importantes da arquitetura é manter o estado próximo de quem realmente usa aquele estado.

### `HomeScreen`

Estado da lista e do fluxo geral:

```js
const [musicas, setMusicas] = useState([]);
const [musicaSelecionada, setMusicaSelecionada] = useState(null);
const [addVisible, setAddVisible] = useState(false);
const [editVisible, setEditVisible] = useState(false);
const [playerVisible, setPlayerVisible] = useState(false);
```

### `AddMusicModal`

Estado temporário do formulário de cadastro:

```js
const [titulo, setTitulo] = useState("");
const [artista, setArtista] = useState("");
const [genero, setGenero] = useState("");
const [arquivo, setArquivo] = useState("");
```

### `FileSelectorModal`

Apenas mostra os arquivos disponíveis e devolve o arquivo escolhido.

### `PlayerModal`

Deve controlar apenas o que diz respeito à reprodução da música atual.

---

# 🔄 CRUD explicado para a apresentação

## Criar

O usuário abre o modal, preenche o formulário, escolhe um arquivo e confirma.

A `HomeScreen` adiciona o objeto ao array e chama `salvarMusicas()`.

## Listar

A lista `musicas` é renderizada pela `FlatList`.

Cada item usa o componente `MusicCard`.

## Atualizar

Editar altera os dados da música.

Favoritar é outra atualização simples no mesmo objeto.

## Excluir

A música é removida do array pelo `id`, e a nova lista é salva no AsyncStorage.

---

# 🎯 Requisitos do Projeto Integrador

| Requisito | Solução |
|---|---|
| Interface mobile | React Native + Expo |
| Lista | `FlatList` |
| Formulário | `MusicForm` dentro de modal |
| Componentização | `MusicCard`, `MusicForm` e modais separados |
| Criar | Cadastro de música |
| Listar | Playlist principal |
| Atualizar | Editar + favoritar |
| Excluir | Menu da música |
| Persistência real | AsyncStorage |
| Justificativa da persistência | Pequeno volume e estrutura simples |
| Recurso extra | Reprodução de áudio com `expo-audio` |
| Navegação | React Navigation separado do `App.js` |

---

# 👥 Organização da dupla

Uma divisão possível para evitar que apenas um integrante faça tudo:

### Integrante 1

- `HomeScreen`
- `MusicCard`
- `AddMusicModal`
- `EditMusicModal`

### Integrante 2

- `storage.js`
- `FileSelectorModal`
- `PlayerModal`
- integração com `expo-audio`

Depois, ambos revisam e testam o projeto inteiro.

> **Importante para o GitHub:** cada integrante deve fazer commits próprios. Não adianta fazer todo o projeto em uma conta e depois apenas colocar o nome do outro no README.

---

# 🌿 Sugestão de commits

Evitem um único commit gigantesco como:

```text
Projeto final
```

Uma sequência melhor:

```text
feat: cria estrutura inicial do projeto
feat: adiciona tela principal e MusicCard
feat: cria modal de cadastro
feat: implementa criação de músicas
feat: implementa edição e exclusão
feat: adiciona persistência com AsyncStorage
feat: cria seletor de arquivos MP3
feat: adiciona player de áudio
fix: corrige comportamento do player
style: ajusta layout da playlist
```

Os dois integrantes devem aparecer no histórico de commits.

---

# 🧪 Checklist antes da entrega

- [ ] O projeto abre sem erro.
- [ ] A tela principal funciona.
- [ ] É possível cadastrar uma música.
- [ ] É possível listar as músicas.
- [ ] É possível editar.
- [ ] É possível excluir.
- [ ] É possível favoritar/desfavoritar.
- [ ] Os dados continuam após fechar e abrir o app.
- [ ] Os arquivos MP3 escolhidos são os arquivos incluídos no projeto.
- [ ] O player funciona.
- [ ] Os dois integrantes possuem commits no GitHub.
- [ ] Cada integrante sabe explicar as decisões do projeto.

---

# 📚 Tecnologias

- React Native
- Expo SDK 57
- React Navigation
- AsyncStorage
- expo-audio
- JavaScript

---

## 📖 Documentação oficial

- Expo: https://docs.expo.dev/
- Expo Audio: https://docs.expo.dev/versions/latest/sdk/audio/
- AsyncStorage no Expo: https://docs.expo.dev/versions/latest/sdk/async-storage/
- React Navigation: https://reactnavigation.org/docs/getting-started/

