import { message } from 'ant-design-vue';

export function useTip(refTable) {
    function success(refreshTable = true) {
        message.success('操作成功')
        refreshTable && refTable?.value?.refresh()
    }

    function fail() {
        message.error('操作失败')
    }

    function tip(result) {
        if (result.code === 200) {
            success()
        } else {
            fail()
        }
    }

    return {
        success,
        fail,
        tip
    }
}