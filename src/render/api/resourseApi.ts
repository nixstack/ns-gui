import { ApiResponse } from './ApiResponse'
import { Request } from '../../share'
import { ResourseModel } from '../model'

export const getResourse = function() {
  return Request.get<ApiResponse<ResourseModel[]>>('/swagger-resources')
}

export const getApis = function(url: string) {
  return Request.get<ApiResponse<any>>(url)
}
