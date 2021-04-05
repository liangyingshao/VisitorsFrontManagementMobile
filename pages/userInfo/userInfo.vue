<template>
	<view class="center">
		<!-- <cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">个人信息</block>
		</cu-custom> -->
		<view class="info-bar bg-sys-purple padding-bottom-xl">
			<view class="cf text-xxl">
				<!-- <navigator class="fr cuIcon-settings justify-end text-white padding-lr padding-top" url="../userInfo/userInfo"></navigator> -->
				<navigator class="fr cuIcon-home justify-end text-white padding-lr padding-top" url="../index/index"></navigator>
			</view>
			<view class="flex">
				<view class="basis-xxs"></view>
				<view class="basis-xs margin">
					<image class="cu-avatar round xxl center" v-bind:src="userInfo.Avatar" v-on:click="navToInfor()" />
				</view>
				<view class="basis-lg margin">
					<view class="text-white">
						<text class="text-lg block margin-top-xs margin-bottom">{{userInfo.RealName}}</text>
						<text>{{userInfo.Code}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="center_box_bg margin-sm my-radius">
			<view class="center_menu radius">
				<!-- <navigator class="menu_item" url="./modifyAvatar">
					<text style="flex:1;">头像</text>
					<view class="detail-info">
						<image :src="avatar" mode="aspectFit" class="info-img"></image>
					</view>
					<view class="cuIcon-right" style="visibility: hidden;"></view>
				</navigator> -->
				<!-- <navigator class="menu_item">
					<text style="flex:1;">姓名</text>
					<view class="detail-info">
						<text>{{userInfo.RealName?userInfo.RealName:"未填写"}}</text>
					</view>
					<view class="cuIcon-right" style="visibility: hidden;"></view>
				</navigator> -->
				<navigator class="menu_item my-border" url="./modifyGrade">
					<text style="flex:1;">年级</text>
					<view class="detail-info">
						<text>{{userInfo.Grade?userInfo.Grade:"未填写"}}</text>
					</view>
					<view class="cuIcon-right"></view>
				</navigator>
				<!--navigator class="menu_item">
					<text style="flex:1;">性别</text>
					<view class="detail-info">
						<text>{{userInfo.Gender?userInfo.Gender:"未填写"}}</text>
					</view>
					<view class="cuIcon-right"></view>
				</navigator-->
				<navigator class="menu_item my-border" url="./modifyMajor">
					<text style="flex:1;">专业</text>
					<view class="detail-info">
						<text>{{userInfo.Specialty?userInfo.Specialty:"未填写"}}</text>
					</view>
					<view class="cuIcon-right"></view>
				</navigator>
				<navigator class="menu_item my-border" url="./modifyMobile">
					<text style="flex:1;">手机号码</text>
					<view class="detail-info">
						<text>{{userInfo.Mobile?userInfo.Mobile:"未填写"}}</text>
					</view>
					<view class="cuIcon-right"></view>
				</navigator>
				<navigator class="menu_item my-border" url="./modifyTel" v-if="userInfo.IsTeacher">
					<text style="flex:1;">座机号码</text>
					<view class="detail-info">
						<text>{{userInfo.Telephone?userInfo.Telephone:"未填写"}}</text>
					</view>
					<view class="cuIcon-right"></view>
				</navigator>
				<navigator class="menu_item" url="./modifyEmail">
					<text style="flex:1;">邮箱</text>
					<view class="detail-info">
						<text>{{userInfo.Email?userInfo.Email:"未填写"}}</text>
					</view>
					<view class="cuIcon-right"></view>
				</navigator>
			</view>
		</view>
		<button @click="exit" class="margin-xl bg-sys-purple">退出登录</button>
	</view>
</template>

<script>
	let app = require("@/config");
	export default {
		onLoad() {
			this.avatar = app.userInfo.avatar;
			this.currentUserGuid = app.userInfo.token;
		},
		onShow() {
			this.GetInfo();
		},
		data() {
			return {
				avatar: '',
				currentUserGuid: '',
				userInfo: ''
			};
		},
		methods: {
			GetInfo() {
				let currentUserGuid = this.currentUserGuid;
				uni.post("/uc/GetUserInfo", {
					currentUserGuid
				}, msg => {
					if (msg.success) {
						this.userInfo = msg.data;
						uni.setStorage({
							key: 'userInfo',
							data: msg.data,
						});
					}
				})
			}
		},

	}
</script>

<style lang="scss">
	@import'../../colorui/icon.css';
	
	.my-border{
		border-bottom: 0.1rpx solid #ddd;
	}

	.my-radius {
		border:2px solid #FEFEFE;
		border-radius: 20upx;
	}
	.info-img {
		height: 100upx;
		width: 100upx;
		margin: 5px;
		border-radius: 4px;
	}

	.detail-info {
		display: flex;
		flex: 1;
		flex-direction: row-reverse;
		margin-right: 35rpx;
	}

	.center_menu {
		width: 100%;
		display: inline-block;

		.menu_item {
			font-size: 32rpx;
			letter-spacing: 2rpx;
			padding: 14px 5%;
			background: #FEFEFE;
			overflow: hidden;
			display: flex;
			align-items: center;

			&.navigator-hover {
				/*按钮点击效果*/
				background: #B0B0B0;
			}

			text:nth-of-type(1) {
				margin-left: 8px;
			}

			// &:nth-of-type(2) {
			// 	margin-top: 10px;
			// }
		}
	}
</style>
