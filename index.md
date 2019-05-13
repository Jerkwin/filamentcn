这里放置 收集/整理/翻译 的Filament 资料/文档/教程.

# 缘起

一直以来, 我都对计算机图形学很感兴趣, 但无奈与平时工作相距甚远, 外兼视力不佳, 所以只能关注一下, 没有深入研究.

前几年研究PBR的时候偶然发现了[Romain Guy的PRB渲染demo](http://www.curious-creature.com/2017/08/14/physically-based-rendering-demo/), 当时就有些惊异于其效果, 遂将其下载仔细研究, 以期能改进一下做成一个自用的WegGL库. 就这样, 断断续续地, 开始了我的WenGL学习之旅. 从最开始的不明所以, 逐渐知晓了着色器, 材质, 颜色, 光照, 进而是天空盒, IBL, 色调映射, 等等, 等等. 越学越觉得渲染领域涉及面太广, 个人很难完全精通掌握, 只能将自己限定在一个小的范围内, 对其他范围做些单纯的了解.

当我终于将Guy的demo改造好, 准备发布的时候, 上网一查, 才赫然发现谷歌以已经开源了[Filament](https://github.com/google/filament), 其最初来源就是Guy的demo. 这样我的改造就意义不大了, 所以只能换成先学习这个引擎了.

这里放置 收集/整理/翻译 的Filament 资料/文档/教程, 作为学习的参考和记录.

我毕竟只是业余学习过计算机图形学, 很多名词的翻译不一定符合业内习惯. 如果你发现有不符合习惯的地方, 请指出修正. 如果你发现有错误和不合理的地方, 更要指出. 谢谢.

# Filament概述

[Filament](https://github.com/google/filament)是一个用C++编写的基于物理的实时渲染器. 它优先考虑移动平台, 但也可用于多个平台.

<iframe src="https://google.github.io/filament/webgl/demo_suzanne.html"></iframe>

我们尽量保持Filament体积小, 加载快, 并专注渲染的特性. 例如, Filament不会在运行时编译材质. 相反, 我们提供了一个命令行工具[`matc`](https://github.com/google/filament/tree/master/tools/matc), 用于离线编译材质.

更多信息, 请参阅下面的核心文档, JavaScript文档, 下载和构建说明.

# Filament核心文档

- [下载构建]()
- [材质设计](Filament.md.html) [英文版](https://google.github.io/filament/Filament.md.html)
- [材质概览](filamentcn//Materials.md.html) [英文版](https://google.github.io/filament/Materials.md.html)
- [材质参考页](Material_Properties.pdf)

# Filament开发文档/示例

## 教程

### 三角形
### 红色球
### Blender猴头

## 示例

### 贴图材质球
### Blender猴头
### 基本纽结

## 其他文档

### [JavaScript API参考]()
### [WebGL Meetup讲演 (2018)]()
