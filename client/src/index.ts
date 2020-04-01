import { identity } from '@typoerr/atomic'
import { hello } from '@server/index'

console.log(identity(hello('client!')))
