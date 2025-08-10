document.addEventListener("DOMContentLoaded", function () {
  const scriptURL = "https://script.google.com/macros/s/AKfycbxn_i8N1FlPvK4eaZtMUced9np8R6KxESy7TVrweO99E-aFF6oUQ1FIbUvsoLUUqGJyxA/exec"; // Google Apps Script Web App URL


  // ...existing code...
  handleFormSubmit("quoteEnquiryForm", "ContactUs", "quoteSuccessMsg");
  handleFormSubmit("rentEnquiryForm", "Rent", "rentSuccessMsg");
  handleFormSubmit("buyEnquiryForm", "Buy", "buySuccessMsg");
  handleFormSubmit("enquiryForm", "PropertyEnquiry", "successMsg");
// ...existing code...

  function handleFormSubmit(formId, formName, successId) {
    const form = document.getElementById(formId);
    const successMsg = document.getElementById(successId);

    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Collect form data manually
        const formData = new URLSearchParams();
        formData.append("formName", formName);
        Array.from(form.elements).forEach(el => {
          if (el.name) {
            formData.append(el.name, el.value);
          }
        });

        fetch(scriptURL, {
          method: "POST",
          body: formData,
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
          .then(res => res.json())
          .then(data => {
            if (data.status === "success") {
              successMsg.style.display = "block";
              form.reset();
              setTimeout(() => {
                successMsg.style.display = "none";
              }, 4000);
            } else {
              alert("❌ Error: " + data.message);
            }
          })
          .catch(err => {
            console.error("Error!", err);
            alert("❌ Submission failed. Please try again.");
          });
      });
    }
  }
});
