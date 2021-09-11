import * as api from '../services/api';
export class Environment {
  constructor() {
    this.api = new api.Api()
  }

  async setup() {
    await this.api.setup()
  }

  api: api.Api
}
