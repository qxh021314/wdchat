const basicUrl = 'http://localhost:8900'
export default {
	request(options) {
		/* 发起请求 */
		uni.request({
			url: basicUrl + options.url,
			data: options.data,
			method: options.methods,
			timeout: 10000,
			success: (res) => {
				console.log(res);
				options.success(res)
			},
			fail: (res) => {
				console.log(res);
				options.fail(res)
			},
			complete: (res) => {
				console.log(res);
				if (options.complete) {
					options.complete(res)
				}
			}
		});
	}
}
