# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

# 开发笔记

## `rules`、`model` 和 `ref` 都是 `el-form` 组件的一些属性，它们各自有不同的用途。

1. **rules**：

   - 这个属性是用来定义表单验证规则的。它是一个对象，包含多个字段及其对应的验证规则（如必填检查、格式检查等）。当表单需要进行验证逻辑时，就会用到这个属性。例如：

     ```javascript
     rules: {
       name: [{ required: true, message: "请输入姓名", trigger: "blur" }];
     }
     ```

     在这里，`name` 字段将被要求必须填写，否则会显示错误信息。

2. **model**：

   - `model` 属性是用来绑定表单数据源的。通常情况下，我们会用一个 Vue 实例中的 data 对象来存储表单的数据。通过设置 `model` 属性为这个 data 对象，可以实现表单控件与数据的双向绑定。例如：

     ```javascript
     data() {
       return {
         ruleForm: {
           name: ''
         }
       };
     }
     ```

     然后在模板中通过 `:model="ruleForm"` 绑定到 `el-form` 上。

3. **ref**：

   - `ref` 是 Vue 提供的一个特性，用于给元素或子组件注册引用信息。通过设置 `ref` 属性，可以在父组件中访问到子组件或元素实例，这对于调用子组件的方法或访问其属性非常有用。比如，你可以通过 `this.$refs.ruleFormRef.validate()` 来触发整个表单的验证。

## 在终端中退出 vim

对于 vim 或 vi：
按 Esc 键回到普通模式。
输入 :q! 并回车来放弃编辑并退出。
如果您想保存编辑并退出，可以输入 :wq 或者仅仅 :w 就足够了，因为您是在写入 commit message。

## 自定义单元格模板

在 Vue.js 中，Element UI 提供了 `<el-table>` 组件来展示数据列表。通常情况下，表格中的每一列都会直接展示数据对象中的某个属性值。但是，有时候我们需要对这些数据进行格式化或者添加一些额外的操作，这时候就需要使用自定义单元格模板。

1. 如何实现

在 `<el-table-column>` 标签内，你可以使用 `<template>` 标签来定义一个自定义模板。在这个模板中，可以使用 `#default="scope"` 形式的作用域插槽来访问当前行的数据以及其它相关信息。这里的 `scope` 是一个包含当前行数据的对象。

2. 示例代码

假设你有如下的数据结构：

```javascript
data() {
  return {
    tableData: [
      { id: 1, name: '张三', permissions_id: 1 },
      { id: 2, name: '李四', permissions_id: 2 },
      // 更多数据...
    ],
    permissionsMap: {
      1: '管理员',
      2: '编辑',
      // 更多权限...
    }
  };
}
```

在你的模板中，你可以这样写：

```html
<el-table :data="tableData">
  <el-table-column prop="name" label="姓名"></el-table-column>
  <el-table-column prop="permissions_id" label="所属组别" width="500px">
    <template #default="scope">
      <!-- 使用自定义函数 permissionName 显示权限名 -->
      {{ permissionName(scope.row.permissions_id) }}
    </template>
  </el-table-column>
</el-table>
```

在 Vue 实例的方法部分，你需要定义 `permissionName` 方法：

```javascript
methods: {
  permissionName(id) {
    return this.permissionsMap[id] || '未知权限';
  }
}
```

## markdown 常用语法

[链接](https://lxblog.com/qianwen/share?shareId=8c469c32-4158-4c2b-826c-462f33108807)

# 项目难点

## 根据用户权限动态创建右侧菜单栏及动态路由

1.创建项目结构 2.加载基础路由结构 3.登录服务器端实现 4.登录获取 token
5.store 与本地存储 token 6.路由权限登录判断 7.用户权限获取 8.路由比对方法 9.路由权限配置完成 10.拷贝 UI 结构 11.路由权限管理完结

创建并添加完动态路由后，如果页面刷新，routerList 数据就会销毁掉，因此需要使用插件：vuex-persistedstate 来保持数据的持久化
如果没有使用 vuex-persistedstate 插件或者其他类似的持久化存储插件，Vuex 的数据在页面刷新时会重新初始化。这是因为 Vuex 的状态存储在内存中，当页面刷新时，内存中的数据会被重置，导致 Vuex 的状态也被重置。

## resetState 的作用

我发现退出登录时虽然用了 localStorage.remove 方法，但由于 vuex-persistedstate 的机制或者浏览器本身的其他什么原因，其实是没有清空的，表现在退出登录时如果不刷新就重新登录，浏览器还会保留上一次退出时的浏览痕迹，比如我上一次的 selectedmenu 在重新登录时应该被清空但实际没有，所以我在退出登录时用了 resetState 方法，这个方法是用来重置 Vuex 中的数据的。
