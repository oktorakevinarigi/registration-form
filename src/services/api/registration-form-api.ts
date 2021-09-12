import { ApisauceInstance, create, ApiResponse } from "apisauce"

import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"

export class RegFormApi {
  apisauce!: ApisauceInstance
  config: ApiConfig

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  setup() {
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
  }

  async province(): Promise<Types.ResultGetProvinces> {
    const result: ApiResponse<any> = await this.apisauce.get(this.config.province)
    if (result.status !== 200) {
      const problem = getGeneralApiProblem(result)
      if (problem) return problem
    }

    try {
      const data = result.data.data.map((x: { id: string; name: string }) => ({
        id: x.id,
        label: x.name,
        text: x.name
      }))
      return { kind: "ok", data, message: "" }
    } catch (error) {
      return { kind: "bad-data", message: "Not expected format" }
    }
  }
}
