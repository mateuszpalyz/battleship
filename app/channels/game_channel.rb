# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class GameChannel < ApplicationCable::Channel
  def subscribed
    stream_from "player_#{uuid}"
    Match.create(uuid)
  end

  def unsubscribed
  end

  def send_tiles(data)
    puts data.to_s
  end

  def shoot(data)
    Game.make_move(uuid, data)
  end
end
