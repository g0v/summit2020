import Vue from 'vue'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'

const SentryPlugin = {
  install (Vue) {
    const dsn = process.env.SENTRY_DSN
    if (dsn) {
      const config = {
        dsn,
        integrations: [new Integrations.Vue({ Vue, attachProps: true })]
      }
      if (process.env.APP_RELEASE) {
        config.release = process.env.APP_RELEASE
      }
      Sentry.init(config)
      Vue.prototype.$sentry = {
        self: Sentry
      }
    } else {
      Vue.prototype.$sentry = {
        self: {
          captureMessage: (...args) => {
            console.error(...args)
          }
        }
      }
    }
  }
}

Vue.use(SentryPlugin)
