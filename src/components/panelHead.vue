<template>
  <div class="panel-heading">
    <div class="panel-lead">
      <div class="title">{{ props.route.meta.name }}</div>
      <p class="description">{{ props.route.meta.describe }}</p>
    </div>
  </div>
</template>

<script setup>
// 因为这个组件的复用次数很多，如果使用引入的方式会比较麻烦，可以使用全局注入的方式
const props = defineProps({
  route: {
    type: Object
  }
})
console.log(props)
</script>

<style lang="less" scope>
.panel-heading {
  padding: 15px;
  background: #e8edf0;
  border-color: #e8edf0;
  position: relative;

  .panel-lead {
    font-size: 14px;

    .title {
      font-weight: bold;
      font-style: normal;
    }

    .description {
      margin-top: 5px;
    }
  }
}
</style>