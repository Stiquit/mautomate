import { WithId } from '@mautomate/api-interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilitiesService {
  isInDocumentArray(documentArray: WithId[], documentToCheck: WithId) {
    return documentArray.some(
      (document) => String(document._id) === String(documentToCheck._id)
    );
  }
}
