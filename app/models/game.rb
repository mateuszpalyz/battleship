class Game < ApplicationRecord
  class << self
    def start(player1, player2)
      black, white = [player1, player2].shuffle
      ActionCable.server.broadcast("player_#{black}", action: 'game_start', msg: 'black')
      ActionCable.server.broadcast("player_#{white}", action: 'game_start', msg: 'white')
      REDIS.set("opponent_for:#{black}", white)
      REDIS.set("opponent_for:#{white}", black)
    end

    def opponent_for(uuid)
      REDIS.get("opponent_for:#{uuid}")
    end

    def set_tiles(uuid, tiles)
      REDIS.set("tiles_#{uuid}", tiles)
    end

    def shot(uuid, tile)
      tiles = eval(REDIS.get("tiles_#{uuid}"))
      tiles[tile] = tiles[tile] == 'S' ? 'H' : 'F'
      check_game_status(uuid, tiles)
      set_tiles(uuid, tiles)
    end

    def check_game_status(uuid, tiles)
      return unless tiles.count('H') == 4
      ActionCable.server.broadcast("player_#{uuid}", action: 'game_end', msg: uuid)
      ActionCable.server.broadcast("player_#{opponent_for(uuid)}", action: 'game_end', msg: uuid)
    end
  end
end
