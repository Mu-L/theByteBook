# 第五章：数据一致性与分布式事务

:::tip <a/>

网络是不稳定的，延迟是不可预测的，带宽是有限的，拓扑是动态的，一切都会失败。

:::right
—— 改自于分布式计算八大谬误[^1]
:::


事务（transaction）最早指本地事务，也就是对数据库的多个读写操作捆绑为一个操作单元。该操作单元作为一个执行整体要么全部成功，要么全部中止，从而保证某些极端情况下（进程崩溃、网络中断、节点宕机）数据一致性。随着分布式系统的广泛应用，所有需要保证数据一致性的应用场景，包括但不限于缓存、消息队列、存储、微服务架构之下的数据一致性保证等等，都需要用到事务的机制进行处理。

在单体系统时代，如何实现事务仅仅是个编码问题。但在分布式系统时代，事务操作跨越了多个节点，保证多个节点间的数据一致性便成了架构设计问题。2000 年以前，人们曾经希望基于“两阶段提交”（2PC, Two-Phase Commit Protocol）[^2]的事务机制，也能在现代分布式系统中良好运行，但这个愿望被 CAP 定理粉碎。本章，我们深入理解分布式环境下数据一致性和可用性的矛盾，掌握各个分布式事务模型原理。

本章内容安排如图 5-0 所示。
:::center
  ![](../assets/distributed-transaction.png)
  图 5-0 本章内容导图
:::

[^1]: 分布式计算八大谬误出现背景是，人们在设计和开发分布式系统时，常常将中心化系统的经验和假设直接应用到分布式环境中，忽视了分布式环境的复杂性和特殊需求。这些谬误可以视为分布式系统设计时需要考虑的架构需求。
[^2]: 两阶段提交（2PC）是一种在多节点之间实现事务原子提交的算法，用来确保所有的节点要么全部提交、要么全部中止。它是分布式数据中的经典算法之一。2PC 在某些数据库内部使用，或者以 XA 事务形式提供给应用程序。