<template>
	<view>
		<view class="w-chat">
			<view v-for="(item, index) in chatList" :key="index">
				<view class="w-chat-left" v-if="item.status == 'left'">
					<view class="w-chat-left-img">
						<image src="@/static/wchat.png" mode=""></image>
					</view>
					<view class="w-chat-text">
						<view class="chat-left_triangle"></view>
						<text>{{ item.msg }}</text>
					</view>
				</view>
				<view class="w-chat-right" v-if="item.status == 'right'">
					<view class="w-chat-text">
						<view class="chat-right_triangle"></view>
						<text>{{ item.msg }}</text>
					</view>
					<view class="w-chat-left-img">
						<image src="@/static/wchat.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="w-chat-send">
			<view class="w-chat-voice">
				<image src="@/static/yuyin.svg" mode=""></image>
			</view>
			<view class="w-chat-input">
				<input v-model="msg" type="text" value="" />
			</view>
			<view class="w-chat-to" @click="clickRequest()">
				<text>发送</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				chatVal: '',
				chatMsg: '',
				userMsg: '',
				msg: ''
			}
		},
		computed: {
			...mapState([
				'chatList'
			])
		},
		onLoad() {
			this.chatMsg = uni.getStorageSync('chatMsg')
			this.userMsg = uni.getStorageSync('userMsg')
			let chatList = uni.getStorageSync(this.$store.user.userNo + this.chatMsg.userNo)
			this.$store.commit('SET_CHAT_LIST', chatList ? chatList : [])
			console.log(this.chatList)
			uni.setNavigationBarTitle({
				title: this.chatMsg.userName
			})
		},
		methods: {
			clickRequest() {
				var _this = this
				if (this.$store.isOpenSocket) {
					// websocket的服务器的原理是:发送一次消息,同时返回一组数据【否则服务器会进去死循环崩溃】
					var sendData = {
						type: '1',
						msg: this.msg,
						fromName: this.userMsg.sessionId,
						toUser: this.chatMsg.sessionId
					}
					console.log(sendData)
					this.$store.socketTask.send({
						data: JSON.stringify(sendData),
						async success(res) {
							sendData.status = 'right'
							_this.chatList.push(JSON.parse(JSON.stringify(sendData)))
							uni.setStorage({
								key: _this.$store.user.userNo + _this.chatMsg.userNo,
								data: _this.chatList
							})
						}
					});
				}
			}
		}
	}
</script>

<style>
	.w-chat {
		overflow-y: auto;
		margin: 0 15rpx;
		margin-bottom: 130rpx;
	}

	.w-chat-left-img {
		width: 90rpx;
		height: 90rpx;
	}

	.w-chat-text {
		background-color: rgb(255, 255, 255);
		margin: 20rpx 20rpx;
		padding: 18rpx 20rpx;
		border-radius: 10rpx;
		font-size: 30rpx;
	}

	.w-chat-right .w-chat-text {
		background-color: rgb(178, 226, 129);
	}

	.w-chat-left {
		display: flex;
		justify-content: flex-start;
		margin: 20rpx 0;
	}

	.w-chat-right {
		display: flex;
		justify-content: flex-end;
		margin: 20rpx 0;
	}

	.w-chat-send {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 120rpx;
		border-top: 1rpx solid #bababa;
		background-color: rgb(245, 245, 245);
	}

	.w-chat-voice {
		margin-left: 20rpx;
		width: 60rpx;
		height: 60rpx;
	}

	.w-chat-input {
		height: 80rpx;
		width: 520rpx;
		border-radius: 10rpx;
	}

	.w-chat-input input {
		height: 80rpx;
		border-radius: 10rpx;
		background-color: rgb(255, 255, 255);
	}

	.w-chat-to {
		color: #00bf00;
		margin-right: 20rpx;
	}

	.chat-left_triangle {
		float: left;
		height: 0rpx;
		width: 0rpx;
		border-width: 16rpx;
		border-style: solid;
		border-color: transparent rgb(255, 255, 255) transparent transparent;
		position: relative;
		left: -50rpx;
		top: 15rpx;
	}

	.chat-right_triangle {
		float: right;
		height: 0rpx;
		width: 0rpx;
		border-width: 16rpx;
		border-style: solid;
		border-color: transparent transparent transparent rgb(178, 226, 129);
		position: relative;
		right: -50rpx;
		top: 15rpx;
	}
</style>
