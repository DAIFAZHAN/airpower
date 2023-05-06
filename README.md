# ① 项目介绍

> 项目的安装与初始化请先查看宿主项目

https://gitee.com/hamm/AirPowerDemo

为了满足前端开发标准化、工程化、系统化等等需求，我们设计并开发了一个开发组件库和常用类库和方法库的集合基础脚手架，其中包含了一些页面通用的布局、常用的弹窗和交互、提示信息以及网络请求，强类型面向对象的约束规范等，以满足日常开发的快捷、稳健、标准化等要求。

# ② 项目依赖

AirPower目前依赖 ```Vue``` + ```TypeScript``` + ```Element Plus``` + ```class-transformer``` 等组件，其中还包含了一些第三方模块的依赖，具体可以参考项目的 ```package.json```。

# ③ 模块说明

AirPower内置了以下一些模块：

- #### ```component``` 组件

    包含了常用的 ```AInput``` ```AButton``` ```ATable``` ```AToolBar``` ```APage```等常用的组件；

- #### ```config``` 配置

    包含了 实体配置、字段在 ```Table``` ```Search``` ```Form``` 中的特性配置、```Props```传参配置、图像配置等常用的配置类、配置方法等；

- #### ```decorator``` 装饰器： 

    提供了表格配置、表单配置、类和属性自定义名称配置、搜索配置等装饰器；

- #### ```dto``` 数据传输模型
    
    包含了一些分页、排序、常用类、抽象基类等标准的数据传输模型；

- #### ```enum``` 枚举

    提供了目前已经达成标准和规范的一些枚举信息，如颜色、日期格式、反馈图标样式、搜索类型、HTTP参数等；

- #### ```feedback``` 反馈

    基于 ```Element Plus``` 提供的标准反馈组件，定义了规范的一些弹窗、确认框、通知信息等反馈组件；

- #### ```helper``` 助手类

    提供了时间日期、文件、数据转换、弹窗、随机与加解密、路由等快捷操作的助手类和方法；

- #### ```interface``` 接口

    提供了一些常用数据结构的标准化配置以及需要被实现的标准接口；

- #### ```model``` 数据模型

    提供一些基础的数据模型与操作方法；

- #### ```service``` 服务

    提供了一些基础的 ```CRUD``` 方法的基础网络请求服务和一些常用的 ```API```；

- #### view 页面

    提供了错误页等常用的内置页面；

# ④ 开发理念

- #### ```CaaS``` 配置即服务
    
    为了避免大量重复代码的出现，我们尽可能通过 ```TypeScript``` 的装饰器将一些类或属性的配置写入到原型链中，在需要使用这些配置的地方通过反射将保存的参数配置取出使用即可。

    其中，如果涉及一些默认值，将默认值通过 ```AirConfig``` 作为基础配置进行初始化到系统中，通过配置项的使用范围和配置成本进行调整后，使用方可以最小配置的方式进行系统业务的接入和开发。
- #### 强面向对象的支持

    在相同或相似业务中，我们使用标准的强面向对象进行实现，基于继承、封装等特性进行代码的复用，通过泛型、接口等方式将相似的业务逻辑进行标准化约束，实现相似但又不完全相同的一些灵活业务的快速开发。
   
- #### 数据和类的转换器

    为了在后端因业务要求进行属性调整后前端不需要做大量的查找替换进行修复，我们引入了 ```class-transformer``` 这个第三方库进行数据转换，通过自由选择 ```Expose``` 字段和配置转换规则来实现仅在配置层即可解决字段属性变更的问题。详细请阅读关于数据转换的部分。

# ⑤ 设计要点
  
- ### 1️⃣ TypeScript装饰器篇

    装饰器是 TypeScript 引入类似 ```Java注解``` 的一个编程方式，依赖装饰器，可无侵入式的在业务前后运行其他的业务代码而无需改动原有的业务代码。

    装饰器的本质就是一个 ```Function``` 类、方法、属性、参数等在标记了装饰器后，会执行装饰器的相关方法，然后通过原型链或者反射的方式，对操作的对象进行一些数据的处理或逻辑的限制。

- #### AirPower使用的普通装饰器
  
    ```typescript
    @ClassName('用户') //为类标记一个可读的名称
    @FieldName('真实姓名') //为属性标记一个可读的名称
    @Description('这是用户的名称') //为属性标记一个可读的描述
    ```

    标记了 ```ClassName``` ```FieldName``` ```Description``` 装饰器的类或属性，可使用类的原型或者类的对象进行获取

    #### 使用场景介绍
    
    当我们需要频繁的修改某些实体的名字，如 ```AppEntity``` 从 应用 改为 应用程序，姓名改为真实姓名，我们往往需要去查找替换，所以我们直接标记到对应的 ```AppEntity``` 类上，其他地方统一从实体中直接获取。

- #### AirPower使用的表格配置装饰器
  
    ```typescript
    @TableField() //为实体类的属性标记 是否为表格使用的字段
    ```

    ```TableField``` 注解支持传入一个 ```ITableFieldConfig``` 接口约束下的 JSON 配置项，可对表格的列名称、宽度、是否自定义列、是否枚举列等进行一系列的配置。

    使用时，可通过类的原型或类的对象进行读取并传入给 ```ATable``` 组件。获取方法如下：
    
    ```typescript
    UserEntity.prototype.getTableFieldConfigList()
    //或者
    const user = new UserEntity()
    user.getTableFieldConfigList() //用户列表的表格显示字段配置信息数组
    ```

