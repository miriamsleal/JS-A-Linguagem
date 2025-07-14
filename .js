const readline = require('readline');
const entrada = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function perguntar(pergunta) {
  return new Promise(resolver => {
    entrada.question(pergunta, resposta => resolver(resposta.trim()));
  });
}

const premios = [100, 200, 500, 1000, 2000];
const premioSeguro = [0, 0, 0, 500, 1000];

const perguntas = [
  { pergunta: 'Qual é a capital do Brasil?', opcoes: { a: 'São Paulo', b: 'Brasília', c: 'Rio de Janeiro' }, certa: 'b' },
  { pergunta: 'Em que ano o homem pisou na Lua pela primeira vez?', opcoes: { a: '1965', b: '1969', c: '1971' }, certa: 'b' },
  { pergunta: 'Qual o elemento químico representado pelo símbolo "O"?', opcoes: { a: 'Ouro', b: 'Oxigênio', c: 'Ósmio' }, certa: 'b' },
  { pergunta: 'Quem escreveu "Dom Casmurro"?', opcoes: { a: 'Machado de Assis', b: 'Jorge Amado', c: 'Clarice Lispector' }, certa: 'a' },
  { pergunta: 'Qual é o idioma oficial do Brasil?', opcoes: { a: 'Espanhol', b: 'Inglês', c: 'Português' }, certa: 'c' },
  { pergunta: 'Quantos segundos há em uma hora?', opcoes: { a: '3600', b: '600', c: '7200' }, certa: 'a' },
  { pergunta: 'Qual planeta é conhecido como Planeta Vermelho?', opcoes: { a: 'Vênus', b: 'Marte', c: 'Júpiter' }, certa: 'b' },
  { pergunta: 'Quem pintou a Mona Lisa?', opcoes: { a: 'Leonardo da Vinci', b: 'Van Gogh', c: 'Picasso' }, certa: 'a' },
  { pergunta: 'Em qual continente fica o Egito?', opcoes: { a: 'Ásia', b: 'África', c: 'Europa' }, certa: 'b' },
  { pergunta: 'Qual é o maior oceano do planeta?', opcoes: { a: 'Índico', b: 'Atlântico', c: 'Pacífico' }, certa: 'c' },
  { pergunta: 'Quem descobriu a gravidade?', opcoes: { a: 'Einstein', b: 'Newton', c: 'Galileu' }, certa: 'b' },
  { pergunta: 'Qual é o símbolo químico da água?', opcoes: { a: 'H2O', b: 'O2', c: 'CO2' }, certa: 'a' },
  { pergunta: 'Quem criou o JavaScript?', opcoes: { a: 'Brendan Eich', b: 'James Gosling', c: 'Bjarne Stroustrup' }, certa: 'a' },
  { pergunta: 'Quantos jogadores tem um time de futebol em campo?', opcoes: { a: '9', b: '10', c: '11' }, certa: 'c' },
  { pergunta: 'Qual montanha é a mais alta do mundo?', opcoes: { a: 'K2', b: 'Everest', c: 'Kilimanjaro' }, certa: 'b' }
];

async function jogar() {
  console.clear();
  console.log('Show do Milhão\n');
  const nome = await perguntar('Digite seu nome: ');
  let premioAtual = 0;
  let ultimaCerta = null;

  for (let i = 0; i < 5; i++) {
    const rodada = i + 1;
    const ganhoAcertar = premios[i];
    const ganhoParar = premioAtual;
    const ganhoErrar = premioSeguro[rodada] || 0;

    console.log(`Rodada ${rodada}`);
    console.log(`Se errar: R$ ${ganhoErrar}`);
    console.log(`Se parar: R$ ${ganhoParar}`);
    console.log(`Se acertar: R$ ${ganhoAcertar}\n`);

    const p = perguntas[Math.floor(Math.random() * perguntas.length)];
    console.log(p.pergunta);
    for (let letra in p.opcoes) {
      console.log(`  ${letra.toUpperCase()}: ${p.opcoes[letra]}`);
    }

    let resp = await perguntar('\nEscolha a letra ou digite "parar": ');
    resp = resp.toLowerCase();

    if (resp === 'parar') {
      console.log(`\nVocê parou com R$ ${ganhoParar}.\n`);
      premioAtual = ganhoParar;
      break;
    }

    if (resp === p.certa) {
      console.log('Resposta certa!\n');
      premioAtual = ganhoAcertar;
      ultimaCerta = p.certa;
      if (rodada === 5) console.log('Você venceu todas as rodadas!\n');
    } else {
      console.log(`Resposta errada. A certa era "${p.certa.toUpperCase()}".\n`);
      premioAtual = ganhoErrar;
      ultimaCerta = p.certa;
      break;
    }
  }

  console.log('Acabou o jogo');
  console.log(`Jogador: ${nome}`);
  const parouEm = premios.indexOf(premioAtual) + 1;
  console.log(`Você parou na rodada ${parouEm <= 0 ? 1 : parouEm}.`);
  console.log(`Prêmio final: R$ ${premioAtual}`);
  if (ultimaCerta) console.log(`Última resposta certa: "${ultimaCerta.toUpperCase()}"`);

  const novo = await perguntar('\nJogar novamente? (s/n): ');
  if (novo.toLowerCase().startsWith('s')) return jogar();
  console.log('\nSaindo do jogo');
  entrada.close();
}

jogar();
