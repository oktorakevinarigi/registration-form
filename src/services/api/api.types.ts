import { GeneralApiProblem } from "./api-problem"

import * as IModel from "../../models/store"

export type ResultGetProvinces = { kind: "ok"; data: IModel.App.IGetProvinces[]; message: "" } | GeneralApiProblem

export type ResultNoData = { kind: "ok"; data: []; message: "" } | GeneralApiProblem
