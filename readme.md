# Spring Boot 学习整理
## 第一部分. Spring Boot Documentation
>本节提供了Spring Boot参考文档的简要概述。把它当成地图文档的其余部分。您也可以以线性方式阅读本参考指南，或者你可以跳过本节内容
，如果您不感兴趣。

### 1.关于本文档
>Spring Boot参考指南分为HTML、PDF和EPUB文件。最新副本可再docs.spring.io/spring-boot/docs/current/reference查看。

本文件的副本可用于自己使用和分发进行到别人，只要你不收取任何费用的拷贝和还进一步规定，每个副本都包含此版权声明，
无论是分布在印刷或电子。
### 2.获得帮助
>Having trouble with Spring Boot, We’d like to help!

- 试试怎么对的  -他们最常见的问题提供解决方案。
- 了解Spring基础-Spring引导建立在许多其他的Spring项目，检查spring.io的网站进行了丰富的参考文档。如果你是刚刚开始使用Spring，请尝试的一个指南。
- 问一个问题-我们监测stackoverflow.com为标记的问题spring-boot。
- 在报告与Spring引导错误github.com/spring-projects/spring-boot/issues。
### 3.第一步
>If you’re just getting started with Spring Boot, or 'Spring' in general, this is the place to start!

- 从无到有： 概述 | 要求 | 安装
- 教程： 第1部分 | 第2部分
- 运行你的例子： 第1部分 | 第2部分
……………………

## Part II. Getting Started(译：第二部分. 入门)
>If you're just getting started with Spring Boot, or 'Spring' in general, this is the section for you!
Here we answer the basic “what?”, “how?” and “why?” questions.You'll find a gentle introduction to Spring Boot along 
with installation instructions.We'll then build our first Spring Boot application, discussing some core principles as we go.

译：//TODO

### 1.Introducing Spring Boot
Spring Boot makes it easy to create stand-alone, production-grade Spring based Applications that you can “just run”. 
We take an opinionated view of the Spring platform and third-party libraries so you can get started with minimum fuss. Most Spring Boot applications need very little Spring configuration.

You can use Spring Boot to create Java applications that can be started using java -jar or more traditional war deployments. We also provide a command line tool that runs “spring scripts”.

Our primary goals are:

- Provide a radically faster and widely accessible getting started experience for all Spring development.
- Be opinionated out of the box, but get out of the way quickly as requirements start to diverge from the defaults.
- Provide a range of non-functional features that are common to large classes of projects (e.g. embedded servers, security, metrics, health checks, externalized configuration).
- Absolutely no code generation and no requirement for XML configuration.

译：//TODO

### 2.System Requirements
By default, Spring Boot 1.5.3.RELEASE requires Java 7 and Spring Framework 4.3.8.RELEASE or above. 
You can use Spring Boot with Java 6 with some additional configuration. See Section 84.11, “How to use Java 6” for more details. Explicit build support is provided for Maven (3.2+), and Gradle 2 (2.9 or later) and 3.

译：//TODO

### 3.Installing Spring Boot
Spring Boot can be used with “classic” Java development tools or installed as a command line tool. Regardless,
you will need Java SDK v1.6 or higher. You should check your current Java installation before you begin:

译：//TODO

#### 3.1Installation instructions for the Java developer
You can use Spring Boot in the same way as any standard Java library. Simply include the appropriate spring-boot-*.jar files on your classpath. Spring Boot does not require any special tools integration, so you can use any IDE or text editor; and there is nothing special about a Spring Boot application, so you can run and debug as you would any other Java program.

Although you could just copy Spring Boot jars, we generally recommend that you use a build tool that supports dependency management (such as Maven or Gradle).

译：//TODO

####