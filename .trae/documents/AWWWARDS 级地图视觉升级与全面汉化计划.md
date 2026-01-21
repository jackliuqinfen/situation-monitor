我将执行以下计划，为地图面板带来 AWWWARDS 级的视觉升级，并全面汉化地图元素：

### 1. 🌍 全面汉化地图数据 (Map Localization)
*   **更新 `src/lib/config/map.ts`**：虽然部分数据已汉化，但 `CONFLICT_ZONES`, `CABLE_LANDINGS`, `NUCLEAR_SITES`, `MILITARY_BASES` 中的 `name` 字段仍为英文。我将把这些名称全部替换为中文（例如 "Taiwan Strait" -> "台湾海峡", "NYC" -> "纽约"）。
*   **汉化冲突区域名称**：将 `ConflictZone` 中的英文名称全部转为中文。

### 2. 🎨 AWWWARDS 级视觉设计 (Visual Overhaul)
*   **地图配色升级**：
    *   **背景**：使用深邃的径向渐变（Radial Gradient）模拟地球在宇宙中的氛围，替代纯色背景。
    *   **陆地**：使用更细腻的深色调，并添加微弱的内发光（Inner Glow）效果，增加体积感。
    *   **海洋**：保持透明或深蓝黑，突出陆地轮廓。
    *   **网格线**：降低不透明度，使其更加精致隐蔽。
*   **交互与动效**：
    *   **呼吸效果**：为热点（Hotspots）和冲突区添加更自然的呼吸动画。
    *   **Glassmorphism Tooltip**：重写 Tooltip 样式，使用 `backdrop-filter: blur` 和半透明边框，打造磨砂玻璃质感。
    *   **字体优化**：应用新的 `Inter` 字体，调整标签的字重和间距。

### 3. 🛠️ 代码实现 (Implementation)
*   修改 `src/lib/config/map.ts` 完成汉化。
*   修改 `src/lib/components/panels/MapPanel.svelte`，引入新的 CSS 样式和 D3 属性配置。

我们将首先处理数据汉化，然后集中精力打磨视觉效果。