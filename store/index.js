export const STATES = {
  PAGE_WIDTH: 'pageWidth',
  AGENDA_QUERY: 'agendaQuery',
  AGENDA_FILTER: 'agendaFilter'
}

export const MUTATIONS = {
  SET_PAGE_WIDTH: 'setPageWidth',
  SET_AGENDA_QUERY: 'setAgendaQuery',
  SET_AGENDA_FILTER: 'setAgendaFilter',
  RESET_AGENDA_SEARCH: 'resetAgendaSearch'
}

export const state = () => {
  return {
    [STATES.PAGE_WIDTH]: '0px',
    [STATES.AGENDA_QUERY]: '',
    [STATES.AGENDA_FILTER]: {}
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
  }
}
