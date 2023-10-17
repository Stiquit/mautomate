import { WithId } from '@mautomate/api-interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilitiesService {
  isInDocumentArray<T extends WithId>(documentArray: T[], documentToCheck: T) {
    return documentArray.some(
      (document) => String(document._id) === String(documentToCheck._id)
    );
  }

  parseDocumentToIdArray<T extends WithId>(documentArray: T[]) {
    return documentArray.map((document) => String(document._id));
  }

  removeFromDocumentArray<T extends WithId>(
    idToRemove: string,
    documentArray: T[]
  ) {
    return documentArray.filter(
      (document) => String(document._id) !== idToRemove
    );
  }

  updateDocumentInArray<T extends WithId>(
    documentToUpdate: T,
    documentArray: T[]
  ) {
    return documentArray.map((document) =>
      String(document._id) === String(documentToUpdate._id)
        ? documentToUpdate
        : document
    );
  }
}
