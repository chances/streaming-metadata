import * as lit from '/web_modules/lit-html.js'

import { Game, Games } from './games'
import * as config from './config'

let gameArticle: Element
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

  const gameArticleElement = document.querySelector('#game')
  if (!gameArticleElement) return
  gameArticle = gameArticleElement

  const errorSectionElement = document.querySelector('#error')
  if (!errorSectionElement) return
  errorSection = errorSectionElement

  // Fetch a configured game profile and update the game article
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

/**
 * Update stream metadata with a selected game profile
 */
function updateMetadata(profile: string) {
  async function updateTitleAndDetails(games: Game[]) {
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
  // Update page title
  const titleElement = document.querySelector('title')
  titleElement && (titleElement.textContent = text)

  // Update game article heading
  const headingTitleElement = gameArticle.querySelector('h1#title')
  headingTitleElement && (headingTitleElement.textContent = text)
}

function addDetails(text: string | string[]) {
  if (typeof text === 'string') text = text.split('\n')

  const detailLines = text
    .map(text => text.trim()).filter(text => !!text && text !== '')
  const details = detailLines.map(line => lit.html`<p>${line}</p>`)

  const gameDetails = gameArticle.querySelector('section.details')
  if (gameDetails) lit.render(details, gameDetails)
}

function emitError(err: Error) {
  const paragraph = lit.html`<p>Error: ${err.message}</p>`
  lit.render(paragraph, errorSection)

  errorSection.classList.remove('hidden')
}
