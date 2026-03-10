# KotobaLink

当前阶段以高保真 Demo 为主，优先展示小程序学员端与 Web 后台的业务闭环。

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
