# 10.3.3 Operator

Operator 的概念由 CoreOS 于 2016 年提出，它并非一个具体的工具或系统，而是一种封装、部署和管理 Kubernetes 应用的方法，尤其适合需要特定领域知识的复杂有状态应用，如数据库、分布式缓存和消息队列等。


容器化应用程序最困难的任务之一，就是设计有状态分布式组件的部署体系结构。

理解 Operator 所做的工作，需要先弄清楚“无状态应用”和“有状态应用”的含义。


如果使用 Operator，情况就简单得多。Etcd 的 Operator 提供了 EtcdCluster 自定义资源，在它的帮助下，仅用几十行代码，安装、启动、停止等基础的运维操作。但对于其他高级运维操作，例如升级、扩容、备份、恢复、监控和故障转移，如下面代码所示。

```yaml
apiVersion: operator.etcd.database.coreos.com/v1beta2
kind: EtcdCluster
metadata:
  name: my-etcd-cluster
  namespace: default
spec:
  size: 3
  version: "3.4.15"
  storage:
    volumeClaimTemplate:
      spec:
        accessModes:
          - ReadWriteOnce
        resources:
          requests:
            storage: 8Gi
```

Operator 的实现上，其实是 Kubernetes 声明式 API 基础上的一种“微创新”。它利用了 CRD 构建“高层抽象”，又通过 Kubernetes 原生的“控制器模式”，将复杂应用的运维逻辑代码化。这种设计带来的好处远不止操作简单，而是充分遵循 Kubernetes 基于资源和控制器的设计原则，又无需受限于内置资源的表达能力。只要开发者愿意编写代码，特定领域的经验都可以转换为代码，通过 Operator 继承。

Operator 的设计模式使开发者可以根据自身业务自由的定义服务模型和相应的控制逻辑，一经推出就在开源社区引起了巨大的反响。主流的分布式应用纷纷推出了对应的 Operator 开源项目，RedHat 公司收购 CoreOS 之后也持续投入，推出了简化开发者编写 Operator 的 Operator Framework，进一步降低应用开发对 Kubernetes 底层 API 知识的依赖。

2019 年，Red Hat、AWS、Google Cloud 和 Microsoft 联合推出了 OperatorHub.io，为开源社区中的大量 Operator 定义统一的质量标准，并提供一个集中式的公共仓库。用户可以在该平台上搜索与业务应用对应的 Operator，通过向导页完成安装。同时，开发者也可以基于 Operator Framework 开发自己的 Operator，并将其上传分享至仓库。

:::center
  ![](../assets/operatorhub.io.png)<br/>
 图 3-14 operatorhub.io
:::
