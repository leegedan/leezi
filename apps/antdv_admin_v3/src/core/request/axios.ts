import axios from "axios";
import { STORAGE_AUTHORIZE_KEY, useAuthorization } from '~/composables/authorization'
import { useMessage, useNotification } from '~/composables/global-config'

const isDev = import.meta.env.VITE_ENV === "development";

const showMessage = ({ msg, description, own = false }) => {
  if (isDev) {
    const notification = useNotification()
    notification.error({
      message: msg,
      description,
    });
  } else {
    const message = useMessage()
    message.error(own ? msg : "系统异常，请稍后");
  }
};

/**
 * http status error， 2xx 没啥用
 */
const codeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
};

/**
 * errorHandler
 * @param {*} error
 * @returns
 */

const errorHandler = (error) => {
  const { response = {} } = error;
  const errortext =
    codeMessage[response.status] || response.statusText || "请求发生错误";
  const { status = "", url } = response;

  showMessage({
    msg: `服务异常: ${status}`,
    description: errortext,
  });
  return Promise.reject(error);
};

function adaptTable(data) {
  // 分页检测，适配下表格分页数据
  if (data.total && data.pageSize) {
    // data.current = data.pageNo
    // data.total = data.total
    // data.data = data.list
  }
  return data;
}

/**
 * 接口自定义状态处理
 * @param {*} response
 * @returns
 */
const stateHandler = (response) => {
  const data = response.data;
  const code = data?.code;

  if (code === undefined) {
    if (!(data instanceof Blob)) {
      return Promise.reject(response);
    }
  } else {
    if (code === 200) {
      if (data?.data) {
        response.data.data = adaptTable(data.data);
      }
    } else {
      // 判断登陆过期
      // 判断token 刷新
      // 判断异常接口状态

      if (code === 401) {
        // showMessage({
        //   msg: '登录已过期',
        //   own: true
        // })
        // useUserStoreWithOut().logout();
      } else {
        showMessage({
          msg: `服务异常[${code}]`,
          description: data.msg
        })
      }
      return Promise.reject(response);
    }
    return response;
  }
};

const tokenHandler = (config) => {
  const token = useAuthorization();

  if (token.value) {
    config.headers["token"] = token.value;
  }
  return config;
};

export const createAxios = (config) => {
  // 创建新 axios 实例
  const axiosIns = axios.create(config);

  // request interceptor
  axiosIns.interceptors.request.use(tokenHandler, (error) => {
    const content = JSON.parse(error);
    showMessage({
      msg: '请求发生错误',
      description: content,
      own: true
    })
    return Promise.reject(error);
  });

  // response interceptor
  axiosIns.interceptors.response.use(stateHandler, errorHandler);

  return axiosIns;
};
