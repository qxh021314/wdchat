<script>
	export default {
		onLaunch: function() {
	
			console.log('App Launch');
		},
		onShow: function() {
		},
		onHide: function() {
			console.log('App Hide');
		},
		methods: {
			
		}
	};
</script>

<style>
	/* 解决头条小程序组件内引入字体不生效的问题 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		src: url('/static/uni.ttf');
	}

	/* #endif */
	page {
		background-color: #ebebeb;
	}

	image {
		width: 100%;
		height: 100%;
	}
</style>
