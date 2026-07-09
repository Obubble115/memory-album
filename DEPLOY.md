# 公网部署指南

这个网站是纯静态网站，可以免费部署到 GitHub Pages、Vercel 或 Netlify。

## 部署前先确认

如果只是想让别人看到网页外观，可以直接部署当前文件。

如果想让别人看到你的照片，请先：

1. 把公开照片放进 `photos/` 文件夹。
2. 复制 `album-data.example.json`，改名为 `album-data.json`。
3. 在 `album-data.json` 里把 `image` 改成对应照片路径，例如 `photos/beach.jpg`。

浏览器里临时上传的照片只保存在你自己的电脑上，不会自动出现在别人那里。

## 推荐路线：GitHub Pages

适合长期维护。你修改代码后推送到 GitHub，网站会自动更新。

1. 注册或登录 GitHub。
2. 新建一个仓库，比如 `memory-album`。
3. 把本项目文件上传到仓库根目录。
4. 进入仓库 `Settings` -> `Pages`。
5. 在 `Build and deployment` 里选择 `Deploy from a branch`。
6. Branch 选择 `main`，Folder 选择 `/root`，保存。
7. 等待 GitHub Pages 部署完成，访问它给你的 `github.io` 地址。

如果仓库名是 `你的用户名.github.io`，最终网址通常是 `https://你的用户名.github.io/`。
如果仓库名是普通项目名，最终网址通常是 `https://你的用户名.github.io/仓库名/`。

## 快速路线：Netlify 或 Vercel

适合先快速发给别人看。

1. 登录 Netlify 或 Vercel。
2. 选择添加新站点。
3. 上传本项目文件夹，或连接 GitHub 仓库。
4. 构建命令留空。
5. 发布目录填写项目根目录，通常是 `.`。
6. 部署完成后，平台会给你一个免费网址。

## 是否需要买域名

不需要。GitHub Pages、Vercel、Netlify 都会给免费公网网址。

只有当你想要更正式、更好记的网址时，才需要买域名，例如：

- `yourname.com`
- `yourname.cn`
- `album.yourname.com`

域名通常按年付费。买了域名后，再到部署平台里绑定域名即可。
