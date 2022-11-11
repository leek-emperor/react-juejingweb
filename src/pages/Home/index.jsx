/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-10-25 18:53:50
 * @LastEditTime: 2022-11-11 14:32:51
 * @LastEditors: liutq
 * @Reference:
 */
import React, { useEffect } from 'react';
import { Card, Avatar, Button } from 'antd';
import { RightOutlined, EyeTwoTone, FundTwoTone } from '@ant-design/icons';
import ArticleCard from '../../component/ArticleCard';
import icon from '../../assets/badge-count-icon.0586ac4.png';
import './index.scss';
import defaultAvatar from '../../assets/defaultAvatar.png';
import { Store } from '../../store';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
function Home() {
	const { articleStore, userStore } = Store();
	const navigate = useNavigate();
	const username = window.localStorage.getItem('username');
	const toSetting = () => {
		navigate('/setting');
	};
	useEffect(() => {
		articleStore.getMyArticle(username);
		window.sessionStorage.clear();
	}, [articleStore, username]);

	return (
		<div className="home">
			<div className="major-area" style={{ marginBottom: '72px' }}>
				<div className="user-info-block">
					<Avatar
						style={{ marginRight: 28 }}
						size={90}
						src={userStore.avatar ? userStore.avatar : defaultAvatar}
					></Avatar>
					<div className="info-box">
						<h1>{userStore.username}</h1>
						<div className="introduction">
							<div className="left" onClick={toSetting}>
								<div className="info-input">+ 你从事上面职业？</div>
								<div className="intro">+ 你的技术栈</div>
							</div>
							<div className="right">
								<Button onClick={toSetting}>编辑个人资料</Button>
							</div>
						</div>
					</div>
				</div>
				<a className="badge-wall" href="#/">
					<div className="badge-wrap">
						<div className="badge-left">
							<img src={icon} alt="" style={{ width: '20px', height: '20px' }} />
							<span
								style={{
									marginLeft: 5,
									height: '20px',
									lineHeight: '20px',
									fontSize: '16px',
								}}
							>
								获得徽章 0
							</span>
						</div>
						<div className="badge-right">
							<RightOutlined style={{ color: '#b6b6b6' }} />
						</div>
					</div>
				</a>
				<div className="list-block">
					<div className="myArticle">我的文章</div>
					{articleStore.showMyList.map((d, index) => (
						<ArticleCard data={{ ...d }} key={index} />
					))}
				</div>
			</div>
			<div className="minor-area">
				{' '}
				<Card title="个人成就">
					<p>
						<EyeTwoTone /> 文章被阅读 0
					</p>
					<p>
						<FundTwoTone /> 掘力值 134
					</p>
				</Card>
			</div>
		</div>
	);
}
export default observer(Home);
