<template>
	<div class="app-container">
		<el-card shadow="never">
			<!-- 新增/修改 -->
			<el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px" label-position="right">
				<el-form-item prop="categoryId" label="分类">
					<el-select v-model="formData.categoryId" placeholder="请选择分类">
						<el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id" />
					</el-select>
				</el-form-item>
				<el-form-item prop="title" label="标题">
					<el-input v-model="formData.title" placeholder="请输入" />
				</el-form-item>
				<el-form-item prop="content" label="内容">
					<mavon-editor v-model="formData.content" style="width: 100%; height: calc(100vh - 300px)" />
				</el-form-item>
				<el-form-item prop="tagIds" label="标签">
					<el-select v-model="formData.tagIds" multiple placeholder="请选择标签" style="width: 100%">
						<el-option v-for="item in tagList" :key="item.id" :label="item.name" :value="item.id" />
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleCreate">发布文章</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref, defineExpose, onMounted } from "vue"
import { type FormInstance, type FormRules, ElMessage } from "element-plus"
import { useRouter, useRoute } from "vue-router"
import { getApi, createApi, updateApi } from "@/api/blogs/article"
import { queryAllApi as queryCategoryAllApi } from "@/api/blogs/category"
import { queryAllApi as queryTagAllApi } from "@/api/blogs/tag"

//#region 初始化
const router = useRouter()
const route = useRoute()
const currentUpdateId = ref<undefined | string>(undefined)

onMounted(() => {
	queryCategoryAll()
	queryTagAll()
	handleUpdate(route.params.id)
})
//#endregion

//#region 主体
const categoryList = ref<any[]>([])
const queryCategoryAll = () => {
	queryCategoryAllApi({})
		.then((res: any) => {
			categoryList.value = res.data
		})
		.catch(() => {
			categoryList.value = []
		})
		.finally(() => {})
}

const tagList = ref<any[]>([])
const queryTagAll = () => {
	queryTagAllApi({})
		.then((res: any) => {
			tagList.value = res.data
		})
		.catch(() => {
			tagList.value = []
		})
		.finally(() => {})
}

//设置表单
const handleUpdate = (id: undefined | string) => {
	if (id === undefined) {
		resetForm()
	} else {
		currentUpdateId.value = id
		getApi({
			id: id
		})
			.then((res: any) => {
				formData.title = res.data.title
				formData.content = res.data.content
				formData.categoryId = res.data.categoryId
				formData.tagIds = res.data.tagIds
			})
			.catch(() => {
				resetForm()
			})
			.finally(() => {})
	}
}
//重置表单
const resetForm = () => {
	currentUpdateId.value = undefined
	formData.title = ""
	formData.content = ""
	formData.categoryId = ""
	formData.tagIds = []
}
//保存
const dialogVisible = ref<boolean>(true)
const formRef = ref<FormInstance | null>(null)
const formData = reactive({
	title: "",
	content: "",
	categoryId: "",
	tagIds: []
})
const formRules: FormRules = reactive({
	title: [{ required: true, trigger: "blur", message: "请输入标题" }],
	content: [{ required: true, trigger: "blur", message: "请输入内容" }],
	categoryId: [{ required: true, trigger: "blur", message: "请输入分类标识" }]
})
const handleCreate = () => {
	formRef.value?.validate((valid: boolean) => {
		if (valid) {
			if (currentUpdateId.value === undefined) {
				createApi({
					title: formData.title,
					content: formData.content,
					categoryId: formData.categoryId,
					tagIds: formData.tagIds
				}).then(() => {
					router.push("/management/article")
				})
			} else {
				updateApi({
					id: currentUpdateId.value,
					title: formData.title,
					content: formData.content,
					categoryId: formData.categoryId,
					tagIds: formData.tagIds
				}).then(() => {
					router.push("/management/article")
				})
			}
		} else {
			return false
		}
	})
}
//#endregion
</script>

<style lang="scss" scoped>
@import "../index.scss";
</style>
