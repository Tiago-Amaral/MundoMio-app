import Floresta from '../components/Floresta.jpg'
import MarEstrelas from '../components/Mar-Estrelas.jpg'
export interface StoryChoice {
  id: string;
  text: string;
  nextScene: string;
}

export interface StoryScene {
  id: string;
  text: string;
  image: string;
  choices?: StoryChoice[];
  isEnding?: boolean;
}

export interface Story {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  scenes: StoryScene[];
  initialScene: string;
}

const stories: Story[] = [
  {
    id: 'floresta-encantada',
    title: 'A Floresta Encantada',
    description: 'Uma aventura mágica em uma floresta cheia de surpresas e criaturas fantásticas',
    coverImage: Floresta,
    initialScene: 'inicio',
    scenes: [
      {
        id: 'inicio',
        text: 'Era uma vez, {personagem} estava passeando perto de sua casa quando encontrou um caminho que levava a uma floresta. As árvores pareciam brilhar com luzes coloridas entre as folhas. {personagem} nunca tinha visto aquele caminho antes. O que {personagem} deveria fazer?',
        image: 'https://i.ibb.co/R6YS3Zn/floresta-entrada.jpg',
        choices: [
          {
            id: 'entrar-floresta',
            text: 'Entrar na floresta e explorar',
            nextScene: 'encontro-fada'
          },
          {
            id: 'voltar-casa',
            text: 'Voltar para casa e contar para os pais',
            nextScene: 'voltar-pais'
          }
        ]
      },
      {
        id: 'encontro-fada',
        text: '{personagem} decidiu entrar na floresta. Enquanto caminhava entre as árvores brilhantes, ouviu um tinido suave. De repente, uma fadinha apareceu! Ela tinha asas azuis cintilantes e um vestido feito de pétalas. "Olá, {personagem}! Meu nome é Lila. Estou procurando minha varinha mágica que perdi. Você pode me ajudar?"',
        image: 'https://i.ibb.co/MZV4GDH/fada-floresta.jpg',
        choices: [
          {
            id: 'ajudar-fada',
            text: 'Ajudar a fada a encontrar a varinha',
            nextScene: 'procurar-varinha'
          },
          {
            id: 'recusar-ajuda',
            text: 'Dizer que precisa voltar para casa',
            nextScene: 'recusar-fada'
          }
        ]
      },
      {
        id: 'procurar-varinha',
        text: '{personagem} decidiu ajudar Lila a encontrar sua varinha. Eles procuraram perto do riacho, entre as flores e debaixo das pedras. Finalmente, viram algo brilhando dentro do tronco de uma árvore antiga. Era a varinha! Lila ficou muito feliz. "Muito obrigada, {personagem}! Como recompensa, vou realizar um desejo seu. O que você gostaria?"',
        image: 'https://i.ibb.co/1RX37z9/varinha-magica.jpg',
        choices: [
          {
            id: 'desejo-voar',
            text: 'Desejar poder voar',
            nextScene: 'final-voar'
          },
          {
            id: 'desejo-animais',
            text: 'Desejar poder falar com os animais',
            nextScene: 'final-animais'
          }
        ]
      },
      {
        id: 'final-voar',
        text: 'Lila agitou sua varinha e {personagem} começou a flutuar! Era uma sensação incrível! {personagem} podia ver toda a floresta lá de cima. Depois de um passeio mágico pelos céus, {personagem} voltou para casa com um novo segredo e um sorriso no rosto. Sempre que quisesse voar de novo, poderia visitar Lila na floresta encantada. Fim!',
        image: 'https://i.ibb.co/mJWfgQD/crianca-voando.jpg',
        isEnding: true
      },
      {
        id: 'final-animais',
        text: 'Lila agitou sua varinha e de repente {personagem} podia entender o que os animais da floresta diziam! Os pássaros contavam histórias sobre lugares distantes, os esquilos falavam sobre suas coleções de nozes, e as borboletas descreviam como era ser uma lagarta. Foi um dia mágico! {personagem} prometeu visitar a floresta sempre que possível para conversar com seus novos amigos. Fim!',
        image: 'https://i.ibb.co/sQnQ8cg/crianca-animais.jpg',
        isEnding: true
      },
      {
        id: 'recusar-fada',
        text: '{personagem} explicou para Lila que precisava voltar para casa. A fadinha ficou um pouco triste, mas entendeu. "Tudo bem, {personagem}. Espero te ver de novo na floresta um dia!" Ela deu a {personagem} uma pequena pena azul brilhante. "Guarde isso e sempre se lembrará da floresta encantada." {personagem} voltou para casa com a pena mágica e muitas histórias para imaginar. Fim!',
        image: 'https://i.ibb.co/Lg8J6zN/pena-azul.jpg',
        isEnding: true
      },
      {
        id: 'voltar-pais',
        text: '{personagem} decidiu voltar para casa e contar aos pais sobre o caminho misterioso. Os pais de {personagem} sorriram. "Essa é a antiga trilha da floresta encantada. Dizem que só aparece para crianças com coração puro e imaginação forte." Eles prometeram levar {personagem} para explorar a trilha no fim de semana. {personagem} mal podia esperar para descobrir quais aventuras o aguardavam! Fim!',
        image: 'https://i.ibb.co/4pHDGX8/crianca-pais.jpg',
        isEnding: true
      }
    ]
  },
  {
    id: 'mar-de-estrelas',
    title: 'O Mar de Estrelas',
    description: 'Uma aventura no fundo do oceano onde as estrelas-do-mar guardam segredos mágicos',
    coverImage: MarEstrelas,
    initialScene: 'praia',
    scenes: [
      {
        id: 'praia',
        text: '{personagem} estava passando férias na praia. Um dia, enquanto brincava na areia, encontrou uma estrela-do-mar de cores brilhantes. Quando {personagem} pegou a estrela, ela começou a piscar! O que {personagem} deveria fazer?',
        image: 'https://i.ibb.co/kxfRLs1/praia-estrela.jpg',
        choices: [
          {
            id: 'devolver-mar',
            text: 'Devolver a estrela ao mar',
            nextScene: 'mergulho'
          },
          {
            id: 'mostrar-pais',
            text: 'Mostrar a estrela aos pais',
            nextScene: 'pais-estrela'
          }
        ]
      },
      {
        id: 'mergulho',
        text: '{personagem} decidiu devolver a estrela ao mar. Ao tocar na água, a estrela brilhou intensamente e {personagem} se viu sendo puxado gentilmente para debaixo d\'água! Mas algo mágico aconteceu - {personagem} podia respirar! A estrela-do-mar falou: "Obrigada por me ajudar! Meu nome é Coral. Você gostaria de conhecer nossa cidade de estrelas?"',
        image: 'https://i.ibb.co/v4Bd59q/mergulho-estrela.jpg',
        choices: [
          {
            id: 'visitar-cidade',
            text: 'Visitar a cidade das estrelas-do-mar',
            nextScene: 'cidade-estrelas'
          },
          {
            id: 'voltar-superficie',
            text: 'Agradecer e voltar para a superfície',
            nextScene: 'voltar-praia'
          }
        ]
      },
      {
        id: 'cidade-estrelas',
        text: 'Coral levou {personagem} até uma cidade subaquática incrível! Casas feitas de conchas coloridas, ruas de areia brilhante e estrelas-do-mar de todos os tamanhos e cores nadando ao redor. A rainha das estrelas, uma enorme estrela roxa com cinco pontas cintilantes, veio receber {personagem}. "Bem-vindo ao nosso reino! Por sua gentileza, você pode escolher um presente mágico."',
        image: 'https://i.ibb.co/Tbv4jDQ/cidade-estrelas.jpg',
        choices: [
          {
            id: 'colar-magico',
            text: 'Escolher um colar de pérolas mágicas',
            nextScene: 'final-colar'
          },
          {
            id: 'concha-musical',
            text: 'Escolher uma concha musical',
            nextScene: 'final-concha'
          }
        ]
      },
      {
        id: 'final-colar',
        text: '{personagem} escolheu o colar de pérolas mágicas. A rainha explicou que o colar permitiria a {personagem} voltar ao reino submarino sempre que quisesse. Coral acompanhou {personagem} de volta à praia. "Espero ver você de novo logo!" Naquela noite, as pérolas no colar de {personagem} brilharam com a luz das estrelas, lembrando da aventura mágica sob as ondas. Fim!',
        image: 'https://i.ibb.co/wYsNLfh/colar-perolas.jpg',
        isEnding: true
      },
      {
        id: 'final-concha',
        text: '{personagem} escolheu a concha musical. A rainha explicou que ao colocar a concha no ouvido, {personagem} poderia ouvir as músicas do oceano e as mensagens das estrelas-do-mar. Coral levou {personagem} de volta à praia. À noite, {personagem} colocou a concha no ouvido e ouviu uma bela canção que contava histórias do fundo do mar. Em seus sonhos, {personagem} dançou com as estrelas. Fim!',
        image: 'https://i.ibb.co/KXSxJr5/concha-musical.jpg',
        isEnding: true
      },
      {
        id: 'voltar-praia',
        text: '{personagem} agradeceu a Coral, mas explicou que precisava voltar. A estrela entendeu e deu a {personagem} uma pequena escama prateada. "Guarde isso como lembrança de nossa amizade." Quando {personagem} voltou à praia, percebeu que a escama brilhava com cores diferentes dependendo de seu humor. Foi um presente mágico para lembrar da aventura subaquática! Fim!',
        image: 'https://i.ibb.co/nLdKL8G/escama-prata.jpg',
        isEnding: true
      },
      {
        id: 'pais-estrela',
        text: '{personagem} mostrou a estrela-do-mar brilhante aos pais. Eles ficaram surpresos e explicaram que era uma espécie muito rara chamada "Estrela Luminosa". Com cuidado, toda a família foi até a beira do mar para devolvê-la ao oceano. Quando a estrela tocou a água, ela brilhou intensamente e formou um arco-íris sobre as ondas! Foi um momento mágico que {personagem} nunca esqueceria. Fim!',
        image: 'https://i.ibb.co/92QgR5t/familia-estrela.jpg',
        isEnding: true
      }
    ]
  }
];

export default stories;