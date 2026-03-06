import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'xt5nugie',
    dataset: 'production'
  },
  deployment: {
    appId: 'a69z4zrz64rrfbtk7frfoh2h',
    autoUpdates: true,
  }
})
