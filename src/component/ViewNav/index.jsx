/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-10-27 19:33:38
 * @LastEditTime: 2022-11-04 10:51:31
 * @LastEditors: liutq
 * @Reference:
 */
import React from 'react';
import { Row, Menu } from 'antd';
import { Store } from '../../store';
import './index.scss';
export default function ViewNav() {
	const { articleStore } = Store();
	const item = [
		{
			label: '综合',
			key: '1',
			onClick: () => {
				articleStore.removeList();
				articleStore.getArticleList('综合');
			},
		},
		{
			label: '关注',
			key: '2',
			onClick: () => {
				articleStore.removeList();
				articleStore.getArticleList('综合');
			},
		},
		{
			label: '前端',
			key: '3',
			onClick: () => {
				articleStore.removeList();
				articleStore.getArticleList('前端');
			},
		},
		{
			label: '后端',
			key: '4',
			onClick: () => {
				articleStore.removeList();
				articleStore.getArticleList('后端');
			},
		},
		{
			label: 'Android',
			key: '5',
			onClick: () => {
				articleStore.removeList();
				articleStore.getArticleList('Android');
			},
		},
		{
			label: 'iOS',
			key: '6',
			onClick: () => {
				articleStore.removeList();
				articleStore.getArticleList('iOS');
			},
		},
		{
			label: '人工智能',
			key: '7',
			onClick: () => {
				articleStore.removeList();
				articleStore.getArticleList('人工智能');
			},
		},
		{
			label: '开发工具',
			key: '8',
			onClick: () => {
				articleStore.removeList();
				articleStore.getArticleList('开发工具');
			},
		},
		{
			label: '代码人生',
			key: '9',
			onClick: () => {
				articleStore.removeList();
				articleStore.getArticleList('代码人生');
			},
		},
		{
			label: '阅读',
			key: '10',
			onClick: () => {
				articleStore.removeList();
				articleStore.getArticleList('阅读');
			},
		},
	];
	// document.querySelector('.ant-menu-item-selected')
	return (
		<Row
			className="nav-list container"
			style={{ height: '45px !important', backgroundColor: 'white' }}
		>
			<Menu items={item} mode="horizontal" defaultSelectedKeys={['1']}></Menu>
		</Row>
	);
}
