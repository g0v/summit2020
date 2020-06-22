<template>
  <div class="timeline">
    <div class="timeline-container">
      <div v-for="(point, pointIndex) of points" :key="pointIndex" class="point" :class="point.class">
        <div class="circle" />
        <div class="label">
          <div v-if="point.date" class="date">
            {{ point.date }}
          </div>
          <div class="title">
            {{ point.title }}
          </div>
          <div v-if="point.description" class="description">
            {{ point.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    points: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
$w: 0.5rem;
$d: 2rem;

.timeline {
  position: relative;
  background-color: $green;
  color: white;
  line-height: 1.5;
  margin: 2rem 0;
  &:before {
    content: '';
    display: block;
    position: absolute;
    background-color: $gray;
  }
  @media (max-width: 800px) {
    padding: 2rem 2rem;
    &:before {
      top: 0;
      left: 2rem + $d/2 - $w/2;
      width: $w;
      height: 100%;
    }
  }
  @media (min-width: 801px) {
    padding: 8rem 4rem;
    &:before {
      top: calc(50% - #{$w/2});
      left: 0;
      width: 100%;
      height: $w;
    }
  }
}

.timeline-container {
  max-width: 60rem;
  margin: 0 auto;
  position: relative;
  display: flex;
  @media (max-width: 800px) {
    flex-direction: column;
  }
  justify-content: center;
  > .point {
    > .label {
      > .date {
        font-size: 1.125rem;
      }
      > .title {
        font-size: 1.25rem;
        line-height: 1.375;
      }
      > .description {
        font-size: 0.875rem;
        line-height: 1.25;
      }
    }
    &.small {
      > .circle {
        $ds: $d / 5 * 3;
        width: $ds;
        height: $ds;
        transform: translate(($d - $ds) / 2, ($d - $ds) / 2);
      }
    }
  }
  @media (max-width: 800px) {
    > .point {
      position: relative;
      margin: 0.5rem 0;
      > .circle {
        position: absolute;
        top: 0;
        left: 0;
        width: $d;
        height: $d;
        border-radius: 50%;
        background-color: white;
      }
      > .label {
        margin-left: $d*1.25;
      }
    }
  }
  @media (min-width: 801px) {
    > .point {
    position: relative;
    flex-grow: 1;
    &.large {
      flex-grow: 2;
    }
    > .circle {
      width: $d;
      height: $d;
      border-radius: 50%;
      background-color: white;
    }
    > .label {
      position: absolute;
      left: 0;
    }
    &:nth-child(odd) {
      > .label {
        bottom: $d*1.25;
      }
    }
    &:nth-child(even) {
      > .label {
        top: $d*1.25;
      }
    }
  }
  }
}
</style>
