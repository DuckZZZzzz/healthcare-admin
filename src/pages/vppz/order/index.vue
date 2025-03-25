<template>
    <PanelHead :route="route" />
    <div class="form">
        <el-form :inline="true" :model="searchForm">
            <el-form-item prop="out_trade_no">
                <el-input v-model="searchForm.out_trade_no" placeholder="订单号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
    <el-table :data="tableData.list" stripe style="width: 100%;height: 70%">
        <el-table-column prop="out_trade_no" label="订单号" width="150" />
        <el-table-column prop="hospital_name" label="就诊医院" width="120" />
        <el-table-column prop="service_name" label="服务名称" width="150" />
        <el-table-column label="陪诊师头像" width="100">
            <template #default="scope">
                <el-image style="width: 40px; height: 40px;" :src="scope.row.companion?.avatar || 'images/4.webp'"></el-image>
            </template>
        </el-table-column>
        <el-table-column label="陪诊师手机号" width="150">
            <template #default="scope">
                {{ scope.row.companion?.mobile || '13097305825' }}
            </template>
        </el-table-column>
        <el-table-column prop="price" label="总价" width="80" />
        <el-table-column prop="paidPrice" label="已付" width="80" />
        <el-table-column label="下单时间" width="120">
            <template #default="scope">
                {{ dayjs(scope.row.order_start_time).format('YYYY-MM-DD') }}
            </template>
        </el-table-column>
        <el-table-column label="订单状态" width="80">
            <template #default="scope">
                <el-tag :type="statusMap(scope.row.trade_state)">{{ scope.row.trade_state || '已完成' }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="service_state" label="接单状态" width="80" />
        <el-table-column prop="tel" label="联系人手机号" width="120" />
        <el-table-column label="操作" fixed="right" width="100">
            <template #default="scope">
                <el-popconfirm v-if="scope.row.trade_state === '待服务'" confirm-button-text="是" cancel-button-text="否"
                    :icon="InfoFilled" icon-color="#626AEF" title="是否确认完成？" @confirm="confirmEvent(scope.row.out_trade_no)"
                    >
                    <template #reference>
                        <el-button size="small" type="primary" link>确认完成</el-button>
                    </template>
                </el-popconfirm>
                <el-button v-else type="primary" link disabled>暂无服务</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="pagination-info">
        <el-pagination v-model:current-page="paginationData.pageNum" v-model:page-size="paginationData.pageSize"
            size="small" :page-sizes="[5, 10, 15, 20]" layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { adminOrder, updateOrder } from '../../../api';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';
import { ElMessage } from 'element-plus';

const route = useRoute()
onMounted(() => {
    getList()
})
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
// 列表数据
const tableData = reactive({
    list: [],
    total: 0
})

// 请求列表
const getList = (params={}) => {
    adminOrder({...paginationData, ...params}).then(({ data }) => {
        const { list, total } = data.data
        console.log(list, total)
        tableData.list = list
        tableData.total = total
    })
}
// 表单搜索
const searchForm = reactive({
    out_trade_no: ''
})
const onSubmit = () => {
    getList(searchForm)
}

// 订单状态tag类型的映射
const statusMap = (key) => {
    const obj = {
        '已取消': 'info',
        '待支付': 'warning',
        '已完成': 'success',
    }
}

const confirmEvent = async(id) => {
    const res = await updateOrder({id})
     const {data} = res
     if(data.code === 10000) {
        getList()
        ElMessage.success('操作成功')
     }else {
        ElMessage.error('操作失败')
     }
     
}
</script>
<style lang="less" scoped>
.form {
    display: flex;
    justify-content: flex-end;
    padding: 10px 0 10px 10px;
}

.container {
    background-color: #f0f0f0;
    height: 100vh;
}

.header {
    background-color: #fff;
    line-height: 40px;
    text-align: center;
}

.van-row {
    background-color: #fff;
    padding: 10px;
    margin: 5px;
    border-radius: 5px;

    .text1 {
        font-size: 16px;
        line-height: 25px;
        font-weight: bold;
    }

    .text2 {
        font-size: 14px;
        line-height: 20px;
        color: #999999;
    }
}

.bottom-text {
    line-height: 50px;
    text-align: center;
    color: #999999;
}
</style>