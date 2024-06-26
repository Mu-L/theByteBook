# 3.5.4 VXLAN 

有了各类虚拟设备之后，下一步就是要使用这些设备组成网络，由于跨主机的通信绝大多数都是 overlay 网络，所以本节内容，我将以 VXLAN 为例介绍 overlay 网络原理。

:::tip 什么是 overlay 网络
overlay 网络是通过封装技术将数据包封装在另一个数据包中，从而在现有网络（underlay 网络）之上创建一个逻辑网络。overlay 网络在虚拟化环境中非常有用，它可以连接分布在不同物理位置的虚拟机、容器、节点等，使它们在一个局域网内一样通信。下面即将介绍的 VXLAN、负载均衡章节中的 IPIP 都属于 overlay 网络。
:::

:::center
  ![](../assets/overlay.svg)<br/>
  图 3-24 Overlay 与 Underlay 网络模型
:::

VXLAN 你可能没有听说过，但 VLAN（Virtual Local Area Network，虚拟局域网）相信只要从事计算机行业的人都有所了解，

## 1. VLAN

1995 年，IEEE 就发表了 802.1Q 标准定义了在以太网数据帧中 VLAN 的格式，并且沿用至今。

VLAN 是一种早期的网络虚拟化技术，由于二层网络本身特性决定它非常依赖广播，但当设备非常多、广播又非常频繁的时候，很容易形成广播风暴。因此 VLAN 的首要职责是划分广播域，将同一个物理网络的设备区分出来。具体的做法是在以太网的报头增加 VLAN tag，让所有广播只针对相同的 VLAN tag 的设备生效，这样就缩小了广播域，也提高了安全性和可管理性。

不过 VLAN 有一个非常明显的缺陷，就是 VLAN tag 的设计，当时的网络工程师完全未料及云计算会发展得会如此普及，只设计了 12 位来存储 VLAN ID，标准定义中 VLAN 的数量只有 4000 个左右，这显然无法支持大型数据中心数以万计的设备数。

## 2. VXLAN

为了解决 VLAN 的设计缺陷，IETF 又重新定义了 VXLAN 规范，这是三层虚拟化网络（Network Virtualization over Layer 3，NVO3）的标准技术规范之一。

虽然从名字上看，VXLAN 是 VLAN 的一种扩展协议，但 VXLAN 内在已经与 VLAN 迥然不同，**VXLAN 本质上是一种隧道封装技术，属于典型的 overlay 网络，它使用 TCP/IP 协议栈的惯用手法“封装/解封装技术”，将 L2 的以太网帧（Ethernet frames）封装成 L4 的 UDP 数据报，然后在 L3 的网络中传输，效果就像 L2 的以太网帧在一个广播域中传输一样，不再受数据中心传输的限制**。

:::center
  ![](../assets/vxlan-data.png)<br/>
  图 3-25 VXLAN 报文结构
:::

VXLAN 完美地弥补了 VLAN 的上述不足：
- 一方面通过 VXLAN 中的 24 比特 VNI 字段（如图 3-25 所示）提供多达 16M 租户的标识能力，远大于 VLAN 的 4000；
- 另一方面，VXLAN 本质上在两台交换机之间构建了一条穿越数据中心基础 IP 网络的虚拟隧道，将数据中心网络虚拟成一个巨型“二层交换机”，满足虚拟机大范围动态迁移的需求。

VXLAN 每个边缘入口都部署了一个 VTEP（VXLAN Tunnel Endpoints，VXLAN 隧道端点），VTEP 是 VXLAN 隧道的起点和终点，**VXLAN 对用户原始数据帧的封装和解封装均在 VTEP 上进行，VTEP 既可以是一台独立的网络设备，也可以是在服务器中的虚拟交换机（因此它也有 IP 和 MAC 地址）**。

VXLAN 的通信原理如图 3-26 所示，源服务器发出的原始数据帧，在 VTEP 上被封装成 VXLAN 格式的报文，并在 IP 网络中传递到另外一个 VTEP 上，并经过解封转还原出原始的数据帧，最后转发给目的服务器。

:::center
  ![](../assets/VXLAN.png)<br/>
  图 3-26 VXLAN 通信概览
:::

Linux 对 VXLAN 协议的支持时间并不久，2012 年 Stephen Hemminger 把相关的工作合并到 kernel 中，并最终出现在 kernel 3.7.0 版本。 到了 kernel 3.12 版本，Linux 对 VXLAN 的支持已经完备，支持单播和组播，IPv4 和 IPv6。

VXLAN 对网络基础设施的要求很低，不需要专门的硬件只要三层可达的网络就可以部署 VXLAN，具有很高的灵活性、扩展性和可管理性，已经成为当前构建数据中心的主流技术，绝大多数的公有云的 VPC 都是用 VXLAN 来作为数据转发层面。