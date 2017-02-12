import Bus from '../Bus';

function mapPayload(message) {
  return message.payload;
}

export const settingsStream = Bus
  .filter(message => message.type === 'settings')
  .map(mapPayload);
