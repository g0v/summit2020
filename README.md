# g0v Summit 2020 官網

## 技術需求

1. node 12+
1. npx
1. [Nuxt.js](https://nuxtjs.org)

### 多語支援

本專案使用 [nuxt-i18n](https://nuxt-community.github.io/nuxt-i18n/) ，共有兩種設定雙語的方式：

1. [lazy-load](https://nuxt-community.github.io/nuxt-i18n/lazy-load-translations.html)，主要用來載入文案等需時常更新的資料，檔案都放在 `~/lang`
2. [vue-i18n-loader](https://nuxt-community.github.io/nuxt-i18n/vue-i18n-loader.html#yaml)，定義在各自的 component 中，主要用來存放較少更動的文字，如選單、按鈕用字等
3. 若有需要跨 component 共用的翻譯設定，也請一併寫在 `~/lang` 中，方便管理

## 文案資訊

1. 文章請到[官網文案集散地](https://g0v.hackmd.io/@ddio/summit-2020-articles)閱讀是否有需要的文章
2. 點選 **官網文案集散地** 的任意 Airtable 連結，取得 Airtable 的使用權限
3. 到 [Airtable API](https://airtable.com/api) ，取得自己 Airtable 帳號的 API key 後，在 .env 寫上 `AIRTABLE_API_KEY=<MY API KEY>`
4. 用 `npm run sync:all` 下載所有表格 + 長篇文案 + 入選稿件
5. 所有下載後的檔案，都會放在 `~/assets/articles` 與 `~/assets/tables` 底下，並會 commit 到 git 裡
6. 若要新增文案，須手動加入 `~/lang/zh.js` 與 `~/lang/en.js` 中

## 稿件資料結構

1. 稿件資料放在 `~/assets/proposal.json` 裡，資料格式基本上和徵件網站相同
2. 徵件網站資料結構，請見 `~/tools/projectFields.js`
3. 額外欄位包括：
   - `timeSheet`: 時間、場地、分類主題
   - `isPseudo`: 是否是虛擬議程，例如開幕、午休等，沒有說明，也不會也獨立議程說明頁的格子
   - `updatedAt`, `createdAt`: 議程最後更新時間

## 環境變數列表

本專案使用 [dotenv](https://www.npmjs.com/package/dotenv)，你可以將想要使用的環境變數，加到專案根目錄的 `.env` 中，就會自動被帶入環境變數中。

- 必填
  1. 目前尚無必填的環境變數
- 選填
  1. `DOMAIN` - 產生靜態檔案時 (`nuxt generate`) 使用，確保 social tagging 指到正確的網址
  2. `ROUER_BASE` - 網站不是跑在根目錄時使用，會影響 [nuxt.router.base](https://nuxtjs.org/api/configuration-router/#base)，預設為 ''
  3. `AIRTABLE_API_KEY` - Airtable 存取金鑰，使用方式請見[文案資訊](#文案資訊)
  4. `SERVER_PORT`, `SERVER_HOST` - 伺服器綁定設定，使用方式請見[開發流程](#開發流程)

## 開發須知

### 開發流程

1. 本專案使用加料版的 [Github flow](https://medium.com/@lf2lf2111/29c82f5d4469) ，提供測試與正式兩種網站，也就是說：
   - 開發時請在自己的電腦開 feature branch ，用 PR merge 進 master ，保持 master 在最新的功能與內容
   - 所有進到 master 的 commit ，都會被編到 Github page 上，當作[內部預覽](https://g0v.github.io/summit2020)
   - 所有開頭為 `release-` 的 tag ，都會被編到 production-pages branch ，發佈在正式網站
2. 確定程式碼遵守 nuxt 的 eslint 規範，細節請見 .eslintrs.js ，或使用支援 linter 的編輯器，例如 VS Code，否則 PR 會失敗呦
3. 若需要自訂開發時的 Interface 與 Port ，請在 .env 裡加上：
   - `SERVER_PORT` ，預設為 3000
   - `SERVER_HOST` ，預設為 localhost

### Style

1. 本專案使用 scss + [styleResource](https://github.com/nuxt-community/style-resources-module/)
2. 所有放在 `~/assets/scss/variables/` 底下的 scss 都會被自動 import 到所有 single file component 中

### 執行步驟

```bash
# 安裝套件
npm install

# 下載所有文案
npm run sync:all

# 把開發網站跑在 localhost:3000
npm run dev
```

### 多語支援開發說明

請參考 http://localhost:3000/example ，內附文章與表格的使用方式

1. 善用 `this.$t('keyword')`
2. 連結請改用 `this.localePath('/original/path/to/go')`
3. 其他撇步請見[官網文件](https://nuxt-community.github.io/nuxt-i18n/basic-usage.html)

## 發佈流程

### Staging

目前 Staging 已納入 CICD ：

1. 網站網址： https://g0v.github.io/summit2020/
1. 若發現網頁和想像的不同，請見 [Travis CI](https://travis-ci.org/github/g0v/summit2020)

```bash
# 安裝套件
npm install

# 將靜態網站編譯至 dist/
npm run generate:staging
```

### Production

目前 Production 已納入 CICD ：

1. 網站網址：https://summit.g0v.tw/2020/
2. 使用 `release-*` tag 當作發布標記，最新而且開頭為 `release-` 的 tag ，會被發佈到上述網址
3. 若發現網頁和想像的不同，請見
   1. 是否有在 [Github release](https://github.com/g0v/summit2020/releases) 裡
   2. [Travis CI](https://travis-ci.org/github/g0v/summit2020) 編輯是否成功
   3. [主網站](https://github.com/g0v/summit.g0v.tw/) 的 2020 資料夾是否使用預期的 commit hash

發佈流程：

```bash
# 確定在最新的 staging ，或在對的 hot fix commit
git checkout master
git pull master

# 在本地端建立 tag ，命名建議為 release-<MMDD>.<revision>
git tag release-0608.0

# 將 tag 推上 remote
git push -u origin release-<MMDD>.<revision>

# 等 5 分鐘後，就可在 https://summit.g0v.tw/2020/ 看到更新
```

## 待作們

### 網站架構

1. [x] SEO + Social Share
1. [x] script for staging only flag + staging deploy branch
1. [x] script for production deploy branch using existing dir
1. [x] doc for everything
1. [ ] Add Sentry
1. [ ] Apply Sentry
1. [x] script for production deploy branch using nuxt gen
