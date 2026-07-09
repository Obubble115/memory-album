# GitHub Pages 更新说明

你现在不需要重新申请网址。只要把本项目文件重新上传到原来的 GitHub 仓库，GitHub Pages 会继续使用同一个网址。

## 更新步骤

1. 打开你的 GitHub 仓库。
2. 上传或覆盖这些文件：
   - `index.html`
   - `styles.css`
   - `app.js`
   - `README.md`
   - `.nojekyll`
3. 点击 `Commit changes`。
4. 进入 `Actions` 等待 Pages 部署成功。
5. 打开原来的 GitHub Pages 网址刷新查看。

## 注意

GitHub Pages 是静态网站托管，没有真正的服务器后台。本项目的起局逻辑写在 `app.js`，会在用户浏览器中运行。

如果后续想做以下功能，就需要后端：

- 用户登录
- 保存每个用户的寻物记录
- 隐藏核心算法
- 收费或会员功能
- 管理员后台
