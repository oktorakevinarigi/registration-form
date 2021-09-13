const API_URL = "https://api.panenpa.com"
const API_URL_POST_CODE = "https://kodepos.vercel.app"

/**
 * The options used to configure the API.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string
  urlPostCode: string

  province: string
  regency: string
  district: string
  village: string
  search: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: API_URL,
  urlPostCode: API_URL_POST_CODE,

  province: '/api/v1/region/province',
  regency: '/api/v1/region/regency',
  district: '/api/v1/region/district',
  village: '/api/v1/region/village',

  search: '/search',

  timeout: 60000,
}