- #### AirPower使用的搜索配置装饰器

    ```typescript
    @SearchField() //为实体类的属性标记 是否为搜索使用的字段
    ```

    ```SearchField``` 注解支持传入一个 ```ISearchFieldConfig``` 接口约束下的 ```JSON``` 配置项，可对搜索的输出key、是否枚举列等进行一系列的配置。

    使用时，可通过类的原型或类的对象进行读取并传入给 ```AToolBar``` 组件。获取方法如下：
    ```typescript
    UserEntity.prototype.getSearchFieldConfigList()
    //或者
    const user = new UserEntity()
    user.getSearchFieldConfigList() //用户搜索字段配置信息数组
    ```

- #### AirPower使用的表单配置装饰器

    ```typescript
    @FormField() //为实体类的属性标记 是否为表单使用的字段
    ```

    ```FormField``` 注解支持传入一个 ```IFormFieldConfig``` 接口约束下的 ```JSON``` 配置项，可对搜索的输出key、是否枚举列等进行一系列的配置。

    使用时，可通过类的原型或类的对象进行读取并传入给 ```AInput``` 组件。获取方法如下：
    ```typescript
    <AInput v-model.name="user.name" :entity="UserEntity"/>
    ```

- ### 2️⃣ 数据转换篇

- #### class-transformer 简介

    在日常的API接口对接过程中，接口中难免产生很多无用的属性，亦或者某些属性需要前端进行转换后才能使用，```AirPower``` 采用了 类 + ```class-transformer``` 库来完成前端和后端的接口数据处理。

    ```class-transformer``` 是 ```TypeScript``` 下一个基于 ```装饰器``` + ```Reflect-metadata``` 实现的一个数据转换库，能根据实体属性上标记的相关装饰器规则进行 ```类到JSON```、```JSON到类``` 的转换，具体的相关操作文档可以查看 ```npm-class-transformer```

- #### class-transformer的装饰器
    ```typescript
    //将userName属性暴露为 username 来处理后端和前端字段不统一的问题
    @Expose({name:"username"}) userName!: string;
    //标记属性不被来去转换 AirModel中配置必须Expose 所以这个一般很少使用
    @Exclude() password
    //标记属性必须被转为什么类型 支持简单类型 复杂类型
    @Type(()=>String) password
    //自定义转换规则 可在指定的转换方向上进行数据的转换 
    //如时间戳转可视化时间等操作
    @Transform(({value}) => {
           // custom transform code here
           return something;
    },{ toClassOnly | toPlainOnly : boolean })
    ```

    当然, 我们将 ```class-transformer``` 和 ```Reflect-metadata``` 进行了一系列的封装, 请看下面的内容.

- #### AirClassTransformer 转换助手类

    我们将上面的两个库进行了更适合我们的业务封装, 实现了 ```AirClassTransformer``` 一系列的装饰器和反射高级编程的功能.
    
    其中提供了两个静态方法:
    ```typescript
    // 将普通的JSON对象转换到声明的实体类中, 方便字段的调用和数据转换
    AirClassTransformer.parse()
    // 将一个对象拷贝到一个新的对象上, 避免深浅拷贝的尴尬
    AirClassTransformer.copy()
    ```

- ### 3️⃣ 面向对象篇

- #### AirModel基础模型类

    ```AirModel``` 是 ```AirPower``` 中通过 ```class-transformer``` 库 实现了 ```json到类``` 互相转换的一系列方法的一个数据模型基类。
我们建议，所有与后端对接的数据类都必须根继承至 ```AirModel```, 比如 ```数据实体``` ```分页对象``` ```搜索对象``` 等等。然后你就可以通过 ```class-transformer``` 提供的相关装饰器对指定数据类进行字段的暴露、转换等操作。

- #### AirAbstractEntity 抽象实体基类

    ```AirAbstractEntity``` 约束子类必须包含 ```ID``` 字段，请自行实现一个继承 AirAbstractEntity 抽象实体基类的 ```BaseEntity``` 来进行比选字段的暴露和配置，也可以在 ```BaseEntity``` 中添加子系统业务相关的其他必须的业务字段。

- #### 使用面向对象继承减少重复接口的声明

    我们在 ```AirPower``` 里实现了一个 ```AirAbstractService``` 服务基类，实现了单表 ```增加```、```删除```、```修改```、```查询分页```、```查询数组``` 等相关基础方法，业务中如无特殊业务需求，无需再次实现单表业务中这些重复的方法，但我们建议：宿主初始化一个继承了```AirAbstrtactService``` 的中间基类 ```BaseService``` 以应对不符合AirPower规范的场景，你可以在 ```BaseService``` 中间接口类中重写相关的接口。

- #### 在合理的场景下使用 ```interface``` 作为数据结构

    ```interface``` 在面向对象中可作为约束来对业务进行规范，但 ```TypeScript``` 很多使用者都习惯使用 ```interface``` 来作为限制对象属性的工具，我们建议：
> 只在装饰器参数、与第三方库的数据转换场景下使用 ```interface``` 作为数据格式的直接限制使用，其他任何场景不使用 ```interface``` 作为直接限制。
