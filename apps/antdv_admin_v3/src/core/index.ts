import * as components from './components'
import { use as useCache } from './components/cache'
import { setupPermissionDirective } from './directives/action'
import { useDict } from './dict'
import {
    setupAccessDirective,
    setupLoadingDirective,
  } from '../directive'

export const cmpts = {
    install: (app) => {
        Object.keys(components).forEach((k) => {
            const cmpt = components[k]
            if (cmpt.install) {
                app.use(cmpt)
            } else if (cmpt.displayName || cmpt.name) {
                app.component(cmpt.displayName || cmpt.name, cmpt);
            } else {
                const name = k.toString().toLowerCase()
                app.component(name, cmpt);
            }
        })
    },
}

export const cache = {
    install: (app) => {
        useDict()
        useCache(app)
    },
}

export const directives = {
    install: (app) => {
        setupPermissionDirective(app)
        setupAccessDirective(app)
        setupLoadingDirective(app)
    },
}