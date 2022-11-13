/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-11-12 16:32:16
 * @LastEditTime: 2022-11-13 10:24:51
 * @LastEditors: liutq
 * @Reference:
 */
import React, { useState } from 'react';
import { Avatar, Form, Input, Button, Upload, message } from 'antd';
import { observer } from 'mobx-react-lite';
import './index.scss';
// import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import defaultAvatar from '../../assets/defaultAvatar.png';
import { Store } from '../../store';
import { getToken, http } from '../../utils';
function PersonalSetting() {
	const { TextArea } = Input;
	const { userStore } = Store();
	const [avatar, setAvatar] = useState(userStore.getAvatar ? userStore.getAvatar : defaultAvatar);
	// 头像上传
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
		setAvatar(formatList[0]['url']);
	};
	const onFinish = async values => {
		if (values['username'].replace(/\s*/g, '').length !== values['username'].length) {
			message.warning('用户名不得含有空格');
			return;
		}
		values['avatar'] = avatar === defaultAvatar ? null : avatar;
		window.localStorage.setItem('username', values['username']);
		const res = await http.put('/upload/info', values);
		if (res.status) {
			message.error(res.msg);
		} else {
			message.success('更新成功');
			setTimeout(() => {
				window.location.reload();
			}, 500);
		}
	};
	return (
		<div className="personal">
			<h1>个人资料</h1>
			<div className="user-infos">
				<div className="info-input">
					<Form initialValues={userStore.infoParams} onFinish={onFinish}>
						<Form.Item label="用户名" name="username">
							<Input maxLength={12} showCount />
						</Form.Item>
						<Form.Item label="职位" name="position">
							<Input maxLength={50} showCount placeholder="填写你的职位" />
						</Form.Item>
						<Form.Item label="公司" name="company">
							<Input maxLength={50} showCount placeholder="填写你的公司" />
						</Form.Item>
						<Form.Item label="个人主页" name="homepage">
							<Input maxLength={100} showCount placeholder="填写你的个人主页" />
						</Form.Item>
						<Form.Item label="个人介绍" name="introduction">
							<TextArea
								showCount
								style={{
									resize: 'none',
									height: '140px',
								}}
								maxLength={100}
								placeholder="填写职业技能、擅长的事情、喜欢的事情等"
							/>
						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit">
								保存修改
							</Button>
						</Form.Item>
					</Form>
				</div>
				<div className="avatar-input">
					<Upload
						name="img"
						listType="picture-card"
						className="avatar-uploader"
						showUploadList={false}
						action="http://127.0.0.1:3007/upload/img"
						headers={{
							Authorization: getToken() || null,
						}}
						onChange={onUploadChange}
						maxCount={1}
					>
						<Avatar src={avatar} size={90} />
					</Upload>
				</div>
			</div>
		</div>
	);
}
export default observer(PersonalSetting);
