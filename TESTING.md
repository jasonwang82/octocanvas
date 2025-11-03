# Unit Tests

本项目包含全面的单元测试，使用 Vitest 作为测试框架。

## 测试结构

```
src/__tests__/
├── ui/                    # UI 组件测试
│   ├── Button.test.tsx    # Button 组件测试 (22 个测试)
│   ├── FormControls.test.tsx  # FormControls 组件测试 (43 个测试)
│   └── Icon.test.tsx      # Icon 组件测试 (30 个测试)
├── utils/                 # 工具函数测试
│   └── utilities.test.ts  # 工具函数测试 (53 个测试)
└── config/                # 配置常量测试
    └── constants.test.ts  # 配置常量测试 (41 个测试)
```

## 测试覆盖范围

### UI 组件测试 (95 tests)

#### Button Component (22 tests)
- ✅ 渲染不同变体 (primary, secondary)
- ✅ 不同大小 (medium, large)
- ✅ 点击处理
- ✅ 禁用状态
- ✅ 全宽模式
- ✅ 图标显示
- ✅ 可访问性

#### FormControls Components (43 tests)

**Checkbox (12 tests)**
- ✅ 渲染与标签
- ✅ 选中/未选中状态
- ✅ 交互处理
- ✅ 禁用状态
- ✅ 自定义样式

**TextInput (18 tests)**
- ✅ 不同输入类型 (text, email, password, url)
- ✅ 占位符和初始值
- ✅ 变更处理
- ✅ 错误状态
- ✅ 大小变体
- ✅ 可访问性属性

**PrimerSelect (13 tests)**
- ✅ 选项渲染
- ✅ 选择变更
- ✅ 禁用和必填状态
- ✅ 大小和宽度选项
- ✅ 可访问性

#### Icon Component (30 tests)
- ✅ SVG 渲染
- ✅ 不同图标类型
- ✅ 大小变化 (functional 16px, branded 30px, 自定义)
- ✅ 颜色自定义
- ✅ 可访问性标签
- ✅ 多图标组合

### 工具函数测试 (53 tests)

#### 用户名清理
- ✅ 移除 @ 符号
- ✅ 修剪空格
- ✅ 边缘情况处理

#### 稀有度计算
- ✅ 6 个稀有度等级 (Common, Uncommon, Rare, Epic, Legendary, Mythical)
- ✅ 能量等级公式准确性
- ✅ 统计权重验证
- ✅ 边缘情况

#### 日期格式化
- ✅ 用户加入日期格式化
- ✅ 不同月份和年份处理

#### 贡献数据处理
- ✅ 总贡献计算
- ✅ 空数据处理

#### 语言统计
- ✅ 前 3 种语言排序
- ✅ 语言计数准确性

#### 统计聚合
- ✅ 星标总数计算
- ✅ Fork 总数计算
- ✅ 缺失数据处理

### 配置常量测试 (41 tests)

#### 主题配置 (8 tests)
- ✅ 背景主题定义
- ✅ 主题标签验证
- ✅ 主题数量验证

#### 头像滤镜选项 (3 tests)
- ✅ 滤镜配置
- ✅ 滤镜标签

#### 稀有度等级定义 (18 tests)
- ✅ 稀有度等级结构
- ✅ 稀有度名称
- ✅ 稀有度颜色 (hex 格式验证)
- ✅ 稀有度渐变 (Tailwind 类验证)

#### 编程语言颜色映射 (12 tests)
- ✅ 语言颜色结构
- ✅ 流行语言支持
- ✅ 前端/系统/移动语言
- ✅ 颜色值验证 (hex 格式)
- ✅ 颜色可访问性

## 运行测试

### 运行所有测试
```bash
npm run test
```

### 运行测试一次（CI 模式）
```bash
npm run test:run
```

### 使用 UI 运行测试
```bash
npm run test:ui
```

### 生成覆盖率报告
```bash
npm run test:coverage
```

## 测试框架

- **Vitest**: 快速的单元测试框架，与 Vite 集成
- **@testing-library/preact**: Preact 组件测试工具
- **@testing-library/jest-dom**: DOM 匹配器
- **happy-dom**: 轻量级 DOM 实现
- **@vitest/coverage-v8**: 代码覆盖率工具

## 测试最佳实践

1. **隔离性**: 每个测试独立运行，不依赖其他测试
2. **确定性**: 测试结果稳定，不受外部因素影响
3. **描述性**: 清晰的测试描述和断言
4. **覆盖率**: 测试边缘情况和错误处理
5. **可维护性**: 遵循组件结构组织测试

## 测试统计

- **总测试文件**: 5
- **总测试用例**: 189
- **通过率**: 100% ✅
- **覆盖范围**:
  - UI 组件: Button, FormControls (Checkbox, TextInput, PrimerSelect), Icon
  - 工具函数: 用户名处理、稀有度计算、数据处理、语言统计
  - 配置常量: 主题、滤镜、稀有度、语言颜色、尺寸配置

## 持续集成

这些测试可以集成到 CI/CD 流水线中：

```yaml
# GitHub Actions 示例
- name: Install dependencies
  run: npm install
  
- name: Run tests
  run: npm run test:run
  
- name: Generate coverage
  run: npm run test:coverage
```

## 贡献指南

添加新测试时：

1. 将测试文件放在 `src/__tests__/` 相应目录中
2. 使用 `.test.ts` 或 `.test.tsx` 扩展名
3. 遵循现有测试的结构和风格
4. 确保所有测试都通过再提交
5. 保持高测试覆盖率
6. 为每个测试编写清晰的描述
