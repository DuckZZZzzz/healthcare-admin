<template>
    <PanelHead />
    <div class="btns">
        <el-button icon="Plus" size="small" type="primary" @click="openDialog(null)">新增</el-button>
    </div>
    <el-table :data="tableData.list" stripe style="width: 100%">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="name" label="昵称" />
        <el-table-column prop="permissionName" label="权限" width="500px" />
        <el-table-column label="操作" fixed="right">
            <template #default="scope">
                <el-button type="primary" size="small" @click=openDialog(scope.row)>
                    编辑
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="pagination-info">
        <el-pagination v-model:current-page="paginationData.pageNum" v-model:page-size="paginationData.pageSize"
            size="small" :page-sizes="[10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
    <el-dialog v-model="dialogVisible" :before-close="beforeClose" title="添加权限" width="500">
        <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" label-position="left">
            <el-form-item v-show="false" prop="id">
                <el-input v-model="form.id" />
            </el-form-item>
            <el-form-item label="名称" prop="name">
                <el-input v-model="form.name" placeholder="请填写权限名称"></el-input>
            </el-form-item>
            <el-form-item label="权限" prop="permissions">
                <el-tree ref="treeRef" style="max-width: 600px" :data="permissionData" node-key="id" show-checkbox
                    :default-checked-keys="defaultChecked" :default-expanded-keys="[2]" />
            </el-form-item>
        </el-form>
        <!-- template#footer如果不小心放在el-form里会不显示 -->
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="confirm(formRef)">
                    提交
                </el-button>
            </div>
        </template>
    </el-dialog>

</template>
<script setup>
// 这个setup一定一定不能忘记写！不写setup的话，所有使用ref和reactive的变量都会是undefined
import { ref, reactive, onMounted, nextTick } from 'vue'
import { userGetMenu, userSetMenu, menuList } from '../../../api'


onMounted(() => {
    // 获取菜单数据
    userGetMenu().then(({ data }) => {
        permissionData.value = data.data
        console.log(permissionData)

    })
    getList()
})

// 列表数据
const tableData = reactive({
    list: [],
    total: 0
})

// 打开弹窗
const openDialog = (rowData = {}) => {
    dialogVisible.value = true
    // 难点：弹窗打开，form的生成是异步的
    // 解决方法1：弹窗打开时，先清空form，再赋值，再打开弹窗
    // form.name = ""
    // form.permissions = ""
    // form.id = ""
    // 打开弹窗时，获取树形菜单数据
    // userGetMenu().then(({ data }) => {
    // console.log(data)
    // permissionData.value = data.data
    // })
    // 解决方法2：引入nextTick
    nextTick(() => {
        if (rowData) {
            console.log(rowData)
            Object.assign(form, { id: rowData.id, name: rowData.name })
            treeRef.value.setCheckedKeys(rowData.permission)

        }
    })
}

const paginationData = reactive({
    pageNum: 1,
    pageSize: 10
})

// 修改页码和条数
const handleSizeChange = (val) => {
    console.log(`${val} items per page`)
    paginationData.pageSize = val
    getList()
}
const handleCurrentChange = (val) => {
    console.log(`current page: ${val}`)
    paginationData.pageNum = val
    getList()
}

// 请求列表数据，复用多，可以抽离成一个方法
const getList = () => {
    return menuList(paginationData).then(({ data }) => {
        const { list, total } = data.data
        console.log(list)
        tableData.list = list
        tableData.total = total
    })
}


// 表单数据
const formRef = ref(null)

// form的数据
const form = reactive(
    {
        name: "",
        permissions: "",
        id: ""// 新增权限时id为空
    }
)
// 树形菜单权限数据
const permissionData = ref([])

// 弹窗的显示与隐藏
const dialogVisible = ref(false)
// 关闭弹窗前的回调
const beforeClose = () => {
    dialogVisible.value = false
    formRef.value.resetFields()
    treeRef.value.setCheckedKeys(defaultChecked)
}
// 默认选中
const defaultChecked = [4, 5]
const treeRef = ref(null)
const rules = reactive({
    name: [
        { required: true, message: "请输入名称", trigger: "blur" }
    ]  // 权限名称
})
// 表单提交
const confirm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            // 拿到树中选择的权限数据
            const permissionData = JSON.stringify(treeRef.value.getCheckedKeys())
            userSetMenu({
                id: form.id,
                name: form.name,
                permissions: permissionData,
            }).then(({ data }) => {
                console.log(data)
                beforeClose()
                getList()
            })
        } else {
            console.log('error submit!!', fields)
            return false
        }
    })
}
</script>

<style lang="less" scoped>
.btns {
    padding: 10px 0 10px 10px;
    background-color: #fff;
}
</style>