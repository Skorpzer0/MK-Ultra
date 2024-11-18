
const ARENAS_EL = [...document.getElementsByClassName('arenas')][0]
const RANDOM_BTN_EL = document.querySelector('div.control').children[0]

const PLAYER_ONE = {
  player: 1,
  name: 'SCORPION',
  hp: 100,
  img: '',
}

const PLAYER_TWO = {
  player: 2,
  name: 'kitana',
  hp: 100,
  img: '',
}

RANDOM_BTN_EL.addEventListener('click', () => {
  changeHP(PLAYER_ONE)
  changeHP(PLAYER_TWO)
})

function changeHP(player) {
  const PLAYER_HP_EL = document.querySelector(`.player${player.player} .life`)

  player.hp -= getRandomNum(20)

  if (player.hp <= 0) {
    PLAYER_HP_EL.style.width = '0'
    RANDOM_BTN_EL.disabled = true

    win(PLAYER_ONE.hp > 0 ? PLAYER_ONE : PLAYER_TWO)
  } else {
    PLAYER_HP_EL.style.width = `${player.hp}%`
  }
}

function getRandomNum(max) {
  return Math.floor(Math.random() * max);
}

function win({ name }) {
  const WIN_TITLE_EL = createElementWithAttrs('span', {
    'className': 'loseTitle',
    'innerText': `${name.toUpperCase()} WINS!`
  })

  appendToArenas(WIN_TITLE_EL)
}

function createPlayer(options) {
  const PLAYER_EL = createElementWithAttrs('div', { className: `player${options.player}` })
  const PROGRESSBAR_EL = getProgressbarEl(options)
  const CHARACTER_EL = getCharacterEl(options)

  PLAYER_EL.append(PROGRESSBAR_EL, CHARACTER_EL)
  appendToArenas(PLAYER_EL)
}

function getProgressbarEl({ name, hp = 100 }) {
  const PROGRESSBAR_EL = createElementWithAttrs('div', { className: 'progressbar' })
  const HEALTH_POINTS_EL = createElementWithAttrs('div', {
    'className': 'life',
    'style.width': `${hp}%`
  })
  const PLAYER_NAME_EL = createElementWithAttrs('div', {
    'className': 'name',
    'innerText': name.toUpperCase()
  })

  PROGRESSBAR_EL.append(HEALTH_POINTS_EL, PLAYER_NAME_EL)

  return PROGRESSBAR_EL
}

function getCharacterEl({ name, img }) {
  const CHARACTER_EL = createElementWithAttrs('div', { className: 'character' })
  const IMAGE_EL = createElementWithAttrs('img', { src: img || getCharacterImageUrl(name) })

  CHARACTER_EL.appendChild(IMAGE_EL)

  return CHARACTER_EL
}

function createElementWithAttrs (tagName, attrs = null) {
  let el = document.createElement(tagName)

  if (attrs) {
    for (const KEY of Object.keys(attrs)) {
      KEY
        .split('.')
        .reduce((el, node, idx, self) => {
          if (!el) {
            return el
          }

          if (idx + 1 < self.length) {
            return el && el[node]
          }

          if (idx + 1 === self.length) {
            el[node] = attrs[KEY]
          }

          return el
        }, el)
    }
  }

  return el
}

function appendToArenas(el) {
  if (ARENAS_EL) {
    ARENAS_EL.appendChild(el)
  }
}

function getCharacterImageUrl(playerName) {
  const AVAILABLE_GIFS_BY_PLAYER_NAME = ['scorpion', 'kitana', 'liukang', 'sonya', 'subzero']

  return !!~AVAILABLE_GIFS_BY_PLAYER_NAME.indexOf(playerName.toLowerCase())
    ? `http://reactmarathon-api.herokuapp.com/assets/${playerName.toLowerCase()}.gif`
    : 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif'
}

window.onload = function () {
  createPlayer(PLAYER_ONE)
  createPlayer(PLAYER_TWO)
}
