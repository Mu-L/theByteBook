# 3.5 Linux 网络虚拟化

Linux 网络虚拟化的核心技术主要是网络命名空间和各种虚拟网络设备，如稍后介绍的 Veth、Linux Bridge、TUN/TAP 等。这些虚拟设备由代码实现，完全模拟物理设备的功能。

近年来广泛应用的容器技术，正是基于这些虚拟网络设备，模拟物理设备之间协作方式，将各个独立的网络命名空间连接起来，构建出不受物理环境限制的网络架构，实现容器之间、容器与宿主机之间，甚至跨数据中心的动态网络拓扑。
