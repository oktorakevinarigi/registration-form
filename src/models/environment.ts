import * as api from '../services/api';
export class Environment {
  constructor() {
    this.api = new api.Api()
    this.regFormApi = new api.RegFormApi()
  }

  async setup() {
    await this.api.setup()
    await this.regFormApi.setup()
  }

  api: api.Api
  regFormApi: api.RegFormApi
}
