# 前端部分

### how to use

```
npm i 
// 安装依赖

npm run start
// 开发环境运行

npm run build
// 编译

npm run deploy
// 推送到服务器

```

### 主要用到的开源技术框架

React，next，material-ui,redux，graphql，store

### 项目简述

本项目定义为简单快速的 ssr + spa 项目，用户打开页面速度快，页面间跳转无需加载，提高用户体验。以及使用一系列优秀的开源技术提高开发效率。

服务端渲染框架用的nextjs
ui框架用的material-ui
数据层使用redux以及基于appolo实现的graphql状态管理器
持久层使用store，忽略平台差异，将数据保存在本地

### 文件结构

```
/ 根目录
/pages 页面文件
/views 视图组件
/components ui组件
/hoc 高阶组件
/utils 工具方法
/static 静态资源，带有/static路径
/public 静态资源，挂载在根路由
/graphql ql相关
/constants 全局常量
```

### 核心业务组件

#### views/availableTime 

设置可用时间
用于限制时间选择表的参数
输入用户操作
输出时间表参数，类似于：

```
{ 
  days: 7, // 可选天数
  startOfDay: 8, // 每日开始时间
  endOfDay: 17, // 每日结束时间
  timeRange: 60, // 时间颗粒大小
  multi: true  // 是否可以多选
}
```

#### views/book 

选择时间详细信息
输入时间表参数
输出时间选择结果

### 用户登录

创建全局组件requireAuth，对所有页面进行检测（排除login/oauth页面），判断用户是否登录，如果尚未登录，则要求用户先登录。
登录逻辑由后端操控，url转跳至http://api.mengmengliu.me/oauth/outlook即可

```
  if (router.pathname === '/login/oauth') {
      return (
        <Fragment>
          {children}
        </Fragment>
      );
    }

  if (!user || !user.token) {
    return (
      <Fragment>
        <div style={{ padding: 50 }}>
          请先
          <a href="http://api.mengmengliu.me/oauth/outlook">
            登录
          </a>
        </div>
      </Fragment>
    );
  }
```

创建login/oauth页面，用于接受登录成功返回的token，并触发redux中的登录逻辑

```
  componentDidMount() {
    const { dispatch, router } = this.props;
    const { token } = router.query || {};
    
    if (token) {
      dispatch({
        type: 'user/loginByOauth',
        payload: { token },
      });
    }
  }
```

### 可以实现的功能：

随机生成不重复的key，将key作为一个可查询条件

显示日程具体信息

创建成功预订成功发送邮件通知

显示用户邮箱和昵称





