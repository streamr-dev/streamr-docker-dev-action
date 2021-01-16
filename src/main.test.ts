import osm = require('os')
import * as core from '@actions/core'

import { run } from '../src/main'

test('test', async () => {
    await run()
})
