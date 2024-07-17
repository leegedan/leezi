import type { RouteRecordRaw } from 'vue-router'
import { basicRouteMap } from './router-modules'
import { AccessEnum } from '~@/utils/constant'

export default [
  {
    path: '/dashboard',
    redirect: '/dashboard/analysis',
    name: 'Dashboard',
    meta: {
      title: '仪表盘',
      icon: 'DashboardOutlined',
    },
    component: basicRouteMap.RouteView,
    children: [
      {
        path: '/dashboard/analysis',
        name: 'DashboardAnalysis',
        component: () => import('~/pages/dashboard/analysis/index.vue'),
        meta: {
          title: '分析页',
        },
      },
      {
        path: '/dashboard/monitor',
        name: 'DashboardMonitor',
        component: () => import('~/pages/dashboard/monitor/index.vue'),
        meta: {
          title: '监控页',
        },
      },
      {
        path: '/dashboard/workplace',
        name: 'DashboardWorkplace',
        component: () => import('~/pages/dashboard/workplace/index.vue'),
        meta: {
          title: '监控页',
        },
      },
    ],
  },
  {
    path: '/form',
    redirect: '/form/basic-form',
    name: 'Form',
    meta: {
      title: '表单页',
      icon: 'FormOutlined',
    },
    component: basicRouteMap.RouteView,
    children: [
      {
        path: '/form/basic-form',
        name: 'FormBasic',
        component: () => import('~/pages/form/basic-form/index.vue'),
        meta: {
          title: '基础表单',
          locale: 'menu.form.basic-form',
        },
      },
      {
        path: '/form/step-form',
        name: 'FormStep',
        component: () => import('~/pages/form/step-form/index.vue'),
        meta: {
          title: '分步表单',
          locale: 'menu.form.step-form',
        },
      },
      {
        path: '/form/advanced-form',
        name: 'FormAdvanced',
        component: () => import('~/pages/form/advanced-form/index.vue'),
        meta: {
          title: '高级表单',
          locale: 'menu.form.advanced-form',
        },
      },
    ],
  },
  {
    path: '/link',
    redirect: '/link/iframe',
    name: 'Link',
    meta: {
      title: '链接',
      icon: 'LinkOutlined',
    },
    component: basicRouteMap.RouteView,
    children: [
      {
        path: '/link/iframe',
        name: 'LinkIframe',
        component: basicRouteMap.Iframe,
        meta: {
          title: 'AntDesign',
          url: 'https://ant.design/',
        },
      },
      {
        path: '/link/antdv',
        name: 'LinkAntdv',
        component: basicRouteMap.Iframe,
        meta: {
          title: 'AntDesignVue',
          url: 'https://antdv.com/',
        },
      },
      {
        path: 'https://www.baidu.com',
        name: 'LinkExternal',
        meta: {
          title: '跳转百度',
          // target: '_self',
        },
      },
    ],
  },
  {
    path: '/profile',
    name: 'profile',
    redirect: '/profile/basic',
    meta: {
      title: 'menu.profile',
      icon: 'ProfileOutlined',
      locale: 'menu.profile',
    },
    component: basicRouteMap.RouteView,
    children: [
      {
        path: '/profile/basic',
        name: 'ProfileBasic',
        component: () => import('~/pages/profile/basic/index.vue'),
        meta: {
          title: 'menu.profile.basic',
          locale: 'menu.profile.basic',
        },
      },
    ],
  },
  // {
  //   path: '/exception',
  //   redirect: '/exception/403',
  //   name: 'Exception',
  //   meta: {
  //     title: '异常页',
  //     icon: 'WarningOutlined',
  //     locale: 'menu.exception',
  //   },
  //   children: [
  //     {
  //       path: '/exception/403',
  //       name: 'Exception403',
  //       component: () => import('~/pages/exception/403.vue'),
  //       meta: {
  //         title: '403',
  //         locale: 'menu.exception.not-permission',
  //       },
  //     },
  //     {
  //       path: '/exception/404',
  //       name: 'Exception404',
  //       component: () => import('~/pages/exception/404.vue'),
  //       meta: {
  //         title: '404',
  //         locale: 'menu.exception.not-find',
  //       },
  //     },
  //     {
  //       path: '/exception/500',
  //       name: 'Exception500',
  //       component: () => import('~/pages/exception/500.vue'),
  //       meta: {
  //         title: '500',
  //         locale: 'menu.exception.server-error',
  //       },
  //     },
  //   ],
  // },
  {
    path: '/list',
    redirect: '/list/card-list',
    name: 'List',
    meta: {
      title: '列表页',
      icon: 'TableOutlined',
      locale: 'menu.list',
    },
    component: basicRouteMap.RouteView,
    children: [
      {
        path: '/list/card-list',
        name: 'CardList',
        component: () => import('~/pages/list/card-list.vue'),
        meta: {
          title: '卡片列表',
          locale: 'menu.list.card-list',
        },
      },
      {
        path: '/list/table-list',
        name: 'ConsultTable',
        component: () => import('~/pages/list/table-list.vue'),
        meta: {
          title: '查询表格',
          locale: 'menu.list.consult-table',
        },
      },
      {
        path: '/list/crud-table',
        name: 'CrudTable',
        component: () => import('~/pages/list/crud-table.vue'),
        meta: {
          title: '增删改查表格',
          locale: 'menu.list.crud-table',
        },
      },
      {
        path: '/list/basic-list',
        name: 'BasicList',
        component: () => import('~/pages/list/basic-list.vue'),
        meta: {
          title: '标准列表',
          locale: 'menu.list.basic-list',
        },
      },
      {
        path: '/list/search-list',
        name: 'SearchList',
        component: () => import('~/pages/list/search-list/index.vue'),
        meta: {
          title: '搜索列表',
          locale: 'menu.list.search-list',
        },
        redirect: '/list/search-list/articles',
        children: [
          {
            path: '/list/search-list/articles',
            name: 'SearchListArticles',
            component: () => import('~/pages/list/search-list/articles.vue'),
            meta: {
              title: '搜索列表（文章）',
              locale: 'menu.list.search-list.articles',
            },
          },
          {
            path: '/list/search-list/projects',
            name: 'SearchListProjects',
            component: () => import('~/pages/list/search-list/projects.vue'),
            meta: {
              title: '搜索列表（项目）',
              locale: 'menu.list.search-list.projects',
            },
          },
          {
            path: '/list/search-list/applications',
            name: 'SearchListApplications',
            component: () => import('~/pages/list/search-list/applications.vue'),
            meta: {
              title: '搜索列表（应用）',
              locale: 'menu.list.search-list.applications',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/account',
    redirect: '/account/center',
    name: 'Account',
    meta: {
      title: '个人页',
      icon: 'UserOutlined',
      locale: 'menu.account',
    },
    component: basicRouteMap.RouteView,
    children: [
      {
        path: '/account/center',
        name: 'AccountCenter',
        component: () => import('~/pages/account/center.vue'),
        meta: {
          title: '个人主页',
          locale: 'menu.account.center',
        },
      },
      {
        path: '/account/settings',
        name: 'AccountSettings',
        component: () => import('~/pages/account/settings.vue'),
        meta: {
          title: '个人设置',
          locale: 'menu.account.settings',
        },
      },
      {
        path: '/account/settings/:id',
        name: 'AccountSettings1',
        component: () => import('~/pages/account/settings.vue'),
        meta: {
          title: '个人设置1',
          locale: 'menu.account.settings',
          hideInMenu: true,
          parentKeys: ['/account/settings'],
        },
      },
    ],
  },

  {
    path: "/demo",
    name: "demo",
    redirect: "/demo/table",
    component: basicRouteMap.RouteView,
    authChildren: true,
    meta: {
      title: "组件",
      icon: "NumberOutlined",
    },
    children: [
      {
        path: "/demo/table",
        name: "demo.table",
        component: () =>
          import(/* webpackChunkName: "demo" */ "@/pages/demo/table.vue"),
        meta: { title: "Table", icon: "NumberOutlined", permission: ["admin"] },
      },
    ],
  },

  // {
  //   path: '/order',
  //   name: 'order',
  //   redirect: '/order/list',
  //   component: RouteView,
  //   meta: { title: '订单',  icon: 'shopping-cart', permission: ['user'] },
  //   children: [
  //     {
  //       path: '/order/list',
  //       name: 'olist',
  //       component: () => import(/* webpackChunkName: "order" */ '@/pages/order/list'),
  //       meta: { title: '订单列表', icon: 'bars', permission: ['admin'] },
  //     },
  //   ],
  // },

  {
    path: '/staff',
    name: 'staff',
    redirect: '/staff/list',
    component: basicRouteMap.RouteView,
    meta: { title: '员工管理',  icon: 'TeamOutlined', permission: ['user'] },
    children: [
      {
        path: '/staff/list',
        name: 'staff.list',
        component: () => import(/* webpackChunkName: "staff" */ '@/pages/staff/list.vue'),
        meta: { title: '员工列表', icon: 'TeamOutlined', permission: ['admin'] },
      },
      {
        path: '/staff/dept',
        name: 'staff.dept',
        component: () => import(/* webpackChunkName: "staff" */ '@/pages/staff/dept/list.vue'),
        meta: { title: '部门管理', icon: 'NumberOutlined', permission: ['admin'] },
      },
    ],
  },

  {
    path: "/setting",
    name: "setting",
    redirect: "/setting/user",
    component: basicRouteMap.RouteView,
    meta: {
      title: "设置",
      
      icon: "NumberOutlined",
      permission: ["user"],
    },
    children: [
      {
        path: "/setting/user",
        name: "setting.user",
        component: () =>
          import(
            /* webpackChunkName: "setting" */ "@/pages/settings/user/list.vue"
          ),
        meta: { title: "账号管理", icon: "NumberOutlined", permission: ["admin"] },
      },
      {
        path: "/setting/role",
        name: "setting.role",
        component: () =>
          import(
            /* webpackChunkName: "setting" */ "@/pages/settings/role/list.vue"
          ),
        meta: { title: "角色管理", icon: "NumberOutlined", permission: ["admin"] },
      },

      {
        path: "/setting/menu",
        name: "setting.menu",
        component: () =>
          import(
            /* webpackChunkName: "setting" */ "@/pages/settings/menu/list.vue"
          ),
        meta: { title: "菜单管理", icon: "NumberOutlined", permission: ["admin"] },
      },
      {
        path: "/setting/meta",
        name: "setting.meta",
        component: () =>
          import(
            /* webpackChunkName: "setting" */ "@/pages/settings/meta/list.vue"
          ),
        meta: { title: "元数据", icon: "NumberOutlined", permission: ["admin"] },
      },
      {
        path: "/setting/dict",
        name: "setting.dict",
        component: () =>
          import(
            /* webpackChunkName: "setting" */ "@/pages/settings/dict/list.vue"
          ),
        meta: { title: "数据字典", icon: "NumberOutlined", permission: ["admin"] },
      },
    ],
  },
] as RouteRecordRaw[]
