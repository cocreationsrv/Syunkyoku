# KotobaLink

当前阶段以高保真 Demo 为主，优先展示小程序学员端与 Web 后台的业务闭环。

## 当前 Demo 覆盖内容

- 小程序学员端
  - 首页
  - 课程购买
  - 支付成功
  - 课表
  - 作业提交
  - 每日任务
  - 消息提醒
  - 学习档案
- Web 后台
  - 管理员 / 教务运营 / 教师 三类角色切换
  - 管理总览 / 运营仪表盘 / 教学仪表盘
  - 咨询线索
  - 会员权益
  - 课程管理
  - 班级管理
  - 学员管理
  - 资源 / 作业批改
  - 订单 / 退款
  - 活动管理
  - 跟进任务
  - 系统管理
- 演示辅助页面
  - `演示シナリオ`
  - `上线准备`

## 运行方式

在项目目录执行：

```bash
python3 -m http.server 4173
```

然后打开：

- `http://localhost:4173/demo/`
- `http://localhost:4173/`

## 当前结构

- `index.html`
  - 根入口，默认跳转到 `demo/`
- `demo/`
  - `index.html` Demo 入口
  - `styles.css` Demo 样式
  - `app.js` Demo 逻辑
  - `data.js` Mock 数据
- `演示シナリオ.md`
  - 按角色和闭环整理的演示说明
- `KotobaLink小程序从个人开发到企业上线准备清单.md`
  - 小程序备案、配置、审核、支付商户号准备说明

## 当前演示特性

- 左侧演示菜单支持收起，收起后尽量以“纯系统页面”展示
- 后台支持角色切换，突出权限边界
- 教务/运营拆分为运营管理和教学运营两条线
- 小程序壳体高度固定，底部导航为统一单行 Tab Bar
- Demo 以统一样例学员和课程数据串起全部页面

## 推到 GitHub 后怎么在线查看

如果只是把代码推到 GitHub，不做任何发布配置，只能看源码，不能直接在线看 Demo。

最轻量的做法是使用 `GitHub Pages`：

1. 把仓库推到 GitHub
2. 在仓库 `Settings -> Pages`
3. `Build and deployment` 选择 `Deploy from a branch`
4. Branch 选择默认分支，例如 `main`
5. Folder 选择 `/ (root)`
6. 保存后等待 GitHub Pages 生成站点

因为仓库根目录已经有 `index.html`，访问仓库 Pages 地址时会自动跳转到 `demo/`。

## 本地实时预览

本地开发时，还是用静态服务器实时看效果：

```bash
cd /home/dev/projects/KotobaLink
python3 -m http.server 4173
```

修改 `demo/app.js`、`demo/data.js`、`demo/styles.css` 后，浏览器直接刷新即可看到最新效果。
