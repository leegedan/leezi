// function tom(path: string) {
//     const keys = path.split('/').filter(k => k)
//     return {
//         path,
//         component: path,
//         name: keys.map(k => k.replace(/^\w/, c => c.toUpperCase())).join(''),
//         locale: keys.join('.') + 'title'
//     }
// }

// function gen(id: number = 1, parentId: number = 0, title: string = '菜单', icon: string = 'BarsOutlined', path: string = '/', isMenu: boolean = true, keepAlive: boolean = true, component?: string, name?: string, locale?: string, redirect?: string) {

//     const more = tom(path)
//     const maybe = {
//         component,
//         name,
//         locale,
//         redirect
//     }

//     return {
//         id,
//         parentId,
//         title,
//         icon,
//         ...more,
//         ...maybe
//     }
// }

const menuData = [
  {
    id: 2,
    parentId: 0,
    title: '分析页',
    icon: 'DashboardOutlined',
    component: '/dashboard/analysis',
    path: '/dashboard/analysis',
    name: 'DashboardAnalysis',
    keepAlive: true,
    locale: 'menu.dashboard.analysis',
  },
  {
    id: 1,
    parentId: 0,
    title: '仪表盘',
    icon: 'DashboardOutlined',
    component: 'RouteView',
    redirect: '/dashboard/analysis',
    path: '/dashboard',
    name: 'Dashboard',
    locale: 'menu.dashboard',
    isMenu: true,
  },
  {
    id: 3,
    parentId: 0,
    title: '表单页',
    icon: 'FormOutlined',
    component: 'RouteView',
    redirect: '/form/basic',
    path: '/form',
    name: 'Form',
    locale: 'menu.form',
    isMenu: true,
  },
  {
    id: 5,
    parentId: 0,
    title: '链接',
    icon: 'LinkOutlined',
    component: 'RouteView',
    redirect: '/link/iframe',
    path: '/link',
    name: 'Link',
    locale: 'menu.link',
    isMenu: true,

  },
  {
    id: 6,
    parentId: 5,
    title: 'AntDesign',
    url: 'https://ant.design/',
    component: 'Iframe',
    path: '/link/iframe',
    name: 'LinkIframe',
    keepAlive: true,
    locale: 'menu.link.iframe',
    isMenu: true,
  },
  {
    id: 7,
    parentId: 5,
    title: 'AntDesignVue',
    url: 'https://antdv.com/',
    component: 'Iframe',
    path: '/link/antdv',
    name: 'LinkAntdv',
    keepAlive: true,
    locale: 'menu.link.antdv',
    isMenu: true,
  },
  {
    id: 8,
    parentId: 5,
    path: 'https://www.baidu.com',
    name: 'LinkExternal',
    title: '跳转百度',
    locale: 'menu.link.external',
    isMenu: true,
  },
  {
    id: 26,
    parentId: 0,
    title: '列表页',
    icon: 'TableOutlined',
    component: 'RouteView',
    redirect: '/list/card-list',
    path: '/list',
    name: 'List',
    locale: 'menu.list',
    isMenu: true,
  },
  {
    id: 27,
    parentId: 26,
    path: '/list/card-list',
    title: '卡片列表',
    name: 'ListCard',
    component: '/list/card-list',
    locale: 'menu.list.card-list',
    isMenu: true,
  },
  {
    id: 28,
    parentId: 0,
    title: '详情页',
    icon: 'ProfileOutlined',
    component: 'RouteView',
    redirect: '/profile/basic',
    path: '/profile',
    name: 'Profile',
    locale: 'menu.profile',
    isMenu: true,
  },
  {
    id: 29,
    parentId: 28,
    path: '/profile/basic',
    title: '基础详情页',
    name: 'ProfileBasic',
    component: '/profile/basic/index',
    locale: 'menu.profile.basic',
    isMenu: true,
  },
  {
    id: 30,
    parentId: 26,
    path: '/list/search-list',
    title: '搜索列表',
    name: 'SearchList',
    component: '/list/search-list',
    locale: 'menu.list.search-list',
    isMenu: true,
  },
  {
    id: 31,
    parentId: 30,
    path: '/list/search-list/articles',
    title: '搜索列表（文章）',
    name: 'SearchListArticles',
    component: '/list/search-list/articles',
    locale: 'menu.list.search-list.articles',
    isMenu: true,
  },
  {
    id: 32,
    parentId: 30,
    path: '/list/search-list/projects',
    title: '搜索列表（项目）',
    name: 'SearchListProjects',
    component: '/list/search-list/projects',
    locale: 'menu.list.search-list.projects',
    isMenu: true,
  },
  {
    id: 33,
    parentId: 30,
    path: '/list/search-list/applications',
    title: '搜索列表（应用）',
    name: 'SearchListApplications',
    component: '/list/search-list/applications',
    locale: 'menu.list.search-list.applications',
    isMenu: true,
  },
  {
    id: 34,
    parentId: 26,
    path: '/list/basic-list',
    title: '标准列表',
    name: 'BasicCard',
    component: '/list/basic-list',
    locale: 'menu.list.basic-list',
    isMenu: true,
  },
  {
    id: 35,
    parentId: 28,
    path: '/profile/advanced',
    title: '高级详细页',
    name: 'ProfileAdvanced',
    component: '/profile/advanced/index',
    locale: 'menu.profile.advanced',
    isMenu: true,
  },
  {
    id: 4,
    parentId: 3,
    title: '基础表单',
    component: '/form/basic-form/index',
    path: '/form/basic-form',
    name: 'FormBasic',
    keepAlive: false,
    locale: 'menu.form.basic-form',
    isMenu: true,
  },
  {
    id: 36,
    parentId: 0,
    title: '个人页',
    icon: 'UserOutlined',
    component: 'RouteView',
    redirect: '/account/center',
    path: '/account',
    name: 'Account',
    locale: 'menu.account',
    isMenu: true,
  },
  {
    id: 37,
    parentId: 36,
    path: '/account/center',
    title: '个人中心',
    name: 'AccountCenter',
    component: '/account/center',
    locale: 'menu.account.center',
    isMenu: true,
  },
  {
    id: 38,
    parentId: 36,
    path: '/account/settings',
    title: '个人设置',
    name: 'AccountSettings',
    component: '/account/settings',
    locale: 'menu.account.settings',
    isMenu: true,
  },
  {
    id: 39,
    parentId: 3,
    title: '分步表单',
    component: '/form/step-form/index',
    path: '/form/step-form',
    name: 'FormStep',
    keepAlive: false,
    locale: 'menu.form.step-form',
    isMenu: true,
  },
  {
    id: 40,
    parentId: 3,
    title: '高级表单',
    component: '/form/advanced-form/index',
    path: '/form/advanced-form',
    name: 'FormAdvanced',
    keepAlive: false,
    locale: 'menu.form.advanced-form',
    isMenu: true,
  },
  {
    id: 41,
    parentId: 26,
    path: '/list/table-list',
    title: '查询表格',
    name: 'ConsultTable',
    component: '/list/table-list',
    locale: 'menu.list.consult-table',
    isMenu: true,
  },
  {
    id: 42,
    parentId: 1,
    title: '监控页',
    component: '/dashboard/monitor',
    path: '/dashboard/monitor',
    name: 'DashboardMonitor',
    keepAlive: true,
    locale: 'menu.dashboard.monitor',
    isMenu: true,
  },
  {
    id: 43,
    parentId: 1,
    title: '工作台',
    component: '/dashboard/workplace',
    path: '/dashboard/workplace',
    name: 'DashboardWorkplace',
    keepAlive: true,
    locale: 'menu.dashboard.workplace',
    isMenu: true,
  },
  {
    id: 44,
    parentId: 26,
    path: '/list/crud-table',
    title: '增删改查表格',
    name: 'CrudTable',
    component: '/list/crud-table',
    locale: 'menu.list.crud-table',
    isMenu: true,
  },
]

