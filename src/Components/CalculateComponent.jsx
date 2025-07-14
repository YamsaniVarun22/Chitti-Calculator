import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../StyleSheets/CalculateComponent.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function CalculateComponent() {
  const [formData, setFormData] = useState({
    name: "",
    principleAmount: "",
    month: "",
    commission: "",
    currentMonthInstalmentPaidOrNot: "",
    pendingAmount: "",
  });
  const [commission, setCommission] = useState();
  const [intrest, setIntrest] = useState();
  const [currentMonthAmount, setCurrentMonthAmount] = useState();
  const [totalAmount, setTotalAmount] = useState();
  const [grandTotalAmount, setGrandTotalAmount] = useState();
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const calculate = (e) => {
    e.preventDefault();
    setShow(true);
    let comm = (formData.commission * formData.principleAmount) / 100;
    setCommission(comm);
    let intr = (formData.principleAmount / 100) * (formData.month - 1);
    setIntrest(intr);
    let result = parseInt(formData.principleAmount) + parseInt(intr);
    setTotalAmount(result);

    if (formData.currentMonthInstalmentPaidOrNot === "paid") {
      setGrandTotalAmount(result - (comm + parseInt(formData.pendingAmount)));
    } else {
      if (formData.principleAmount === "25000") {
        setGrandTotalAmount(
          result - (comm + 1250 + parseInt(formData.pendingAmount))
        );
        setCurrentMonthAmount(1250);
      } else if (formData.principleAmount === "50000") {
        setGrandTotalAmount(
          result - (comm + 2500 + parseInt(formData.pendingAmount))
        );
        setCurrentMonthAmount(2500);
      } else if (formData.principleAmount === "100000") {
        setGrandTotalAmount(
          result - (comm + 5000 + parseInt(formData.pendingAmount))
        );
        setCurrentMonthAmount(5000);
      } else if (formData.principleAmount === "200000") {
        setGrandTotalAmount(
          result - (comm + 10000 + parseInt(formData.pendingAmount))
        );
        setCurrentMonthAmount(10000);
      } else if (formData.principleAmount === "300000") {
        setGrandTotalAmount(
          result - (comm + 15000 + parseInt(formData.pendingAmount))
        );
        setCurrentMonthAmount(15000);
      } else if (formData.principleAmount === "400000") {
        setGrandTotalAmount(
          result - (comm + 20000 + parseInt(formData.pendingAmount))
        );
        setCurrentMonthAmount(20000);
      } else if (formData.principleAmount === "500000") {
        setGrandTotalAmount(
          result - (comm + 25000 + parseInt(formData.pendingAmount))
        );
        setCurrentMonthAmount(25000);
      }
    }
    console.log("com" + comm);
    console.log("int" + intr);
    console.log("res" + result);
    console.log(totalAmount);
    console.log(grandTotalAmount);
  };

  const generatePDF = () => {
  const input = document.getElementById('calc-summary');
  html2canvas(input, {
    scale: 2, // Increase for better resolution; adjust as needed
    useCORS: true,
    windowWidth: 794, // A4 width in pixels at 96 DPI (approx.)
    windowHeight: 1123 // A4 height in pixels at 96 DPI (approx.)
  }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(formData.name+' Chitti-Summary.pdf');
  });
};

  return (
    <>
      {!show && (
        <div className="container py-5">
          <div className="form-wrapper mx-auto">
            <form>
              <h4 className="mb-4 text-light">Calculate Chitti Plan</h4>

              {/* Name */}
              <div className="row mb-3 align-items-center">
                <label className="col-sm-4 col-form-label text-light">
                  Name
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Chitti Plan */}
              <div className="row mb-3 align-items-center">
                <label className="col-sm-4 col-form-label text-light">
                  Chitti Plan
                </label>
                <div className="col-sm-8">
                  <select
                    className="form-select"
                    name="principleAmount"
                    value={formData.principleAmount}
                    onChange={handleChange}
                  >
                    <option value="">-- Select --</option>
                    <option value="25000">25000</option>
                    <option value="50000">50000</option>
                    <option value="100000">100000</option>
                    <option value="200000">200000</option>
                    <option value="300000">300000</option>
                    <option value="400000">400000</option>
                    <option value="500000">500000</option>
                  </select>
                </div>
              </div>

              {/* Month */}
              <div className="row mb-3 align-items-center">
                <label className="col-sm-4 col-form-label text-light">
                  Month
                </label>
                <div className="col-sm-8">
                  <input
                    type="number"
                    min="1"
                    max="20"
                    default="1"
                    className="form-control"
                    name="month"
                    value={formData.month}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Commission */}
              <div className="row mb-3 align-items-center">
                <label className="col-sm-4 col-form-label text-light">
                  Commission in %
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    name="commission"
                    value={formData.commission}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Instalment Paid */}
              <div className="row mb-3 align-items-center">
                <label className="col-sm-4 col-form-label text-light">
                  Current Instalment
                </label>
                <div className="col-sm-8">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="currentMonthInstalmentPaidOrNot"
                      value="paid"
                      checked={
                        formData.currentMonthInstalmentPaidOrNot === "paid"
                      }
                      onChange={handleChange}
                    />
                    <label className="form-check-label text-light">Paid</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="currentMonthInstalmentPaidOrNot"
                      value="not paid"
                      checked={
                        formData.currentMonthInstalmentPaidOrNot === "not paid"
                      }
                      onChange={handleChange}
                    />
                    <label className="form-check-label text-light">
                      Not Paid
                    </label>
                  </div>
                </div>
              </div>

              {/* Pending Amount */}
              <div className="row mb-4 align-items-center">
                <label className="col-sm-4 col-form-label text-light">
                  Pending Amount
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    name="pendingAmount"
                    defualt="0"
                    value={formData.pendingAmount}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                className="btn btn-primary w-100"
                onClick={(event) => calculate(event)}
              >
                Calculate
              </button>
            </form>
          </div>
        </div>
      )}
      {show && (
        <div className="container py-5">
          <div className="calc-wrapper mx-auto"style={{ position: "relative" }}>
             <div className="top-right-icon">
                <i className="bi bi-download" onClick={() => generatePDF()}></i>
              </div>
            <div id="calc-summary">
              <h4 className="mb-4">Calculation Summary</h4>
              <h4 className="mb-4">{formData.name}</h4>

              <div className="row mb-2">
                <div className="col-6 fw-bold">Principal Amount</div>
                <div className="col-6 text-success fw-bold">
                  +{formData.principleAmount}
                </div>
              </div>

              <div className="row mb-2">
                <div className="col-6 fw-bold">
                  Interest for {formData.month} months
                </div>
                <div className="col-6 text-success fw-bold">+{intrest}</div>
              </div>

              <hr className="border-dark" />

              <div className="row mb-2">
                <div className="col-6 fw-bold">Total</div>
                <div className="col-6 text-success fw-bold">{totalAmount}</div>
              </div>

              <hr className="border-dark" />

              <div className="row mb-2">
                <div className="col-6 fw-bold">Commission</div>
                <div className="col-6 text-danger fw-bold">−{commission}</div>
              </div>

              {formData.currentMonthInstalmentPaidOrNot === "not paid" && (
                <div className="row mb-2">
                  <div className="col-6 fw-bold">Current Month Instalment</div>
                  <div className="col-6 text-danger fw-bold">
                    −{currentMonthAmount}
                  </div>
                </div>
              )}

              <div className="row mb-2">
                <div className="col-6 fw-bold">Pending Amount</div>
                <div className="col-6 text-danger fw-bold">
                  −{formData.pendingAmount}
                </div>
              </div>

              <hr className="border-dark" />

              <div className="row mb-3">
                <div className="col-6 fw-bold">Grand Total</div>
                <div className="col-6 text-success fw-bold">
                  {grandTotalAmount}
                </div>
              </div>
            </div>
            <div>
              <button
                className="btn btn-secondary w-100"
                onClick={() => setShow(!show)}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CalculateComponent;
