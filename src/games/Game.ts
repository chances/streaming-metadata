import { JsonSerializer, JsonParser, JsonProp, JsonPropTypes } from '/web_modules/@peculiar/json-schema.js'

export default class Game {
  @JsonProp({ type: JsonPropTypes.String })
  title = ''

  @JsonProp({ type: JsonPropTypes.String })
  alias = ''

  @JsonProp({ name: 'twitch-title', type: JsonPropTypes.String, optional: true })
  twitchTitle?: string = undefined

  @JsonProp({ name: 'live-notification', type: JsonPropTypes.String, optional: true })
  goingLiveNotification?: string = undefined

  // TODO: Support string | string[]
  @JsonProp({ type: JsonPropTypes.String, repeated: true })
  details: string[] = []

  /**
   * Parse a Game from JSON and asserts it has a valid format.
   *
   * @param {string} Games array JSON to parse
   * @throws {KeyError} if the JSON doesn't match the expected interface, even if the JSON is valid.
   * @example
   * import { Game } from './games'
   * const game = new Game.fromJson(json)
   * @see {@link ../public/schema.json}
   */
  static fromJson(json: string) {
    return JsonParser.parse(json, { targetSchema: Game, strictAllKeys: true })
  }

  /**
   * Serialize this game to JSON.
   *
   * @example
   * import { Game } from './games'
   * const gameJson = new Game().toJson()
   * @see {@link ../public/schema.json}
   */
  toJson() {
    return JsonSerializer.serialize(this)
  }
}
