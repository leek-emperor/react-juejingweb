/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-10-28 15:21:20
 * @LastEditTime: 2022-11-03 15:40:52
 * @LastEditors: liutq
 * @Reference:
 */
import React from 'react';
import { GiftTwoTone } from '@ant-design/icons';
import './index.scss';
import ad1 from '../../assets/advertising1.jpg';
import ad2 from '../../assets/advertising2.webp';
import QR from '../../assets/juejingQR.png';

const test = () => {
	const myDate = new Date();
	const hour = myDate.getHours();
	if (hour >= 6 && hour < 9) {
		return '早上好！';
	} else if (hour >= 9 && hour < 12) {
		return '上午好！';
	} else if (hour >= 12 && hour < 14) {
		return '中午好！';
	} else if (hour >= 14 && hour < 18) {
		return '下午好！';
	} else if (hour >= 18 && hour < 24) {
		return '晚上好！';
	} else {
		return '午夜好！';
	}
};

export default function HomeSide() {
	return (
		<aside className="sidebar">
			<div className="signin-tip side-right">
				<div className="first-line">
					<div className="icon-text">
						<GiftTwoTone
							twoToneColor="rgb(255, 207, 139)"
							style={{ width: 24, height: 24, fontSize: 24, marginRight: 12 }}
						/>
						<span style={{ fontSize: 18 }}>{test()}</span>
					</div>
					<button>
						<span>去签到</span>
					</button>
				</div>
				<div className="second-line">点亮你在社区的每一天</div>
			</div>
			<div className="guanggao side-right">
				<a href="/#">
					<img className="banner-image" src={ad1} alt="" />
				</a>
			</div>
			<div className="guanggao side-right">
				<a href="/#">
					<img className="banner-image" src={ad2} alt="" />
				</a>
			</div>
			<div className="app-link side-right">
				<img className="app-qr" src={QR} alt="" />
				<div className="app-content-box">
					<div className="head">下载掘金社区APP</div>
					<div className="desc">一个帮助开发者成长的社区</div>
				</div>
			</div>
		</aside>
	);
}
