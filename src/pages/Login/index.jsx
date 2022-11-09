/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-10-26 23:05:15
 * @LastEditTime: 2022-11-01 19:58:54
 * @LastEditors: liutq
 * @Reference:
 */
import { React, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { message } from 'antd';
import './index.scss';
import { Store } from '../../store';

function Login() {
	const navigate = useNavigate();
	const { userStore } = Store();

	const [isLogin, setLogin] = useState(true);
	const changeLR = () => {
		setLogin(!isLogin);
	};

	const loginEl = useRef(null);
	const registerEl = useRef(null);
	const loginBtn = useRef(null);
	// 页面第一次加载的时候也会渲染,这里isLogin的状态保持一致了
	useEffect(() => {
		loginBtn.current.innerText = isLogin ? '注册' : '登录';
		loginBtn.current.previousElementSibling.innerText = isLogin ? '没有账号？' : '已有账号？';
		loginEl.current.style.display = isLogin ? 'flex' : 'none';
		registerEl.current.style.display = isLogin ? 'none' : 'flex';
	}, [isLogin]);
	// 注册事件的表单
	const regUsername = useRef(null);
	const regFirstPwd = useRef(null);
	const regSecondPwd = useRef(null);
	// 登录事件的表单
	const logUsername = useRef(null);
	const logPwd = useRef(null);
	// 注册提交事件
	const regSubmit = async () => {
		const username = regUsername.current.value;
		const first_password = regFirstPwd.current.value;
		const second_password = regSecondPwd.current.value;

		if (first_password !== second_password) {
			message.error('请保证两次密码输入一致');
			return;
		}
		if (!/.{1,12}/.test(username)) {
			message.error('用户名为1到12位');
			return;
		}
		const pwdMatch =
			/[a-zA-Z0-9]{6,12}/.test(first_password) && /[a-zA-Z0-9]{6,12}/.test(second_password);
		if (!pwdMatch) {
			message.error('密码仅限数字和大小写字母，6到12位');
			return;
		}

		const res = await userStore.regSubmit({
			username,
			first_password,
			second_password,
		});
		if (res.status === 1) {
			message.error(res.msg);
		} else {
			message.success(res.msg);
			setLogin(!isLogin);
		}
	};
	// 登录提交事件
	const loginSubmit = async () => {
		const res = await userStore.logSubmit({
			username: logUsername.current.value,
			password: logPwd.current.value,
		});
		if (res.status === 1) {
			message.error(res.msg);
		} else {
			message.success(res.msg);
			navigate('/');
		}
	};
	return (
		<section className="ftco-section">
			<div className="container">
				<div className="row">
					<h2>一个帮助开发者成长的社区</h2>
				</div>
				<div className="content">
					<div className="text-wrap">
						<div className="text">
							<h2>欢迎来到掘金</h2>
							<p>没有账号？</p>
							<button ref={loginBtn} onClick={changeLR}>
								注册
							</button>
						</div>
					</div>
					<div className="login-wrap" ref={loginEl}>
						<h3>登录</h3>
						<div className="signin-form">
							<div className="form-group">
								<label htmlFor="usernameLog">用户名</label>
								<input
									ref={logUsername}
									id="usernameLog"
									type="text"
									placeholder="请输入用户名"
								/>
							</div>
							<div className="form-group">
								<form>
									<label htmlFor="passwordLog">密码</label>
									<input
										ref={logPwd}
										id="passwordLog"
										type="password"
										placeholder="请输入密码"
										autoComplete="true"
									/>
								</form>
							</div>
							<div onClick={loginSubmit} className="form-group">
								<button type="submit">登录</button>
							</div>
							<div className="form-group d-md-flex">
								<div className="login-left" style={{ display: 'flex' }}>
									<input type="checkbox" id="remember-password" />
									<label
										htmlFor="remember-password"
										style={{ margin: 0, fontWeight: 500 }}
									>
										记住密码
									</label>
								</div>
								<div className="login-right">
									<a href="#/" style={{ color: '#a8a8a8' }}>
										忘记密码
									</a>
								</div>
							</div>
						</div>
					</div>
					<div className="register-wrap" ref={registerEl}>
						<h3>注册</h3>
						<div className="register-form">
							<div className="form-group">
								<label htmlFor="username">用户名</label>
								<input
									id="username"
									ref={regUsername}
									type="text"
									placeholder="请输入用户名"
								/>
							</div>
							<div className="form-group">
								<form>
									<label htmlFor="first_password">密码</label>
									<input
										id="first_password"
										ref={regFirstPwd}
										type="password"
										placeholder="请输入密码"
										autoComplete="true"
									/>
								</form>
							</div>
							<div className="form-group">
								<form>
									<label htmlFor="second_password">确认密码</label>
									<input
										id="second_password"
										ref={regSecondPwd}
										type="password"
										placeholder="请再次输入密码"
										autoComplete="true"
									/>
								</form>
							</div>
							<div className="form-group">
								<button onClick={regSubmit}>注册</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
export default observer(Login);
