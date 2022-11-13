/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-10-29 14:48:00
 * @LastEditTime: 2022-11-11 18:23:16
 * @LastEditors: liutq
 * @Reference:
 */
import React from 'react';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import { calculateTime } from '../../utils/calculateTime'; // 导入计算日期的函数
import { Dropdown, Menu, message } from 'antd';
import { EyeOutlined, LikeOutlined, CommentOutlined, MoreOutlined } from '@ant-design/icons';
import { Store } from '../../store';
import { http } from '../../utils';
import { observer } from 'mobx-react-lite';
function ArticleCard(props) {
	const { articleID, author, title, intro, img, tag, create_date, like, comment_num, pageviews } =
		props.data;
	const date = new Date(create_date);
	const navigate = useNavigate();
	const onClick = () => {
		navigate(`/detail?articleid=${articleID}`);
	};
	const { userStore } = Store();
	const username = userStore.username;
	const more = [
		{
			label: '编辑',
			key: '1',
			onClick: () => {
				navigate(`/edit?articleid=${articleID}`);
			},
		},
		{
			label: '删除',
			key: '2',
			onClick: async () => {
				const res = await http.delete('/delete/article', { params: { articleID } });
				if (res.status === 0) {
					message.success('删除成功');
					setTimeout(() => {
						window.location.reload();
					}, 1000);
				} else {
					message.error(res.msg);
				}
			},
		},
	];
	const menu = <Menu items={more} />;
	return (
		<div className="article-card" onClick={onClick}>
			<div className="meta-container">
				<ul>
					<li>
						<a href="#/">{author}</a>
					</li>
					<li>{calculateTime(date)}</li>
					<li>{tag}</li>
				</ul>
			</div>
			<div className="content-wrapper">
				<div className="content-main" style={{ width: img ? '70%' : '100%' }}>
					<div className="title">{title}</div>
					<div className="intro">{intro}</div>
					<ul className="action-list">
						<li className="view">
							<EyeOutlined twoToneColor="#4e5969" />
							<span> {pageviews}</span>
						</li>
						<li className="like">
							<LikeOutlined twoToneColor="#4e5969" />
							<span> {like}</span>
						</li>
						<li className="comment">
							<CommentOutlined twoToneColor="#4e5969" />
							<span> {comment_num}</span>
						</li>

						{username === author ? (
							<li className="more" onClick={event => event.stopPropagation()}>
								<Dropdown overlay={menu} trigger={['click']} placement="bottom">
									<MoreOutlined rotate={90} />
								</Dropdown>
							</li>
						) : (
							<></>
						)}
					</ul>
				</div>
				{img ? <img src={img} alt="" /> : null}
			</div>
		</div>
	);
}
export default observer(ArticleCard);
