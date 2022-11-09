/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-10-31 18:16:32
 * @LastEditTime: 2022-10-31 18:16:44
 * @LastEditors: liutq
 * @Reference:
 */
const key = 'juejin-key';

const setToken = token => {
	return window.localStorage.setItem(key, token);
};

const getToken = () => {
	return window.localStorage.getItem(key);
};

const removeToken = () => {
	return window.localStorage.removeItem(key);
};

export { setToken, getToken, removeToken };
