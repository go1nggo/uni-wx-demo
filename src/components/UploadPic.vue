<template>
    <view class="uni-chooseimg">
        <view class="flexEnd" style="width: 84vw">{{ imageList.length }}/{{ MaxNumber }}</view>
        <view class="flexFront">
            <view class="kuangPic flexRowCenter" @tap="chooseImage" style="padding-top: 10rpx;">
                <uni-icons type="camera-filled" color="#606266" size="50"></uni-icons>
            </view>
            <view class="photoStyle">
                <view class="photoOver" :style="{ width: picWidth }">
                    <view class="kuangPic" v-for="(image, index) in imageList" :key="index">
                        <image class="" :src="image" :data-src="image" @tap="previewImage" @longpress="clearImg"></image>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
// ['拍照', '相册', '拍照或相册'
const sourceType = [
    ['camera'],
    ['album'],
    ['camera', 'album']
]
// ['压缩', '原图', '压缩或原图']
const sizeType = [
    ['compressed'],
    ['original'],
    ['compressed', 'original']
]
export default {
    props: {
        // 最大可上传图片数量
        MaxNumber: {
            type: Number,
            default: 8
        },
        // 使用相册还是相机 1 相机、2 相册、3 二者都有
        sourceTypeIndex: {
            type: Number,
            default: 3
        },
        // 使用原图还是压缩图 1 压缩图、2 原图、3 二者都有
        sizeTypeIndex: {
            type: Number,
            default: 2
        },
    },
    data() {
        return {
            alotPhoto: [], // 图片数组
            imageList: [], //  显示图片数组
            imageSuccess: [], //  成功之前暂存
        }
    },
    methods: {
        chooseImage() {   // 图片选择和上传
            console.log('显示的图片数量', this.imageList.length)
            if (this.imageList.length >= this.MaxNumber) {
                uni.showModal({
                    title: `最多只能上传${this.MaxNumber}张图片`,
                    content: '',
                    showCancel: true,
                    success: ({ confirm, cancel }) => {
                        console.log('tishi', confirm, cancel)
                    }
                })
                return
            }
            let url = '上传文件接口';
            uni.chooseImage({
                sourceType: sourceType[this.sourceTypeIndex],
                sizeType: sizeType[this.sizeTypeIndex],
                count: this.MaxNumber, // 最多可以选择的图片张数 默认是9
                success: (res) => {
                    console.log("图片上传", res)
                    this.imageSuccess = this.imageSuccess.concat(res.tempFilePaths);
                    uni.uploadFile({
                        url: url,
                        filePath: res.tempFilePaths[0],
                        name: 'file',
                        formData: {},
                        header: {
                            "Content-Type": "multipart/form-data"
                        },
                        success: (res) => {
                            console.log(12333333, res, JSON.parse(res.data));
                            let imageInfo = JSON.parse(res.data);
                            if (imageInfo.code == 200) {
                                this.$toast("success", "上传成功");
                                this.alotPhoto = this.alotPhoto.concat(imageInfo.url);
                                this.imageList = this.imageSuccess;
                                console.log('上传成功', this.alotPhoto);
                                this.$emit('getPhoto', this.alotPhoto)
                            } else if (imageInfo.code == 500) {
                                this.$toast("error", "上传失败");
                            }
                        },
                        fail: (err) => {
                            console.log('进入失败流程');
                            this.$toast("error", "上传失败");
                        }
                    })
                },
                fail: (err) => {

                }
            })
        },
        // 预览图片
        previewImage: function (e) {
            console.log("预览", e)
            var current = e.target.dataset.src
            uni.previewImage({
                current: current,
                urls: this.imageList,
            })
        },
        // 清除图片
        clearImg(e) {
            let that = this;
            let id = '';
            let deleteItem = e.target.dataset.src;
            console.log("清除图片", e, that.imageList)
            for (let i in that.imageList) {
                if (that.imageList[i] == deleteItem) {
                    id = i;
                }
            }
            console.log("下标值", id)
            uni.showModal({
                title: '删除提示',
                content: '确认删除此图片吗',
                success: function (res) {
                    if (res.confirm) {
                        console.log('用户点击确定');
                        that.imageList.splice(id, 1);
                        that.alotPhoto.splice(id, 1);
                        console.log(that.imageList);
                        that.feng.showTips("删除成功", 'none');
                        that.$emit('getPhoto', that.alotPhoto)
                    } else if (res.cancel) {
                        console.log('用户点击取消');
                    }
                }
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.uni-chooseimg {
    .photoStyle {
        width: 90vw;
        white-space: nowrap;
        overflow: hidden;
        overflow-y: hidden;
        overflow-x: scroll;
        margin-top: 10px;
    }

    .photoOver {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }

    .kuangPic {
        border: 1px solid #DCDFE6;
        margin-right: 10rpx;
        width: 160rpx;
        height: 160rpx;
        display: flex;
        justify-content: center;
        align-items: center;

        image {
            width: 100%;
            height: 100%;
        }
    }

}
</style>

