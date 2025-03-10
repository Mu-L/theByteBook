import { defineUserConfig, defaultTheme } from 'vuepress';

import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";
import { commentPlugin } from "vuepress-plugin-comment2";
import { readingTimePlugin } from "vuepress-plugin-reading-time2";
//import { webpackBundler } from '@vuepress/bundler-webpack'

import { containerPlugin } from '@vuepress/plugin-container'

export default defineUserConfig({
    lang: 'zh-CN',
    title: '深入高可用系统原理与设计',
    description: '构建大规模高可用的分布式系统',
    head: [
        ['link', { rel: "shortcut icon", href: "/assets/favicon.ico" }],
        ['link', { rel: "stylesheet", href: "/styles/index.css" }],

        [ 'script', {}, `
     var _hmt = _hmt || [];
   (function() {
 var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?e84cbf587012e6a1376a6d69805d5aa2";
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);
            })(); 
     `
 ]
    ],
    /**bundler: webpackBundler({
        postcss: {},
        vue: {},
      }),**/
    plugins: [
        mdEnhancePlugin({
          // 启用脚注
          footnote: true,
          katex: true,
          sub: true,
        }),
        containerPlugin({
            type: 'center'
        }),
        containerPlugin({
            type: 'right'
        }),
       commentPlugin({
            provider: "Giscus",
            repo:"isno/thebytebook",
            repoId:"R_kgDOIKTmzQ", 
            category:"General",
            categoryId:"DIC_kwDOIKTmzc4CV4OL"
        }),
        readingTimePlugin({
        // your options
        }),
    ],
    theme: defaultTheme({
        navbar: [{
                text: '首页',
                link: '/'
            },
            {
                text: '作者',
                link: '/about.md'
            },
            {
                text: '讨论',
                link: 'https://github.com/isno/theByteBook/discussions'
            },
            {
                text: 'GitHub仓库',
                link: 'https://github.com/isno/theByteBook'
            }
        ],
        sidebar: [
        
            '/intro.md',
            '/noun.md',
            {
                text: '第一章：云原生技术概论',
                link: "/architecture/summary.md",
                collapsable: false,
                sidebarDepth: 1,
                children: [
                    '/architecture/history.md',
                    '/architecture/background.md',
                    '/architecture/define-cloud-native.md',
                    '/architecture/target.md',
                    {
                        text: '1.5 云原生代表技术',
                        link: '/architecture/cloud-native-tech.md',
                        children: [
                            '/architecture/container.md',
                            '/architecture/MicroService.md',
                            '/architecture/ServiceMesh.md',
                            '/architecture/Immutable.md',
                            '/architecture/declarative-api.md',
                            '/architecture/devops.md',
                        ]
                    },
                    '/architecture/arc.md',
                    '/architecture/architect.md',
                    '/architecture/conclusion.md', 
                ]
            },
            {
                text: '第二章：构建“足够快”的网络服务',
                link: "/http/summary.md",
                collapsable: false,
                sidebarDepth: 1,
                children: [
                    '/http/latency.md',
                    '/http/https-latency.md',
                    {
                        text: '2.3 域名解析的原理与实践',
                        link:  '/http/dns.md',
       
                        children: [
                            '/http/dns-ha.md',
                            '/http/http-dns.md',
                        ]
                    },
                    '/http/compress.md',
                    {
                        text: '2.5 HTTPS 加密原理与优化实践',
                        link:  '/http/https-summary.md',
                        children: [
                            '/http/https.md',
                            '/http/ssl.md',
                        ]
                    },
                    '/http/congestion-control.md',
                    '/http/Edge-Acceleration.md',
                    '/http/quic.md',
                    "/http/conclusion.md"
                ]
            },
            {
                text: '第三章：深入 Linux 内核网络技术',
                collapsable: true,
                link: '/network/summary.md',
                sidebarDepth: 2,
                children: [
                    '/network/network-layer.md',
                    '/network/networking.md',
                    {
                        text: '3.3 Linux 内核网络框架',
                        link: "/network/linux-kernel-networking.md",
                        children: [
                            '/network/netfilter.md',
                            '/network/iptables.md',
                            '/network/conntrack.md',
                        ]
                    },
                    {
                        text: '3.4 内核旁路技术',
                        link: "/network/kernel-bypass.md",
                        children: [
                            '/network/DPDK.md',
                            '/network/XDP.md',
                            '/network/RDMA.md',
                        ]
                    },
                    {
                        text: '3.5 Linux 网络虚拟化技术',
                        link: "/network/linux-vritual-net.md",
                        children: [
                            "/network/network-namespace.md",
                            "/network/tuntap.md",
                            "/network/virtual-nic.md",
                            "/network/linux-bridge.md",
                            "/network/vxlan.md"
                        ]
                    },
                    
                    '/network/conclusion.md',
                ]
            },
             {
                text: '第四章：负载均衡与代理技术',
                link: '/balance/summary.md',
                collapsable: false,
                sidebarDepth: 1,
                children: [
                '/balance/balance.md',
                '/balance/balance-features.md',
                '/balance/balance-topology.md',
                '/balance/balance4.md',
                '/balance/balance7.md',
                '/balance/global-load-balancer.md',
                '/balance/conclusion.md',
                ]
            },
            
            {
                text: "第五章：数据一致性与分布式事务",
                link: '/distributed-transaction/summary.md',
                children: [
                    '/distributed-transaction/ACID.md',
                    '/distributed-transaction/CAP.md',       
                    {
                        text: "5.3 分布式事务模型",
                        link: '/distributed-transaction/transaction.md',
                        children: [
                            '/distributed-transaction/BASE.md',
                            '/distributed-transaction/TCC.md',
                            '/distributed-transaction/Saga.md'
                        ]
                    },
                    '/distributed-transaction/idempotent.md',
                    '/distributed-transaction/conclusion.md'
                ]
            },
            {
                text: '第六章：分布式共识与算法',
                collapsable: true,
                link: '/consensus/summary.md',
                sidebarDepth: 2,
                children: [
                    '/consensus/consensus.md',
                    '/consensus/Replicated-State-Machine.md',
                    {
                        text: "6.3 Paxos 算法",
                        link: '/consensus/Paxos.md',
                        children: [
                            '/consensus/Paxos-history.md',
                            '/consensus/Basic-Paxos.md',
                        ]
                    },
                    {
                        text: "6.4 Raft 算法",
                        link: '/consensus/Raft.md',
                        children: [
                            '/consensus/raft-leader-election.md',
                            '/consensus/raft-log-replication.md',
                            '/consensus/raft-ConfChange.md',
                        ]
                    },
                    '/consensus/conclusion.md',
                ]
            },
            {
                text: '第七章：容器编排技术',
                link: '/container/summary.md',
                collapsable: false,
                sidebarDepth: 1,
                children: [
                    '/container/borg-omega-k8s.md',
                    '/container/orchestration.md',
                    '/container/image.md', 
                     "/container/CRI.md",
                    "/container/storage.md",
                    "/container/container-network.md",
                    {
                        text: '7.7 资源模型与编排调度',
                        collapsable: false,
                        sidebarDepth: 1,
                        link: '/container/Resource-scheduling.md',
                        children: [
                            "/container/resource.md",
                            "/container/Extended-Resource.md",
                            "/container/kube-scheduler.md"
                        ]
                    },
                    "/container/auto-scaling.md",
                    '/container/conclusion.md',
                ]
            },
            {
                text: '第八章：服务网格技术',
                collapsable: false,
                sidebarDepth: 1,
                link: '/ServiceMesh/summary.md',
                children: [
                    '/ServiceMesh/What-is-ServiceMesh.md',
                    '/ServiceMesh/MicroService-history.md',
                    '/ServiceMesh/data-plane.md',
                    '/ServiceMesh/control-plane.md',
                    '/ServiceMesh/overview.md',
                    '/ServiceMesh/The-future-of-ServiceMesh.md',
                    '/ServiceMesh/conclusion.md',
                ]
            },
             {
                text: '第九章：系统可观测性',
                link: '/observability/summary.md',
                collapsable: false,
                sidebarDepth: 1,
                children: [
                    "/observability/What-is-Observability.md",
                    "/observability/Observability-vs-Monitoring.md",
                    {
                        text: "9.3 遥测数据的分类与处理",
                        link: '/observability/signals.md',
                        children: [
                            '/observability/metrics.md',
                            '/observability/logging.md',
                            '/observability/tracing.md',
                            '/observability/profiles.md',
                            '/observability/dumps.md',
                        ]
                    },
                    '/observability/OpenTelemetry.md',
                    '/observability/conclusion.md',
                ]
            },
            {
                text: '第十章：应用封装与交付',
                link: '/application-centric/summary.md',
                collapsable: false,
                sidebarDepth: 1,
                children: [
                    '/application-centric/application-centric.md',
                    '/application-centric/Controller.md',
                    {
                        text: "10.3 从“封装配置”到“应用模型”",
                        link: '/application-centric/app-model.md',
                        children: [
                            '/application-centric/Kustomize.md',
                            '/application-centric/Helm.md',
                            '/application-centric/Operator.md',
                            '/application-centric/OAM.md',
                        ]
                    },
                    '/application-centric/conclusion.md',
                ]
            }
        ]
    })
});