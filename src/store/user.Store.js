/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-11-01 13:46:35
 * @LastEditTime: 2022-11-13 10:09:08
 * @LastEditors: liutq
 * @Reference:
 */
import { makeAutoObservable, runInAction } from 'mobx';
import { http, setToken, removeToken } from '../utils';

class UserStore {
	constructor() {
		makeAutoObservable(this, {}, { autoBind: true });
	}
	username = '';
	avatar = null;
	position = null;
	company = null;
	homepage = null;
	introduction = null;

	async logSubmit(data) {
		const res = await http.post('/api/login', data);
		setToken(res.token);
		window.localStorage.setItem('username', res.username);
		runInAction(() => {
			this.username = res.username;
		});
		return res;
	}
	setUsername() {
		this.username = window.localStorage.getItem('username');
	}
	setInfo(str, info) {
		window.localStorage.setItem(str, info);
	}
	get getUsername() {
		return window.localStorage.getItem('username');
	}
	async regSubmit(data) {
		const res = await http.post('/api/register', data);
		return res;
	}
	loginOut() {
		removeToken();
		window.localStorage.removeItem('username');
		this.username = '';
		this.avatar = null;
	}
	async getInfo() {
		const res = await http.get(`/user/getInfo?username=${this.username}`);
		console.log(res);
		this.setInfo('avatar', res.data.avatar ? res.data.avatar : '');
		this.setInfo('position', res.data.position ? res.data.position : '');
		this.setInfo('company', res.data.company ? res.data.company : '');
		this.setInfo('homepage', res.data.homepage ? res.data.homepage : '');
		this.setInfo('introduction', res.data.introduction ? res.data.introduction : '');
	}
	get infoParams() {
		return {
			username: window.localStorage.getItem('username'),
			position: window.localStorage.getItem('position'),
			company: window.localStorage.getItem('company'),
			homepage: window.localStorage.getItem('homepage'),
			introduction: window.localStorage.getItem('introduction'),
		};
	}
	get getAvatar() {
		return window.localStorage.getItem('avatar');
	}
}

export default UserStore;
