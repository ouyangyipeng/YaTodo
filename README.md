# YaTodo

一个界面美观、功能齐全的待办事项(Todo List)应用，使用纯HTML、CSS和JavaScript构建，无需任何框架。应用支持任务管理的全部基础功能，并提供直观的用户界面。

![应用截图](screenshots/image-2.png)

## ✨ 功能特点

- **美观的用户界面**：现代化设计，柔和的颜色搭配和阴影效果
- **完整的任务管理**：
  - 添加新任务
  - 标记任务为已完成状态
  - 编辑现有任务
  - 删除任务
- **强大的组织功能**：
  - 按名称搜索任务
  - 多种排序选项（添加日期、字母顺序、完成状态）
  - 筛选任务（全部、未完成、已完成）
- **数据持久化**：使用本地存储保存任务数据
- **响应式设计**：完美适配桌面端和移动端设备
- **键盘快捷键**：支持回车键添加和编辑任务

## 🚀 快速开始

### 本地运行

1. 克隆仓库：
   ```bash
   git clone https://github.com/ouyangyipeng/YaTodo.git
   cd YaTodo
   ```

2. 由于项目是纯前端应用，直接用浏览器打开`index.html`文件即可运行：
   - 双击 `index.html` 文件
   - 或使用 VS Code 的 Live Server 插件
   - 或使用任何本地服务器

## 💡 使用指南

### 添加任务
1. 在顶部的输入框中输入任务内容
2. 点击"添加"按钮或按回车键

### 管理任务
- **完成任务**：点击任务前的复选框
- **编辑任务**：点击任务右侧的编辑图标(✏️)
- **删除任务**：点击任务右侧的删除图标(🗑️)

### 搜索和筛选
- **搜索**：在搜索框中输入关键词
- **排序**：使用"排序方式"下拉菜单选择排序标准
- **筛选**：使用"显示"下拉菜单筛选任务

## 🔧 技术实现

- **前端**：HTML5, CSS3, JavaScript (ES6+)
- **存储**：使用浏览器的 localStorage API 进行数据持久化
- **设计**：自适应响应式设计，使用 Flexbox 和 CSS Grid
- **图标**：使用 Font Awesome 图标库

## 📁 项目结构

```
YaTodo/
├── index.html          # 应用的HTML结构
├── styles.css          # 样式表
├── script.js           # JavaScript功能实现
├── screenshots/        # 应用截图 (用于README)
└── README.md           # 项目文档
```

## 🛠️ 自定义与扩展

### 修改主题颜色
在 `styles.css` 文件的开头，您可以修改 `:root` 中的 CSS 变量来自定义应用的颜色方案：

```css
:root {
    --primary-color: #3498db;   /* 主题色 */
    --secondary-color: #2980b9; /* 次要颜色 */
    --bg-color: #f9f9f9;        /* 背景色 */
    /* 其他颜色变量... */
}
```

### 添加新功能
该项目结构简单明了，易于扩展。一些可能的扩展方向：
- 添加到期日期功能
- 实现任务优先级
- 添加任务分类/标签功能
- 实现云同步

## 🤝 贡献

欢迎贡献代码、报告问题或提出功能建议！

1. Fork 本仓库
2. 创建您的特性分支：`git checkout -b feature/amazing-feature`
3. 提交您的更改：`git commit -m 'Add some amazing feature'`
4. 推送到分支：`git push origin feature/amazing-feature`
5. 创建一个 Pull Request

## 📝 许可证

该项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 📬 联系方式

欧阳易芃 - [ouyyp5@mail2.sysu.edu.cn]

项目链接: [https://github.com/ouyangyipeng/YaTodo](https://github.com/ouyangyipeng/YaTodo)
