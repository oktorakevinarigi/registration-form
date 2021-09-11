import { ApiResponse } from "apisauce"

export type GeneralApiProblem =
  /**
   * Times up.
   */
  | { kind: "timeout"; message: "Timeout Error"; temporary: true }
  /**
   * Cannot connect to the server for some reason.
   */
  | { kind: "cannot-connect"; message: "Connection Error" | "Network Error"; temporary: true }
  /**
   * The server experienced a problem. Any 5xx error.
   */
  | { kind: "server"; message: "Server Error" }
  | { kind: "service-unavailable"; message: "503 Service Unavailable" }
  | { kind: "bad-gateway"; message: "502 Bad Gateway" }
  | { kind: "internal-server-error"; message: "500 Internal Server Error" }
  /**
   * We're not allowed because we haven't identified ourself. This is 401.
   */
  | { kind: "unauthorized"; message: "Your session has expired" }
  /**
   * We don't have access to perform that request. This is 403.
   */
  | { kind: "forbidden"; message: "403 Forbidden" }
  /**
   * Unable to find that resource.  This is a 404.
   */
  | { kind: "not-found"; message: "404 Not Found" }
  /**
   * All other 4xx series errors.
   */
  | { kind: "rejected"; message: "rejected" }
  /**
   * Something truly unexpected happened. Most likely can try again. This is a catch all.
   */
  | { kind: "unknown"; temporary: true }
  /**
   * The data we received is not in the expected format.
   */
  | { kind: "bad-data"; message: "Not expected format" }
  /**
   * The data we send is not in the expected format.. This is 400.
   */
  | { kind: "bad-request"; message: "Bad Request" }
  | { kind: "problem"; message: "Error" }

  | { kind: "cancel-error"; message: "Cancel Error" }

/**
 * Attempts to get a common cause of problems from an api response.
 *
 * @param response The api response.
 */
export function getGeneralApiProblem(response: ApiResponse<any>): GeneralApiProblem | void {
  const Message = response.data?.message
  switch (response.problem) {
    case "CONNECTION_ERROR":
      return { kind: "cannot-connect", message: "Connection Error", temporary: true }
    case "NETWORK_ERROR":
      return { kind: "cannot-connect", message: "Network Error", temporary: true }
    case "TIMEOUT_ERROR":
      return { kind: "timeout", message: "Timeout Error", temporary: true }
    case "SERVER_ERROR":
      switch (response.status) {
        case 503:
          return { kind: "service-unavailable", message: "503 Service Unavailable" }
        case 502:
          return { kind: "bad-gateway", message: "502 Bad Gateway" }
        case 500:
          return { kind: "internal-server-error", message: Message ? Message : "500 Internal Server Error" }
        default:
          return { kind: "server", message: Message.toString(), }
      }
    case "UNKNOWN_ERROR":
      return { kind: "unknown", temporary: true }
    case "CLIENT_ERROR":
      switch (response.status) {
        case 400:
          return { kind: "bad-request", message: Message ? Message.toString() : "400 Bad Request" }
        case 401:
          return { kind: "unauthorized", message: "Your session has expired" }
        case 403:
          return { kind: "forbidden", message: "403 Forbidden" }
        case 404:
          return { kind: "not-found", message: "404 Not Found" }
        default:
          return { kind: "rejected", message: Message ? Message.toString() : "rejected" }
      }
    case "CANCEL_ERROR":
      return { kind: "cancel-error", message: "Cancel Error" }
  }
  return { kind: "problem", message: Message ? Message.toString() : "Error" }
}
