import React, { FC, useEffect } from 'react';
import moment from 'moment';
import { Modal, Form, DatePicker, Input, Select } from 'antd';
import { BasicListItemDataType } from '@/types/commodity';

interface OperationModalProps {
  visible: boolean;
  current: Partial<BasicListItemDataType> | undefined;
  onSubmit: (values: BasicListItemDataType) => void;
  onCancel: () => void;
}

const { TextArea } = Input;
const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const Operation: FC<OperationModalProps> = (props) => {
  const [form] = Form.useForm();
  const { visible, current, onCancel, onSubmit } = props;

  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
  }, [props.visible]);

  useEffect(() => {
    if (current) {
      form.setFieldsValue({
        ...current,
        createdAt: current.createdAt ? moment(current.createdAt) : null,
      });
    }
  }, [props.current]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(values as BasicListItemDataType);
    }
  };

  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  const getModalContent = () => {
    return (
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        <Form.Item
          name="title"
          label="任务名称"
          rules={[{ required: true, message: '请输入任务名称' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="createdAt"
          label="开始时间"
          rules={[{ required: true, message: '请选择开始时间' }]}
        >
          <DatePicker
            showTime
            placeholder="请选择"
            format="YYYY-MM-DD HH:mm:ss"
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          name="owner"
          label="任务负责人"
          rules={[{ required: true, message: '请选择任务负责人' }]}
        >
          <Select placeholder="请选择">
            <Select.Option value="付晓晓">付晓晓</Select.Option>
            <Select.Option value="周毛毛">周毛毛</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="subDescription"
          label="产品描述"
          rules={[{ message: '请输入至少五个字符的产品描述！', min: 5 }]}
        >
          <TextArea rows={4} placeholder="请输入至少五个字符" />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      title={`商品${current ? '编辑' : '添加'}`}
      width={640}
      bodyStyle={{ padding: '28px 0 0' }}
      destroyOnClose
      visible={visible}
      {...modalFooter}
      // Modal 设置 forceRender 将其预渲染，即可关联form
      forceRender
    >
      {getModalContent()}
    </Modal>
  );
};

export default Operation;
