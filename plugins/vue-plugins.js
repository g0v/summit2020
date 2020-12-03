import Vue from 'vue'
import {
  Snackbar,
  Dropdown,
  Modal,
  Button,
  Dialog,
  Radio,
  Tooltip
} from 'buefy'
import SummitMarkdown from '~/components/SummitMarkdown'

Vue.component('summit-markdown', SummitMarkdown)
Vue.use(Snackbar)
Vue.use(Dropdown)
Vue.use(Modal)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Radio)
Vue.use(Tooltip)
