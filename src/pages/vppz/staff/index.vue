<template>
    <PanelHead :route="route" />
    <div class="btns">
        <el-button icon="Plus" size="small" type="primary" @click="openDialog(null)">新增</el-button>
        <el-popconfirm confirm-button-text="是" cancel-button-text="否" :icon="InfoFilled" icon-color="#626AEF"
            title="是否删除选中项？" @confirm="confirmEvent" @cancel="cancelEvent">
            <template #reference>
                <el-button icon="Delete" size="small" type="danger">删除</el-button>
            </template>
        </el-popconfirm>
    </div>
    <el-table :data="tableData.list" stripe style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="id" />
        <el-table-column prop="name" label="昵称" />
        <el-table-column prop="avatar" label="头像">
            <template #default="scope">
                <el-image style="width: 50px; height: 50px;" :src="scope.row.avatar" />
            </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄" />
        <el-table-column prop="mobile" label="手机号" />
        <el-table-column prop="sex" label="性别">
            <template #default="scope">
                {{ scope.row.sex === 1 ? '男' : '女' }}
            </template>
        </el-table-column>
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
    <el-dialog v-model="dialogVisible" :before-close="beforeClose" title="添加陪诊师" width="500">
        <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" label-position="left">
            <el-form-item v-show="false" prop="id">
                <el-input v-model="form.id"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="name">
                <el-input v-model="form.name" placeholder="请填写昵称" />
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
                <el-button v-if="!form.avatar" type="primary" @click="dialogImgVisible = true">点击上传</el-button>
                <el-image v-else :src="form.avatar" style="width: 100px;height: 100px;" />
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-select v-model="form.sex" placeholder="请选择性别">
                    <el-option label="男" value="1"></el-option>
                    <el-option label="女" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-input-number :min="18" :max="50" v-model="form.age" />
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
                <el-input v-model="form.mobile" placeholder="请填写手机号"></el-input>
            </el-form-item>
            <el-form-item label="是否生效" prop="active">
                <el-radio-group v-model="form.active">
                    <el-radio :value="0">失效</el-radio>
                    <el-radio :value="1">生效</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="confirm(formRef)">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
    <el-dialog append-to-body v-model="dialogImgVisible" :before-close="beforeClose" title="选择图片" width="500">
        <div class="img-list">
            <div v-for="(item, index) in imgList" :key="item.name" class="img-box" @click="selectedImg = index">
                <div v-show="selectedImg === index" class="checkImg">
                    <el-icon color="#fff">
                        <Check />
                    </el-icon>
                </div>
                <el-image style="width: 148px;height: 148px" :src="item.url"></el-image>
            </div>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogImgVisible = false">取消</el-button>
                <el-button type="primary" @click="confirmImg">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { photoList, companion, companionList, deleteCompanion } from '../../../api'
import dayjs from 'dayjs'

onMounted(() => {

    getList()
})

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


const route = useRoute()
const dialogVisible = ref(false)
const dialogImgVisible = ref(false)
const selectedImg = ref(0)
const imgList = [
    {name: 'images/1.webp', url: 'images/1.webp'},
    {name: 'images/2.webp', url: 'images/2.webp'},
    {name: 'images/3.webp', url: 'images/3.webp'},
    {name: 'images/4.webp', url: 'images/4.webp'},
    {name: 'images/5.webp', url: 'images/5.webp'},
    {name: 'images/6.webp', url: 'images/6.webp'},
]
const selectTableData = ref([])

// 请求列表
const getList = () => {
    companionList(paginationData).then(({ data }) => {
        const { list, total } = data.data
        list.forEach(item => {
            item.create_time = dayjs(item.create_time).format('YYYY-MM-DD')
        })
        tableData.list = list
        tableData.total = total
    })
}
const confirmImg = () => {
    form.avatar = imgList[selectedImg.value].url
    dialogImgVisible.value = false
}
const beforeClose = () => {
    dialogVisible.value = false
    formRef.value.resetFields()
}
const formRef = ref()
const form = reactive({
    id: '',
    mobile: '',
    active: 1,
    age: 28,
    avatar: '',
    name: '',
    sex: ''
})
const rules = {
    mobile: [
        { required: true, message: '请输入手机号', trigger: 'blur' }
    ],
    name: [
        { required: true, message: '请输入昵称', trigger: 'blur' }
    ],
    avatar: [
        { required: true, message: '请选择头像' }
    ],
    sex: [
        { required: true, message: '请选择性别', trigger: 'change' }
    ]
}
// 打开弹窗
const openDialog = (rowData) => {
    dialogVisible.value = true
    //有些操作依赖于 DOM 的状态，例如设置树形菜单的选中项、获取元素的尺寸等。如果在 DOM 尚未渲染完成时进行这些操作，可能会导致错误或无效的结果
    // 为了确保在 DOM 渲染完成后再进行操作，可以使用 nextTick 函数来延迟执行代码
    nextTick(() => {
        if (rowData) {
            Object.assign(form, rowData)
        }
    })
}
// 表单提交
const confirm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            companion(form).then(({ data }) => {
                if (data.code === 10000) {
                    ElMessage.success('操作成功')
                    dialogVisible.value = false
                    beforeClose()
                    getList()
                } else {
                    ElMessage.error(data.message)
                }
            })

        } else {
            console.log('error submit!!', fields)
            return false
        }
    })
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

const handleSelectionChange = (val) => {
    selectTableData.value = val.map(item => ({ id: item.id }))
}

const confirmEvent = () => {
    if (!selectTableData.value.length) {
        return ElMessage.warning('请选择要删除的数据')
    }
    deleteCompanion({ id: selectTableData.value }).then(({ data }) => {
        if (data.code === 10000) {
            ElMessage.success('删除成功')
            getList()
        }
    })
}
</script>

<style scoped lang="less">
.btns {
    padding: 10px 0 10px 10px;
    background-color: #fff;
}

.img-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .img-box {
        position: relative;

        .checkImg {
            position: absolute;
            left: 0px;
            top: 0px;
            width: 24px;
            height: 24px;
            background-color: #67c23a;
            z-index: 999;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .el-img {
        margin-right: 10px;
        margin-bottom: 10px;
    }
}
</style>>
