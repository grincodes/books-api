import { AggregateRoot } from "../../../lib/core/domain/AggregateRoot";
import { UniqueEntityID } from "../../../lib/core/domain/UniqueEntityID";
import { Result } from "../../../lib/core/logic/Result";
import { Guard } from "../../../lib/core/logic/Guard";
import "reflect-metadata";
import {
  IsUUID,
  IsString,
  IsNotEmpty,
  MinLength,
  IsDateString,
} from "class-validator";
import { Entity } from "../../../lib/core/domain/Entity";

export interface BookProps {
  id?: string;
  title: string;
  author: string;
  publishedDate: string;
}

export class BookGuard {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  author: string;

  @IsDateString()
  publishedDate: string;
}

export class Book extends Entity<BookProps> {
  private constructor(props: BookProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): string {
    return this._id.toString();
  }

  get title(): string {
    return this.props.title;
  }

  get author(): string {
    return this.props.author;
  }

  get publishedDate(): string {
    return this.props.publishedDate;
  }

  public static create(props: BookProps, id?: UniqueEntityID): Result<Book> {
    const guardResult = Guard.validate(BookGuard, props);

    if (guardResult) {
      return Result.fail<Book>(guardResult.errMsg);
    }

    const book = new Book(
      {
        ...props,
      },
      id
    );

    return Result.ok<Book>(book);
  }
}
