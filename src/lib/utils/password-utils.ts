import bcrypt from "bcrypt";

type Config = {
  rounds: number;
};

const defaultConfig: Config = {
  rounds: 10,
};

export default class PasswordUtils {
  private _rounds: number;

  constructor({ rounds }: Config = defaultConfig) {
    this._rounds = rounds;
  }

  compare(data: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(data, encrypted);
  }

  async hash(data: string): Promise<string> {
    const salt = await bcrypt.genSalt(this._rounds);
    return bcrypt.hash(data, salt);
  }
}
