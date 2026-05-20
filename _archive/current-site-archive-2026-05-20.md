# 震欣科技現有網站封存紀錄

日期：2026-05-20
網站：https://www.tanchin.com.tw/

這份文件是「現有廠商網站」的逆向分析與封存紀錄。
用途是保留現況、網址、素材結構、DNS 線索與重建參考，不代表新版網站要沿用舊設計。

## 一、目前網站型態

目前網站不是 WordPress，也不是 React、Vue、Next.js 這種現代前端框架。

判斷結果：

- 傳統多頁式網站
- 主要由 HTML、CSS、jQuery 組成
- 產品頁與聯絡表單使用 PHP
- 沒有明顯 CMS 後台痕跡
- 版面是廠商自寫或套版後客製

## 二、目前網址架構

繁體中文頁面：

```txt
/ 或 /index.html                  首頁
/tw/company.html                  公司簡介
/tw/quality.html                  品質控管
/tw/equipment.html                製程能力
/tw/products.php                  客製服務 / 產品分類
/tw/contact.html                  聯絡我們
/e-catalog/tw/index.html          電子型錄
```

英文頁面：

```txt
/index_en.html                    英文首頁
/company.html                     ABOUT US
/quality.html                     QUALITY CONTROL
/equipment.html                   EQUIPMENT
/products.php                     CUSTOMIZED SAMPLES
/contact.html                     CONTACT US
/e-catalog/en/index.html          英文電子型錄
```

## 三、目前產品分類

目前客製服務使用 `products.php` 加上 `cid` 參數切換分類。

```txt
服務介紹           cid=1467253473
鎳合金鋼           cid=1467253488
鉻鉬合金鋼         cid=1478586060
鎳鉻鉬合金鋼       cid=1478586082
不鏽鋼             cid=1478586127
高速鋼             cid=1478586153
其他材質           cid=1501486553
```

產品詳細頁格式：

```txt
/tw/products.php?mode=proDetail&cid={分類ID}&pid={產品ID}
```

範例：

```txt
/tw/products.php?mode=proDetail&cid=1478586127&pid=1501573876
```

## 四、目前前端語法與套件

主要前端檔案與套件：

```txt
jquery-2.2.4.min.js
jquery.cslider.js
jquery.cycle2.min.js
slidebars.min.js
aos.js
animate.css
font-awesome.min.css
style.css?ver=20190514
index.css
style2.css
```

功能判斷：

- `jquery.cslider.js`：首頁大圖輪播
- `jquery.cycle2.min.js`：內頁 banner 輪播
- `slidebars.min.js`：手機版側邊選單
- `AOS` / `animate.css`：進場動畫
- `Font Awesome 4.7`：選單 icon、箭頭等

第三方服務：

```txt
Google Tag Manager：GTM-WS2PBLR
Google Analytics：G-6XGLPXZKLS
Cookie/GDPR：gdpr.urb2b.com
```

## 五、目前網站樣式紀錄

### 整體風格

目前網站屬於舊式 B2B 企業形象網站。

特色：

- 白底、灰階、紅色重點
- 1200px 固定寬度容器
- 手機版靠 media query 收合
- header 上方有紅色語言切換區
- logo 左側，主選單右側
- 首頁使用大 banner 輪播
- 內頁使用橫幅 banner
- 產品頁為左側分類選單、右側內容區
- footer 有 logo、主要選單、聯絡資訊、LINE、QR code

### 主要色彩

```txt
主紅色：#e40000 / #d7000f
深灰文字：#4c4c4c / #6b6b6b
淺灰線條：#d8d8d8 / #dcdcdc
背景白色：#ffffff
footer 灰白漸層：#f3f3f3 -> #ffffff
```

### 版型寬度

```css
.wrapper {
  width: 1200px;
  margin: auto;
}
```

RWD 斷點大致有：

```txt
1200px
1085px
800px
640px
480px
375px
320px
```

### Header 結構

```txt
#container
  #header
    .top
      .toggle-btn
      .language
    .header.wrapper
      .logo
      .main-menu
```

主選單：

```txt
公司簡介 / 品質控管 / 製程能力 / 客製服務 / 電子型錄 / 聯絡我們
```

### 首頁結構

```txt
.index-banner
  #da-slider
    .da-slide

#content
  .section-1  客製服務三張圖
  .section-2  MIM 擴展歷程
  .section-3  電話 / 傳真 / Email

#footer
```

首頁 banner 圖片：

```txt
/images/index-banner-01.png
/images/index-banner-02.png
/images/index-banner-03.png
/images/index-banner_bg.png
```

首頁客製服務圖片：

```txt
/images/index-pro-01.jpg
/images/index-pro-02.jpg
/images/index-pro-03.jpg
```

### 內頁結構

```txt
.banner
.breadcrumbs
#content
  .side-menu
  .main
#footer
```

內頁 banner：

```txt
/images/banner_01.png?230822
/images/banner_02.png?230822
/images/banner_03.png?230822
```

### 產品頁結構

```txt
.side-menu
  .side-nav

.main
  .pro-list
    ul
      li
        figure
          img
          figcaption
            h3
```

產品清單目前主要是圖片加標題。

目前產品數量觀察：

```txt
鎳合金鋼：16 張
鉻鉬合金鋼：6 張
鎳鉻鉬合金鋼：6 張
不鏽鋼：12 張
高速鋼：2 張
其他材質：1 張
```

## 六、目前聯絡表單

目前聯絡表單不是純前端，會送到 PHP。

```txt
頁面：/tw/contact.html
表單 action：/contact/sendmail.php
method：POST
驗證碼圖片：/contact/code.php
```

欄位：

```txt
frmType hidden，值為 tw
姓名 name
地址 address
聯絡電話 tel
E-mail email
詢問內容 message
辨識碼 code
```

新版網站建議不要沿用舊 PHP 表單，應改成更好維護的 serverless 表單或第三方表單服務。

## 七、DNS / 網域管理觀察

你提供的 HiNet 後台截圖顯示：

- 網域在 HiNet 管理
- 有 HiNet DNS 代管
- 有「更新 DNS 紀錄」按鈕
- 後續可以自己調整 DNS

目前查詢到：

```txt
www.tanchin.com.tw -> 20.205.101.190
```

未來切換新版網站時，要特別保留 email 相關 DNS，例如：

```txt
MX
SPF
DKIM
DMARC
```

## 八、本機專案素材狀況

專案路徑：

```txt
C:\Users\nickt\Desktop\Developer\Tan-Chin-Offical-Web-site
```

目前素材大致分類：

```txt
首頁
公司簡介 ABOUT US
品質管制 QUALITY CONTROL
製程能力 EQUIPMENT
客製服務 CUSTOMIZED SERVICES
電子型錄 E-CATALOG
聯絡我們 CONTACT US
```

檔案類型統計：

```txt
JPG 圖片
PNG 圖片
DOCX 文件
PPTX 簡報
PDF 型錄
XLSX 表格
TXT 文字
```

這些素材足夠支撐新版網站重建。

## 九、封存結論

現有網站可以完整仿製前台樣式，包括：

- Header
- 語言切換
- 首頁 banner
- 首頁服務卡片
- MIM 歷程區
- 聯絡資訊區
- footer
- 內頁 banner
- 側邊選單
- 產品分類與圖片展示
- 聯絡表單版型

但無法直接取得廠商伺服器端 PHP 原始碼。
如果要「功能也一模一樣」，需要重新寫：

- 產品資料管理
- 聯絡信件寄送
- 驗證碼
- 電子型錄 viewer

如果只是「前台畫面一模一樣」，可以用 HTML/CSS/JS 做出來。
