<template>
	<view>
		<!-- 图片 -->
		<view class="backImg">
			<text>您好，欢迎使用微聊！</text>
		</view>
		<view class="w-form-content">
			<view class="w-form-in">
				<view class="w-form-flex">
					<view class="w-form-title"><text>账号</text></view>
					<view class="childFlex"><input class="uni-input" v-model="userNo" focus type="number" placeholder="请输入账号" /></view>
				</view>
				<view class="w-form-flex">
					<view class="w-form-title"><text>密码</text></view>
					<view class="childFlex"><input class="uni-input" v-model="userPassword" focus type="password" placeholder="请输入密码" /></view>
				</view>
				<view class="checkDeal">
					<checkbox value="cb" checked="true" style="transform:scale(0.6)" />
					<text>我已同意并接受</text>
					<text class="userDeal">《用户隐私协议》</text>
				</view>
				<view class="btnSty">
					<view class="register" @click="login()"><text>登录</text></view>
				</view>
			</view>
			<view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userNo: '',
				userPassword: ''
			}
		},
		onLoad() {
			let user = uni.getStorageSync("user")
			if (user) {
				this.$store.user = user
				uni.switchTab({
					url: "/pages/views/message/index",
					success: res => {
						console.log(res)
					},
					fail: (res) => {
						console.log(res)
					},
					complete: (res) => {
						console.log(res)
					}
				})
			}
		},
		methods: {
			login() {
				this.$http({
					url: '/user/userLogin',
					data: {
						userNo: this.userNo,
						userPassword: this.userPassword
					},
					methods: 'post',
					success: (res) => {
						console.log(res)
						if (res.data.code == 1 && res.data.data !== null) {
							this.$store.user = res.data.data
							uni.setStorage({
								key: "user",
								data: res.data.data,
								success() {
									uni.switchTab({
										url: "/pages/views/message/index",
										success: res => {
											console.log(res)
										},
										fail: (res) => {
											console.log(res)
										},
										complete: (res) => {
											console.log(res)
										}
									})
								}
							})
						} else {
							uni.showToast({
								title: res.data.message,
								icon: "none"
							});
						}
					}
				})
			}
		}
	}
</script>

<style>
	.backImg {
		height: 250rpx;
		line-height: 250rpx;
		text-align: center;
		font-size: 40rpx;
		font-weight: 600;
	}

	.uni-input {
		padding: 10rpx 0;
		font-size: 31rpx;
	}

	.w-form-flex {
		margin: 50rpx 10rpx;
	}

	.w-form-in {
		margin: 0rpx 10rpx;
		padding: 20rpx 20rpx;
		height: 550rpx;
	}

	.childFlex {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #6f6f6f;
		width: 450rpx;
	}

	.w-form-flex {
		display: flex;
		background-color: #FFFFFF;
		align-items: center;
		padding: 10rpx 10rpx;
		border-radius: 60rpx;
	}

	.w-form-title {
		width: 150rpx;
		margin: 10rpx 20rpx;
		font-size: 32rpx;
		font-weight: 600;
	}

	.childFlex image {
		width: 40rpx;
		height: 40rpx;
	}

	.areaText {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.getCode {
		color: #5ed4c2;
		margin-right: 20rpx;
	}

	.checkDeal {
		margin-left: 20rpx;
		font-size: 30rpx;
	}

	.userDeal {
		color: #fb893a;
	}

	.register,
	.toHome {
		height: 80rpx;
		margin: 0 30rpx;
		margin-top: 50rpx;
		text-align: center;
		line-height: 80rpx;
		color: #FFFFFF;
		border-radius: 20rpx;
		background-color: #23a0ff;
	}

	.toHome {
		background-color: #FFFFFF;
		color: #000000;
	}

	.w-hidden-over {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>
