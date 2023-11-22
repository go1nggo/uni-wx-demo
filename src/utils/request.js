import appConfig from "@/config/index";

//promise化，方便后续适配async/await
export const request = (options = {}) => {
	return new Promise((resolve, rejects) => {
		handleRequest(options, resolve, rejects)
	})
}
 
// 发起请求
function handleRequest(options, resolve, reject) {
	//从缓存获取token
	const token = uni.getStorageSync('token')
	uni.showLoading({
		title: "加载中"
	});
	if (!token&&!whiteList(options)) {
		// 执行没有登录的逻辑
		uni.reLaunch({
			url:'/pages/login/login'
		})
		uni.hideLoading()
		return;
	}
    //如果包含白名单页面，则无需登录也可访问接口
	if(whiteList(options)){
		uni.request({
			url: appConfig.BASEURL + ':' + options.port + options.url,
			method: options.method,
			data: options.data,
			success: (response) => {
				return resolve(response)
			},
			fail: (err) => {
				return reject(err);
			},
			complete() {
				uni.hideLoading();
			}
		})
		return
	}
	uni.request({
		url: appConfig.BASEURL + ':' + options.port + options.url,
		method: options.method,
		header: {
			Authorization:'Bearer '+ token
		},
		data: options.data,
		success: (response) => {
			if(response.statusCode==401){
				uni.showToast({
				  icon: 'error',
				  position: 'top',
				  title: '出错了，请尝试重新登录！'
				});
				return 
			}
			return resolve(response)
		},
		fail: (err) => {
			console.log('error', err)
			return reject(err); //抛出异常信息，方便后续自定义处理错误
		},
		complete() {
			uni.hideLoading();
		}
	})
}
 
// token 白名单
function whiteList(config) {
	let list = [
		(config.url == '/usr/session' && config.method == 'POST'),
	]
	let bol = false
	for (const item of list) {
		if (item) {
			bol = true
		}
	}
	return bol
}
 