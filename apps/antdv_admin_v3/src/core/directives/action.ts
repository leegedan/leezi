// import type { App, Directive, DirectiveBinding } from 'vue';

import router from '../../router'

/**
 * Action 权限指令
 * 指令用法：
 *  - 在需要控制 action 级别权限的组件上使用 v-action:[method] , 如下：
 *    <i-button v-action:add >添加用户</a-button>
 *    <a-button v-action:delete>删除用户</a-button>
 *    <a v-action:edit @click="edit(record)">修改</a>
 */



function hasPermission(el, binding, vnode) {
  const action = binding.value
  
  const route = router.currentRoute.value

  const actions = route.meta.actions || []
  if (!actions.includes(action)) {
    el.parentNode?.removeChild(el) || (el.style.display = 'none')
  }
}

// const mounted = (el: Element, binding, vnode) => {
//   hasPermission(el, binding, vnode);
// };


const permissionDirective = {
  mounted: (el, binding, vnode) => {
    hasPermission(el, binding, vnode);
  },
};

export function setupPermissionDirective(app) {
  app.directive('action', permissionDirective);
}

export default permissionDirective;
