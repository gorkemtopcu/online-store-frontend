import React, { useEffect, useState } from "react";
import { DatePicker, Table, Button, Spin, Alert, Typography } from "antd";
import InvoiceService from "services/InvoiceService";
import dayjs from "dayjs";

const { Title } = Typography;
const { RangePicker } = DatePicker;

const InvoicesList = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDates, setSelectedDates] = useState(null); // State to store selected dates

  useEffect(() => {
    fetchInvoicesByCurrentDateRange();
  }, []);

  const fetchInvoicesByCurrentDateRange = async () => {
    const today = dayjs();
    const startDate = today.startOf("month");
    const endDate = today.endOf("month");

    await fetchInvoicesByDateRange(
      startDate.format("YYYY-MM-DD"),
      endDate.format("YYYY-MM-DD")
    );

    setSelectedDates([startDate, endDate]);
  };

  const fetchInvoicesByDateRange = async (startDate, endDate) => {
    setLoading(true);
    setError(null);

    try {
      const data = await InvoiceService.fetchInvoicesByDateRange(
        startDate,
        endDate
      );
      const sortedData = data.sort((a, b) => b.date.localeCompare(a.date));
      setInvoices(Array.isArray(sortedData) ? sortedData : []);
    } catch (err) {
      console.error("Error fetching invoices:", err);
      setError("An error occurred while fetching invoices.");
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (dates) => {
    setSelectedDates(dates); // Update the selected dates state
    if (dates && dates.length === 2) {
      const [startDate, endDate] = dates.map((date) =>
        date.format("YYYY-MM-DD")
      );
      fetchInvoicesByDateRange(startDate, endDate);
    } else {
      setInvoices([]); // Reset invoices when no range is selected
    }
  };

  const downloadInvoice = async (invoice) => {
    try {
      const url = await InvoiceService.fetchInvoiceByOrderId(invoice.id);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Invoice_${invoice.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading invoice:", error);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Spin size="large" />
        <Typography.Text>Loading invoices...</Typography.Text>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Title level={3}>Display Invoices</Title>
      <RangePicker
        value={selectedDates} // Controlled by state
        onChange={handleDateChange}
        style={{ marginBottom: "20px" }}
      />
      <Table
        dataSource={invoices.map((invoice) => ({
          id: invoice.orderId,
          date: invoice.date,
          fileName: invoice.fileName,
        }))}
        columns={[
          { title: "Invoice ID", dataIndex: "id", key: "id" },
          { title: "Date", dataIndex: "date", key: "date" },
          {
            title: "Actions",
            key: "actions",
            render: (_, invoice) => (
              <Button onClick={() => downloadInvoice(invoice)}>Download</Button>
            ),
          },
        ]}
        rowKey="id"
        locale={{ emptyText: "No invoices found for the selected date range." }}
      />
    </div>
  );
};

export default InvoicesList;
