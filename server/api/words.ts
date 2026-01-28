const words = [
  {
    mot: 'chat',
    occurrence: 12
  },
  {
    mot: 'chien',
    occurrence: 8
  },
  {
    mot: 'oiseau',
    occurrence: 5
  },
  {
    mot: 'poisson',
    occurrence: 3
  },
  {
    mot: 'lapin',
    occurrence: 7
  }
]

export default eventHandler(async () => {
  return words
})
