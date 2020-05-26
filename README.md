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

1. 文章請到[這篇 Hackmd](https://g0v.hackmd.io/@ddio/summit-2020-articles)閱讀，並找宣傳組開通權限
2. 用 `npm run sync:all` 下載所有表格 + 長篇文案
3. 所有下載後的檔案，都會放在 `~/assets/articles` 與 `~/assets/tables` 底下，並會 commit 到 git 裡
4. 若要新增文案，須手動加入 `~/lang/zh.js` 與 `~/lang/en.js` 中

## 開發環境

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

```bash
# 安裝套件
npm install

# 下載所有文案
npm run sync:article

# 將靜態網站編譯至 dist/
npm run generate
```

## 待作們

### 網站架構

1. [ ] SEO + Social Share
1. [ ] script for staging only flag + staging deploy branch
1. [ ] script for production deploy branch using existing dir
1. [ ] doc for everything
   - install linter
   - gitlab flow
1. [ ] Add Sentry
1. [ ] Apply Sentry
1. [ ] script for production deploy branch using nuxt gen
