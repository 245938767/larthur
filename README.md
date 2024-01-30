# Larthur Blog

首先非常感谢[cali.so](https://github.com/CaliCastle/cali.so) 开源的网站，能够让我大量借鉴(Copy)。非常棒的UI设计。

## 介绍

此项目是我第一次使用React Next框架搭建的全栈应用,自己实现了后台简单的增删改查功能。
查看我的线上博客 [**Larthur**](https://larthur.vercel.app)

## 技术栈

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Clerk](https://clerk.com/)
- [Prisma](https://prisma.io)
- [Plate](https://platejs.org/)
- [TanStack Query](https://tanstack.com/query/latest)

## 背景介绍

需要完全依赖 登录三方`Clerk`、图传三方`Imgur`、中间件`Redis`、`MySql`

使用前请先注册[Clerk](https://clerk.com/)用户登录平台,和[Imgur](https://imgur.com/)图片上传平台。

Imgur图传平台API文档[点击这里](https://apidocs.imgur.com/#authorization-and-oauth)需要配合Postman注册。

接下来还需要Redis和MySql的支持，可以选择任何的平台或者你自己的服务器。如果你想白嫖我推荐Redis: [Redis](https://redis.com/), 数据库: [PlanetScale](https://planetscale.com/)、[Supabase](https://supabase.com/)、[Upstash](https://upstash.com/)。

根目录创建`.env.local`文件复制`.env`文件配置如下所示。

```
# .env.local 配置文件
# clerk key信息
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=***
CLERK_SECRET_KEY=**
NEXT_PUBLIC_CLERK_USER_ID=""

# 我使用的是Mysql
DATABASE_URL='mysql://root:root@localhost/larthur-data?sslaccept=strict'
# Vercel
VERCEL_ENV="development"

# redis配置信息
REDIS_HOST=localhost
REDIS_PASSWORD=""
REDIS_PORT=6379

# imgur图传创建好API后复制过来即可
IMGUR_CLIENT_ID=''

```

## Vercel 部署

如果你想要快速部署到线上，可以使用[Vercel](https://vercel.com/)平台。
Fork此项目并进入Vercel控制面板找到此项目点击部署。
添加上面配置好的信息加入到Vercel的环境变量中。

## 本地安装

```
# 包安装
 pnpm install

# 把当前的表结构Push到你的数据库中
 pnpm run db:push

# 运行程序
 pnpm run dev
```

如果你有迁移文件的需要可以查看[Prisma](https://www.prisma.io/docs/orm/reference/prisma-cli-reference#migrate-dev)官方迁移文档来进一步了解。

## 使用

在正式完全的使用本项目之前还需要设置当前网站的管理员(其实Clerk已经有权限的功能，目前不打算去实现)

1. 进入正在运行的网站点击右上角的登录按钮。
2. 登录成功后进入Clerk的控制面板。
3. 找到登录的用户，点进去有一个User ID 复制后粘贴到 .env.local 配置文件如下`user_***`位置。
4. 在Vercel直接复制到环境变量中。

```
NEXT_PUBLIC_CLERK_USER_ID="user_***"
```

最后你登录账户之后将在右上角看到 **控制台** 按钮。

## 项目结构

```
├── prisma                                 数据库定义文件
├── public
└── src
    ├── api
    ├── app
    │   ├── (auth)
    │   │   ├── sign-in
    │   │   │   └── [[...sign-in]]
    │   │   └── sign-up
    │   │       └── [[...sign-up]]
    │   ├── (dashboard)                    后台页面
    │   │   └── dashboard
    │   │       ├── categorys
    │   │       ├── create
    │   │       │   └── [slug]
    │   │       ├── posts
    │   │       └── settings
    │   └── (main)                         博客页面
    │       ├── blog
    │       │   └── [slug]
    │       └── projects
    ├── assets
    │   ├── company
    │   ├── fonts
    │   ├── highlights
    │   └── icons
    ├── components
    │   ├── common
    │   ├── links
    │   ├── plate-ui
    │   ├── site
    │   └── ui
    ├── config
    ├── hook
    ├── lib
    │   ├── interface
    │   └── plate
    ├── styles
    └── types
```

## License

[MIT © Richard McRichface.](./LICENSE)
