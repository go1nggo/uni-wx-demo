<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{title}}</text>
		</view>
      	<view>图片上传</view>
      	<upload-pic @getPhoto="getPhoto"></upload-pic> 
	</view>
</template>

<script>
	import UploadPic from '@/components/UploadPic'
	export default {
		components:{
			UploadPic
		},
		data() {
			return {
				title: 'Hello',
				form: {
					img: "",
					file: "",
				},
			}
		},
		onLoad() {

		},
		onShow() {
			console.log(1)
            this.setTabBarIndex(0); 
        },
		methods: {
			getPhoto(value) {
				console.log('上传的图片', value)
				this.urlList = value
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin: 200rpx auto 50rpx auto;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
