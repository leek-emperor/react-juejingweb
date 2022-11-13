/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-10-26 23:02:28
 * @LastEditTime: 2022-11-12 16:38:53
 * @LastEditors: liutq
 * @Reference:
 */

/*
APP > Nav+(Article+Deal+User)
Login
Editor
Myself
*/
import React from 'react';
import { unstable_HistoryRouter as HistoryRouer, Route, Routes } from 'react-router-dom';
import { history } from '../utils/history';
import Login from '../pages/Login';
import Detail from '../pages/Detail';
import Article from '../pages/Article';
import Edit from '../pages/Edit';
import Setting from '../pages/Settings';
import PersonalSetting from '../pages/PersonalSetting';
import AccountSetting from '../pages/AccountSetting';
import App from '../App';
import { observer } from 'mobx-react-lite';
import Home from '../pages/Home';
function index() {
	return (
		<HistoryRouer history={history}>
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
		</HistoryRouer>
	);
}
export default observer(index);
