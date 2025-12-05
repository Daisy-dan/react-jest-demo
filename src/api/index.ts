import { request } from "../utils/request";

export function signin(req: any) {
  return request({
    method: "post",
    url: `/api/auth/signin`,
    data: req,
  });
}
export function createUser(req: any) {
  return request({
    method: "post",
    url: `/api/users`,
    data: req,
  });
}
