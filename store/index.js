export const STATES = {
  PAGE_WIDTH: 'pageWidth'
}

export const MUTATIONS = {
  SET_PAGE_WIDTH: 'setPageWidth'
}

export const state = () => {
  return {
    [STATES.PAGE_WIDTH]: '0px'
  }
}

export const mutations = {
  [MUTATIONS.SET_PAGE_WIDTH] (state, width) {
    state[STATES.PAGE_WIDTH] = width
  }
}
