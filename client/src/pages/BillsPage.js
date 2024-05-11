import React, { useEffect, useState, useRef } from "react";
import DefaultLayout from "./../components/DefaultLayout";
import axios from "axios";
import { EyeOutlined } from "@ant-design/icons";
import { Modal, Button, Table } from "antd";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import "jspdf-autotable"; 

const BillsPage = () => {
  const componentRef = useRef();
  const [billsData, setBillsData] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const getAllBills = async () => {
    try {
      const { data } = await axios.get("/api/bills/get-bills");

      const formattedData = data.map((bill) => ({
        ...bill,
        date: new Date(bill.date * 1000).toISOString().split("T")[0],
      }));
      setBillsData(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBills();
  }, []);


  //print
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });


  //report
  const generatePDF = () => {
    const doc = new jsPDF();
    const tableData = billsData.map((bill) => [bill.invoiceNumber, bill.date, bill.totalAmount, bill.tax]);

    doc.autoTable({
      head: [["Invoice Number", "Invoice Date", "Total Amount", "Tax"]],
      body: tableData,
    });

    doc.save("invoice_report.pdf");
  };

  const columns = [
    { title: "Invoice Number", dataIndex: "invoiceNumber", key: "name" },
    { title: "Invoice Date", dataIndex: "date" },
    { title: "Total Amount", dataIndex: "totalAmount" },
    { title: "Tax", dataIndex: "tax" },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (_id, _record) => (
        <EyeOutlined
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectedBill(_record);
            setPopupModal(true);
          }}
        />
      ),
    },
  ];

  useEffect(() => {
    console.log(selectedBill);
  }, [selectedBill]);

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Invoice List</h1>
        <Button onClick={generatePDF}>Generate Invoice Report</Button>
      </div>
      <Table columns={columns} dataSource={billsData} bordered rowKey={(record) => record._id} />

      {popupModal && (
        <Modal
        width={400}
        pagination={false}
        title="Invoice Details"
        open={popupModal}
        onCancel={() => {
          setPopupModal(false);
        }}
        footer={false}
      >



        {/**---------------------invoice model----------------------*/}
        <div id="invoice" ref={componentRef} style={{
              boxShadow: "0 0 1in -0.25in rgba(0, 0, 0, 0.5)",
              margin: "0 auto",
              width: "82mm",
              height: "90mm",
              background: "#fff",
           }}>
          <center id="top">
            <div className="logo" />
            <div className="info">
              <h2>IVORY Dental Clinic</h2>
              <p>Contact : 0704578232 || Rahula Rd, Matara </p>
            </div>
          </center>

          <div id="mid">
            <div className="mt-2">
              <p>
                Invoice Number: <b>{selectedBill.invoiceNumber}</b>
                <br />
                Date: <b>{selectedBill.date}</b>
              </p>
              <hr style={{ margin: "5px" }} />
            </div>
          </div>

          <div id="bot">
            <div id="table">
              <table>
                <tbody>
                  

                  <tr className="tabletitle">
                    <td />
                    <td />
                    <td className="rate">
                      <h5>Tax: </h5>
                    </td>
                    <td className="payment">
                      <h2>{selectedBill.tax}/-</h2>
                    </td>
                  </tr>

                  <tr className="tabletitle">
                    <td />
                    <td />
                    <td className="rate">
                      <h5>GrandTotal: </h5>
                    </td>
                    <td className="payment">
                      <h2>{selectedBill.totalAmount}/-</h2>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div id="legalcopy">
              <p className="legal">
                <strong>Thank you.Come Again!</strong>
              </p>
            </div>
          </div>
        </div>

<div className="d-flex justify-content-end mt-3">
  <Button type="primary" onClick={handlePrint}>Print</Button>
</div>



      </Modal>
      )}
    </DefaultLayout>
  );
};

export default BillsPage;
