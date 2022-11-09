/*
 * @Description:
 * @Author: liutq
 * @Date: 2022-10-25 18:27:55
 * @LastEditTime: 2022-10-26 23:13:14
 * @LastEditors: liutq
 * @Reference:
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/antd.min.css';
import './index.scss';
import Router from './router/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Router />);
