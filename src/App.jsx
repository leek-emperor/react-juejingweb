/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-10-25 18:27:55
 * @LastEditTime: 2022-11-09 14:31:39
 * @LastEditors: liutq
 * @Reference:
 */

import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import Nav from './component/Nav';
import { useEffect } from 'react';
import { Store } from './store';
import { observer } from 'mobx-react-lite';
const { Header, Content } = Layout;
function App() {
	const { userStore } = Store();
	// 确保username在Mobx的状态里
	useEffect(() => {
		userStore.setUsername();
		userStore.getAvatar();
	}, [userStore]);
	return (
		<div className="App">
			<Layout>
				<Header
					style={{
						position: 'fixed',
						justifyContent: 'center',
						flexDirection: 'column',
						zIndex: 1,
						width: '100%',
						backgroundColor: 'white',
					}}
				>
					<Nav />
					{/* <ViewNav /> */}
				</Header>
				<Content
					className="site-layout"
					style={{ display: 'flex', boxSizing: 'border-box', margin: '105px auto 0' }}
				>
					<Outlet />
				</Content>
			</Layout>
		</div>
	);
}

export default observer(App);
