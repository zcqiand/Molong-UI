// ? 全局不动配置项 只做导出不做修改

// * 首页地址（默认）
export const ADMIN_HOME_URL: string = "/management/home/index"

// * 首页地址（默认）
export const HOME_URL: string = "/home"

// * 登录页地址（默认）
export const LOGIN_URL: string = "/login"

// * 注册页地址（默认）
export const REGISTER_URL: string = "/register"

// * 默认主题颜色
export const DEFAULT_PRIMARY: string = "#409EFF"

// * 路由白名单地址（必须是本地存在的路由 staticRouter.ts）
export const ROUTER_WHITE_LIST: string[] = ["/500", REGISTER_URL]

// * 高德地图 key
export const AMAP_MAP_KEY: string = ""

// * 百度地图 key
export const BAIDU_MAP_KEY: string = ""
