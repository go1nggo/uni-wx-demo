import { request} from '@/utils/request.js'
const userPort = '****' //定义端口号
 
export function Login(data) {
	return request({
		url: '/usr/session',
		method: 'POST',
		data,
		port: userPort
	})
}
 
export function getUserSession() {
	return request({
		url: '/usr/session',
		method: 'GET',
		port: userPort
	})
}
 
export function getUsers(data) {
	return request({
		url: '/usr/users',
		method: 'GET',
		port: userPort,
		data,
	})
}

/* 使用页面示例

<template>
    <view class="box">
     
    </view>
</template>
​
<script>
    import { Login} from '@/api/user.js'
    export default {
        async onLoad() {
            let queryData = {
               username: 'admin',
               password: '0000000'
            }
            const res = await login(queryData )
        }
    }
</script>
​

*/