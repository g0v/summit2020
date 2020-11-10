import Vue from 'vue'
import { Dropdown, Modal, Button } from 'buefy'
import SummitMarkdown from '~/components/SummitMarkdown'

Vue.component('summit-markdown', SummitMarkdown)
Vue.use(Dropdown)
Vue.use(Modal)
Vue.use(Button)
