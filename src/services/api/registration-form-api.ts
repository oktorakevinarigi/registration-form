import { ApisauceInstance, create, ApiResponse } from "apisauce"

import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"

interface IBodySubmit {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  province: number;
  regency: number;
  district: number;
  village: number;
  address: string;
  postCode: string;
}
export class RegFormApi {
  apisauce!: ApisauceInstance
  apisaucePostCode!: ApisauceInstance
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
    this.apisaucePostCode = create({
      baseURL: this.config.urlPostCode,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
  }

  async province(): Promise<Types.ResultSorceDropdown> {
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

  async regency(provinceId: number): Promise<Types.ResultSorceDropdown> {
    const result: ApiResponse<any> = await this.apisauce.get(this.config.regency + "/in/" + provinceId)
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

  async district(regencyId: number): Promise<Types.ResultSorceDropdown> {
    const result: ApiResponse<any> = await this.apisauce.get(this.config.district + "/in/" + regencyId)
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

  async village(districtId: number): Promise<Types.ResultSorceDropdown> {
    const result: ApiResponse<any> = await this.apisauce.get(this.config.village + "/in/" + districtId)
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

  async postCode(data: any): Promise<Types.ResultPostCode> {
    const result: ApiResponse<any> = await this.apisaucePostCode.get(this.config.search + "/?q=" + data.village.label)
    if (result.status !== 200 || result.data.status === false) {
      const problem = getGeneralApiProblem(result)
      if (problem) return problem
    }
    try {
      const resFind = result.data.data.find((x: { province: string; subdistrict: string; }) =>
        x.province.toLocaleUpperCase().includes(data.province.label) && x.subdistrict === data.district.label)
      return { kind: "ok", data: resFind.postalcode ? resFind.postalcode : "", message: "" }
    } catch (error) {
      return { kind: "bad-data", message: "Not expected format" }
    }
  }

  async submit(body: IBodySubmit): Promise<Types.ResultNoData> {
    try {
      const data = {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        password: body.password,
        provinceId: body.province,
        regencyId: body.regency,
        districtId: body.district,
        villageId: body.village,
        address: body.address,
        postCode: body.postCode,
      }
      alert(JSON.stringify(data))
      return { kind: "ok", data: [], message: "" }
    } catch (error) {
      return { kind: "bad-data", message: "Not expected format" }
    }
  }

}
