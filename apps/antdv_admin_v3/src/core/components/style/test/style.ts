import { useAntdStyle } from '../style'

function genCaStyle(token: any) {
  return {
    [token.componentCls]: {
      zIndex: 1,
      '&-extra': {
        marginBlockEnd: 16,
      },
      '&-toolbar': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
        paddingInline: 24,
        paddingBlock: 0,
        '&-option': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        },
        '&-title': {
          flex: '1',
          color: token.colorTextLabel,
          fontWeight: '500',
          fontSize: '16px',
          lineHeight: '24px',
          opacity: '0.85',
        },
      },
      // pro-card
      [`&:has(${token.antCls}-card)`]: {
        [`& ${token.antCls}-card-body`]: {
          paddingInline: 24,
          paddingBlock: 16,
        },
      },
      [`&:has(${token.componentCls}-list-toolbar)`]: {
        [`& ${token.antCls}-card-body`]: {
          paddingBlockStart: 0,
        },
      },
    },
  }
}

export function useStyle(prefixCls = 'antx-ca-css') {
  return useAntdStyle('Ca', (token) => {
    const proListToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    }

    return [genCaStyle(proListToken)]
  })
}
