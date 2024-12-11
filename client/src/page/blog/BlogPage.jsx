import React, { useEffect, useState } from "react";
import { request } from "../../util/conection";
import { Button, DatePicker, Form, Image, Input, InputNumber, message, Modal, Select, Space, Table, Tag, Upload } from "antd";
import { MdDelete, MdEdit, MdRemove } from "react-icons/md";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { confix, formatdayjs, formatdayjstoServer } from "../../util/config";
import dayjs from "dayjs";


const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
function BlogPage() {
  //state
  const [state, setState] = useState([]);
  const [imageDefualt, setImageDefualt] = useState([]);

  const [visible, setVisible] = useState({
    open: false,
  });
  useEffect(() => {
    getlist();
  }, []);
  const [formref] = useForm();


  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  // Handle changes for the default image upload
  const handleChangeimageDefualt = ({ fileList: newFileList }) =>
    setImageDefualt(newFileList); // Update the default image state
  const getlist = async () => {
    const res = await request("blog", "get");
    if (res && !res.error) {
      setState(res.data);
    }
  };
  const handleEdite = (item, data) => {
    openModal()
    formref.setFieldsValue({
        ...data,
        id: data.id,

        date:dayjs(data.date)
      });
      if (data.image != null && data.image != "") {
        const imgProduct = [
          {
            uid: data.image,
            name: data.image,
            status: "done",
            url: confix.image_path + data.image,
          },
        ];
        setImageDefualt(imgProduct);}
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
        const res = await request("blog/" + data.id, "delete");
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
    var params = new FormData();

    params.append("description", item.description);
    params.append("subtitle", item.subtitle);
    params.append("is_active", item.is_active);
    params.append("date", formatdayjstoServer(item.date));

    //use two key this when update
    params.append("Image1", formref.getFieldValue("image"));
    params.append("id", formref.getFieldValue("id"));
    if (item.Image_Defualt) {
      if (item.Image_Defualt?.file?.status == "removed") {
        params.append("Image_rm", "1");
      } else {
        params.append(
          "upload",
          item.Image_Defualt?.file?.originFileObj,
          item.Image_Defualt?.file?.name
        );
      }
    }
  console.log(item)
    const method = formref.getFieldValue("id")?"put":"post"
    const res = await request("blog",method,params)
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
    setImageDefualt([])
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
            title: "image",
            key: "image",
            dataIndex: "image",
            render: (image) =>
              image ? (
                <Image
                  width={50}
                  height={50}
                  src={confix.image_path + image}
                  alt="Image"
                />
              ) : (
                <div style={{ width: 50, height: 50, background: "gray" }} />
              ),
          },
          {
            title: "subtitle",
            key: "subtitle",
            dataIndex: "subtitle",
          },
          {
            title: "Description",
            key: "description",
            dataIndex: "description",
          },
          {
            title: "date",
            key: "date",
            dataIndex: "date",
            render:(date)=>formatdayjs(date)
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
            ? "Edite your blog"
            : "Add new blog"
        }>
        <Form
          className="max-w-[600px]"
          layout="vertical"
          onFinish={onFinish}
          form={formref}>
             
            <Form.Item
         
         
                label="subtitle"
                name="subtitle"
                className=""
                
                >
                <Input.TextArea
                  placeholder="Input subtitle"
                  className="h-[50px] flex items-center w-full"
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
              <Form.Item label="date" name="date" className="">
              <DatePicker className="w-full h-[45px]" placeholder="select date "/>
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
              <Form.Item label="Image" name="Image_Defualt" className="">
              <Upload
                maxCount={1}
                listType="picture-card"
                fileList={imageDefualt}
                onPreview={handlePreview}
                onChange={handleChangeimageDefualt}
                customRequest={(op) => {
                  op.onSuccess();
                }}>
                + Upload
              </Upload>
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

export default BlogPage;
