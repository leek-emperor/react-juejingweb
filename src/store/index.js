/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-10-31 19:11:59
 * @LastEditTime: 2022-11-03 08:44:57
 * @LastEditors: liutq
 * @Reference:
 */
import React from 'react';
import ArticleStore from './article.Store';
import UserStore from './user.Store';
class RootStore {
	constructor() {
		this.userStore = new UserStore();
		this.articleStore = new ArticleStore();
	}
}

// 实例化
const rootStore = new RootStore();
const context = React.createContext(rootStore);

const Store = () => React.useContext(context);
export { Store };
