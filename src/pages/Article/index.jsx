/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-10-26 22:23:02
 * @LastEditTime: 2022-11-08 09:51:53
 * @LastEditors: liutq
 * @Reference:
 */
import React from 'react';
// import { Store } from '../../store';
import ViewNav from '../../component/ViewNav';
import HomeSide from '../../component/HomeSide';
import ArticleList from '../../component/ArticleList';
import './index.scss';
import { observer } from 'mobx-react-lite';
function Article() {
	return (
		<div className="article container" style={{ width: '960px' }}>
			<ViewNav />
			<div className="timeline-content">
				<ArticleList />
				<HomeSide />
			</div>
		</div>
	);
}
export default observer(Article);
