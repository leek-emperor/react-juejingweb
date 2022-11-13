/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-10-26 23:02:28
 * @LastEditTime: 2022-11-13 10:44:37
 * @LastEditors: liutq
 * @Reference:
 */

/*
APP > Nav+(Article+Deal+User)
Login
Editor
Myself
*/
import React, { lazy, Suspense } from 'react';
import { unstable_HistoryRouter as HistoryRouer, Route, Routes } from 'react-router-dom';
import { history } from '../utils/history';
import { observer } from 'mobx-react-lite';

const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Detail = lazy(() => import('../pages/Detail'));
const Article = lazy(() => import('../pages/Article'));
const Edit = lazy(() => import('../pages/Edit'));
const Setting = lazy(() => import('../pages/Settings'));
const PersonalSetting = lazy(() => import('../pages/PersonalSetting'));
const AccountSetting = lazy(() => import('../pages/AccountSetting'));
const App = lazy(() => import('../App'));

function index() {
	return (
		<HistoryRouer history={history}>
			<Suspense
				fallback={
					<div
						style={{
							textAlign: 'center',
							marginTop: 200,
						}}
					>
						loading...
					</div>
				}
			>
				<Routes>
					<Route path="/" element={<App />}>
						<Route index element={<Article />}></Route>
						<Route path="detail" element={<Detail />}></Route>
						<Route path="home" element={<Home />}></Route>
						<Route path="setting" element={<Setting />}>
							<Route index element={<PersonalSetting />}></Route>
							<Route path="account" element={<AccountSetting />}></Route>
						</Route>
					</Route>
					<Route path="/login" element={<Login />}></Route>
					<Route path="/edit" element={<Edit />}></Route>
				</Routes>
			</Suspense>
		</HistoryRouer>
	);
}
export default observer(index);
