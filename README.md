## webpack4 学习

### React

### react-router-dom

#### 页面跳转

1. 方式 1

```js
this.prop.shistory.push("/page");
```

2. 方式 2

```js
import { useHistory } from "react-router-dom";
const history = useHistory();
shistory.push("/page");
```

#### 传参方式：

1. state 传参 (html 和 js 同时写，刷新参数不消失[很麻烦]，只写 js 刷新参数消失！！！)，隐性传参，可读性低！

```js
// html:
<Link to={{ pathname: "/page", state: { id: 2 } }}>子页面</Link>;
// js:
this.props.history.push({ pathname: "/page", state: { id: 2 } });

// 获取
this.props.location.state.id // 1
```

2. query 传参 (html 和 js 同时写，刷新参数不消失[很麻烦]，只写 js 刷新参数消失！！！)，隐性传参，可读性低！

```js
// html:
<Link to={{ pathname: "/page", query: { id: 2 } }}>子页面</Link>;
// js:
this.props.history.push({ pathname: "/page", query: { id: 2 } });

// 获取
this.props.location.query.id // 1
```

3. params 传参 (path 做处理 和 js 添加参数，刷新参数不消失[很麻烦]，只写 其中一个 404！！！)，动态路由，配置动态页面可用。

```js
// path
{path: '/page/:id'}
// path
<Route exact path="/page/:id" component={Demo6} />
// html:
<Link to={'/page/1'}>demo2</Link>;
// js:
this.props.history.push('/page/1');

// 获取
this.props.match.params.id // 1
```

4. search 传参 (path 不需要做处理 和 js 添加参数，刷新参数不消失[很麻烦]，刻意只写 js！！！)，动态路由，可读性最强，But参数需要做处理。

```js
// path
{path: '/page'}
// path
<Route exact path="/page" component={Page} />
// html:
<Link to={'/page/?id=6&type=7&code=1234567891'}>demo2</Link>;
// js:
this.props.history.push('/page/?id=6&type=7&code=1234567891');

// 获取
this.props.location.search // '?id=6&type=7&code=1234567891', 获取的是字符串，需处理
```
