<template>
    <PanelHead />
    <el-table :data="tableData.list" stripe style="width: 100%">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="name" label="昵称" />
        <el-table-column prop="permissions_id" label="所属组别">
            <template #default="scope">
                {{ getPermissionsName(scope.row.permissions_id) }}
            </template>
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" />
        <el-table-column prop="active" label="状态">
            <template #default="scope">
                <el-tag class="ml-2" :type="scope.row.active ? 'success' : 'danger'">{{ scope.row.active ? '正常' :
                    '失效' }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="创建时间">
            <template #default="scope">
                <div class="flex-box">
                    <el-icon style="margin-right: 5px;">
                        <Clock />
                    </el-icon>
                    <span>{{ scope.row.create_time }}</span>
                </div>
            </template>
        </el-table-column>

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
    <el-dialog v-model="dialogVisible" :before-close="beforeClose" title="编辑用户" width="500">
        <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" label-position="left">
            <el-form-item label="手机号" prop="mobile">
                <el-input disabled v-model="form.mobile" />
            </el-form-item>
            <el-form-item label="昵称" prop="name">
                <el-input v-model="form.name" placeholder="请填写权限名称"></el-input>
            </el-form-item>
            <el-form-item label="菜单权限" prop="permissions_id">
                <el-select v-model="form.permissions_id" placeholder="请选择菜单权限" style="width: 240px">
                    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
        </el-form>
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
import { authAdmin, menuSelectList, updataUser } from '../../api'
import dayjs from 'dayjs'

onMounted(() => {
    // 获取管理员列表数据
    getList()

    // 获取权限下拉列表数据
    menuSelectList().then(({ data }) => {
        console.log(data, 'permission')
        options.value = data.data
    })
})

// 请求列表
const getList = () => {
    authAdmin(paginationData).then(({ data }) => {
        console.log(data, 'admin')
        const { list, total } = data.data
        list.forEach(item => {
            item.create_time = dayjs(item.create_time).format('YYYY-MM-DD')
            tableData.list = list
            tableData.total = total
        })
    })
}

// 列表数据
const tableData = reactive({
    list: [],
    total: 0
})

// 页码数据
const paginationData = reactive({
    pageNum: 1,
    pageSize: 10
})

// 创建响应式变量options来接收下拉菜单数据
const options = ref([])

// 根据权限id匹配权限名称
const getPermissionsName = (id) => {
    const permissionsName = options.value.find(item => item.id === id)
    return permissionsName ? permissionsName.name : '超级管理员'
}

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
// 弹窗的显示与隐藏
const dialogVisible = ref(false)

// form的数据
const form = reactive(
    {
        mobile: '',
        name: "",
        permissions_id: ""
    }
)
const formRef = ref(null)
// 打开弹窗
const openDialog = (rowData = {}) => {
    dialogVisible.value = true
    Object.assign(form, { mobile: rowData.mobile, permissions_id: rowData.permissions_id, name: rowData.name })
}
// 关闭弹窗前的回调
const beforeClose = () => {
    dialogVisible.value = false
    formRef.value.resetFields()
}

const rules = reactive({
    name: [
        { required: true, message: "请输入名称", trigger: "blur" }
    ],
    permission_id: [
        { required: true, message: "请选择权限", trigger: "blur" }
    ]
})
// 表单提交
const confirm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            const { name, permission_id } = form
            updataUser({ name, permission_id }).then(({ data }) => {
                if (data.code === 10000) {
                    dialogVisible.value = false
                    getList()
                }
            })
        } else {
            console.log('error submit!!', fields)
            return false
        }
    })
}
</script>

<style lang="less" scoped>
.flex-box {
    display: flex;
    align-items: center;
    height: 100%;
}
</style>