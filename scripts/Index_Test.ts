function tickToTimeFormat(ticks) {
  let time = ticks / 20
  let minute = Math.floor(time / 60)
  let second = time % 60

  return `${minute}:${second}`
}

console.log(tickToTimeFormat(4200))