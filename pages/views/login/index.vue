<template>
	<view>
		<view>
			<text>用户账号：</text><input v-model="userNum" type="text" value="" />
		</view>
		<view>
			<text>密码：</text><input v-model="userPassword" type="text" value="" />
		</view>
		<view>
			<button type="default" @click="login()">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userNum: '',
				userPassword: ''
			}
		},
		onLoad() {
			let user = uni.getStorageSync("user")
			if (user) {
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
				uni.setStorage({
					key: "user",
					data: this.userNum
				})
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
		}
	}
</script>

<style>
</style>
