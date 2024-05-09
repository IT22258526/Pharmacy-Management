import React, { useState, useEffect } from "react";
import DefaultLayout from "./../components/DefaultLayout";
import { DeleteOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { Table, Button, Modal, Form, Input, Select, DatePicker, message } from 'antd';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const PurchasesPage = () => {
  const location = useLocation();
  const initialBillItems = location.state?.billItems || [];
  const [billItems, setBillItems] = useState(initialBillItems);
  const [subTotal, setSubTotal] = useState(0);
  const [billPopup, setBillPopup] = useState(false);
  const navigate = useNavigate();


//handle delete

  console.log("Received billItems in PurchasesPage:", billItems);
  const handleDeleteItem = (recordId) => {
    const updatedBillItems = billItems.filter((item) => item._id !== recordId);
    setBillItems(updatedBillItems);
  };



//handle increased

  const handleIncreaseQuantity = (recordId) => {
    const updatedBillItems = billItems.map((item) => {
      if (item._id === recordId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setBillItems(updatedBillItems);
  };



//handle decreased

  const handleDecreaseQuantity = (recordId) => {
    const updatedBillItems = billItems.map((item) => {
      if (item._id === recordId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setBillItems(updatedBillItems);
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Image',
      dataIndex: 'image',
      render: (image, record) => (
        <img src={image} alt={record.name} height="60" width="60" />
      ),
    },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    {
      title: 'Quantity',
      dataIndex: '_id',
      render: (_id, record) => (
        <div>
          <Button type="primary" size="small" icon={<PlusOutlined />} style={{ backgroundColor: '  rgb(100, 216, 251)'}} onClick={() => handleIncreaseQuantity(_id)} />
          <span style={{ margin: "0 8px" }}>{record.quantity}</span>
          <Button type="primary" size="small" icon={<MinusOutlined />} style={{ backgroundColor: ' rgb(147, 186, 198)'}} onClick={() => handleDecreaseQuantity(_id)} />
        </div>
      ),
    },
    {
      title: 'Action',
      dataIndex: '_id',
      key: 'action',
      render: (_id, _record) => <DeleteOutlined onClick={() => handleDeleteItem(_id)} style={{ cursor: "pointer" }} />,
    },
  ];


  //subtotal

  useEffect(() => {
    let temp = 0;
    billItems.forEach(item => temp += (item.price * item.quantity));
    setSubTotal(temp);
  }, [billItems]);


  
  const handleSubmit = async (values) => {
    try {
      const newObject = {
        invoiceNumber: values.invoiceNumber,
        date: values.date.unix(), 
        totalAmount: subTotal, 
        tax: Number(((subTotal / 100) * 5).toFixed(2)), 
        paymentMethod: values.paymentMethod,
        billItems: billItems.map(item => item._id)
        
      };
      if (billItems.every(item => item._id)) {
        await axios.post('/api/bills/add-bills', newObject);
        message.success('Bill Generated Successfully');
        navigate('/bills');
      } else {
        message.error('One or more bill items are missing _id property');
      }
    } catch (error) {
      message.error('Something went wrong');
      console.error(error);
    }
  };

  return (
    <DefaultLayout>
      <div>
        <h1>Purchases Page</h1>
        <Table columns={columns} dataSource={billItems} bordered  />
        <div className="d-flex flex-column align-item-end">
          <hr />
          <h3>
            SUB TOTAL :  <b>{subTotal}</b> /=
          </h3>
          <Button type="primary" onClick={() => setBillPopup(true)} style={{ marginRight: '550px', width: '185px', height: '60px', color: 'white', backgroundColor: ' rgb(53, 117, 190)' }}>
            <h4>Create Invoice</h4>
          </Button>
        </div>
      </div>
      <Modal
        title="Create Invoice"
        open={billPopup}
        onCancel={() => setBillPopup(false)}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item name="invoiceNumber" label="Invoice Number" rules={[{ required: true, message: 'Please enter the invoice number' },
          
          {
            type: 'number',
            min: 1,
            transform: value => parseFloat(value),
            message: 'Invoice number must be a positive number'
           }]}>

            <Input />
          </Form.Item>
          <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please select the date' }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item name="paymentMethod" label="Payment Method" rules={[{ required: true, message: 'Please select the method' }]}>
            <Select>
              <Select.Option value="cash">Cash</Select.Option>
              <Select.Option value="card">Card</Select.Option>
            </Select>
          </Form.Item>
          <div className="bill-it">
            <h5>
              Sub Total: <b>{subTotal}</b>
            </h5>
            <h5>
              TAX :
              <b>{((subTotal / 100) * 5).toFixed(2)}</b>
            </h5>
            <h3>
              GRAND TOTAL = <b>
                {Number(subTotal) + Number(((subTotal / 100) * 5).toFixed(2))}
              </b> /-
            </h3>
          </div>
          <div className="d-flex justify-content-end">
            <Button type="primary" htmlType="submit">Generate Bill</Button>
          </div>
        </Form>
      </Modal>
    </DefaultLayout>
  );
};

export default PurchasesPage;
