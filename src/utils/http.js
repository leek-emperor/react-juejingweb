/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-10-31 18:18:37
 * @LastEditTime: 2022-10-31 19:58:09
 * @LastEditors: liutq
 * @Reference:
 */
import axios from 'axios';
import { getToken } from './token';
import { history } from './history';
const http = axios.create({
	baseURL: 'http://127.0.0.1:3007',
	timeout: 5000,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
	},
});
// 添加请求拦截器
http.interceptors.request.use(
	config => {
		// if not login add token
		const token = getToken();
		if (token) {
			config.headers.Authorization = token;
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

// 添加响应拦截器
http.interceptors.response.use(
	response => {
		// 2xx 范围内的状态码都会触发该函数。
		// 对响应数据做点什么
		return response.data;
	},
	error => {
		// 超出 2xx 范围的状态码都会触发该函数。
		// 对响应错误做点什么
		if (error.response.status === 401) {
			// 跳回到登录 reactRouter默认状态下 并不支持在组件之外完成路由跳转
			// 需要自己来实现
			history.push('/login');

			// 这里其实也可以
			// window.location.href = '/login';
		}
		return Promise.reject(error);
	}
);

export { http };
