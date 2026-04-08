import obra1 from "@/assets/obra1.jpg";
import obra2 from "@/assets/obra2.jpg";
import obra3 from "@/assets/obra3.jpg";

export type PublicationType = "noticia" | "servico";

export interface Publication {
  id: string;
  type: PublicationType;
  title: string;
  description: string;
  content: string;
  date: string;
  image: string;
  images?: string[];
}

export const publications: Publication[] = [
  {
    id: "novo-trecho-br-040",
    type: "noticia",
    title: "Novo trecho da BR-040 será inaugurado em março",
    description: "A obra de modernização do trecho entre Belo Horizonte e Juiz de Fora será entregue com melhorias na sinalização e pavimentação.",
    content: `A inauguração do novo trecho da BR-040 representa um marco na engenharia rodoviária brasileira. Com investimento de R$ 1,2 bilhão, o trecho de 120 km entre Belo Horizonte e Juiz de Fora recebeu pavimentação de última geração, sinalização inteligente e acostamentos ampliados.

As obras incluíram a construção de 8 viadutos, 3 passarelas e a instalação de sistemas de monitoramento por câmeras em tempo real. A expectativa é reduzir o tempo de viagem em 40 minutos e diminuir os acidentes na região em até 60%.

O projeto contou com a participação de mais de 3.000 trabalhadores e utilizou técnicas inovadoras de drenagem e contenção de encostas, garantindo maior segurança e durabilidade da via.`,
    date: "15 Mar 2026",
    image: obra1,
  },
  {
    id: "seminario-internacional",
    type: "noticia",
    title: "AER participa de seminário internacional de infraestrutura",
    description: "Representantes da associação apresentaram projetos brasileiros no congresso de engenharia rodoviária em Lisboa.",
    content: `A Associação de Engenharia de Rodovias marcou presença no Seminário Internacional de Infraestrutura Rodoviária, realizado em Lisboa, Portugal. A delegação brasileira apresentou três projetos inovadores que estão transformando a malha viária nacional.

Entre os destaques, o projeto de smart highways na região Sul do Brasil chamou a atenção dos participantes europeus pela integração de sensores IoT na pavimentação, permitindo monitoramento em tempo real das condições da via.

O evento reuniu mais de 500 profissionais de 30 países, consolidando a posição do Brasil como referência em engenharia rodoviária na América Latina.`,
    date: "02 Fev 2026",
    image: obra1,
  },
  {
    id: "investimento-rodovias",
    type: "noticia",
    title: "Governo anuncia investimento de R$ 3 bilhões em rodovias",
    description: "Pacote de investimentos contempla duplicações, restaurações e construção de novas vias em 12 estados.",
    content: `O Governo Federal anunciou um pacote de R$ 3 bilhões para investimentos em rodovias federais, abrangendo 12 estados brasileiros. O programa inclui duplicação de trechos críticos, restauração de pavimentos deteriorados e construção de novas vias de acesso.

Entre os projetos prioritários estão a duplicação de 200 km da BR-101 no Nordeste, a restauração completa da BR-364 em Rondônia e a construção de um novo contorno rodoviário em Curitiba.

A AER foi consultada durante o planejamento do pacote e contribuiu com recomendações técnicas para priorização dos investimentos com base em critérios de segurança viária e impacto econômico regional.`,
    date: "20 Jan 2026",
    image: obra1,
  },
  {
    id: "duplicacao-br-101",
    type: "servico",
    title: "Duplicação da BR-101 — Trecho Norte",
    description: "Obra de duplicação com 45 km de extensão, incluindo acostamentos e sinalização moderna.",
    content: `A duplicação do trecho norte da BR-101 foi concluída com sucesso após 24 meses de obras intensivas. O projeto abrangeu 45 km de extensão e incluiu a construção de acostamentos ampliados, sinalização vertical e horizontal de última geração, e sistemas de drenagem avançados.

O investimento total foi de R$ 680 milhões, com recursos do Programa de Aceleração do Crescimento. A obra beneficia diretamente mais de 2 milhões de habitantes das cidades ao longo do trecho.

A AER participou como consultora técnica, garantindo que todas as normas de segurança e qualidade fossem rigorosamente seguidas durante a execução do projeto.`,
    date: "10 Dez 2025",
    image: obra1,
  },
  {
    id: "ponte-rio-parana",
    type: "servico",
    title: "Ponte sobre o Rio Paraná",
    description: "Construção de ponte estaiada com 800 metros de vão, conectando dois estados.",
    content: `A ponte estaiada sobre o Rio Paraná é uma das maiores obras de arte especial já realizadas no Brasil. Com 800 metros de vão livre e torres de 120 metros de altura, a estrutura conecta os estados de São Paulo e Mato Grosso do Sul.

O projeto utilizou concreto de alto desempenho e cabos de aço de última geração, garantindo uma vida útil superior a 100 anos. A construção empregou a técnica de balanços sucessivos, minimizando o impacto ambiental sobre o rio.

A inauguração da ponte reduziu o tempo de travessia de 45 minutos (via balsa) para apenas 3 minutos, transformando a logística da região e impulsionando o desenvolvimento econômico local.`,
    date: "05 Nov 2025",
    image: obra2,
  },
  {
    id: "tunel-serra-do-mar",
    type: "servico",
    title: "Túnel Rodoviário Serra do Mar",
    description: "Execução de túnel com 2,3 km de extensão, reduzindo o trajeto em 40 minutos.",
    content: `O Túnel Rodoviário da Serra do Mar é uma obra de engenharia que redefiniu a conectividade entre o litoral e o planalto. Com 2,3 km de extensão e duas faixas de rodagem em cada sentido, o túnel eliminou o trecho mais perigoso da antiga estrada serrana.

O projeto incluiu sistemas avançados de ventilação, iluminação LED inteligente, câmeras de monitoramento e pontos de escape a cada 300 metros. O revestimento interno utilizou concreto projetado com fibras de aço, garantindo máxima segurança estrutural.

A obra reduziu o trajeto em 40 minutos e eliminou as interdições frequentes causadas por deslizamentos de terra na região, beneficiando milhares de motoristas diariamente.`,
    date: "20 Set 2025",
    image: obra3,
  },
];
