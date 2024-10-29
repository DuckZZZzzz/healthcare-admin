<template>
  <div class="panel-heading">
    <div class="panel-lead">
      <div class="title">菜单管理</div>
      <p class="description">菜单规则通常对应一个控制器的方法，同时菜单栏数据也从规则中获取</p>
    </div>
  </div>
</template>

<script setup>
// 因为这个组件的复用次数很多，如果使用引入的方式会比较麻烦，可以使用全局注入的方式

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