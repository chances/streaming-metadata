import * as lit from '/web_modules/lit-html.js'

import { Game, Games } from './games'
import * as config from './config'

let gameSection: Element
let errorSection: Element

document.addEventListener('DOMContentLoaded', async function loadText() {
  const body = document.querySelector('body')
  body?.classList.remove('loading')

  // Dark mode
  if (config.flag('dark')) {
    body?.classList.add('dark')

    if (config.flag('debug') && body) {
      body.style.backgroundColor = 'black'
    }
  }

  // Bug Mode
  if (config.flag('bug')) {
    document.querySelector('body')?.classList.add('bug')
  }

  const gameSectionElement = document.querySelector('#game')
  if (!gameSectionElement) return
  gameSection = gameSectionElement

  const errorSectionElement = document.querySelector('#error')
  if (!errorSectionElement) return
  errorSection = errorSectionElement

  const metadataUrl = config.url('games')
  const profile = config.value('profile')
  if (!config.flag('demo') && metadataUrl && profile) {
    try {
      body?.classList.add('loading')
      await fetchMetadata(metadataUrl.toString()).then(updateMetadata(profile))
    } catch (err) {
      // TODO: Log error in Sentry?
      emitError(err)
      console.error(err)
    } finally {
      body?.classList.remove('loading')
    }
  }
})

/**
 * Load stream metadata, e.g. game Title and Description
 */
async function fetchMetadata(metadataUrl: string) {
  const json = await fetchTextFile(metadataUrl)
  return JSON.parse(json) as Game[]
  // TODO: Fix this return Games.fromJson(json).games
}

function updateMetadata(profile: string) {
  async function updateTitleAndDetails(games: Game[]) {
    // Clear paragraphs
    gameSection.innerHTML = ''

    const titleElement = document.createElement('h1')
    titleElement.id = 'title'
    gameSection.appendChild(titleElement)

    const game = games.find(game => game.alias === profile)
    if (!game) return

    updateTitle(game.title)
    addDetails(game.details)
  }

  return updateTitleAndDetails
}

async function fetchTextFile(path: string) {
  const response = await window.fetch(path)
  return response.text()
}

function updateTitle(text: string) {
  const titleElement = document.querySelector('title')
  titleElement && (titleElement.textContent = text)

  const headingTitleElement = document.querySelector('h1')
  headingTitleElement && (headingTitleElement.textContent = text)
}

function addDetails(text: string | string[]) {
  if (typeof text === 'string') text = text.split('\n')
  text.map(text => text.trim())
    .filter(text => !!text && text !== '')
    .forEach(text => {
      const paragraph = document.createElement('p')
      paragraph.classList.add('details')
      paragraph.textContent = text
      gameSection.appendChild(paragraph)
    })
}

function emitError(err: Error) {
  errorSection.innerHTML = ''

  const paragraph = document.createElement('p')
  paragraph.textContent = `Error: ${err.message}`
  errorSection.appendChild(paragraph)

  errorSection.classList.remove('hidden')
}
