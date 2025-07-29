
// contact us form start

document.addEventListener("DOMContentLoaded", function () {
  function handleFormSubmit(formId, successMsgId) {
    const form = document.getElementById(formId);
    const successMsg = document.getElementById(successMsgId);
    if (!form || !successMsg) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(form);
      const submitBtn = form.querySelector("button[type=submit]");
      submitBtn.disabled = true;

      fetch("https://formsubmit.co/ajax/jitesh.trueview@gmail.com", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
        .then(res => {
          if (res.ok) {
            successMsg.style.display = "block";
            form.reset();
            setTimeout(() => successMsg.style.display = "none", 3000);
          } else {
            alert("❌ Something went wrong. Please try again.");
          }
        })
        .catch(() => {
          alert("⚠️ Network error. Please check your internet connection.");
        })
        .finally(() => {
          submitBtn.disabled = false;
        });
    });
  }

  handleFormSubmit("quoteEnquiryForm", "quoteSuccessMsg");
});

// contact us form end 




// rent & buy enquiry start

    document.addEventListener("DOMContentLoaded", function () {
      function handleFormSubmit(formId, successMsgId) {
        const form = document.getElementById(formId);
        const successMsg = document.getElementById(successMsgId);
        if (!form || !successMsg) return;

        form.addEventListener("submit", function (e) {
          e.preventDefault();
          const formData = new FormData(form);
          const submitBtn = form.querySelector("button[type=submit]");
          submitBtn.disabled = true;

          fetch("https://formsubmit.co/ajax/jitesh.trueview@gmail.com", {
            method: "POST",
            body: formData,
            headers: { 'Accept': 'application/json' }
          })
            .then(res => {
              if (res.ok) {
                successMsg.style.display = "block";
                form.reset();
                setTimeout(() => successMsg.style.display = "none", 3000);
              } else {
                alert("❌ Something went wrong. Please try again.");
              }
            })
            .catch(() => {
              alert("⚠️ Network error. Please check your internet connection.");
            })
            .finally(() => {
              submitBtn.disabled = false;
            });
        });
      }

      handleFormSubmit("rentEnquiryForm", "rentSuccessMsg");
      handleFormSubmit("buyEnquiryForm", "buySuccessMsg");
    });
  
