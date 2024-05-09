import React, { useEffect, useState } from 'react';
import DefaultLayout from "../components/DefaultLayout";
import axios from 'axios';
import { DeleteOutlined, EditOutlined,SearchOutlined } from "@ant-design/icons";
import { Modal, Button, Select, Form, Input, message } from 'antd';
import { Table } from "antd";
//import ItemList from "../components/ItemList";

const MedicinePage = () => {
    const [itemsData, setItemsData] = useState([]);
    const [popupModal, setPopupModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');



    //read
    const getAllItems = async () => {
        try {
            const { data } = await axios.get('/api/items/get-item');
            setItemsData(data);
        } catch (error) {
            console.log(error);
           
            
        } 
    };
    useEffect(() => {
        getAllItems();
    }, []);


//Handle Search
const handleSearch = async () => {
    const results = itemsData.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setItemsData(results);
};





    //handle delete
   const handleDelete = async(record)=>{
        try {
            await axios.delete('/api/items/delete-item', { data: { itemId: record._id } });
            message.success('Item Deleted Successfully');
           

            getAllItems();
            setPopupModal(false);
        } catch (error) {
            message.error('Something went wrong');
            console.log(error);
        }

    }






    //able data
    const columns  = [
        { title: "Name", dataIndex: "name", key: "name" },
        {
            title: "Image",
            render: (_text, record) => (
                <img src={record.image} alt={record.name} height="60" width="60" />
            ),
        },
        { title: "Price", dataIndex: "price" },
        {
            title: "Actions",
            dataIndex: "_id",
            render: (_id, _record) => (
                <div>
                    <DeleteOutlined 
                        style={{ cursor: "pointer", padding: 10 }}
                       onClick={() => {
                            handleDelete(_record);
                           
                        }}
                        
                    
                    />

                    <EditOutlined
                        style={{ cursor: "pointer", padding: 10 }}
                        onClick={() => {
                            setEditItem(_record);
                            setPopupModal(true);
                        }}
                    />
                </div>
            ),
        },
    ];



    //handle form submit
    const handleSubmit = async (value) => {
        if(editItem === null){
            try {
                const response = await axios.post('/api/items/add-item', value);
                if(response.status === 201) {
                    message.success('Item Added Successfully');
                    getAllItems();
                    setPopupModal(false);
                } else {
                    message.error('Something went wrong ');
                }
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    message.error('Validation error: ' + error.response.data.message);
                } else {
                    message.error('Something went wrong');
                    console.log(error);
                }
            }
        }else{
            try {
                await axios.put('/api/items/edit-item', {...value, itemId:editItem._id});
                message.success('Item Updated Successfully');
                getAllItems();
                setPopupModal(false);
            } catch (error) {
                message.error('Something went wrong');
                console.log(error);
            }
        }
       
    };


    return (
        <DefaultLayout>
            <div className="d-flex justify-content-between">
                <h1>Manage Medicines</h1>
                <div>
                    <input
                    placeholder='    Search by Name'
                    prefix={<SearchOutlined />}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{width:"150px",height: "30px",border:"none",boxShadow:"none",borderRadius:"15px", marginRight: "10px"}}
                    />
                   <SearchOutlined
                style={{ fontSize: "20px", cursor: "pointer" }}
                onClick={handleSearch}
            />
                </div>
                
                <Button type="primary" onClick={() => setPopupModal(true)}>ADD ITEM</Button>
            </div>
            <Table 
            columns={columns} 
            dataSource={itemsData}
            bordered
            rowKey={(record) => record._id}
             />

            {
                popupModal && (
                    <Modal
                title={`${editItem !== null ? 'Edit Item' : 'Add New Item'}`}
                open={popupModal} 
                onCancel={() => {
                    setEditItem(null);
                    setPopupModal(false);
                }}
                footer={null}
            >
                <Form layout="vertical"
                      initialValues={editItem}
                      onFinish={handleSubmit}>
                    <Form.Item name="name" label="Name"  rules={[{ required: true, message: 'Please enter the name' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter the price' } ,
                     {
                            type: 'number',
                            min: 1,
                            transform: value => parseFloat(value),
                            message: 'Price must be a positive number'
                    }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select the category' }]}>
                        <Select>
                            <Select.Option value="Tablets">Tablets</Select.Option>
                            <Select.Option value="Syrups">Syrups</Select.Option>
                            <Select.Option value="Creams">Creams</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="image" label="Image" rules={[{ required: true, message: 'Please enter the image URL' }]}>
                        <Input />
                    </Form.Item>
                    <div className="d-flex justify-content-end">
                        <Button type="primary" htmlType="submit">SAVE</Button>
                    </div>
                </Form>
            </Modal>
                )
            }
        </DefaultLayout>
    );
};

export default MedicinePage;