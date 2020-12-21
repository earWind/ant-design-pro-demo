/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
} from '@ant-design/pro-layout';
import React, { useEffect, useMemo, useRef } from 'react';
import { Link, useIntl, connect, Dispatch, history } from 'umi';
import { Result, Button } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { ConnectState } from '@/models/connect';
import { getMatchMenu } from '@umijs/route-utils';
import '@/style/basiclLayout.less';
import logo from '@/assets/img/logo.png';

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);
export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
  dispatch: Dispatch;
}
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
  } = props;

  const menuDataRef = useRef<MenuDataItem[]>([]);

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }, []);

  /**
   * use Authorized check all menu item
   */
  const serverMenuItem = (): MenuDataItem[] => {
    // 没获取到缓存应该跳到登录页
    const serverMenus: MenuDataItem[] = JSON.parse(localStorage.getItem('menuData') || '[]');
    // menuList.push(...serverMenus);
    // const result = menuList.map((item) => {
    //   const localItem = {
    //     ...item,
    //     children: item.children ? serverMenuItem(item.children) : undefined,
    //   };
    //   return Authorized.check(item.authority, localItem, null) as MenuDataItem;
    // });
    // return result;

    return serverMenus;
  };
  /**
   * init variables
   */

  const handleMenuCollapse = (payload: boolean): void => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  };
  // get children authority
  const authorized = useMemo(
    () =>
      getMatchMenu(location.pathname || '/', menuDataRef.current).pop() || {
        authority: undefined,
      },
    [location.pathname],
  );

  const { formatMessage } = useIntl();

  return (
    <ProLayout
      logo={logo}
      formatMessage={formatMessage}
      {...props}
      {...settings}
      /* 菜单的折叠收起事件 */
      onCollapse={handleMenuCollapse}
      onMenuHeaderClick={() => history.push('/')}
      /* 菜单项 */
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || !menuItemProps.path) {
          return defaultDom;
        }
        return (
          <Link to={menuItemProps.path}>
            <i className="icon_img crm" style={{ display: 'inline-block' }} />
            {defaultDom}
          </Link>
        );
      }}
      /* 自定义面包屑的数据 */
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: '首页',
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      /* 从服务器加载 menu */
      menuDataRender={serverMenuItem}
      /* 自定义头右部的 render 方法 */
      rightContentRender={() => <RightContent />}
      /* 在显示前对菜单数据进行查看，修改不会触发重新渲染 */
      postMenuData={(menuData) => {
        menuDataRef.current = menuData || [];
        return menuData || [];
      }}
    >
      <Authorized authority={authorized!.authority} noMatch={noMatch}>
        {children}
      </Authorized>
    </ProLayout>
  );
};

export default connect(({ global, settings, login }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
  menuData: login.menuData,
}))(BasicLayout);
