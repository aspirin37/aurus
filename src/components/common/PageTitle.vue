<template>
  <div class="title-page">
    <h1 class="title-page__text">
      {{ text }}
    </h1>
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.title-page {
  &__text {
    color: var(--aurum);
    font-size: 34px;
    font-weight: 500;
    margin: 0;
  }
}
</style>
