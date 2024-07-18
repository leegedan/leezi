import PQueue from 'p-queue'
import pRetry from 'p-retry'
import pLimit  from 'p-limit'

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export {
    wait,
    pRetry,
    pLimit,
    PQueue
}