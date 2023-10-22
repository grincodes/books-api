import { Result } from "../../../lib/core/logic/Result";
import { UseCaseError } from "../../../lib/core/logic/UseCaseError";

export namespace BookErrors {
  export class BookDoesNotExist extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Book does not exist`,
      } as UseCaseError);
    }

    public static create(): BookDoesNotExist {
      return new BookDoesNotExist();
    }
  }
}
