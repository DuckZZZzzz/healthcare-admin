<template>
  <div class="header-container">
    <div class="header-left flex-box">
      <el-icon size="20" class="icon" @click="store.commit('collapseMenu')">
        <Fold />
      </el-icon>
      <ul class="flex-box">
        <li :key="item.path" v-for="item in selectMenu" class="tab flex-box">
          <component class="icon" :is="item.icon"></component>
          <p class="menu">{{ item.name }}</p>
          <Close width="15px" />
        </li>
      </ul>
    </div>
    <div class="header-right">
      <el-dropdown>
        <div class="el-dropdown-link flex-box">
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          <p class="user-name">用户名</p>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <el-dropdown-item divided>Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
  
  <script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const selectMenu = computed(() => store.state.menu.selectMenu);
</script>
  
  <style lang="less" scoped>
.flex-box {
  display: flex;
  align-items: center;
  height: 100%;
}
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  background-color: #fff;
  padding-right: 25px;
  .header-left {
    height: 100%;
    .icon {
      width: 45px;
      height: 100%;
    }
    .icon:hover {
      background-color: #f5f5f5;
      cursor: pointer;
    }
    .tab {
      padding: 0 5px;
      .icon {
        width: 20px;
      }
      .menu {
        width: auto;
        margin: 0 5px;
      }
    }
    .tab:hover {
      cursor: pointer;
      background-color: #f5f5f5;
    }
  }
  .header-right {
    .user-name {
      height: 15px;
      margin: auto 10px;
      font-size: 15px;
    }
    .el-dropdown-link:hover {
      cursor: pointer;
    }
  }
}
</style>
  