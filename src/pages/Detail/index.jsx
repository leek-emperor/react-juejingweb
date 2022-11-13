/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-10-26 22:25:50
 * @LastEditTime: 2022-11-13 10:21:45
 * @LastEditors: liutq
 * @Reference:
 */
import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Affix, Avatar, Button } from 'antd';
import { EyeTwoTone, LikeTwoTone } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw'; // 使markdown支持HTML
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import MarkNav from 'markdown-navbar';
import { http } from '../../utils';
import QR from '../../assets/juejingQR.png';
import './index.scss';
import '../../assets/typora-vue-theme/vue.scss'; // markdown主题样式
import 'markdown-navbar/dist/navbar.css'; // 导航栏样式
import defaultAvatar from '../../assets/defaultAvatar.png';

const formatDate = str => {
	const objDate = new Date(str);
	var o = {
		Y: objDate.getFullYear(),
		M: objDate.getMonth() + 1, //月份
		'd+': objDate.getDate(), //日
		'H+': objDate.getHours() < 10 ? '0' + objDate.getHours() : objDate.getHours(), //小时
		'm+': objDate.getMinutes() < 10 ? '0' + objDate.getMinutes() : objDate.getMinutes(), //分
	};
	return `${o['Y']}年${o['M']}月${o['d+']}日  ${o['H+']}:${o['m+']}`;
};

export default function Detail() {
	const CodeBlock = {
		code({ node, inline, className, children, ...props }) {
			const match = /language-(\w+)/.exec(className || '');
			return !inline && match ? (
				<SyntaxHighlighter
					children={String(children).replace(/\n$/, '')}
					style={atomDark} // theme
					language={match[1].toLowerCase()}
					PreTag="section" // parent tag
					{...props}
				/>
			) : (
				<code className={className} {...props}>
					{children}
				</code>
			);
		},
	};

	// 文案匹配，根据id
	const [params] = useSearchParams();
	const articleId = params.get('articleid');
	const nav = useRef('');
	const [text, setText] = useState('');
	const [title, setTitile] = useState('');
	const [author, setAuthor] = useState('');
	const [date, setDate] = useState('');
	const [avatar, setAvatar] = useState('');

	const getText = async articleId => {
		const res = await http.get('/article/detail', { params: { articleId } });
		setText(res.data.text);
		setTitile(res.data.title);
		setAuthor(res.data.author);
		setDate(res.data.create_date);
		setAvatar(res.data.avatar);
	};
	useEffect(() => {
		getText(articleId);
		window.addEventListener('scroll', () => {
			const pageHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight);
			if (pageHeight > 1000) {
				return;
			}
			nav.current.style.height = `${pageHeight - 105}px`;
		});
	}, [articleId]);
	return (
		<div className="start-bfc">
			<div className="detail-container">
				<div className="markdown-body">
					<h1 className="article-title">{title}</h1>
					<div className="author-info-block">
						<Avatar
							size={36}
							src={avatar ? avatar : defaultAvatar}
							style={{ marginRight: 20 }}
						></Avatar>
						<div className="info">
							<div className="auth">{author}</div>
							<div className="time">{formatDate(date)}</div>
						</div>
					</div>
					<ReactMarkdown
						children={text}
						rehypePlugins={[rehypeRaw]}
						remarkPlugins={[gfm]}
						components={CodeBlock}
					/>
				</div>
				<aside className="detail-aside" ref={nav}>
					<div className="card">
						<div className="show-auth">
							<Avatar
								size={48}
								src={avatar ? avatar : defaultAvatar}
								style={{ marginRight: 20 }}
							></Avatar>
							<div>
								<div className="auth">{author}</div>
							</div>
						</div>
						<div className="operate-btn">
							<Button type="primary">关注</Button>
							<Button className="chart">私信</Button>
						</div>
						<div className="cut-off"></div>
						<div
							className="all-like"
							style={{ height: '20px', lineHeight: '20px', margin: '8px 0' }}
						>
							<LikeTwoTone
								style={{
									fontSize: '16px',
									marginRight: '10px',
								}}
							/>
							<span>获得点赞 123</span>
						</div>
						<div className="view" style={{ height: '20px', lineHeight: '20px' }}>
							<EyeTwoTone
								style={{
									fontSize: '16px',
									marginRight: '10px',
								}}
							/>
							<span>文章被阅读 12,415</span>
						</div>
					</div>
					<div className="app-link side-right">
						<img className="app-qr" src={QR} alt="" />
						<div className="app-content-box">
							<div className="head">下载掘金社区APP</div>
							<div className="desc">一个帮助开发者成长的社区</div>
						</div>
					</div>
					<Affix offsetTop={105} style={{ marginTop: 30 }}>
						<div className="cata-wrap">
							<MarkNav source={text} />
						</div>
					</Affix>
				</aside>
			</div>
		</div>
	);
}
