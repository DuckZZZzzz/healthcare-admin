<template>
  <div>
    <template
      v-for="item in props.menuData">
      <!-- 没有子组件 -->
      <el-menu-item
      @click="handleClick(item, `${props.index}-${item.meta.id}-item`)"
        v-if="!item.children || item.children.length === 0"
        :index="`${props.index}-${item.meta.id}`"
        :key="`${props.index}-${item.meta.id}-item`"
      >
        <el-icon size="20">
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.name }}</span>
      </el-menu-item>
      <!-- 有子组件 -->
      <el-sub-menu
       v-else
        :index="`${props.index}-${item.meta.id}`"
        :key="`${props.index}-${item.meta.id}-submenu`"
        >
        <template #title>
          <el-icon size="20">
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.name }}</span>
        </template>
        <treeMenu
          :index="`${props.index}-${item.meta.id}`"
          :menuData="item.children"
        />
      </el-sub-menu>
    </template>
  </div>
</template>


<script setup>
import { useRouter } from 'vue-router';

const props = defineProps(["menuData", "index"]);
const router = useRouter()


const handleClick = (item, activeItem) => {
  router.push(item.meta.path)
}

</script>
<style scoped></style>