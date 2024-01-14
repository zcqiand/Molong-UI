<template>
	<!-- 头部开始 -->
	<header class="background-img">
		<div class="header-box">
			<a class="logo" href="#/home"> <img src="./images/logo.png" alt="终于等到你" /> </a>
			<span class="warning"> <img src="./images/pic.png" alt="还好我没放弃" /> </span>
		</div>
	</header>
	<!-- end -->
	<!-- 导航 -->
	<nav class="nav">
		<ul>
			<li class="current"><a href="#/home">主页</a></li>
			<li><a href="#" rel="dropmenu2">关于我</a></li>
		</ul>
	</nav>
	<!-- end -->
	<!-- 内容开始 -->
	<section>
		<!-- 文章 -->
		<article>
			<div class="art-left">
				<h2 class="art-txt"><em class="iconfont c-f26868">&#xe606;</em> <span>最新文章</span></h2>
				<div class="art-model" v-for="(item, index) in articleData" :key="index">
					<h3>
						<a :href="'#/detail/' + item.id">{{ item.title }}</a>
					</h3>
					<p class="dateview">
						<span style="margin-right: 5px">发布时间：{{ dateFormat(item.publishDate) }}</span>
						<span style="margin-right: 5px">作者：{{ item.createFullName }}</span>
						<span>分类：{{ item.categoryName }}</span>
					</p>
					<dl class="img-txt">
						<dt>
							<a :href="'#/detail/' + item.id"><img src="./images/8.jpg" /></a>
						</dt>
						<dd>
							<div class="deatil" v-html="renderMarkdown(item.content)"></div>

							<a :href="'#/detail/' + item.id" class="btn bg-f26868 c-fff" target="_blank">查看全文</a>
						</dd>
					</dl>
				</div>
				<div style="text-align: center">
					<el-pagination
						background
						layout="total, sizes, prev, pager, next"
						:page-sizes="paginationData.pageSizes"
						:total="paginationData.total"
						:page-size="paginationData.pageSize"
						:currentPage="paginationData.currentPage"
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
					/>
				</div>
			</div>
			<aside class="right-box">
				<div class="art">
					<h2 class="art-txt"><em class="iconfont c-f26868">&#xe605;</em><span>热门文章</span></h2>
					<ul class="art-list">
						<li v-for="(item, index) in topLikesData" :key="index">
							<a :href="'#/detail/' + item.id"
								><em class="iconfont c-f26868"> &#xe60f; </em><span>{{ item.title }}</span></a
							>
						</li>
					</ul>
				</div>
				<div class="art mt20">
					<h2 class="art-txt"><em class="iconfont c-f26868">&#xe600;</em> <span>文章分类</span></h2>
					<div class="of-h">
						<a class="btn label" :href="'#/home?categoryId=' + item.id" v-for="(item, index) in categoryAllData" :key="index">{{
							item.name
						}}</a>
					</div>
				</div>
				<div class="art mt20">
					<h2 class="art-txt"><em class="iconfont c-f26868">&#xe600;</em> <span>热门标签</span></h2>
					<div class="of-h">
						<a class="btn label" :href="'#/home?tagId=' + item.id" v-for="(item, index) in tagAllData" :key="index">{{
							item.name
						}}</a>
					</div>
				</div>
				<div class="art mt20">
					<h2 class="art-txt"><em class="iconfont c-f26868">&#xe601;</em> <span>关注我</span></h2>
					<div class="two-code">
						<img src="https://raw.githubusercontent.com/zcqiand/nanrong/main/assets/weixin.jpg" alt="扫一扫，关注我们哦" />
						<p class="sao-txt">扫一扫二维码，交个朋友！</p>
					</div>
				</div>
				<div class="art mt20">
					<h2 class="art-txt"><em class="iconfont c-f26868">&#xe602;</em> <span>友情链接</span></h2>
					<ul class="fri-link">
						<li><a href="https://zcqiand.github.io/nanrong/" target="_blank">个人主页</a></li>
					</ul>
				</div>
			</aside>
		</article>
	</section>
	<!-- end -->
	<footer>Copyright © 2024 南荣相如</footer>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router"
import { reactive, ref, watch, nextTick, onMounted } from "vue"
import { queryApi, topLikesApi } from "@/api/blogs/article"
import { queryAllApi as queryCategoryAllApi } from "@/api/blogs/category"
import { queryAllApi as queryTagAllApi } from "@/api/blogs/tag"
import { usePagination } from "@/hooks/usePagination"
import moment from "moment"
import marked from "marked"

const searchData = reactive({
	tagId: undefined,
	categoryId: undefined
})

const route = useRoute()
watch(
	() => route.query,
	() => {
		searchData.tagId = route.query.tagId
		searchData.categoryId = route.query.categoryId
		queryArticleData()
	}
)

onMounted(() => {
	getTopLikesData()
	queryCategoryAllData()
	queryTagAllData()
	searchData.tagId = route.query.tagId
	searchData.categoryId = route.query.categoryId
	queryArticleData()
})

//日期格式化
const dateFormat = (date: any) => {
	if (date === undefined) {
		return ""
	}
	return moment(date).format("YYYY/MM/DD HH:mm")
}

const renderMarkdown = (content: any) => {
	return marked(content.substr(0, 100))
}

const categoryAllData = ref<any[]>([])
const queryCategoryAllData = () => {
	queryCategoryAllApi({})
		.then((res: any) => {
			categoryAllData.value = res.data
		})
		.catch(() => {
			categoryAllData.value = []
		})
		.finally(() => {})
}

const tagAllData = ref<any[]>([])
const queryTagAllData = () => {
	queryTagAllApi({})
		.then((res: any) => {
			tagAllData.value = res.data
		})
		.catch(() => {
			tagAllData.value = []
		})
		.finally(() => {})
}

const topLikesData = ref<any[]>([])
const getTopLikesData = () => {
	topLikesApi({})
		.then((res: any) => {
			topLikesData.value = res.data
		})
		.catch(() => {
			topLikesData.value = []
		})
		.finally(() => {})
}

const articleData = ref<any[]>([])
const queryArticleData = () => {
	queryApi({
		pageIndex: paginationData.currentPage,
		pageSize: paginationData.pageSize,
		title: undefined,
		tagId: searchData.tagId,
		categoryId: searchData.categoryId
	})
		.then((res: any) => {
			paginationData.total = res.data.total
			articleData.value = res.data.items
		})
		.catch(() => {
			articleData.value = []
		})
		.finally(() => {})
}

const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()
watch([() => paginationData.currentPage, () => paginationData.pageSize], queryArticleData, { immediate: true })
</script>

<style scoped lang="scss">
@import "./css/global.css";
@import "./css/style.css";
@import "./css/iconfont.css";
.background-img {
	background: #f0d0a9 url(./images/top.jpg) center top no-repeat;
}
</style>
