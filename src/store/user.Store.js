/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-11-01 13:46:35
 * @LastEditTime: 2022-11-09 15:09:30
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
	// setUsername = () => {
	// 	this.username = window.localStorage.getItem('username');
	// };
	avatar = null;
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
	async getAvatar() {
		const res = await http.get(`/user/getInfo?username=${this.username}`);
		runInAction(() => {
			this.avatar = res.avatar;
		});
	}
}

export default UserStore;
