import React,{ useState, useEffect } from 'react';
import { Form, Input, Modal, Select, message, Table, DatePicker } from 'antd';
import { EditOutlined, DeleteOutlined} from '@ant-design/icons';
import Layout from './../components/Layout/Layout';
import axios from 'axios';
import Spinner from './../components/Layout/Spinner';
import moment from "moment";

const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading]= useState(false);
  const [allApplication, setAllApplication]= useState([]);
  const [frequency, setFrequency]= useState('7');
  const [selectedDate, setSelectedDate]= useState([]);
  const [editable, setEditable]= useState(null);

  //table data
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Personal details",
      dataIndex: "personalDetails",
    },
    {
      title: "Income",
      dataIndex: "income",
    },
    {
      title: "Expenses",
      dataIndex: "expenses",
    },
    {
      title: "Assets",
      dataIndex: "assets",
    },
    {
      title: "Liabilities",
      dataIndex: "liabilities",
    },
    {
      title: "Actions",
      render: (_text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

  //useEffect Hook
  useEffect(() => {
  //get all applications
  const getAllApplication = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setLoading(true);
      const res = await axios.post('/application/get-application', {
        userid: user._id,
        frequency,
        selectedDate,
      });
      setLoading(false);
      setAllApplication(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      message.error(error.response?.data?.message || 'FTech Issue with Application. Application failed');
    }
  };
  
  getAllApplication();
  }, [frequency, selectedDate])

  //delete handler
  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post('/application/delete-application', {applicationId:record._id});
      setLoading(false);
      message.success("Application Deleted");
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error(error.response?.data?.message || 'unable to delete');
    }
  };

  //form handling
  const handleSubmit = async (values) => {
      console.log(values)
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        setLoading(true);
        if(editable){
          await axios.post("/application/edit-application", {
            payload:{
              ...values,
              userid: user._id,
            },
            applicationId: editable._id
          });
          setLoading(false);
          message.success("Application updated succesfully");
        } else {
          await axios.post("/application/add-application", {
            ...values,
            userid: user._id,
          });
          setLoading(false);
          message.success("Application added succesfully");
        }
        setShowModal(false);
        setEditable(null);
      } catch (error) {
        setLoading(false);
        message.error(error.response?.data?.message || 'Application failed');
      }

  }
  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">Last 1 week</Select.Option>
            <Select.Option value="30">Last 1 month</Select.Option>
            <Select.Option value="365">Last 1 year</Select.Option>
            <Select.Option value="custom">custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedDate(values)}
            />
          )}
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
      </div>
      <div className="content">
        <Table columns={columns} dataSource={allApplication} />
      </div>
      <Modal
        title={editable ? "Edit Application" : "Add Application"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form
          layout="vertival"
          onFinish={handleSubmit}
          initialValues={editable}
        >
          <Form.Item label="Personal details" name="personalDetails">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Income" name="income">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Expenses" name="expenses">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Assets" name="assets">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Liabilities" name="liabilities">
            <Input type="text" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              {" "}
              Save
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;