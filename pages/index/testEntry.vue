<template>
	<view class="flex flex-direction padding">
		<!-- <a href="javascript:;" class="cu-btn bg-red lg margin-top" @click="go('eed2dec4-a868-4696-b911-c70ca8f9f7d9','roomApplication')">以游客身份登录</a> -->
		<a href="javascript:;" class="cu-btn bg-blue lg margin-top" @click="go('9284220F-8700-49A4-A4AF-E42A3713B33C','')">以admin身份登录</a>
		<a href="javascript:;" class="cu-btn bg-blue lg margin-top" @click="go('40082E3C-1B96-47FB-9CDF-48D821B677A8','')">以高级用户身份登录</a>
		<a href="javascript:;" class="cu-btn bg-blue lg margin-top" @click="go('0270A4F0-AB89-4D9F-A46B-B15360C1E934','')">以普通用户身份登录</a>
		<button @click="clear" class="margin">清空缓存</button>
	</view>
</template>

<script>
	let app = require("@/config");
	export default {
		methods: {
			go(id, where) {
				uni.post("/uc/getCurrentUserGuid", {
					id
				}, msg => {
					uni.setStorage({
						key: 'currentUserGuid',
						data: msg.currentUserGuid,
					});
					app.currentUserGuid = msg.currentUserGuid;
					app.userInfo = msg.userInfo;
					let ps = app.userInfo.permissons;
					app.checkPermission = (p) => {
						return ps && ps.indexOf(p) >= 0;
					};
					uni.navigateTo({
						url: "/pages/" + "index/index"
					})
				});
			},
			clear() {
				uni.clearStorage();
				uni.navigateBack({
					
				});
			}
		},
		data() {
			return {
				app
			}
		}
	}
</script>

<style lang="less">
</style>
