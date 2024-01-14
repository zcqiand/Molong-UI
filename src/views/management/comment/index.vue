<template>
	<div class="app-container">
		<el-card v-loading="loading" shadow="never">
			<div class="search-wrapper">
				<el-form ref="searchFormRef" :inline="true" :model="searchData">
					<el-form-item prop="content" label="内容">
						<el-input v-model="searchData.content" placeholder="请输入" />
					</el-form-item>
					<el-form-item>
						<el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
						<el-button :icon="Refresh" @click="resetSearch">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="table-wrapper">
				<el-row :gutter="24">
					<el-col v-for="(item, index) in tableData" :key="index" :span="6">
						<el-card class="box-card">
							<template #header>
								<div class="card-header">
									<span>{{ item.articleTitle }}</span>
									<el-button class="button" text @click="handleDelete(item)">删除评论</el-button>
								</div>
							</template>
							<div class="text item" v-html="renderMarkdown(item.content)"></div>
							<div class="time">{{ item.createFullName }}</div>
							<time class="time"> {{ dateFormat(item.publishDate) }}</time>
						</el-card>
					</el-col>
				</el-row>
			</div>
			<div class="pager-wrapper">
				<el-pagination
					background
					:layout="paginationData.layout"
					:page-sizes="paginationData.pageSizes"
					:total="paginationData.total"
					:page-size="paginationData.pageSize"
					:currentPage="paginationData.currentPage"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
				/>
			</div>
		</el-card>
		<edit v-if="dialogVisible" ref="editRef" @success="handleSaveSuccess"></edit>
	</div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router"
import { reactive, ref, watch, nextTick, computed, onMounted } from "vue"
import { deleteApi, batchDeleteApi, queryApi } from "@/api/blogs/comment"
import { type FormInstance, ElMessage, ElMessageBox } from "element-plus"
import { Search, Refresh, Delete, CirclePlus, RefreshRight } from "@element-plus/icons-vue"
import { usePagination } from "@/hooks/usePagination"
import moment from "moment"
import marked from "marked"
import edit from "./edit.vue"

//#region 初始化
const loading = ref<boolean>(false)
const router = useRouter()
const route = useRoute()

onMounted(() => {
	queryTableData()
})

//日期格式化
const dateFormat = (date: any) => {
	if (date === undefined) {
		return ""
	}
	return moment(date).format("YYYY/MM/DD HH:mm")
}

const renderMarkdown = (content: any) => {
	return marked(content.substr(0, 150))
}
//#endregion

//#region 主体
//查询
const handleSearch = () => {
	queryTableData()
}
//查询重置
const resetSearch = () => {
	searchFormRef.value?.resetFields()
	queryTableData()
}
//刷新
const handleRefresh = () => {
	queryTableData()
}
//表格选择
const selection = ref<any[]>([])
const selectionChange = (items: any[]) => {
	selection.value = items
}
//获取清单
const searchFormRef = ref<FormInstance | null>(null)
const searchData = reactive({
	content: ""
})
const tableData = ref<any[]>([])
const queryTableData = () => {
	loading.value = true
	queryApi({
		pageIndex: paginationData.currentPage,
		pageSize: paginationData.pageSize,
		content: searchData.content || undefined
	})
		.then((res: any) => {
			paginationData.total = res.data.total
			tableData.value = res.data.items
		})
		.catch(() => {
			tableData.value = []
		})
		.finally(() => {
			loading.value = false
		})
}
//分页
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()
watch([() => paginationData.currentPage, () => paginationData.pageSize], queryTableData, { immediate: true })
//添加
const editRef = ref<FormInstance | null>(null)
const dialogVisible = ref<boolean>(false)
const handleAdd = () => {
	dialogVisible.value = true
	nextTick(() => {
		editRef.value?.handleUpdate(undefined)
	})
}
//编辑
const handleEdit = (row: any) => {
	dialogVisible.value = true
	nextTick(() => {
		editRef.value?.handleUpdate(row.id)
	})
}
//更多命令
const handleCommand = (command: string, row: any) => {
	//删除
	if (command == "delete") {
		handleDelete(row)
	}
}
//保存成功
const handleSaveSuccess = () => {
	queryTableData()
}
//删除
const handleDelete = (row: any) => {
	ElMessageBox.confirm(`正在删除：${row.content.substr(1, 20)}，确认删除？`, "提示", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type: "warning"
	}).then(() => {
		deleteApi({
			id: row.id
		}).then(() => {
			ElMessage.success("删除成功")
			queryTableData()
		})
	})
}
//批量删除
const handleBatchDelete = () => {
	ElMessageBox.confirm(`确认批量删除？`, "提示", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type: "warning"
	}).then(() => {
		batchDeleteApi({
			ids: selection.value.map(v => v.id)
		}).then(() => {
			ElMessage.success("删除成功")
			queryTableData()
		})
	})
}
//#endregion
</script>

<style lang="scss" scoped>
@import "../index.scss";
.card-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.text {
	font-size: 14px;
}
.item {
	margin-bottom: 5px;
}
.time {
	font-size: 12px;
	color: #999999;
}
.box-card {
	width: 290px;
	margin-bottom: 10px;
}
</style>
