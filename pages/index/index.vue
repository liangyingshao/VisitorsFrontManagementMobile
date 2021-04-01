<template>
	<view>
		<!-- <swiper class="card-swiper round-dot" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
		 indicator-active-color="#0081ff">
			<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
				<view class="swiper-item">
					<image :src="item" mode="aspectFill" style="width: 710rpx;"></image>
				</view>
			</swiper-item>
		</swiper> -->
		<swiper class="margin-sm radius screen-swiper" autoplay="true" indicator-dots="true" indicator-active-color="white" indicator-color="grey"
		 circular="true">
			<swiper-item v-for='(item,index) in swiperList' :key='index'>
				<image :src="item" mode="aspectFill" class="radius"></image>
				<video :src="item" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
			</swiper-item>
		</swiper>
		<view style="height: 100rpx;" class="shadow radius margin-sm bg-white flex solids-bottom padding-tb-sm justify-between align-center">
			<view class="margin-left text-xl">
				<text class="cuIcon-light text-blue"></text>
				<text class="text-bold margin-lr-xs">通知公告</text>
			</view>
			<swiper style="height: 40rpx;width: 325rpx;" class="swiper" autoplay="true" interval="4000" duration="500" circular="true"
			 vertical="true">
				<swiper-item v-for="(item,index) in swiperArray" :key='index' @click="toNewsDetail(item.url)" class="text-cut">
					{{item.text}}
				</swiper-item>
			</swiper>
			<view class="margin-right  text-blue" @click="navToNews">更多<text class="cuIcon-playfill"></text></view>
		</view>
		<view class="shadow radius cu-list menu margin-sm">
			<view class="cu-item padding-lg my-border" @click="navTo('')">
				<view class="content">
					<text class="cuIcon-post text-blue"></text>
					<text class="text-black text-bold">入校申请</text>
				</view>
			</view>
			<view class="cu-item padding-lg my-border" @click="navTo('')">
				<view class="content">
					<text class="cuIcon-form text-blue"></text>
					<text class="text-black text-bold">申请记录</text>
				</view>
			</view>
			<view class="cu-item padding-lg" @click="navTo('../../pages/profile/profile')">
				<view class="content">
					<text class="cuIcon-profile text-blue"></text>
					<text class="text-black text-bold">个人信息</text>
				</view>
			</view>
		</view>
		<view class="shadow radius shadow cu-list menu margin-sm">
			<view class="cu-item padding-lg my-border" @click="navTo('')">
				<view class="content">
					<text class="cuIcon-location text-blue"></text>
					<text class="text-black text-bold">校园导览</text>
				</view>
			</view>
			<view class="cu-item padding-lg my-border" @click="navTo('')">
				<view class="content">
					<text class="cuIcon-info text-blue"></text>
					<text class="text-black text-bold">参观须知</text>
				</view>
			</view>
			<view class="cu-item padding-lg" @click="navTo('')">
				<view class="content">
					<text class="cuIcon-write text-blue"></text>
					<text class="text-black text-bold">意见反馈</text>
				</view>
			</view>
		</view>
		<!-- <view class="padding-bottom bg-white">
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="text-bold text-xl">我的</text>
				</view>
				<view class="action text-informatic-brown" @click="mineClick()">{{mineShow ? "收起" : "展开"}}<text :class="mineShow ? 'cuIcon-triangleupfill' : 'cuIcon-triangledownfill'"
					 style="font-size:25px;"></text></view>
			</view>
			<view class="cu-list grid col-4 no-border" v-show="mineShow">
				<view v-if="p(item.permission)" class="cu-item" v-for='(item,index) in mine' :key='index' @click="navTo(item.source)">
					<view>
						<image :src="item.image" class="cu-avatar bg-white lg" mode="aspectFit"></image>
					</view>
					<text class="text-df">{{item.text}}</text>
				</view>
			</view>
		</view>
		<view>
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="text-bold text-xl">申请实验室</text>
				</view>
				<view class="action text-informatic-brown" @click="labShow=!labShow">{{labShow ? "收起" : "展开"}}<text :class="functionshow ? 'cuIcon-triangleupfill' : 'cuIcon-triangledownfill'"
					 style="font-size:25px;"></text></view>
			</view>
			<view class="cu-list grid col-4 no-border" v-show="labShow">
				<view v-if="p(item.permission)||true" class="cu-item" v-for='(item,index) in labList' :key='index' @click="navTo(item.source)">
					<view>
						<image :src="item.image" class="cu-avatar bg-white lg" mode="aspectFit"></image>
					</view>
					<text>{{item.text}}</text>
				</view>
			</view>
		</view> -->
		<!-- <navTab :selection='0' /> -->
	</view>
</template>

<script>
	let app = require("@/config");
	export default {
		onLoad() {
			this.loadNews()
		},
		data() {
			return {
				cardCur: 0,
				swiperArray: [
					{
						text: "加载中",
						url: ""
					}
				],
				swiperList: {
					img1: "../../static/轮播图片画板1.jpg",
					img2: "../../static/轮播图片画板2.jpg",
					img3: "../../static/轮播图片画板3.jpg"
				},
				functionList: [{
						image: "../../static/通讯录.png",
						text: "通讯录",
						source: "../addressBook/addressBook"
					},
					{
						image: "../../static/实验室申请.png",
						text: "讲座列表",
						source: "../lecture/list"
					},
					{
						image: "../../static/实验室申请.png",
						text: "我的活动",
						source: "../lecture/myLecture"
					} // ,
					// {
					// 	image: "../../static/实验室列表.png",
					// 	text: "所有申请",
					// 	source: "../roomApplication/v2/allList"
					// },
					// {
					// 	image: "../../static/申请机位.png",
					// 	text: "机位申请",
					// 	soure: "../roomApplication/v1/alllist"
					// }
				],
				mineShow: true,
				functionshow: true,
				labShow: true
			}
		},
		methods: {
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			loadNews () {
				uni.post("/api/cms/getArticles",{ page: 1, pageSize: 5},msg=>{
					this.swiperArray = msg.data
					.filter(e => e.ID !== '00000000-0000-0000-0000-000000000000')
					.map(e => {
						return {
							text: e.Topic,
							url: `../News/newsDetail?id=${e.ID}`
						}
					});
				});
			},
			toNewsDetail (url) {
				uni.navigateTo({
					url
				})
			},
			functionClick() {
				this.functionshow = !this.functionshow;
			},
			mineClick() {
				this.mineShow = !this.mineShow;
			},
			navTo(url) {
				uni.navigateTo({
					url: url
				})
			},
			navToNews() {
				uni.navigateTo({
					url: '../News/newsList'
				})
			},
			p: e => {
				return e ? app.checkPermission(e) : true;
			}
		}
	}
</script>

<style lang="scss">
.my-border{
	border-bottom: 0.1rpx solid #ddd;
}
</style>
