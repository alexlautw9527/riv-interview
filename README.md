# Riv 面試作業

## 專案架構

```
root/
├─ data/
├─ components/
├─ hooks/
├─ public/
│  ├─ imgs/
├─ src/
│  ├─ pages/
```

- `data`: 彙總圖片資料
- `components`: 主要元件
- `hooks`: custom hook

## 套件

- `React`
- `Next.js`
- `Emotion`: CSS-in-JS 相較於 Tailwind 方便處理動畫與動態特效
  新增監聽

## 功能性 Custom hooks

### `useScrollDirection` 偵測滑鼠滾動方向

- 在 onScroll 觸發狀態改變
- 回傳 `isScrollDown` state，若用戶捲軸向下滾動為 true，向上滾動則為 false

從 state 記錄上一次 `Window.scrollY` ，並從 useEffect 中取得最新的 `Window.scrollY` 藉此比較差異來判定捲軸滾動方向

### `useWindowSize` 偵測目前 window 長寬

- 在瀏覽器 resize 時觸發
- 回傳 windowSize 物件，記錄最新 window 長寬

## `Header`

> 往下滑動待 scrollTop > 300px 後隱藏 Header，並於滾輪向上捲動時觸發顯示 Header，隱藏及顯示的過程請加上 transition 讓畫面流暢

- 使用 `position: fixed` 讓 header 能夠維持最上面
- 使用 `useScrollDirection` 偵測滑鼠滾動方向
- 新增 onScroll 監聽
  - 當滑鼠滾動向下，而且向下滾動已超過 300px （`window.ScrollY`）則 `setIsHeaderVisible(false)`
  - 其餘狀況為 `true`
- 若 state `isHeaderVisible` 為 false，則 `transform: translateY(-100%)` 進行隱藏
- 並加入 `transition: transform 0.5s ease` 確保滑順

## `ShuffleCards`

> 請實現卡片切換的特效 (請參考 https://www.riv-studio.com/projects/keyuan-gallery 中的兩張卡片點擊後的 shuffle 效果)，引用透視視角確保視覺往真實視角逼近

這個部分動態特效使用的較多，用 CSS-in-JS 來處理 keyframe 和動畫十分方便

### 切換動畫

- cardA、cardB 分別有「覆蓋上去」、「被覆蓋時」兩個動畫
- 以 cardA 被覆蓋時、keyframe 50% 為例
  - `transform: scale(100%) translate(-25%, 0%) perspective(100px) rotateX(-2deg) rotateY(2deg)`
  - `perspective(100px)` 設置透視效果，數值越小時代表距離 z 軸越近，失真效果越明顯，如果沒有設置該屬性，就做不出 卡片視角改變的 3D 視覺效果

## `Video`

> entry ratio 大於 30% 後播放影片，小於時主動暫停播放。當 invisible 時，主動將播放進度 reset 回 time = 0，目的是確保每次 User 重新進入該區塊時，能看到影片重新播放，並於顯示比例較小時主動暫停播放避免佔據效能

- 使用 `IntersectionObserver` Web API 來偵測
  - 可以偵測物件跟指定 viewport 的相交狀況
  - 白話來說可以偵測某元素是否進入視窗當中
- 使用 `useWindowSize` 偵測目前螢幕尺寸，在 768px 以下的尺寸就不自動播放

### IntersectionObserver 簡介

```js
const observer = new IntersectionObserver(cbFn, options);
```

- `cbFn` 為 callback function，被呼叫時，預設傳入參數為 `(entries, owner)`

  - `entries` 為 Array，每個觀測元素與可視範圍交互的相關資訊
    - 元素中的 `intersectionRatio` 可取得觀測元素與可視範圍的實際交互比例數字，用此比例偵測是否播放影片
    - `isIntersecting` 可得知觀測元素是否進入可視範圍
  - `owner` 為 Observer 本身，用此 reset 播放進度

- `options` 需為一個物件，設置一些參數
  - `root`: 以哪個元素的可視窗口作為觀察依據，預設為 null，表示以 Viewport 作為判斷依據
  - `threshold`: 設定觸發的比例門檻，相交範圍過了 `threshold`，便會觸發 callback

## `HorizontalCards`

> 該區當滑鼠進入後，scrolling 的效果是讓元素橫向移動來閱覽橫向擴展的內容

`HorizontalScroll` 容器元件結構

```jsx
<OuterPaddingContainer dynamicHeight={dynamicHeight}>
  <StickyInnerContainer ref={containerRef}>
    <HorizontalTranslateContainer translateX={translateX} ref={objectRef}>
      {children}
    </HorizontalTranslateContainer>
  </StickyInnerContainer>
</OuterPaddingContainer>
```

- `OuterPaddingContainer`: 父容器, 新增高度給 scroll 捲動
  - `dynamicHeight` 創造高度供 scroll down 使用，
  - 計算方式: Cards Slider 總寬度 - 視窗寬度(扣掉已經顯示出來的) + 視窗高度（把原有的視窗高度加回去） + 150px 緩衝
- `StickyInnerContainer`: 子容器, 使用 sticky 達成捲動後還保持在畫面的效果
- `HorizontalTranslateContainer`: 讓畫面以 translate 向左滑動的容器

並且設立 onScroll 的監聽，監測 `StickyInnerContainer` 距離 `OuterPaddingContainer` top 的高度，距離多長就向左滑動多長

```js
const applyScrollListener = (ref, setTranslateX) => {
  window.addEventListener('scroll', () => {
    // 距離父容器 top 多長, 就向左滑動多長
    const offsetTop = -ref.current.offsetTop;
    setTranslateX(offsetTop);
  });
};
```
