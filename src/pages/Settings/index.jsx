/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-11-08 09:46:17
 * @LastEditTime: 2022-11-13 10:12:49
 * @LastEditors: liutq
 * @Reference:
 */
import React from 'react';
import { Menu } from 'antd';
import { observer } from 'mobx-react-lite';

import { Outlet, Link } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import './index.scss';
function Setting() {
	const items = [
		{
			label: <Link to="/setting/">个人资料</Link>,
			key: 'personnal',
		},
		{
			label: <Link to="/setting/account">账号资料</Link>,
			disabled: true,
			key: 'account',
		},
	];
	return (
		<main className="setting">
			<nav className="with-view-nav">
				<Link to="/home" className="back-home">
					<LeftOutlined />
					返回个人主页
				</Link>
			</nav>
			<div className="view">
				<div className="sidevar">
					<Menu
						style={{ border: 'none' }}
						items={items}
						defaultSelectedKeys={['personnal']}
						mode={'vertical'}
					/>
				</div>
				<div className="sub-view-box">
					<Outlet />
				</div>
			</div>
		</main>
	);
}
export default observer(Setting);
