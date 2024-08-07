# 第五章：数据一致性与分布式事务模型

:::tip <a/>

网络是不稳定的，延迟是不可预测的，带宽是有限的，拓扑是动态的，一切都会失败。

:::right
—— 改自于分布式计算八大谬误[^1]
:::


提及事务，最早是指涉及操作多个资源的数据库事务问题，不过随着 SOA（Service Oriented Architecture，面向服务架构）、微服务架构逐渐流行之后，分布式事务的概念也被泛化。事务的处理不再局限在数据库范围内，所有需要保证数据一致性的应用场景，包括但不限于缓存、消息队列、分布式存储、微服务架构之下的业务一致性处理等等都需要用到事务进行处理。

**如果事务的影响只局限在本地，如何实现事务仅是个编码问题，但若涉及了多个服务，保证分布式系统下整体的原子性与一致性便成了架构设计问题**。2000 年以前，人们曾经希望 XA[^2] 的事务机制在分布式环境下也能良好的应用，但这个愿望被 CAP 定理粉碎，分布式事务的篇章我们从 ACID 与 CAP 的矛盾说起。

:::center
  ![](../assets/distributed-transaction.png)
  图 5-0 本章内容导图
:::

[^1]: 分布式计算八大谬误出现背景是，人们在设计和开发分布式系统时，常常将中心化系统的经验和假设直接应用到分布式环境中，忽视了分布式环境的复杂性和特殊需求。这些谬误可以视为分布式系统设计时需要考虑的架构需求。
[^2]: XA 是由 X/Open 组织提出的分布式事务的规范，全称是 eXtended Architecture，大部分数据库支持的 XA 协议基于 2PC 实现。