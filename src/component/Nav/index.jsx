/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-10-27 14:16:45
 * @LastEditTime: 2022-11-11 14:39:04
 * @LastEditors: liutq
 * @Reference:
 */
import { React, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
	DownOutlined,
	BellFilled,
	UserOutlined,
	GiftOutlined,
	SnippetsOutlined,
	RocketOutlined,
	BookOutlined,
	InboxOutlined,
	FlagOutlined,
	BranchesOutlined,
} from '@ant-design/icons';
import { Col, Row, Input, Menu, Dropdown, Avatar, Card, Button, message } from 'antd';
import bImg from '../../assets/web-logo.svg';
import sImg from '../../assets/small-logo.svg';
import defaultAvatar from '../../assets/defaultAvatar.png';
import { getToken } from '../../utils';
import { Store } from '../../store';
import './index.scss';
import { observer } from 'mobx-react-lite';
import { history } from '../../utils/history';
import { useState } from 'react';
const { Search } = Input;
// 点击搜索按钮
const onSearch = value => console.log(value);

// 创作中心下拉菜单
const menu = (
	<Menu
		items={[
			{
				label: '写文章',
				key: '1',
				onClick: function () {
					if (getToken()) {
						history.push('/edit');
					} else {
						history.push('/login');
					}
				},
			},
			{
				label: '写沸点',
				key: '2',
			},
			{
				label: '写笔记',
				key: '3',
			},
			{
				label: '写代码',
				key: '4',
			},
			{
				label: '草稿箱',
				key: '5',
			},
		]}
	/>
);

// 消息下拉菜单
const remind = (
	<Menu
		className="remind-menu"
		items={[
			{
				key: '1',
				label: '评论',
			},
			{
				key: '2',
				label: '点赞',
			},
			{
				key: '3',
				label: '关注',
			},
			{
				key: '4',
				label: '私信',
			},
			{
				key: '5',
				label: '系统消息',
			},
		]}
	/>
);

function Nav() {
	const { userStore } = Store();
	const navigate = useNavigate();
	/* 以下代码是关于搜索框的focus和blur的 */
	const searchDiv = useRef();
	const dropBtn = useRef();
	const searchFocus = e => {
		const s = searchDiv.current.input.parentElement.parentElement;
		s.style.width = '100%';
		dropBtn.current.style.width = '0';
		// dropBtn.current.style.display = 'none';
	};
	const searchBlur = e => {
		const s = searchDiv.current.input.parentElement.parentElement;
		s.style.width = '70%';
		dropBtn.current.style.width = '30%';
		// dropBtn.current.style.display = 'block';
	};
	const toLogin = () => {
		navigate('/login');
	};
	// 退出登录的点击事件
	const logOut = () => {
		userStore.loginOut();
		message.success('退出登录');
	};
	// 控制头像下拉菜单是否显示
	const [open, setOpen] = useState(false);
	// 头像卡片
	const avatarCard = (
		<Card style={{ width: 265 }} className="avatar-card">
			<div className="user-card">
				<div>
					<Avatar
						src={userStore.avatar ? userStore.avatar : defaultAvatar}
						style={{ cursor: 'pointer' }}
						onClick={() => {
							setOpen(!open);
							navigate('/home');
						}}
						size={48}
						alt=""
					/>
					<div>
						{/* <div>{window.localStorage.getItem('username')}</div> */}
						<div
							style={{ cursor: 'pointer' }}
							onClick={() => {
								setOpen(!open);
								navigate('/home');
							}}
						>
							{userStore.username}
						</div>
						<div>矿石：3.0W</div>
					</div>
				</div>
			</div>
			<ul className="drop-list">
				<li>
					<UserOutlined />
					我的主页
				</li>
				<li>
					<GiftOutlined />
					成长福利
				</li>
				<li>
					<SnippetsOutlined />
					闪念笔记
				</li>
				<li>
					<RocketOutlined />
					会员中心
				</li>
				<li>
					<BookOutlined />
					课程中心
				</li>
				<li>
					<InboxOutlined />
					我的优惠
				</li>
				<li>
					<FlagOutlined />
					我的报名
				</li>
				<li>
					<BranchesOutlined />
					我的足迹
				</li>
			</ul>
			<div className="group">
				<NavLink>我的设置</NavLink>
				<a href="#/" onClick={logOut}>
					退出登录
				</a>
			</div>
		</Card>
	);
	// 首页等
	const items = [
		{
			label: '首页',
			key: 'article',
			onClick: () => {
				navigate('/');
			},
		},
		{
			label: '沸点',
			key: 'boiling',
		},
		{
			label: '课程',
			key: 'course',
		},
		{
			label: '直播',
			key: 'living',
		},
		{
			label: '活动',
			key: 'activity',
		},
	];
	return (
		<div style={{ borderBottom: '1px solid rgba(0,0,0,.06)', height: '64px !important' }}>
			<Row>
				{/*  logo */}
				<Col lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 5 }} xs={{ span: 3 }}>
					<NavLink to="/">
						<img
							className="big-logo"
							style={{ width: 107, height: 22 }}
							src={bImg}
							alt="稀土掘金"
						/>
						<img className="small-logo" src={sImg} alt="" />
					</NavLink>
				</Col>
				{/* 选项 */}
				<Col lg={{ span: 6 }} md={{ span: 7 }} sm={{ span: 0 }} xs={{ span: 0 }}>
					<Menu mode="horizontal" items={items} selectedKeys={['']} />
				</Col>
				{/* 搜索 */}
				<Col
					lg={{ span: 10 }}
					md={{ span: 8 }}
					sm={{ span: 12 }}
					xs={{ span: 15 }}
					style={{ display: 'flex', alignItems: 'center' }}
				>
					<Search
						ref={searchDiv}
						onFocus={searchFocus}
						onBlur={searchBlur}
						className="search-input"
						placeholder="input search text"
						onSearch={onSearch}
					/>
					<div ref={dropBtn} className="drb" style={{ width: '30%' }}>
						<Dropdown.Button type="primary" overlay={menu} icon={<DownOutlined />}>
							创作者中心
						</Dropdown.Button>
					</div>
				</Col>
				{/* 提醒和头像 */}
				<Col
					lg={{ span: 4 }}
					md={{ span: 5 }}
					sm={{ span: 7 }}
					xs={{ span: 6 }}
					style={{
						display: 'flex',
						alignItems: 'center',
						// justifyContent: 'center',
					}}
				>
					<Dropdown
						style={{ width: '50%' }}
						className="remind"
						placement="bottomLeft"
						overlay={remind}
						trigger={['click']}
					>
						<div style={{ width: 60, lineHeight: '100%' }}>
							<BellFilled
								style={{ fontSize: '25px', margin: 'auto 10px' }}
								className="remind"
							/>
						</div>
					</Dropdown>
					{getToken() ? (
						<Dropdown
							style={{ width: '50%' }}
							className="avatar"
							placement="bottomRight"
							overlay={avatarCard}
							trigger={['click']}
							open={open}
							onClick={() => {
								setOpen(!open);
							}}
							onOpenChange={() => {
								setOpen(!open);
							}}
						>
							<div style={{ width: 60 }}>
								<Avatar
									size={32}
									src={userStore.avatar ? userStore.avatar : defaultAvatar}
								></Avatar>
							</div>
						</Dropdown>
					) : (
						<Button
							type="primary"
							shape="round"
							onClick={toLogin}
							style={{ backgroundColor: '#1890FF' }}
						>
							登录/注册
						</Button>
					)}
				</Col>
			</Row>
		</div>
	);
}
export default observer(Nav);
