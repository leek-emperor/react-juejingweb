/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-11-03 08:40:45
 * @LastEditTime: 2022-11-08 22:02:59
 * @LastEditors: liutq
 * @Reference:
 */
import { makeAutoObservable, runInAction, toJS } from 'mobx';
import { http } from '../utils';
// import
class ArticleStore {
	constructor() {
		makeAutoObservable(this, {}, { autoBind: true });
	}
	article = [];
	myArticle = [];
	async getArticleList(tag = '综合') {
		const res = await http.get('/article/get', { params: { num: 15, tag: tag } });
		runInAction(() => {
			this.article = [...toJS(this.article), ...res.data];
		});
	}
	get showList() {
		return toJS(this.article);
	}
	removeList() {
		this.article = [];
	}
	async getMyArticle(username) {
		const res = await http.get('article/userArticle', { params: { username } });
		runInAction(() => {
			this.myArticle = res.data;
		});
	}
	get showMyList() {
		return toJS(this.myArticle);
	}
}

export default ArticleStore;
