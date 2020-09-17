<template>
	<view>
		<uni-notice-bar scrollable="true" showIcon="true" :text="msgData.size"></uni-notice-bar>
		<view class="w-mesage">
			<view v-for="(item, index) in userList" :key="index" class="w-message-flex" @click="clickwChat(item)">
				<view class="w-message-img">
					<image src="@/static/wchat.png" mode=""></image>
				</view>
				<view class="w-message-child">
					<view class="w-message-name w-over-flow">
						<text>{{item.userName}}</text>
					</view>
					<view class="w-message-info w-over-flow">
						<text class="w-message-text">{{ item.chatRecord }}</text>
					</view>
				</view>
				<view class="w-date">
					<text>{{item.chatDate}}</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				msgData: {},
				userList: []
			}
		},
		computed: {
			...mapState([
				'chatList'
			])
		},
		onLoad() {
			let user = uni.getStorageSync("user")
			if (user) {
				this.$store.user = user
			}
			this.connectWebSocketInit()
		},
		components: {
			uniNoticeBar
		},
		methods: {
			connectWebSocketInit() {
				// 创建一个this.socketTask对象【发送、接收、关闭socket都由这个对象操作】
				this.$store.socketTask = uni.connectSocket({
					url: "ws://localhost:8900/websocket/" + this.$store.user.userNo + "/" + this.$store.user.nickName,
					success(data) {
						console.log(data)
						console.log("连接成功")
					}
				})
				var _this = this
				// 消息的发送和接收必须在正常连接打开中,才能发送或接收【否则会失败】
				_this.$store.socketTask.onOpen((res) => {
					console.log("res+" + JSON.stringify(res))
					console.log("命中连接...")
					_this.$store.isOpenSocket = true
					// // 注：只有连接正常打开中 ，才能正常成功发送消息
					// 注：只有连接正常打开中 ，才能正常收到消息
					_this.$store.socketTask.onMessage((res) => {
						console.log("收到服务器内容：" + JSON.stringify(res.data));
						let json = JSON.parse(res.data)
						if (json.type == '0') {
							_this.msgData = json
							let userList = []
							for (var i = 0; i < json.user.length; i++) {
								if (_this.$store.user.userNo !== json.user[i].userNo) {
									userList.push(JSON.parse(JSON.stringify(json.user[i])))
								} else {
									uni.setStorage({
										key: 'userMsg',
										data: json.user[i]
									})
								}
							}
							_this.userList = userList
						} else if (json.type == '1') {
							let chatMsg = uni.getStorageSync('chatMsg')
							let chatList = uni.getStorageSync(_this.$store.user.userNo + chatMsg.userNo)
							_this.chatList.push(json)
							uni.setStorage({
								key: _this.$store.user.userNo + chatMsg.userNo,
								data: _this.chatList
							})
							console.log(_this.userList)
							for (var i = 0; i < _this.userList.length; i++) {
								if (_this.userList[i].sessionId == json.fromUser) {
									_this.userList[i].chatRecord = json.msg
									_this.userList[i].chatDate = json.chatDate
									_this.updateChatRecord(json.msg, json.fromUser, json.chatDate)

								}
							}
							console.log(_this.userList)
						}
					})
				})
				this.$store.socketTask.onClose(function() {
					console.log("已经被关闭了")
				})
			},
			// 更新最近一次记录
			updateChatRecord(chatRecord, sessionId, chatDate) {
				this.$http({
					url: '/user/updateChatRecord',
					data: {
						chatRecord: chatRecord,
						sessionId: sessionId
					},
					methods: 'post',
					success: (res) => {
						console.log(res)
					}
				})
			},
			clickwChat(item) {
				uni.setStorage({
					key: 'chatMsg',
					data: item,
					success() {
						uni.navigateTo({
							url: "/pages/views/wchat/index"
						})
					}
				})
			},
			leave() {
				this.$uniReLaunch("")
			}
		}

	}
</script>

<style>
	.w-message-flex {
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: rgb(255, 255, 255);
		border-bottom: 1rpx solid rgb(232, 232, 232);
		margin: 5rpx;
	}

	.w-message-img {
		width: 120rpx;
		height: 120rpx;
	}

	.w-message-img image {
		margin: 10rpx;
		width: 100rpx;
		height: 100rpx;
	}

	.w-message-child {
		flex: 1;
		overflow: hidden;
	}

	.w-over-flow {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.w-message-text {
		font-size: 30rpx;
		color: #969696;
	}

	.w-date {
		margin-top: -50rpx;
		margin-right: 20rpx;
		font-size: 30rpx;
		color: #969696;
	}
</style>
