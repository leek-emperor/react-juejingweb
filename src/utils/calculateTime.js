/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-10-29 16:34:30
 * @LastEditTime: 2022-11-08 21:42:17
 * @LastEditors: liutq
 * @Reference:
 */
export function calculateTime(time) {
	const d = new Date();
	if (d.getFullYear() !== time.getFullYear()) {
		return `${d.getFullYear() - time.getFullYear()}年前`;
	}
	if (d.getMonth() !== time.getMonth()) {
		return `${d.getMonth() - time.getMonth()}月前`;
	}
	if (d.getDay() !== time.getDay()) {
		return `${d.getDate() - time.getDate()}天前`;
	}
	if (d.getHours() !== time.getHours()) {
		return `${d.getHours() - time.getHours()}小时前`;
	}
	if (d.getMinutes() !== time.getMinutes()) {
		return `${d.getMinutes() - time.getMinutes()}分钟前`;
	}
	if (d.getSeconds() !== time.getSeconds()) {
		return `${d.getSeconds() - time.getSeconds()}秒前`;
	}
}
