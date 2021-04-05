<template>
	<view>
		<cu-custom bgColor="bg-sys-purple" isBack>
			<block slot="backText">返回</block>
			<block slot="content">申请表</block>
		</cu-custom>
		<!-- <lab-Steps :value="io.allSteps"></lab-Steps> -->

		<form>
			<view class="cu-bar bg-white solids-bottom">
				<view class="action text-xl">
					<text class="cuIcon-title text-blue text-xl"></text>
					<text class="text-bold text-xl">亲友信息</text>
				</view>
			</view>
			<view v-for="(item,index) in num">
				<view class="form1 margin radius" :key=index>
					<view class="cu-form-group">
						<view class="title">名称</view>
						<input placeholder="请输入亲友名称" v-model="io.data.Owner" :disabled="io.fieldAccess.Owner==='r'||!io.isMyStep"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">性别</view>
						<input placeholder="请输入亲友性别" v-model="io.data.Owner" :disabled="io.fieldAccess.Owner==='r'||!io.isMyStep"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">身份证号码</view>
						<input placeholder="请输入亲友身份证号码" v-model="io.data.Owner" :disabled="io.fieldAccess.Owner==='r'||!io.isMyStep"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">亲友关系</view>
						<input placeholder="请输入亲友关系" v-model="io.data.Owner" :disabled="io.fieldAccess.Owner==='r'||!io.isMyStep"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">联系方式</view>
						<input placeholder="请输入亲友联系方式" v-model="io.data.Owner" :disabled="io.fieldAccess.Owner==='r'||!io.isMyStep"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">入校时间</view>
						<input placeholder="请输入亲友入校时间" v-model="io.data.Owner" :disabled="io.fieldAccess.Owner==='r'||!io.isMyStep"></input>
					</view>
				</view>
			</view>
			<view style="text-align: center;">
				<Button @click=addMore class="bg-default flex-sub text-blue text-center margin-top-xl" style="border: 0rpx;">添加更多+</Button>
			</view>
			<!-- <view class="cu-bar bg-white solids-bottom margin-top">
				<view class="action text-xl">
					<text class="cuIcon-title text-blue text-xl"></text>
					<text class="text-bold text-xl">指导老师审核</text>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">指导老师审核意见</view>
				<input v-model="io.data.GuideTeacherOpinion" :disabled="io.fieldAccess.GuideTeacherOpinion!=='w'||!io.isMyStep"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">指导老师姓名</view>
				<input v-model="io.data.GuideTeacher" :disabled="io.fieldAccess.GuideTeacher!=='w'||!io.isMyStep"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">审核时间</view>
				<input v-model="io.data.GuideTeacherTime" :disabled="io.fieldAccess.GuideTeacherTime!=='w'||!io.isMyStep"></input>
			</view> -->
		</form>
		<timePicker type="rangetime" color="#6d3b5e" @cancel="selectDateTime()" @confirm="confirmDateTime" />
		<!-- <view class="cu-bar bg-white solids-bottom margin-top">
			<view class="action text-xl">
				<text class="cuIcon-title text-blue text-xl"></text>
				<text class="text-bold text-xl">操作流程</text>
			</view>
			<view class="action" @click="foldUp">
				<text class="text-df">{{displayTimeline?'收起':'展开'}}</text>
				<text class="padding-lr-xs text-bold" :class="displayTimeline?'cuIcon-fold':'cuIcon-unfold'"></text>
			</view>
		</view>
		<labTimeLine :timeline="io.timelines" v-show="displayTimeline"></labTimeLine> -->
		<view>
			<button class="flex-sub bg-sys-purple margin-xl" @click="onSubmit()">提交</button>
