import React from 'react';
import { Card, Cascader, Button } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { history } from 'umi';

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
          {
            value: 'xiasha',
            label: 'Xia Sha',
            disabled: true,
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua men',
          },
        ],
      },
    ],
  },
];

function onChange(value: string[], selectedOptions: any[]): void {
  console.log(value, selectedOptions);
}

function filter(inputValue: string, path: string): boolean {
  return path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
}

const List: React.FC<{}> = () => {
  return (
    <PageContainer title={false}>
      <Card bordered={false} title="选择商品分类">
        <Cascader
          size="large"
          style={{ width: '400px' }}
          options={options}
          onChange={onChange}
          placeholder="Please select"
          showSearch={{ filter }}
        />

        <br />
        <Button
          type="primary"
          size="large"
          style={{ marginTop: '20px' }}
          onClick={() => {
            history.push({
              pathname: '/commodity/edit',
              query: {
                a: 'b',
              },
            });
          }}
        >
          下一步，发布商品
        </Button>
      </Card>
    </PageContainer>
  );
};

export default List;
