import { WithId } from '@mautomate/api-interfaces';

export async function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function parseToId(document: WithId[]) {
  return document.map((document) => String(document._id));
}
