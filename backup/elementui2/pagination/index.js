import { Pagination } from 'element-ui';
import { connect, prefix } from '../utils';

const component = connect(Pagination)({
    pageSizes: [10, 20, 30, 50, 100],
    layout: 'total, sizes, prev, pager, next, jumper',
})

component.name = `${prefix}Pagination`

export default component