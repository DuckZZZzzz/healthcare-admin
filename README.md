# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).


## Recommended IDE Setup
在 Vue.js 中使用 Element UI（一个基于 Vue.js 的桌面端 Web 接口组件库），`el-form` 是用来创建表单的组件。 `rules`、`model` 和 `ref` 都是 `el-form` 组件的一些属性，它们各自有不同的用途。

1. **rules**：
   - 这个属性是用来定义表单验证规则的。它是一个对象，包含多个字段及其对应的验证规则（如必填检查、格式检查等）。当表单需要进行验证逻辑时，就会用到这个属性。例如：
     ```javascript
     rules: {
       name: [
         { required: true, message: '请输入姓名', trigger: 'blur' }
       ]
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
