import { Publisher, PlayerCreatedEvent, Subjects } from '@megamindgame/common';

export class PlayerCreatedPublisher extends Publisher<PlayerCreatedEvent> {
  readonly subject = Subjects.PlayerCreated;
}
