import 'polyfill-object.fromentries'
import 'text-encoding-polyfill'

import flat from 'array.prototype.flat'
import flatMap from 'array.prototype.flatmap'

flat.shim()
flatMap.shim()

const originalConsole = window.console
// define a new console
const proxiedConsole = new Proxy(window.console, {
  get(obj, prop: keyof Console) {
    if (process.env.NODE_ENV !== 'production') {
      return obj[prop]
    } else {
      return () => undefined
    }
  },
})

window.console = Object.assign({}, proxiedConsole, { force: originalConsole })
// eslint-disable-next-line no-native-reassign
console = window.console
