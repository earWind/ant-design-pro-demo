export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/welcome',
              },
              {
                path: '/welcome',
                name: 'welcome',
                icon: 'smile',
                component: './Welcome',
              },
              {
                path: '/admin',
                name: 'admin',
                icon: 'crown',
                component: './Admin',
                authority: ['admin'],
                routes: [
                  {
                    path: '/admin/sub-page',
                    name: 'sub-page',
                    icon: 'smile',
                    component: './Welcome',
                    authority: ['admin'],
                  },
                ],
              },

              {
                path: '/commodityManage',
                icon: 'smile',
                name: 'commodityManage',
                routes: [
                  {
                    path: '/',
                    redirect: '/commodityManage/list',
                  },
                  {
                    path: '/commodityManage/list',
                    name: 'commodityManage-list',
                    icon: 'smile',
                    component: './CommodityManage/list',
                  },
                  {
                    path: '/commodityManage/sort',
                    name: 'commodityManage-sort',
                    icon: 'smile',
                    component: './CommodityManage/sort',
                  },
                  {
                    path: '/commodityManage/brand',
                    name: 'commodityManage-brand',
                    icon: 'smile',
                    component: './CommodityManage/brand',
                  },
                  {
                    path: '/commodityManage/specification',
                    name: 'commodityManage-specification',
                    icon: 'smile',
                    component: './CommodityManage/specification',
                  },
                ],
              },
              {
                path: '/orderManage',
                icon: 'smile',
                name: 'orderManage',
                routes: [
                  {
                    path: '/',
                    redirect: '/orderManage/list',
                  },
                  {
                    path: '/orderManage/list',
                    name: 'orderManage-list',
                    icon: 'smile',
                    component: './OrderManage/list',
                  },
                ],
              },
              {
                path: '/marketingActivities',
                icon: 'smile',
                name: 'marketingActivities',
                routes: [
                  {
                    path: '/',
                    redirect: '/marketingActivities/coupon',
                  },
                  {
                    path: '/marketingActivities/coupon',
                    name: 'marketingActivities-coupon',
                    icon: 'smile',
                    component: './MarketingActivities/coupon',
                  },
                ],
              },

              {
                name: 'list.table-list',
                icon: 'table',
                path: '/list',
                component: './ListTableList',
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
