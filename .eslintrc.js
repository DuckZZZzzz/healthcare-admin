module.exports = {
  extends: [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'vue/no-multiple-template-root': 'off', // 禁用此规则
    'vue/no-v-for-template-key': 'off' // 禁用此规则
  }
};