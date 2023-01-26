import RankedSvg from '../assets/ranked.svg';
import DuelSvg from '../assets/duel.svg';
import FunSvg from '../assets/fun.svg';
import TrainingSvg from '../assets/training.svg';

import JogoCartasImage from '../assets/jogocartas.png';
import JogoConhecimento from '../assets/jogoconhecimento.png';


export const games = [
  { id: '1', title: 'Carta Maior', icon: TrainingSvg, image: JogoCartasImage },
  { id: '2', title: 'Conhecimento', icon: RankedSvg, image: JogoConhecimento },
  { id: '3', title: 'Qual Clipe?', icon: FunSvg, image: JogoCartasImage },
  { id: '4', title: 'Qual Música?', icon: DuelSvg, image: JogoCartasImage },
]