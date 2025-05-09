# 10.3 从“封装配置”到“应用模型”

在 Kubernetes 时代，“软件”不再是一个由应用开发者掌控的单一交付物，而是多个 Kubernetes 对象的集合。使用 Kubernetes 原生对象构建一套微服务应用，是一件高度碎片化且充满挑战的事情。

举个例子，如果你要在 Kubernetes 中部署一套微服务系统，那你需要为每个子服务配置 Service（提供服务发现和负载均衡）、Deployment（管理无状态服务）、HPA（自动扩缩容）、StatefulSet（管理有状态服务）、PersistentVolume（持久化存储）、NetworkPolicy（网络访问控制规则）等等。上述工作“繁琐”还在其次，关键难点是写出合适 YAML 元数据描述，这要求操作人员既要懂研发（理解服务运行、镜像版本、依赖关系等需求），又要懂运维（理解扩缩容、负载均衡、安全、监控等策略），还要懂平台（网络、存储、计算），一般的开发人员根本无从下手。

上述问题的根源在于，Docker 容器镜像封装了单一服务，Kubernetes 则通过资源封装了服务集群，却没有一个载体真正封装整个应用。封装应用的难点是：要屏蔽底层基础设施的复杂性，不要暴露给最终用户；同时，还要将开发、运维、平台等各种角色的关注点恰当地分离，使得不同角色可以更聚焦更专业的做好本角色的工作。

目前，业内对于如何封装应用还没有最终的结论，但经过不断探索，也出现了几种主流的应用封装与交付方案。接下来，笔者将介绍它们供你参考。

