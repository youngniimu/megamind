import { Listener, PlayerCreatedEvent, Subjects } from '@megamindgame/common';
import { Message } from 'node-nats-streaming';
import { Player } from '../../models/player';

export class PlayerCreatedListener extends Listener<PlayerCreatedEvent> {
  readonly subject = Subjects.PlayerCreated;
  async onMessage(data: PlayerCreatedEvent['data'], msg: Message) {
    const { username, color } = data;
    console.log(username, color);

    const player = Player.build({ username, color });
    await player.save();
    console.log(`player saved: ${player}`);
  }
}
