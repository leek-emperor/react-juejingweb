/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-10-31 18:46:30
 * @LastEditTime: 2022-10-31 18:46:32
 * @LastEditors: liutq
 * @Reference:
 */
// 先把所有的工具函数导出的模块在这里导入
// 然后再统一导出
import { http } from './http';
import { getToken, setToken, removeToken } from './token';

export { http, setToken, getToken, removeToken };
