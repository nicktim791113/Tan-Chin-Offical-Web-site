# Vercel 部署流程與觀念

本文件記錄震欣科技新版官網接上 Vercel 後的基本觀念、設定與日後操作方式。

## 角色分工

- GitHub：放原始碼、版本紀錄、修改歷史與協作紀錄。
- Vercel：監聽 GitHub 儲存庫，收到更新後自動安裝、建置、部署網站。
- GitHub Pages：目前保留為備援展示站，正式商用網域未來建議接到 Vercel。

## 目前 Vercel 專案設定

- GitHub Repository：`nicktim791113/Tan-Chin-Offical-Web-site`
- Production Branch：`main`
- Root Directory：`future-site`
- Framework Preset：`Astro`
- Install Command：`npm install`
- Build Command：`npm run build`
- Output Directory：`dist`

這些設定已寫入 `future-site/vercel.json`，目的是讓 Vercel 每次部署都從真正的新版網站資料夾建置，避免讀到專案根目錄內的舊站封存資料、備份或其他素材。

## 自動部署流程

1. 本機完成修改。
2. 執行檢查、備份、升版與更新紀錄。
3. commit 並 push 到 GitHub `main`。
4. Vercel 自動偵測 `main` 有新 commit。
5. Vercel 重新安裝套件並執行 `npm run build`。
6. 建置成功後，正式 Vercel 網站自動更新。

## Preview 與 Production

- push 到 `main`：會產生 Production Deployment，也就是正式站更新。
- push 到其他 branch 或開 Pull Request：通常會產生 Preview Deployment，可先看測試網址。
- 若未來網站有表單、API、AI 工廠入口或後台功能，Vercel 比 GitHub Pages 更適合承接。

## GitHub Pages 是否還需要

GitHub Pages 可以保留，不一定要關掉。建議定位如下：

- Vercel：正式站與未來主部署平台。
- GitHub Pages：備援、展示、或用來確認純靜態版本是否仍能建置。

當正式網域 `www.tanchin.com.tw` 接到 Vercel 後，對外主要入口會是 Vercel；GitHub Pages 就不需要提供給客戶使用。

## 參考文件

- Vercel Git 自動部署：https://vercel.com/docs/deployments/git
- Vercel 部署方式：https://vercel.com/docs/deployments/deployment-methods
- Astro on Vercel：https://vercel.com/docs/frameworks/astro
- Vercel 專案設定：https://vercel.com/docs/project-configuration
