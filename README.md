# g0v Summit 2020 官網

## 技術需求

1. node 12+
1. npx
1. [Nuxt.js](https://nuxtjs.org)

// TODO: 給 Vue 開發者的簡單的上手教學

### 多語支援

本專案使用 [nuxt-i18n](https://nuxt-community.github.io/nuxt-i18n/) ，共有兩種設定雙語的方式：

1. [lazy-load](https://nuxt-community.github.io/nuxt-i18n/lazy-load-translations.html)，主要用來載入文案等需時常更新的資料，檔案都放在 `~/lang`
2. [vue-i18n-loader](https://nuxt-community.github.io/nuxt-i18n/vue-i18n-loader.html#yaml)，定義在各自的 component 中，主要用來存放較少更動的文字，如選單、按鈕用字等
3. 若有需要跨 component 共用的翻譯設定，也請一併寫在 `~/lang` 中，方便管理

## 文案資訊

1. 文章請到[官網文案集散地](https://g0v.hackmd.io/@ddio/summit-2020-articles)閱讀是否有需要的文章
2. 點選 **官網文案集散地** 的任意 Airtable 連結，取得 Airtable 的使用權限
3. 到 [Airtable API](https://airtable.com/api) ，取得自己 Airtable 帳號的 API key 後，在 .env 寫上 `AIRTABLE_API_KEY=<MY API KEY>`
4. 用 `npm run sync:all` 下載所有表格 + 長篇文案
5. 所有下載後的檔案，都會放在 `~/assets/articles` 與 `~/assets/tables` 底下，並會 commit 到 git 裡
6. 若要新增文案，須手動加入 `~/lang/zh.js` 與 `~/lang/en.js` 中

## 開發須知

### 開發流程

1. 本專案使用加料版的 [Github flow](https://medium.com/@lf2lf2111/29c82f5d4469) ，提供測試與正式兩種網站，也就是說：
   - 開發時請在自己的電腦開 feature branch ，用 PR merge 進 master ，保持 master 在最新的功能與內容
   - 所有進到 master 的 commit ，都會被編到 Github page 上，當作[內部預覽](https://g0v.github.io/summit2020)
   - 所有開頭為 `release-` 的 tag ，都會被編到 production-pages branch ，發佈在正式網站
2. 確定程式碼遵守 nuxt 的 eslint 規範，細節請見 .eslintrs.js ，或使用支援 linter 的編輯器，例如 VS Code，否則 PR 會失敗呦

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

目前 Staging 已納入 CICD ：

1. 網站網址： https://g0v.github.io/summit2020/
1. 若發現網頁和想像的不同，請見 [Travis CI](https://travis-ci.org/github/g0v/summit2020)

```bash
# 安裝套件
npm install

# 下載所有文案
npm run sync:article

# 將靜態網站編譯至 dist/
npm run generate:staging
npm run generate:production
```

## 待作們

### 網站架構

1. [ ] SEO + Social Share
1. [x] script for staging only flag + staging deploy branch
1. [x] script for production deploy branch using existing dir
1. [x] doc for everything
1. [ ] Add Sentry
1. [ ] Apply Sentry
1. [ ] script for production deploy branch using nuxt gen
