# 9.3.5 核心转储 Core dump

核心转储（Core dump）中的 “core” 代表程序的关键运行状态，“dump” 的意思是导出。

核心转储历史悠久，很早就在各类 Unix 系统中出现。在任何安装了《Linux man 手册》的 Linux 发行版上，都可以通过运行 man core 命名查阅相关信息。

```bash
$ man core
...
A small number of signals which cause abnormal termination of a process
     also cause a record of the process's in-core state to be written to disk
     for later examination by one of the available debuggers.  (See
     sigaction(2).)
...
```

上面的大致意思是，当程序异常终止时，Linux 系统会将程序的关键运行状态（如程序计数器、内存映像、堆栈跟踪等）导出到一个“核心文件”（core file）中。工程师使用调试器（如 gdb）打开核心文件，便可查看程序崩溃时的运行状态，更容易定位到问题。

:::tip  注意
复杂应用程序崩溃时甚至能生成几十 GB 大小的核心文件。默认情况下，核心文件的大小会受到 Linux 系统的限制。如果你想要为特定的程序生成一个无限制大小的核心文件，须通过命令 ulimit -c unlimited，告诉操作系统不要限制核心文件的大小。
:::

此外，CNCF 发布的可观测性白皮书中仅提及了 core dump。实际上，dumps 范围应该扩展到 Heap dump（Java 堆栈在特定时刻的快照）、Thread dump（特定时刻的 Java 线程快照）和 Memory dump（内存快照）等等。

虽然 CNCF 将 dumps 纳入可观测性体系，但仍有许多技术难题，如业务容器与操作系统全局配置的冲突、数据持久化的挑战（在 Pod 重启前需要将数 Gb 的 core dump 文件写入持久卷）等，导致处理 dumps 数据还得依靠传统手段。