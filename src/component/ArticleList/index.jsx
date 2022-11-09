/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-10-28 15:24:00
 * @LastEditTime: 2022-11-08 20:29:26
 * @LastEditors: liutq
 * @Reference:
 */
import { React, useEffect } from 'react';
import './index.scss';
import ArticleCard from '../ArticleCard';
import { Store } from '../../store';
import { observer } from 'mobx-react-lite';
function ArticleList() {
	const { articleStore } = Store();
	useEffect(() => {
		articleStore.getArticleList();
		window.addEventListener(
			'scroll',
			throttle(() => {
				const tag = document.querySelector(
					'.nav-list .ant-menu-item-selected span'
				).textContent;
				if (lowEnough()) {
					articleStore.getArticleList(tag);
				}
			}, 500)
		);
	}, [articleStore]);
	// 节流函数
	function throttle(fn, ms) {
		let flag = true;
		return function () {
			if (!flag) return;
			flag = false;
			setTimeout(() => {
				fn.apply(this, arguments);
				flag = true;
			}, ms);
		};
	}
	// 触发条件函数
	const lowEnough = () => {
		var pageHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight);
		var viewportHeight =
			window.innerHeight ||
			document.documentElement.clientHeight ||
			document.body.clientHeight ||
			0;
		var scrollHeight =
			window.pageYOffset ||
			document.documentElement.scrollTop ||
			document.body.scrollTop ||
			0;
		// 通过 真实内容高度 - 视窗高度 - 上面隐藏的高度 < 400，作为加载的触发条件
		return pageHeight - viewportHeight - scrollHeight < 400;
	};

	const liClick = e => {
		const parent = e.target.parentNode;
		for (const child of parent.children) {
			child.className = '';
		}
		e.target.className = 'ant-menu-item-selected';
		// 如果是历史，要改变下面元素内容
		if (e.target.innerText === '历史') {
		}
	};
	return (
		<div className="article-container">
			<header className="list-header2">
				<ul className="nav-list2">
					<li onClick={liClick} className="ant-menu-item-selected">
						推荐
					</li>
					<li onClick={liClick}>最新</li>
					<li onClick={liClick}>历史</li>
				</ul>
			</header>

			<div className="entry-list-wrap">
				{articleStore.showList.map((d, index) => (
					<ArticleCard data={d} key={index} />
				))}
			</div>
		</div>
	);
}
export default observer(ArticleList);