<!-- 			<view style="height: 180rpx; width: 100%;">
				<view class="flex-sub cu-list grid cu-bar foot" :class="['col-'+io.submitBtns.length]">
					<view v-for="(item,index) in io.submitBtns" class="cu-item" @click="onSubmit(item, 1)" :key="index">
						<view :class="item.Icon"></view>
						<text>{{item.Text}}</text>
					</view>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(opt) {
			uni.post("/api/roomApp/v1/GetRoomAndTeacher", {}, msg => {
				this.assistInfo = { ...this.assistInfo,
					...msg
				};
				let roomDic = {};
				this.assistInfo.buildings.forEach(building => {
					let buildingName = building.Name;
					building.Rooms.forEach(room => {
						roomDic[room.ID] = buildingName + '-' + room.RoomCode + '-' + room.Name;
					})
				});
				roomDic['00000000-0000-0000-0000-000000000000'] = '请选择房间号';
				this.roomDic = roomDic;
			});
			if (opt.create) {
				this.displayTimeline = false;
				uni.getStorage({
					key: 'labid',
					success: (res) => {
						let id = res.data;
						uni.post("/api/roomApp/v1/Applicate", {
							id
						}, msg => {
							this.io = msg;
							if (msg.success) {
								for (let role in this.io.data.OwnerRoles) {
									if (this.io.data.OwnerRoles[role] === "老师") {
										this.isStudent = false;
										break;
									}
								}
							} else {
								uni.showMessage(msg.msg);
							}
						});
					}
				})
			} else {
				uni.getStorage({
					key: 'jmpInfo',
					success: (res) => {
						uni.post("/api/workflow/LoadInstance", { ...res.data,
							detail: true
						}, msg => {
							if (msg.success) {
								this.io = msg;
								for (let role in this.io.data.OwnerRoles) {
									if (this.io.data.OwnerRoles[role] === "老师") {
										this.isStudent = false;
										break;
									}
								}
								if (this.io.intstanceState === 5) {
									for (let index in this.io.allSteps) {
										if (this.io.allSteps[index].status === 0) {
											this.io.allSteps[index - 1].status = 30;
											this.io.timelines[0].steps[0].State = 4;
											break;
										}
									}
								}
								for (let role in this.io.data.OwnerRoles) {
									if (this.io.data.OwnerRoles[role] === "老师") {
										this.isStudent = false;
										break;
									}
								}
							} else {
								uni.showMessage(msg.msg);
							}
						});
					}
				});
			}
		},
		methods: {
			 async formValidate(ajaxFlag) {
				let errors = [];
				if (this.isStudent && this.io.data.GuideTeacherId === "00000000-0000-0000-0000-000000000000" && this.io.currentStep ===
					"填写申请表") {
					errors.push("必须选择指导老师");
				}
				if (this.upLoad.Telephone !== undefined && this.io.currentStep ===
					"填写申请表") {
					var pat = new RegExp('^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$');
					if (pat.test(this.upLoad.Telephone) === false)
						errors.push("请输入正确的电话号码");
				}
				let io = this.io;
				let res = await uni.syncPost("/api/roomApp/v1/CheckRoomAvailable", {
					start: io.data.StartDate,
					end: io.data.EndDate,
					roomId: io.data.RoomId,
					id: io.data.ID
				});
				
				if (!res.success && !ajaxFlag) {
					errors.push(res.msg);
				}
				
				return errors;
			},
			async onSubmit(item, ajaxFlag) {
				if (item) {
					this.io.data[item.Field] = item.Value;
				}
				this.io.shouldUpload.forEach(value => {
					this.upLoad[value] = this.io[value] || this.io.data[value]
				});
				let errors = await this.formValidate(ajaxFlag);
				if (errors.length > 0) {
					uni.showMessage(errors[0]);
				} else {
					uni.post("/api/workflow/SubmitInstance", { ...this.upLoad
					}, msg => {
						if (msg.success === true) {
							uni.showMessage('提交成功', 1, '', 'success');
						} else {
							uni.showMessage(msg.msg, 1);
						}
					})
				}
			},
			selectBuilding(e) {
				let column = e.detail.column
				let value = e.detail.value;
				this.assistInfo.roomTemp = this.assistInfo.buildings[value].Rooms;
			},
			selectRoom(e) {
				let index = e.detail.value[1];
				let v = this.assistInfo.roomTemp[index];
				this.io.data.RoomId = v.ID;
			},
			selectTeacher(e) {
				let u = this.assistInfo.teachers[e.detail.value];
				this.io.data.GuideTeacherId = u.ID;
				this.assistInfo.guideTeacherName = u.RealName;
			},
			selectDateTime(access) {
				if (access && access !== 'w' || !this.io.isMyStep) return;
				this.showPicker = !this.showPicker;
			},
			confirmDateTime(e) {
				this.io.data.StartDate = e.value[0];
				this.io.data.EndDate = e.value[1];
				this.selectDateTime();
			},
			foldUp() {
				this.displayTimeline = !this.displayTimeline;
			},
			addMore() {
				this.num = this.num + 1;
			}
		},
		data() {
			var now = new Date();
			return {
				num: 1,
				now,
				io: {
					fieldAccess: {},
					data: {},
					submitBtns: [],
					shouldUpload: [],
					allSteps: [],
					isMyStep: false,
					timelines: [],
					intstanceState: ''
				},
				assistInfo: {
					buildings: [],
					rooms: [],
					teachers: [],
					roomTemp: [],
					roomIndex: [0, 0],
					guideTeacherName: '请选择指导老师'
				},
				displayTimeline: true,
				upLoad: [],
				roomDic: {},
				teacherDic: {},
				showPicker: false,
				isStudent: true
			}
		}
	}
</script>

<style>
	.form1>view>view {
		flex-basis: 30%;
	}

	form>span>view.cu-form-group>view {
		flex-basis: 44%;
	}
</style>
