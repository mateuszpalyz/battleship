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

    def shoot(uuid, data)
    end
  end
end
