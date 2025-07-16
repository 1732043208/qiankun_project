# ai-modelbuilder-ui

#### 项目依赖

```shell
pnpm install
```

特殊说明：项目使用arco cli创建但官方文档中的创建方法有问题且迟迟未修复。如后续需要另外使用arco cli创建项目请参考以下方式
参考issue：https://github.com/arco-design/arco-cli/issues/92#issuecomment-2222374753

**node版本需要切换至2024.4.10之前的版本,这里使用了16.20.0版本**

使用过arco cli脚手架请先卸载

```shell
npm uninstall -g arco-cli
```

安装最新稳定版，官方文档的安装方式会安装最新的beta版本脚手架导致无法正常init项目,使用官方文档可能导致的问题 https://github.com/arco-design/arco-design-pro-vue/issues/417

```shell
npm i @arco-design/arco-cli@latest -g
```

使用arco cli创建项目

```shell
cd somedir
acro init your-project-name
```
