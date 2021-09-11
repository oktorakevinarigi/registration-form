import { GeneralApiProblem } from "./api-problem"

export type ResultNoData = { kind: "ok"; data: []; message: "" } | GeneralApiProblem
