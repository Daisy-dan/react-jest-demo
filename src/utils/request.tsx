import axios from "axios";

// default
const ax = axios.create({
  baseURL: "",
  timeout: 20000,
  headers: {},
});

// request interceptor
ax.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// response interceptor
ax.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

interface IData {
  url: string;
  data?: object;
  method?: "get" | "post" | "put" | "delete" | "patch";
  headers?: {
    ["Content-Type"]?: string;
    Authorization?: string;
    ["ID-Token"]?: string;
    ["Accept-Language"]?: string;
  };
  options?: {
    token?: "N" | "Y";
    loading?: boolean;
    language?: boolean;
    isBlob?: boolean;
  };
  responseType?: string;
}

export function request({
  url,
  data,
  method = "get",
  headers = {},
  options = {},
  responseType,
}: IData): Promise<any> {
  let lang = localStorage.getItem("xy_lang") || "zh_CN";
  const langObj: any = {
    zh_CN: "zh-CN",
    en_US: "en-US",
  };

  return new Promise((resolve, reject) => {
    if (options.token !== "N") {
      headers["Authorization"] = "Bearer " + localStorage.getItem("token");
    }
    // headers["Accept-Language"] = "en-US";

    let req = {
      url,
      method,
      [["get"].includes(method) ? "params" : "data"]: data,
      headers,
    };
    if (responseType) {
      req.responseType = responseType;
    }
    ax(req)
      .then((res) => {
        if (responseType) {
          resolve(res);
          return;
        }
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err?.response?.status === 401) {
          // logout();
        }
        reject(err.response.data);
      })
      .finally(() => {
        // id && loadingPlugin.hide(id);
      });
  });
}

export default ax;