const plusData = [
  { id: 1000, title: '订单', path: '/order', component: 'RouteView', parentId: 0, isMenu: true },
  { id: 2000, title: '员工', path: '/staff', component: 'RouteView', parentId: 0, isMenu: true },
  { id: 3000, title: '设置', path: '/settings', component: 'RouteView', parentId: 0, isMenu: true },

  { id: 10001, title: '订单列表', path: '/order/list', component: '/order/list', parentId: 1000, keepAlive: true, isMenu: true },
  { id: 20001, title: '员工列表', path: '/staff/list', component: '/staff/list', parentId: 2000, keepAlive: true, isMenu: true },
  { id: 20002, title: '部门', path: '/staff/dept', component: '/staff/dept/list', parentId: 2000, keepAlive: true, isMenu: true },
  { id: 30001, title: '账号管理', path: '/settings/user', component: '/settings/user/list', parentId: 3000, keepAlive: true, isMenu: true },
  { id: 30002, title: '角色列表', path: '/settings/role', component: '/settings/role/list', parentId: 3000, keepAlive: true, isMenu: true },
  { id: 30003, title: '菜单列表', path: '/settings/menu', component: '/settings/menu/list', parentId: 3000, keepAlive: true, isMenu: true },
  { id: 30004, title: '元数据', path: '/settings/meta', component: '/settings/meta/list', parentId: 3000, keepAlive: true, isMenu: true },
  { id: 30005, title: '数据字典', path: '/settings/dict', component: '/settings/dict/list', parentId: 3000, keepAlive: true, isMenu: true },

  { id: 100011, title: '新增', path: 'add', parentId: 10001, isMenu: false },
  { id: 100012, title: '修改', path: 'edit', parentId: 10001, isMenu: false },
  { id: 100013, title: '删除', path: 'delete', parentId: 10001, isMenu: false },
  { id: 200011, title: '新增', path: 'add', parentId: 20001, isMenu: false },
  { id: 200012, title: '修改', path: 'edit', parentId: 20001, isMenu: false },
  { id: 200013, title: '删除', path: 'delete', parentId: 20001, isMenu: false },
  { id: 200014, title: '导出', path: 'export', parentId: 20001, isMenu: false },
  { id: 200021, title: '新增', path: 'add', parentId: 20002, isMenu: false },
  { id: 200022, title: '修改', path: 'edit', parentId: 20002, isMenu: false },
  { id: 200023, title: '删除', path: 'delete', parentId: 20002, isMenu: false },
  { id: 300011, title: '新增', path: 'add', parentId: 30001, isMenu: false },
  { id: 300012, title: '修改', path: 'edit', parentId: 30001, isMenu: false },
  { id: 300013, title: '删除', path: 'delete', parentId: 30001, isMenu: false },
  { id: 300021, title: '新增', path: 'add', parentId: 30002, isMenu: false },
  { id: 300022, title: '修改', path: 'edit', parentId: 30002, isMenu: false },
  { id: 300023, title: '删除', path: 'delete', parentId: 30002, isMenu: false },
  { id: 300031, title: '新增', path: 'add', parentId: 30003, isMenu: false },
  { id: 300032, title: '修改', path: 'edit', parentId: 30003, isMenu: false },
  { id: 300033, title: '删除', path: 'delete', parentId: 30003, isMenu: false },
  { id: 300041, title: '新增', path: 'add', parentId: 30004, isMenu: false },
  { id: 300042, title: '修改', path: 'edit', parentId: 30004, isMenu: false },
  { id: 300043, title: '删除', path: 'delete', parentId: 30004, isMenu: false },
  { id: 300051, title: '新增', path: 'add', parentId: 30005, isMenu: false },
  { id: 300052, title: '修改', path: 'edit', parentId: 30005, isMenu: false },
  { id: 300053, title: '删除', path: 'delete', parentId: 30005, isMenu: false },

  { id: 9000, title: '组件', path: '/demo', component: 'RouteView', parentId: 0, isMenu: true },
  { id: 90001, title: 'table', path: '/demo/table', component: '/demo/table', parentId: 9000, isMenu: true },

]

export default eventHandler(() => {
  return {
    code: 200,
    msg: 'success',
    data: [
      ...menuData,
      ...plusData,
    ],
  }
})
