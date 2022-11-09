/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-10-25 19:09:36
 * @LastEditTime: 2022-10-25 19:09:39
 * @LastEditors: liutq
 * @Reference:
 */
// 这个包其实就是实现路由跳转的，需要npm i --save history下载
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export { history };
