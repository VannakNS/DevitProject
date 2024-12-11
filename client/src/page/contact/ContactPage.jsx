import React, { useEffect, useState } from "react";
import { request } from "../../util/conection";
import { Button, Form, Input, InputNumber, message, Modal, Select, Space, Table, Tag } from "antd";
import { MdDelete, MdEdit, MdRemove } from "react-icons/md";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";

function ContactPage() {
  //state
  const [state, setState] = useState([]);
  const [visible, setVisible] = useState({
    open: false,
  });
  useEffect(() => {
    getlist();
  }, []);
  const [formref] = useForm();

  const getlist = async () => {
    const res = await request("contact", "get");
    if (res && !res.error) {
      setState(res.data);
    }
  };
  const handleEdite = (item, data) => {
    openModal()
    formref.setFieldsValue({
        ...data,
        id: data.id,
      });
  };

  const handledelete = (item, data) => {
    Modal.confirm({
      title: "Are you sure delete this Teacher?",
      icon: <ExclamationCircleFilled />,
      content: "This teacher will be delete on database",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        const res = await request("contact/" + data.id, "delete");
        if (res && !res.error) {
          getlist();
          const countDown = () => {
            let secondsToGo = 5;
            const instance = Modal.success({
              title: "This is a notification message",
              content: `This modal will be destroyed after ${secondsToGo} second.`,
            });
            const timer = setInterval(() => {
              secondsToGo -= 1;
              instance.update({
                content: `This modal will be destroyed after ${secondsToGo} second.`,
              });
            }, 1000);
            setTimeout(() => {
              clearInterval(timer);
              instance.destroy();
            }, secondsToGo * 1000);
          };

          const msg = countDown();
        }
      },
    });
  };
  const onFinish = async(item)=>{
    const method = formref.getFieldValue("id")?"put":"post"
    const res = await request("contact",method,{ id: formref.getFieldValue("id"),...item})
    if(res && !res.error){
        message.success(res.message)
        getlist()
        closeModal()
    }
  }
  const openModal = () => {
    setVisible({
      ...visible,
      open: true,
    });
  };
  const closeModal = () => {
    setVisible({
      ...visible,
      open: false,
    });
    formref.resetFields()
  };
  return (
    <div>
      <div className="w-full flex bg-white shadow-sm p-5  items-center rounded">
        <Button type="primary" onClick={openModal} className="w-[74px] py-1">
          New
        </Button>
      </div>

      <Table
        dataSource={state}
        columns={[
          {
            title: "Username",
            key: "username",
            dataIndex: "username",
          },
          {
            title: "Description",
            key: "description",
            dataIndex: "description",
          },
          {
            title: "Phone",
            key: "phone",
            dataIndex: "phone",
          },
          {
            title: "Status",
            key: "is_active",
            dataIndex: "is_active",
            render: (val) =>
              val ? (
                <Tag color="green">Active</Tag>
              ) : (
                <Tag color="red">Inactive</Tag>
              ),
          },
          {
            title: "Create By",
            key: "create_by",
            dataIndex: "create_by",
          },
          {
            title: "Action",
            key: "Action",
            dataIndex: "Action",
            align: "center",
            render: (item, data, idex) => (
              <Space>
                <Button
                  onClick={() => handleEdite(item, data)}
                  type="primary"
                  icon={<MdEdit fontSize={"25px"} />}
                />
                <Button
                  onClick={() => handledelete(item, data)}
                  type="primary"
                  danger
                  icon={<MdDelete fontSize={"25px"} />}
                />
              </Space>
            ),
          },
        ]}
      />
      <Modal
        open={visible.open}
        onCancel={closeModal}
        footer={null}
        maskClosable={false}
        title={
          formref.getFieldValue("id")
            ? "Edite your contact"
            : "Add new contact"
        }>
        <Form
          className="max-w-[600px]"
          layout="vertical"
          onFinish={onFinish}
          form={formref}>
             <Form.Item
                label="username"
                name="username"
                className=""
                rules={[
                  {
                    message: "Please input username",
                    required: true,
                  },
                ]}>
                <Input
                  placeholder="Input username"
                  className="h-[45px] flex items-center w-full"
                />
              </Form.Item>
         <Form.Item
                label="description"
                name="description"
                className=""
                
                >
                <Input.TextArea
                  placeholder="Input description"
                  className="h-[50px] flex items-center w-full"
                />
              </Form.Item>
              <Form.Item label="Phone Number" name="phone" className="" rules={[
                  {
                    message: "Please input Phone number",
                    required: true,
                  },
                ]}>
                <InputNumber
                  placeholder="phone"
                  className="h-[45px] flex items-center w-full"
                />
              </Form.Item>
              <Form.Item
                className=""
                name="is_active"
                label="Status"
                >
                <Select className="h-[45px]" placeholder="select status">
                  <Select.Option value="1">Active</Select.Option>
                  <Select.Option value="0">Inactive</Select.Option>
                </Select>
              </Form.Item>
          <Space className="justify-end flex">
            <Button
              htmlType="reset"
              type="defualt"
              className="text-[15px] font-jetbrains">
              reset
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              className="text-[15px] py-[18px] font-jetbrains">
              {formref.getFieldValue("id") ? "Edite" : "Submit"}
            </Button>
          </Space>
        </Form>
      </Modal>
    </div>
  );
}

export default ContactPage;
