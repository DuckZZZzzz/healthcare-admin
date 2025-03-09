<template>
  <!-- 问题：如何做到切换menu的时候，侧边栏的menu也对应改变？ -->
  <div class="header-container">
    <div class="header-left flex-box">
      <el-icon size="20" class="icon" @click="store.commit('collapseMenu')">
        <Fold />
      </el-icon>
      <ul class="flex-box">
        <li :key="item.path" v-for="(item, index) in selectMenu" class="tab flex-box"
          :class="{ selected: item.path === route.path }">
          <router-link :to="{ path: item.path }" class="flex-box">
            <el-icon size="15">
              <component class="icon" :is="item.icon"></component>
            </el-icon>
            <p class="menu">{{ item.name }}</p>
          </router-link>
          <el-icon @click="closeTab(item, index)">
            <Close class="close" />
          </el-icon>
        </li>
      </ul>
    </div>
    <div class="header-right">
      <el-dropdown @command="handleCommand">
        <div class="el-dropdown-link flex-box">
          <el-avatar :src="avatarUrl" />
          <p class="user-name">{{ userName }}</p>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="checkout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from 'vue-router'

const store = useStore();
const route = useRoute();
const router = useRouter();

const selectMenu = computed(() => store.state.menu.selectMenu);

const closeTab = (item, index) => {
  store.commit("closeMenu", index);
  // 删除的不是当前选中项
  if (item.path !== route.path) {
    return;
  }
  // 如果选中的是删除项，则选中后一项
  const nextItem = selectMenu.value[index];
  if (nextItem) {
    router.push({ path: nextItem.path });
  } else {
    // 如果没有后一项，则选中前一项
    const preItem = selectMenu.value[index - 1];
    if (preItem) {
      router.push({ path: preItem.path });
    } else {
      router.push("/");
      return;
    }
  }
}

const handleCommand = (command) => {
  if (command === "checkout") {
    localStorage.removeItem("pz_token");
    localStorage.removeItem("pz_userInfo");
    localStorage.removeItem("pz_v3pz");
    router.push("/login");
    // store.commit('resetState');
  }
}
const defaultAvatarUrl = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png';
const userInfo = JSON.parse(localStorage.getItem("pz_userInfo")) || {};
const avatarUrl = userInfo.avatar || defaultAvatarUrl;
const userName = userInfo.name || "用户名";
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
      width: 50px;
      height: 100%;
    }

    .icon:hover {
      background-color: #f5f5f5;
      cursor: pointer;
    }

    .tab {
      padding: 0 5px;
      height: 100%;

      &.selected {
        color: rgb(14, 114, 114);
        background-color: #f5f5f5;
      }
    }

    .menu {
      width: auto;
      margin: 0 5px;
      font-size: 14px;
    }

    .close {
      visibility: hidden;
    }
  }
}

.tab:hover {
  cursor: pointer;
  background-color: #f5f5f5;

  .close {
    visibility: inherit;
  }
}


.header-right {
  .user-name {
    height: 15px;
    font-size: 15px;
  }

  .el-dropdown-link:hover {
    cursor: pointer;
  }
}
</style>