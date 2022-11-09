My 仿掘金官网项目

# 项目介绍

## 项目实现功能

仿掘金官网项目，完成了掘金首页文章列表的无限滚动以及文章详情页支持TOC滚动高亮，并实现了Markdown文案编辑的写文章功能。

### 基础功能

- 首页（即列表页）包含了导航栏，以及列表

- 登录/注册

- 响应式布局

- 文章详情（代码高亮，根据文章标题生成目录、点击目录定位）

### 进阶功能

- 首页列表无限滚动（非UI库实现）

- Markdown富文本编辑，文章同步预览（marked.js）

- 文章删除、修改

## 项目地址

暂无

## 技术选型

### 前端：

React Hooks+Antd

响应式布局：Antd和media

状态管理：mobx

前后端通信：axios

markdown富文本编辑器：

markdown的渲染：react-markdown，相关插件：remark-gfm（对下划线、表格等的支持）

**页面架构：**

![image-20221109213820696](C:\Users\fengli\AppData\Roaming\Typora\typora-user-images\image-20221109213820696.png)

### 后端：

框架使用node+express，数据库使用的MySQL。

数据库连接:mysql2

表单验证:@escook/express-joi  joi

加密:bcryptjs 

JWT:jsonwebtoken

id生成:nanoid@3.x

## 数据库

user_info：存储用户信息表

| userID   |      |
| -------- | ---- |
| username |      |
| password |      |
| avatar   | 头像 |

article_list：存储文章信息表

| articleID   | 文章ID   |
| ----------- | -------- |
| authorID    | 作者ID   |
| author      | 作者     |
| title       | 文章标题 |
| intro       | 文章简介 |
| img         | 图片路径 |
| create_date | 创建日期 |
| tag         | 标签     |
| is_deleted  | 是否删除 |

# 部分关键技术

## 无线滚动与节流优化

**scrollHeight：**整个页面的真实内容的高度。

**clientHeight：**视窗的高度，是固定的。

**scrollTop：**视窗到顶部的距离。

1 如果真实的内容比视窗高度小，则一直加载到超过视窗

2 如果超过了视窗，则判断下面隐藏的部分的距离是否小于一定的值，如果是，则触发加载。（即滚动到了底部）

```JavaScript
// 触发条件函数
const lowEnough = () => {
    var pageHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight);
    var viewportHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight ||
        0;
    var scrollHeight =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
    // 通过 真实内容高度 - 视窗高度 - 上面隐藏的高度 < 400，作为加载的触发条件
    return pageHeight - viewportHeight - scrollHeight < 400; 
};

// 节流函数
function throttle(fn, ms) {
    let flag = true;
    return function () {
        if (!flag) return;
        flag = false;
        setTimeout(() => {
            fn.apply(this, arguments);
            flag = true;
        }, ms);
    };
}


useEffect(() => {
        // 页面初始的时候加载文章列表
        articleStore.getArticleList();
        window.addEventListener(
            'scroll',
            throttle(() => {
                if (lowEnough()) {
                    // 满足条件后增加文章列表
                    articleStore.getArticleList();
                }
            }, 500)
        );
    }, [articleStore]);
```
