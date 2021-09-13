import { GeneralApiProblem } from "./api-problem"

import * as IModel from "../../models/store"

export type ResultSorceDropdown = { kind: "ok"; data: IModel.App.IGetSorceDropdown[]; message: "" } | GeneralApiProblem
export type ResultPostCode = { kind: "ok"; data: string; message: "" } | GeneralApiProblem

export type ResultNoData = { kind: "ok"; data: []; message: "" } | GeneralApiProblem
