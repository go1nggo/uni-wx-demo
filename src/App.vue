<script>
export default {
	onLaunch: function () {
		console.log('App Launch')
		// 检查是否需要更新小程序
		this.updateWxApp();
	},
	onShow: function () {
		console.log('App Show')
		console.log(process.env.VUE_APP_ENV, '运行环境')
	},
	onHide: function () {
		console.log('App Hide')
	},
	methods: {
		updateWxApp() {
			const updateManager = uni.getUpdateManager();
			updateManager.onCheckForUpdate(res => {
				//请求完新版本信息回调
				if (res.hasUpdate) {
					updateManager.onUpdateReady(async () => {
						let [, rdata] = await uni.showModal({
							title: "更新提示",
							content: "发现新版本，是否重启应用?",
							cancelColor: "#eeeeee",
							confirmColor: "#cf311e",
						});
						if (rdata.confirm) {
							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							updateManager.applyUpdate();
						}
					})
				}
			});
			updateManager.onUpdateFailed(async () => {
				let [, rdata] = await uni.showModal({
					title: "提示",
					content: "检查到有新版本，但下载失败，请检查网络设置",
				});
				if (rdata.confirm) {
					// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
					updateManager.applyUpdate();
				}
			})
		}
	}
}
</script>

<style>
/*每个页面公共css */

@import "/wxcomponents/dist/common/index.wxss"
</style>
