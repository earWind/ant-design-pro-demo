import React, { useState, useRef } from 'react';
import { Button, Modal } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { history } from 'umi';

import { TableListItem, BasicListItemDataType } from '@/types/commodity';
import { queryCommodityList } from '@/api/commodity';
import Operation from './components/Operation';

const TableList: React.FC<{}> = () => {
  // 新建窗口的弹窗
  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<Partial<BasicListItemDataType> | undefined>(undefined);
  // 列表多选
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);

  const actionRef = useRef<ActionType>();

  const columns: ProColumns<TableListItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '商品编码',
      dataIndex: 'code',
    },
    {
      title: '商品名称',
      dataIndex: 'name',
    },
    {
      title: '销售价（元）',
      dataIndex: 'callNo',
      search: false,
    },
    {
      title: '库存量',
      dataIndex: 'descdesc',
      search: false,
    },
    {
      title: '累计销量',
      dataIndex: 'progress',
      search: false,
    },
    {
      title: '30日销量',
      dataIndex: 'key',
      search: false,
    },
    {
      title: '商品状态',
      dataIndex: 'status',
      initialValue: 'all',
      filters: false,
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        open: {
          text: '在售中',
          status: '0',
        },
        closed: {
          text: '已售罄',
          status: '1',
        },
        processing: {
          text: '已下架',
          status: 'Processing',
        },
      },
    },
    {
      title: '商品分类',
      dataIndex: 'types',
      initialValue: 'all',
      filters: false,
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        open: {
          text: '家具定制',
          status: 'Error',
        },
        closed: {
          text: '窗帘护理',
          status: 'Success',
        },
      },
    },
    {
      title: '创建时间',
      width: 140,
      key: 'since',
      dataIndex: 'createdAt',
      valueType: 'date',
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, row) => [
        <a
          key="modify"
          onClick={() => {
            history.push({
              pathname: '/commodity/selectSort',
              query: {
                row
              },
            });
          }}
        >
          编辑
        </a>,
        <a key="delete">上架</a>,
        <a key="delete">复制</a>,
        <a
          key="details"
          onClick={() => {
            console.log(row);
          }}
        >
          详情
        </a>,
      ],
    },
  ];

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = (values: BasicListItemDataType) => {
    console.log(values);
  };

  const btnHandel = (type: string) => {
    if (type === 'add') {
      setVisible(true);
    } else if (type === 'delete') {
      Modal.confirm({
        title: '删除商品',
        content: '确定批量删除商品吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          console.log(selectedRowsState);
        },
      });
    }
  };

  return (
    <PageContainer title={false}>
      <ProTable<TableListItem>
        headerTitle="数据列表"
        // 自定义触发table 的 reload 等操作
        actionRef={actionRef}
        // 自定义搜索表单
        search={{
          labelWidth: 120,
          defaultCollapsed: true, // 默认收起来
          optionRender: ({ searchText, resetText }, { form }) => [
            <Button
              key="search"
              type="primary"
              onClick={() => {
                form?.submit();
              }}
            >
              {searchText}
            </Button>,
            <Button
              key="rest"
              onClick={() => {
                form?.resetFields();
              }}
            >
              {resetText}
            </Button>,
          ],
        }}
        // 渲染工具栏
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={() => setVisible(true)}>
            <PlusOutlined />
            新增
          </Button>,
          <Button
            key="key"
            onClick={() => {
              btnHandel('delete');
            }}
            disabled={selectedRowsState.length === 0}
          >
            <DeleteOutlined />
            批量删除
          </Button>,
        ]}
        // 列定义
        columns={columns}
        // 获取data的方法
        request={(params, sorter, filter) => queryCommodityList({ ...params, sorter, filter })}
        // 批量操作
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {/* 编辑弹窗 */}
      <Operation
        current={current}
        visible={visible}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </PageContainer>
  );
};

export default TableList;
