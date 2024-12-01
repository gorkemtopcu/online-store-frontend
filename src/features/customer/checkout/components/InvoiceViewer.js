import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";

const InvoiceViewer = ({ invoiceId, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/invoice/download?invoiceId=${invoiceId}`);
        if (!response.ok) throw new Error("Failed to fetch invoice");

        const blob = await response.blob();
        console.log("[DEBUG] Blob Size:", blob.size); // Debug için ekleme
        if (blob.size === 0) {
          throw new Error("Received an empty PDF file");
        }
        const url = URL.createObjectURL(blob);
        console.log("[DEBUG] PDF URL:", url); // Debug için URL
        setPdfUrl(url);
      } catch (error) {
        console.error("Error fetching invoice:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [invoiceId]); // Sadece invoiceId bağımlı
  // Eğer 'invoiceId' değişirse yeniden çalışır.

  return (
    <Modal
      open={!!pdfUrl}
      title="Invoice"
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
      onCancel={onClose}
      width={800}
    >
      {loading && <p>Loading invoice...</p>}
      {pdfUrl && (
        <iframe
          src={pdfUrl}
          width="100%"
          height="600px"
          title={`Invoice-${invoiceId}`}
        />
      )}
    </Modal>
  );
};

export default InvoiceViewer;
