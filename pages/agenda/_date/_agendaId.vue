<template lang="pug">
  .detail
    agenda-detail(
      :id="id"
      @closed="modalClosed"
    )
</template>
<script>
import { friendlyHeader } from '~/utils/crawlerFriendly'
import AgendaDetail from '~/components/AgendaDetail'
import agendaMixin from '~/utils/AgendaMixin'

export default {
  components: {
    AgendaDetail
  },
  mixins: [agendaMixin],
  computed: {
    id () {
      return this.$route.params.agendaId
    },
    agenda () {
      const allProposals = this.$t('proposal/map')
      return allProposals.find(agenda => agenda.id === this.id) || {}
    }
  },
  methods: {
    modalClosed () {
      this.$router.push({
        ...this.$route,
        params: {
          date: this.$route.params.date
        }
      })
    },
    finishRender ({ agenda }) {
      this.agenda = agenda
    }
  },
  head: friendlyHeader({
    title () {
      if (this.title) {
        return this.title
      }
      return `Day ${this.dayN} ${this.$t('agenda')}`
    },
    description () {
      if (this.agenda && this.agenda.summary) {
        return this.agenda.summary
      }
      return `Day ${this.dayN} ${this.$t('agenda')}`
    },
    coverUrl () {
      if (this.agenda && this.agenda.cover_image) {
        return this.agenda.cover_image
      }
      return '/og-agenda-v1.png'
    }
  })
}
</script>
<style lang="scss" scoped>
.detail {
  background: rgba(198, 198, 198, 0.8);
  z-index: 100;
  &__wrapper {
    position: sticky;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    max-height: 100vh;
    max-width: 100vw;
    display: inline-block;
  }
  &__modal {
    max-width: calc(100vw - 2rem);
    width: 65rem;
    border: 1px solid $pink-1;
    padding: 1rem 1rem 1rem 2rem;
    margin: auto;
    position: relative;
    top: 1rem;
    max-height: calc(100vh - 4rem);
    overflow-y: auto;
    @include not-small-screen {
      padding: 4.5rem 5.5rem;
      margin: auto;
      top: 3rem;
      max-height: calc(100vh - 6rem);
    }
  }
  &__start {
    .mr2 {
      color: #555;
    }
    color: #6e6e6e;
  }
  &__close {
    width: 1.25rem;
  }
  &__subheader {
    border-color: $pink-1;
    color: #6e6e6e;
    left: -1rem;
    width: calc(100% + 1rem);
  }
  &__resource {
    position: relative;
    right: -0.5rem;
  }
  &__header {
    color: $blue-1;
    position: sticky;
    z-index: 1;
    top: -2.5rem;
    @include not-small-screen {
      top: -4.5rem;
    }
    background: rgba(255, 255, 255, 0.9);
    padding-top: 2.5rem;
    margin-top: 0;
    margin-bottom: 0.25rem;

    a {
      color: $blue-1;
    }
  }
  h1 {
    margin: 0;
  }
  h2 {
    margin-top: 4rem;
    margin-bottom: 1rem;
    color: $blue-1;
    font-size: 1.25rem;
    font-weight: 500;
  }
  &__keyword {
    color: $blue-1;
  }
  &__people {
    margin-bottom: 4.5rem;
    justify-content: center;

    @include not-small-screen {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 2rem;
    }

    &--mono {
      grid-template-columns: 1fr;
    }
  }
}
.gray {
  color: #555;
}

</style>
