# 6.5 小结

尽管 Paxos 算法已提出几十年，但它为分布式系统中的一致性与容错性问题提供了理论框架，开创了分布式共识研究的先河。

Paxos 基于“少数服从多数”（Quorum 机制）原则，通过“请求阶段”和“批准阶段”在不确定环境下，解决了单个“提案”的共识问题。多次运行 Paxos，便可实现一系列“提案”的共识，这就是 Multi-Paxos 的核心思想。Raft 算法在 Multi-Paxos 的基础上，在一致性、安全性和可理解性之间找到平衡，成为业界广泛采用的主流选择。

接下来，再思考一个问题，Raft 算法属于“强领导者”（Strong Leader）模型，领导者负责所有写入操作，它的写瓶颈就是 Raft 集群的写瓶颈。那么，该如何突破 Raft 集群的写瓶颈呢？

一种方法是使用哈希算法将数据划分成多个独立部分（分片）。例如，将一个 100TB 规模数据的系统分成 10 部分，每部分只需处理 10TB。这种根据规则（范围或哈希）将数据分散处理的策略，被称为“分片机制”（Sharding）。分片机制广泛应用于 Prometheus、Elasticsearch 、ClickHouse 等大数据系统（详见本书第九章）。理论上，只要机器数量足够，分片机制就能支持任意规模的数据。
