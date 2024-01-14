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
			<div class="art-left detail-txt">
				<div class="curr-pos">当前位置： <a href="#/home">主页</a> > 文章</div>
				<h1>{{ articleData.title }}</h1>
				<div class="txt-infr">
					<!--<em class="iconfont"></em>-->
					<em class="font">发布时间：</em> <span>{{ dateFormat(articleData.publishDate) }}</span>
					<!--<em class="iconfont"></em>-->
					<em class="font">作者：</em> <span>{{ articleData.createFullName }}</span> <em class="font">点赞数：</em>
					<!--<em class="iconfont"></em>-->
					<span class="count">{{ articleData.likes }}</span>
					<em class="font">收藏数：</em>
					<!--<em class="iconfont"></em>-->
					<span class="count">{{ articleData.collections }}</span>
				</div>
				<div class="graf-box" style="padding: 20px" v-html="articleData.content"></div>
				<div class="blank15"></div>
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
import { getApi, topLikesApi } from "@/api/blogs/article"
import { queryAllApi as queryCategoryAllApi } from "@/api/blogs/category"
import { queryAllApi as queryTagAllApi } from "@/api/blogs/tag"
import moment from "moment"
import marked from "marked"

const route = useRoute()

watch(
	() => route.params.id,
	newId => {
		getArticleData(newId)
	}
)

onMounted(() => {
	getTopLikesData()
	queryCategoryAllData()
	queryTagAllData()
	getArticleData(route.params.id)
})

//日期格式化
const dateFormat = (date: any) => {
	if (date === undefined) {
		return ""
	}
	return moment(date).format("YYYY/MM/DD HH:mm")
}

const renderMarkdown = (content: any) => {
	if (content === undefined) {
		return ""
	}
	return marked(content)
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

const articleData = ref({})
const getArticleData = (newId: any) => {
	console.log(newId)
	getApi({
		id: newId
	})
		.then((res: any) => {
			articleData.value = res.data
			articleData.value.content = renderMarkdown(res.data.content)
		})
		.catch(() => {
			articleData.value = {}
		})
		.finally(() => {})
}
</script>

<style scoped lang="scss">
@import "./css/global.css";
@import "./css/style.css";
@import "./css/iconfont.css";
.background-img {
	background: #f0d0a9 url(./images/top.jpg) center top no-repeat;
}
</style>
