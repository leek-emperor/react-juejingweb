/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-10-26 23:08:24
 * @LastEditTime: 2022-11-11 20:10:17
 * @LastEditors: liutq
 * @Reference:
 */
import React, { useState, useEffect, useRef } from 'react';
import { Upload, Dropdown, Button, Avatar, Card, Radio, Form, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useSearchParams, useNavigate } from 'react-router-dom';
import MdEditor from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import './index.scss';
import { Store } from '../../store';
import defaultAvatar from '../../assets/defaultAvatar.png';
import { getToken, http } from '../../utils';

MdEditor.config({
	// 输入渲染延迟，默认500ms。当仅预览模式时，未设置此项默认0ms
	renderDelay: 500,
});
const { TextArea } = Input;

export default function Edit() {
	const { articleStore } = Store();
	const navigate = useNavigate();
	//编辑功能
	// 文案匹配，根据id
	const [params] = useSearchParams();
	const articleId = params.get('articleid');
	// 图片列表
	const [fileList, setFileList] = useState([]);
	// 图片的暂存仓库
	const cacheImgList = useRef();
	// 频道内容
	const [tagValue, setTagValue] = useState('');
	// 简介内容
	const [introValue, setIntroValue] = useState('');

	// 文章标题
	const [title, setTitle] = useState('');
	const changeTitle = e => {
		setTitle(e.target.value);
	};
	useEffect(() => {
		articleStore.getArticle(articleId).then(res => {
			const { status, data } = res;
			if (status === 0) {
				setTitle(data['title']);
				setText(data['text']);
				setFileList([{ url: data['img'] }]);
				setTagValue(data['tag']);
				setIntroValue(data['intro']);
			}
		});
	}, [articleId, articleStore]);

	// markdown文本
	const [text, setText] = useState('');
	const onUploadChange = res => {
		const formatList = res.fileList.map(file => {
			// 上传完毕 做数据处理
			if (file.response && file.response.status === 0) {
				return {
					url: file.response.fileUrl,
				};
			}
			// 否则在上传中时，不做处理
			return file;
		});
		setFileList(formatList);
		// 同时把图片存入仓库一份
		cacheImgList.current = formatList;
	};
	// 点击提交
	const onFinish = async values => {
		if (title === '') {
			message.error('请输入文章标题');
			return;
		}
		const params = {
			tag: tagValue,
			intro: introValue,
			text,
			title,
			cover: fileList.length ? fileList[0].url : null,
		};
		if (articleId) {
			params['articleID'] = articleId;
			const res = await http.put('/upload/article', params);
			if (res.status) {
				message.error(res.msg);
			} else {
				window.sessionStorage.removeItem('title');
				window.sessionStorage.removeItem('content');
				message.success(res.msg);
				navigate('/');
			}
		} else {
			const res = await http.post('/upload/article', params);
			if (res.status) {
				message.error(res.msg);
			} else {
				window.sessionStorage.removeItem('title');
				window.sessionStorage.removeItem('content');
				message.success(res.msg);
				navigate('/');
			}
		}
	};
	// 点击发布的卡片
	const puCard = (
		<Card title="发布文章">
			<Form initialValues={{ tag: tagValue, intro: introValue }} onFinish={onFinish}>
				<Form.Item
					label="分类"
					name="tag"
					rules={[
						{
							required: true,
							message: '请选择文章类别',
						},
					]}
				>
					<Radio.Group
						optionType="button"
						buttonStyle="solid"
						onChange={e => {
							setTagValue(e.target.value);
						}}
					>
						<Radio.Button value="后端">后端</Radio.Button>
						<Radio.Button value="前端">前端</Radio.Button>
						<Radio.Button value="Android">Android</Radio.Button>
						<Radio.Button value="iOS">iOS</Radio.Button>
						<Radio.Button value="人工智能">人工智能</Radio.Button>
						<Radio.Button value="开发工具">开发工具</Radio.Button>
						<Radio.Button value="代码人生">代码人生</Radio.Button>
						<Radio.Button value="阅读">阅读</Radio.Button>
					</Radio.Group>
				</Form.Item>
				<Form.Item label="文章封面">
					<Upload
						name="img"
						listType="picture-card"
						className="avatar-uploader"
						action="http://127.0.0.1:3007/upload/img"
						fileList={fileList}
						headers={{
							Authorization: getToken() || null,
						}}
						onChange={onUploadChange}
						maxCount={1}
					>
						<div style={{ marginTop: 8 }}>
							<PlusOutlined />
						</div>
					</Upload>
				</Form.Item>
				<Form.Item
					label="编辑摘要"
					name="intro"
					rules={[
						{
							required: true,
							message: '分类必选',
						},
					]}
				>
					<TextArea
						showCount
						maxLength={100}
						style={{
							height: 120,
							resize: 'none',
						}}
						placeholder="请输入简介"
						onChange={e => {
							setIntroValue(e.target.value);
						}}
					/>
				</Form.Item>
				<Form.Item
					wrapperCol={{
						span: 12,
						offset: 6,
					}}
				>
					<Button type="primary" htmlType="submit">
						确认发布
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
	// 保持刷新text不掉
	useEffect(() => {
		const s = window.sessionStorage.getItem('content');
		const ts = window.sessionStorage.getItem('title');
		if (s !== null) {
			setText(s);
		}
		if (ts !== null) {
			setTitle(ts);
		}
	}, []);
	useEffect(() => {
		window.addEventListener('beforeunload', () => {
			window.sessionStorage.setItem('content', text);
			window.sessionStorage.setItem('title', title);
		});
	}, [text, title]);
	return (
		<div className="wrap">
			<header className="editheader">
				<input
					type="text"
					value={title}
					onInput={changeTitle}
					placeholder="请输入文章标题"
				/>
				<div>
					<Dropdown overlay={puCard} trigger="click">
						<Button type="primary" size="large">
							发布
						</Button>
					</Dropdown>
					<Avatar
						size={32}
						style={{
							margin: '0 40px',
						}}
						src={defaultAvatar}
					></Avatar>
				</div>
			</header>
			<MdEditor
				modelValue={text} // 文本
				onChange={setText}
				previewTheme={'github'} // 主题
				tabWidth={4} // tab键对于空格数
			/>
		</div>
	);
}
