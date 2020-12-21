import { Request, Response } from 'express';

const getMenu = (req: Request, res: Response) => {
  res.json([
    {
      path: '/',
      redirect: '/commodity',
    },
    {
      path: '/commodity',
      // icon: 'smile',
      name: 'commodity',
      routes: [
        {
          path: '/',
          redirect: '/commodity/list',
        },
        {
          path: '/commodity/list',
          name: 'commodity-list',
          // icon: 'smile',
          component: './Commodity/list',
        },
        {
          path: '/commodity/sort',
          name: 'commodity-sort',
          // icon: 'smile',
          component: './Commodity/sort',
        },
        {
          path: '/commodity/brand',
          name: 'commodity-brand',
          // icon: 'smile',
          component: './Commodity/brand',
        },
        {
          path: '/commodity/specification',
          name: 'commodity-specification',
          // icon: 'smile',
          component: './Commodity/specification',
        },
      ],
    },
    {
      path: '/order',
      // icon: 'smile',
      name: 'order',
      routes: [
        {
          path: '/',
          redirect: '/order/list',
        },
        {
          path: '/order/list',
          name: 'order-list',
          // icon: 'smile',
          component: './Order/list',
        },
      ],
    },
    {
      path: '/activity',
      // icon: 'smile',
      name: 'activity',
      routes: [
        {
          path: '/',
          redirect: '/activity/coupon',
        },
        {
          path: '/activity/coupon',
          name: 'activity-coupon',
          // icon: 'smile',
          component: './Activity/coupon',
        },
      ],
    },
    {
      path: '/revenue',
      // icon: 'smile',
      name: 'revenue',
      routes: [
        {
          path: '/',
          redirect: '/revenue/houseCaptain',
        },
        {
          path: '/revenue/houseCaptain',
          name: 'revenue-houseCaptain',
          // icon: 'smile',
          component: './Revenue/houseCaptain',
        },
        {
          path: '/revenue/maker',
          name: 'revenue-maker',
          // icon: 'smile',
          component: './Revenue/maker',
        },
        // {
        //   path: '/revenue/seting',
        //   name: 'revenue-seting',
        //   icon: 'smile',
        //   component: './Revenue/seting',
        // },
      ],
    },
    {
      path: '/user',
      // icon: 'smile',
      name: 'user',
      routes: [
        {
          path: '/',
          redirect: '/user/houseCaptain',
        },
        {
          path: '/user/houseCaptain',
          name: 'user-houseCaptain',
          // icon: 'smile',
          component: './User/houseCaptain',
        },
        {
          path: '/user/maker',
          name: 'user-maker',
          // icon: 'smile',
          component: './User/maker',
        },
        {
          path: '/user/house',
          name: 'user-house',
          // icon: 'smile',
          component: './User/house',
        },
      ],
    },
    {
      path: '/check',
      // icon: 'smile',
      name: 'check',
      routes: [
        {
          path: '/',
          redirect: '/check/recommend',
        },
        {
          path: '/check/recommend',
          name: 'check-recommend',
          // icon: 'smile',
          component: './Check/recommend',
        },
        {
          path: '/check/apply',
          name: 'check-apply',
          // icon: 'smile',
          component: './Check/apply',
        },
      ],
    },
    {
      path: '/system',
      // icon: 'smile',
      name: 'system',
      routes: [
        {
          path: '/',
          redirect: '/system/doubt',
        },
        {
          path: '/system/doubt',
          name: 'system-doubt',
          // icon: 'smile',
          component: './System/doubt',
        },
        {
          path: '/system/agreement',
          name: 'system-agreement',
          // icon: 'smile',
          component: './System/agreement',
        },
      ],
    },
    {
      component: './404',
    },
  ]);
};

export default {
  'POST /api/get_menu': getMenu,
};
