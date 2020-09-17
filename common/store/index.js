import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		socketTask: null,
		user: null,
		userList: [],
		chatObj: {},
		chatList: [],
		msgData: null,
		isOpenSocket: false
	},
	mutations: {
		SET_SOCKET_TASK: (state, socketTask) => {
			state.socketTask = socketTask
		},
		SET_IS_OPEN_SOCKET: (state, isOpenSocket) => {
			state.isOpenSocket = isOpenSocket
		},
		SET_USER: (state, user) => {
			state.user = user
		},
		SET_USER_LIST: (state, userList) => {
			state.userList = userList
		},
		SET_CHAT_LIST: (state, chatList) => {
			state.chatList = chatList
		}
	},
	actions: {
		connectWebSocketInit() {
			console.log('-----------')
		}
	}
})

export default store
