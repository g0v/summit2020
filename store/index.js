export const STATES = {
  PAGE_WIDTH: 'pageWidth',
  AGENDA_QUERY: 'agendaQuery'
}

export const MUTATIONS = {
  SET_PAGE_WIDTH: 'setPageWidth',
  SET_AGENDA_QUERY: 'setAgendaQuery'
}

export const state = () => {
  return {
    [STATES.PAGE_WIDTH]: '0px',
    [STATES.AGENDA_QUERY]: ''
  }
}

export const mutations = {
  [MUTATIONS.SET_PAGE_WIDTH] (state, width) {
    state[STATES.PAGE_WIDTH] = width
  },
  [MUTATIONS.SET_AGENDA_QUERY] (state, query) {
    state[STATES.AGENDA_QUERY] = query
  }
}
