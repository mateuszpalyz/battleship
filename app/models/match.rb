class Match < ApplicationRecord
  class << self
    def create(uuid)
      opponent? ? start_game(uuid) : assign_opponent(uuid)
    end

    def remove(uuid)
      assign_opponent(nil) if uuid == opponent
    end

    def clear_all
      REDIS.del('opponent')
    end

    private

    def opponent
      REDIS.get('opponent')
    end

    def opponent?
      opponent.present?
    end

    def assign_opponent(opponent)
      REDIS.set('opponent', opponent)
    end

    def start_game(uuid)
      Game.start(uuid, opponent)
      assign_opponent(nil)
    end
  end
end
