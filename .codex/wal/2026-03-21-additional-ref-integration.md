# WAL Entry: 新增Ref文件夹资源集成

## 上下文
基于ref\新建文件夹下的额外数据源，进一步扩展变更文档的集成范围。

## 新增数据源详细分析

### 微生物组工具和数据库
- **MiCoReCa**: 微生物组社区资源目录，包含5000+工具和600+工作流
- **MicrobiomeDB**: R包，支持多种微生物组数据格式导入和分析

### 代谢组CSV数据
- **MiMeDB CSV**: 
  - mimedb_metabolites_v2.csv (53MB)
  - mimedb_microbes_v2.csv (5MB)
  - 包含完整的微生物-代谢物关联数据

### 基因组数据
- **mibiogen37to38**: 将Mibiogen GRCh37数据转换为GRCh38格式
  - 用于All of Us研究项目
  - 包含SNP标识符转换

### 中药网络药理学
- **TCMNP**: 传统中药网络药理学R包
  - 数据库: https://tcmlab.com.cn/tcmnp/
  - 包含中药网络药理学分析功能

## 变更文档更新

### 1. 微生物组数据集成变更包
- 新增MiCoReCa和MicrobiomeDB集成任务
- 新增MiMeDB CSV数据解析任务
- 总任务数: 33个，工期: 27天

### 2. 代谢组数据集成变更包
- 新增MiMeDB CSV数据集成里程碑
- 总任务数: 29个，工期: 18天

### 3. 多组学整合变更包
- 新增TCMNP中药网络药理学集成
- 新增mibiogen37to38基因组数据集成
- 新增MiCoReCa和MicrobiomeDB工具目录集成
- 总任务数: 35个，工期: 25天

## 技术架构增强

### 数据格式支持
- R包数据格式支持 (MicrobiomeDB)
- 大型CSV文件处理 (MiMeDB)
- 基因组坐标转换 (mibiogen37to38)
- 工作流和工具目录索引 (MiCoReCa)

### 集成策略
- 分层数据集成：工具→数据库→分析
- 格式转换：R↔Python↔JSON
- 坐标系统统一：GRCh37→GRCh38
- 社区资源整合：工具链构建

## 成功标准
- 所有新增数据源成功集成
- 工具和数据库索引建立
- 多格式数据转换支持
- 基因组坐标统一

## 风险缓解
- 大型CSV文件处理性能优化
- R包与Python系统兼容性
- 基因组版本转换准确性
- 社区资源动态更新机制

---
*WAL Entry创建时间: 2026-03-21*  
*状态: 规划完成，待实施*
