import * as Sentry from '@sentry/browser'
import Cookies from 'js-cookie'

const HEALTH_COOKIE_OPT = {
  // ensure data is removed in 28 days
  expires: 28,
  secure: true
}

const STORAGE_KEYS = {
  HEALTH_DECLA_INFO: 'helt_decl_info',
  LAST_HEALTH_KEY: 'last_helt_decl_key',
  FAVOURITE_AGENDAS: 'summit2020_favourite_agendas'
}

export const STATES = {
  PAGE_WIDTH: 'pageWidth',
  AGENDA_QUERY: 'agendaQuery',
  AGENDA_FILTER: 'agendaFilter',

  HEALTH_DECLA_INFO: 'healthDeclaInfo',
  LAST_HEALTH_KEY: 'lastHeathKey',

  FAVOURITE_AGENDAS: 'favouriteAgendas',
  ROOM_OCCU_STATE: 'roomOccupationState'
}

export const MUTATIONS = {
  SET_PAGE_WIDTH: 'setPageWidth',
  SET_AGENDA_QUERY: 'setAgendaQuery',
  SET_AGENDA_FILTER: 'setAgendaFilter',
  RESET_AGENDA_SEARCH: 'resetAgendaSearch',

  DECLARE_HEALTH: 'declareHealth',
  INIT_HEALTH: 'initHealth',

  TOGGLE_FAVOURITE_AGENDA: 'toggleFavouriteAgenda',
  INIT_FAVOURITE_AGENDAS: 'initFavouriteAgendas',
  SET_ROOM_OCCU: 'setRoomOccupation'
}

export const GETTERS = {
  CUR_HEALTH_INFO: 'curHealthInfo'
}

export const state = () => {
  return {
    [STATES.PAGE_WIDTH]: '0px',
    [STATES.AGENDA_QUERY]: '',
    [STATES.AGENDA_FILTER]: {},

    [STATES.HEALTH_DECLA_INFO]: {},
    [STATES.LAST_HEALTH_KEY]: '',

    [STATES.FAVOURITE_AGENDAS]: [],
    [STATES.ROOM_OCCU_STATE]: []
  }
}

export const mutations = {
  [MUTATIONS.SET_PAGE_WIDTH] (state, width) {
    state[STATES.PAGE_WIDTH] = width
  },
  [MUTATIONS.SET_AGENDA_QUERY] (state, query) {
    state[STATES.AGENDA_QUERY] = query
  },
  [MUTATIONS.SET_AGENDA_FILTER] (state, filter) {
    state[STATES.AGENDA_FILTER] = filter
  },
  [MUTATIONS.RESET_AGENDA_SEARCH] (state) {
    state[STATES.AGENDA_QUERY] = ''
    state[STATES.AGENDA_FILTER] = {}
  },

  [MUTATIONS.DECLARE_HEALTH] (state, { hashKey, meta }) {
    state[STATES.HEALTH_DECLA_INFO] = { [hashKey]: meta }
    state[STATES.LAST_HEALTH_KEY] = hashKey
    Cookies.set(
      STORAGE_KEYS.HEALTH_DECLA_INFO,
      JSON.stringify(state[STATES.HEALTH_DECLA_INFO]),
      HEALTH_COOKIE_OPT
    )
    Cookies.set(
      STORAGE_KEYS.LAST_HEALTH_KEY,
      hashKey,
      HEALTH_COOKIE_OPT
    )
  },
  [MUTATIONS.INIT_HEALTH] (state, { info, lastKey }) {
    state[STATES.HEALTH_DECLA_INFO] = info
    state[STATES.LAST_HEALTH_KEY] = lastKey
  },
  [MUTATIONS.TOGGLE_FAVOURITE_AGENDA] (state, { agendaId }) {
    const favouriteAgendas = [...state[STATES.FAVOURITE_AGENDAS]]
    const favouriteAgendaIndex = favouriteAgendas.indexOf(agendaId)
    if (favouriteAgendaIndex > -1) {
      favouriteAgendas.splice(favouriteAgendaIndex, 1)
    } else {
      favouriteAgendas.push(agendaId)
    }
    localStorage.setItem(STORAGE_KEYS.FAVOURITE_AGENDAS, JSON.stringify(favouriteAgendas))
    state[STATES.FAVOURITE_AGENDAS] = favouriteAgendas
  },
  [MUTATIONS.INIT_FAVOURITE_AGENDAS] (state) {
    const favouriteAgendas = localStorage.getItem(STORAGE_KEYS.FAVOURITE_AGENDAS)
    state[STATES.FAVOURITE_AGENDAS] = favouriteAgendas ? JSON.parse(favouriteAgendas) : []
  },
  [MUTATIONS.SET_ROOM_OCCU] (state, occupationList) {
    state[STATES.ROOM_OCCU_STATE] = occupationList
  }
}

export const actions = {
  nuxtClientInit ({ commit }) {
    let healthDeclaInfo = {}
    const healthDeclaStr = Cookies.get(STORAGE_KEYS.HEALTH_DECLA_INFO)
    try {
      if (healthDeclaStr) {
        healthDeclaInfo = JSON.parse(healthDeclaStr)
      }
    } catch (err) {
      Sentry.captureException(`Invalid health decla: ${healthDeclaStr}`)
    }

    const lastHealthKey = Cookies.get(STORAGE_KEYS.LAST_HEALTH_KEY) || ''
    commit(MUTATIONS.INIT_HEALTH, {
      info: healthDeclaInfo,
      lastKey: lastHealthKey
    })
  }
}

export const getters = {
  [GETTERS.CUR_HEALTH_INFO] (state) {
    const key = state[STATES.LAST_HEALTH_KEY]
    const info = state[STATES.HEALTH_DECLA_INFO]
    if (!key || !info || !info[key]) {
      return null
    }
    const name = '●●●' + info[key].name
    const phone = '●●●●●●●' + info[key].phone
    return {
      ...info[key],
      name,
      phone
    }
  }
}
