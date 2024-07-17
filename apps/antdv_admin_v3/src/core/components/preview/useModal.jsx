import { createVNode, render as vueRender, h } from 'vue';
import { Modal } from 'ant-design-vue';
// import omit from '../_util/omit';



const show = (content, callback) => {
    const container = document.createDocumentFragment();
    let dialogIns = null;
    let closeFn = null;

    function destroy() {
        if (dialogIns) {
            vueRender(null, container);
            confirmDialogInstance.component.update();
            confirmDialogInstance = null;
        }
        closeFn?.()
    }

    function close() {
        update({
            open: false,
            afterClose: () => {
                destroy();
            },
        });
    }

    function update(props) {
        if (dialogIns) {
            Object.assign(dialogIns.component.props, props);
            dialogIns.component.update();
        }
    }

    const Wrapper = () => {
        const props = {
            open: true,
            close
        }

        return (
            <Modal {...props} >1</Modal>
        );
    };

    function render(props) {
        const vm = createVNode(Wrapper, { ...props });
        vueRender(vm, container);
        return vm;
    }

    dialogIns = render(currentConfig);
    closeFn = callback
    return {
        destroy: close,
    };
}


const showImage = (url) => {
    const vnode = <div>
        <img src={url} />
    </div>
    return show(vnode)
}

