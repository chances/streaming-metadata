import { JsonParser, JsonProp } from '/web_modules/@peculiar/json-schema.js'
import Game from './Game'

export default class Games {
  @JsonProp({ type: Game, repeated: true, schema: 'StreamingMetadata' })
  games: Game[] = []

  /**
   * Parse an array of games from JSON and asserts it has a valid format.
   *
   * @param json Games array JSON to parse
   * @throws {KeyError} if the JSON doesn't match the expected interface, even if the JSON is valid.
   * @example
   * import Games from './games'
   * const games = new Games.fromJson(json)
   * @see {@link ../public/schema.json}
   */
  static fromJson(json: string) {
    return JsonParser.parse(json, { targetSchema: Games, strictAllKeys: true })
  }
}
