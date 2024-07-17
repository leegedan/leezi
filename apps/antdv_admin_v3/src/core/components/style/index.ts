import { useStyleRegister } from 'ant-design-vue/es/_util/cssinjs'
import { theme as antdTheme } from 'ant-design-vue/es'
import { computed } from 'vue'
import type {
  CSSInterpolation,
} from 'ant-design-vue/es/_util/cssinjs'

export * from './util'

export function resetComponent(token: any) {
  return {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
    color: token.colorText,
    fontSize: token.fontSize,
    lineHeight: token.lineHeight,
    listStyle: 'none',
  }
}

export function operationUnit(token: any) {
  return {
    // FIXME: This use link but is a operation unit. Seems should be a colorPrimary.
    // And Typography use this to generate link style which should not do this.
    color: token.colorLink,
    outline: 'none',
    cursor: 'pointer',
    transition: `color ${token.motionDurationSlow}`,

    '&:focus, &:hover': {
      color: token.colorLinkHover,
    },

    '&:active': {
      color: token.colorLinkActive,
    },
  }
}

export function useAntdStyle(
  componentName: string,
  styleFn: (token: any) => CSSInterpolation,
) {
  const { token, hashId, theme } = antdTheme.useToken()

  const info = computed(() => {
    // token['antxCls'] = `.antx`

    return {
      token,
      theme: theme.value,
      hashId: hashId.value,
      path: ['antx', componentName],
    }
  })

  return {
    wrapSSR: useStyleRegister(info, () =>
      styleFn(token)),
    hashId,
  }
}
