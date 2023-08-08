import idle from '$lib/sprites/idle.png'
import walking from '$lib/sprites/walking.png'
import running from '$lib/sprites/running.png'
import technique from '$lib/sprites/technique.png'
import casting from '$lib/sprites/casting.png'
import turning from '$lib/sprites/turning.png'
import type SpriteData from "$lib/interfaces/SpriteData";

const data: SpriteData[] = [
  {
    action: 'idle',
    border: 1,
    w: 50,
    h: 66,
    frames: 4,
    rate: 4,
    src: idle,
    steps: [],
    image: null
  },
  {
    action: 'walking',
    border: 1,
    w: 42,
    h: 66,
    frames: 6,
    rate: 4,
    src: walking,
    steps: [],
    image: null
  },
  {
    action: 'running',
    border: 1,
    w: 58,
    h: 58,
    frames: 6,
    rate: 2,
    src: running,
    steps: [],
    image: null
  },
  {
    action: 'casting',
    border: 1,
    w: 68,
    h: 66,
    frames: 10,
    rate: 2,
    src: casting,
    steps: [],
    image: null
  },
  {
    action: 'technique',
    border: 1,
    w: 67,
    h: 58,
    frames: 9,
    rate: 2,
    src: technique,
    steps: [],
    image: null
  },
  {
    action: 'technique',
    border: 1,
    w: 67,
    h: 58,
    frames: 9,
    rate: 2,
    src: technique,
    steps: [],
    image: null
  },
  {
    action: 'turning',
    border: 1,
    w: 86,
    h: 68,
    frames: 4,
    rate: 2,
    src: turning,
    steps: [],
    image: null
  }
];

export default data
