import React from 'react';
import { Card } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';

const List: React.FC<{}> = (props) => {
  const { location } = props;
  console.log(location.query);
  return (
    <PageContainer title={false}>
      <Card bordered={false} title="基础信息">
        12
      </Card>
      <Card bordered={false} title="图文描述" style={{ marginTop: 15 }}>
        12
      </Card>
      <Card bordered={false} title="销售信息" style={{ marginTop: 15 }}>
        12
      </Card>
      <Card bordered={false} title="销售信息" style={{ marginTop: 15 }}>
        12
      </Card>
    </PageContainer>
  );
};

export default List;
