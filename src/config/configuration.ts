import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsString,
  validateSync,
} from "class-validator";

import dotenv = require("dotenv");
dotenv.config();

class Configuration {
  @IsInt()
  readonly PORT = Number(process.env.PORT);

  constructor() {
    const error = validateSync(this);
    if (!error.length) return;
    console.error(`Config validation error: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}

export const Config = new Configuration();
