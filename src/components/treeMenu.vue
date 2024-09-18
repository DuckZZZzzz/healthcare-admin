<template>
  <!-- 如果直接把这个template带v-for作为模板标签，会报错：‘children is not defined’ -->
  <!-- 因此外面加上一层template，不能用div来代替，会影响组件的expand和collapse的正常展示 -->
  <template
    v-for="item in props.menuData"
    :key="`${props.index}-${item.meta?.id}`"
  >
    <el-menu-item
      @click="handleClick(item, `${props.index}-${item.meta?.id}-item`)"
      v-if="!item.children || item.children.length === 0"
      :index="`${props.index}-${item.meta?.id}`"
    >
      <el-icon size="20">
        <component :is="item.meta?.icon"></component>
      </el-icon>
      <span>{{ item.meta?.name }}</span>
    </el-menu-item>

    <el-sub-menu
      v-else
      :index="`${props.index}-${item.meta?.id}`"
    >
      <template #title>
        <el-icon size="20">
          <component :is="item.meta?.icon"></component>
        </el-icon>
        <span>{{ item.meta?.name }}</span>
      </template>
      <treeMenu
        :index="`${props.index}-${item.meta?.id}`"
        :menuData="item.children || []"
      />
    </el-sub-menu>
  </template>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';


const props = defineProps({
  menuData: Array,
  index: String
});

const router = useRouter();

const store = useStore();

const handleClick = (item, activeItem) => {
  if (item.meta && item.meta.path) {
    store.commit('addMenu', item.meta)
    router.push(item.meta.path);
  } else {
    console.error('Invalid path or meta information:', item);
  }
};
</script>

<style scoped>
/* 你的样式 */
</style>