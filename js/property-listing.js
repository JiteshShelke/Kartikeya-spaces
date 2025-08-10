document.addEventListener("DOMContentLoaded", function () {

const scriptURL = "https://script.google.com/macros/s/AKfycbxn_i8N1FlPvK4eaZtMUced9np8R6KxESy7TVrweO99E-aFF6oUQ1FIbUvsoLUUqGJyxA/exec"; // Google Apps Script Web App URL
  const properties = [
    {
      name: "2BHK Flat in Kharghar",
      type: "residential",
      transaction: "buy",
      stage: "ongoing",
      location: "navi-mumbai",
      price: "₹85 Lakh",
      area: "950 sq.ft",
      description: "Spacious 2BHK in Sector 20 with lift & parking.",
      image: "images/s1.jpg"
    },
    {
      name: "Retail Shop in Vashi Plaza",
      type: "commercial",
      transaction: "sell",
      stage: "reposition",
      location: "navi-mumbai",
      price: "₹1.2 Cr",
      area: "450 sq.ft",
      description: "Prime retail shop in high footfall zone.",
      image: "images/s2.jpg"
    },
    {
      name: "MIDC Industrial Plot - 5000 sq.ft",
      type: "land",
      transaction: "sell",
      stage: "ongoing",
      location: "midc",
      price: "₹2.5 Cr",
      area: "5000 sq.ft",
      description: "Clear title plot for factory/warehouse.",
      image: "images/s3.jpg"
    },
  ];

  function filterProperties() {
    const type = document.getElementById("typeFilter").value;
    const transaction = document.getElementById("transactionFilter").value;
    const stage = document.getElementById("stageFilter").value;
    const location = document.getElementById("locationFilter").value;

    const filtered = properties.filter(p =>
      (!type || p.type === type) &&
      (!transaction || p.transaction === transaction) &&
      (!stage || p.stage === stage) &&
      (!location || p.location === location)
    );

    displayProperties(filtered);
  }

  function displayProperties(list) {
    const container = document.getElementById("propertyList");
    container.innerHTML = "";
    if (list.length === 0) {
      container.innerHTML = "<p class='text-center w-100'>No properties found.</p>";
      return;
    }

    list.forEach(p => {
      const col = document.createElement("div");
      col.className = "col-sm-6 col-md-4 mb-4";

      col.innerHTML = `
        <div class="box h-100 shadow-sm shadow">
          <div class="img-box">
            <img src="${p.image}" alt="${p.name}" class="img-fluid w-100" />
          </div>
          <div class="detail-box p-3 bg-white">
            <h6 class="fw-bold">${p.name}</h6>
            <p>${p.description}</p>
            <p><strong>Type:</strong> ${capitalize(p.type)}</p>
            <p><strong>Transaction:</strong> ${capitalize(p.transaction)}</p>
            <p><strong>Stage:</strong> ${capitalize(p.stage)}</p>
            <p><strong>Location:</strong> ${formatLocation(p.location)}</p>
            <p><strong>Area:</strong> ${p.area}</p>
            <p><strong>Price:</strong> ${p.price}</p>
            <a href="javascript:void(0);" onclick="openModal('${p.name}')" class="btn2 btn-sm mt-2 d-block mx-auto text-center" style="color:white; width: fit-content;">Enquiry</a>
          </div>
        </div>
      `;
      container.appendChild(col);
    });
  }

  window.filterProperties = filterProperties;

  function openModal(propertyName) {
    const property = properties.find(p => p.name === propertyName);
    if (!property) return;

    const message = `
I am interested in the following property:

🏠 Property: ${property.name}
📍 Location: ${formatLocation(property.location)}
🏷️ Type: ${capitalize(property.type)}
🔄 Transaction: ${capitalize(property.transaction)}
🚧 Stage: ${capitalize(property.stage)}
📐 Area: ${property.area}
💰 Price: ${property.price}

Please contact me with more details.`.trim();

    document.getElementById("enqProperty").value = property.name;
    document.getElementById("enqMessage").value = message;
    document.getElementById("whatsappLink").href = `https://wa.me/9322825957?text=${encodeURIComponent(message)}`;
    document.getElementById("enquiryModal").style.display = "block";
  }

  window.openModal = openModal;

  function closeModal() {
    document.getElementById("enquiryModal").style.display = "none";
  }

  window.closeModal = closeModal;

  // ✅ Send to Google Apps Script instead of formsubmit
  document.getElementById("enquiryForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const form = e.target;
    const formData = new URLSearchParams();
    formData.append("formName", "PropertyEnquiry");

    Array.from(form.elements).forEach(el => {
      if (el.name) {
        formData.append(el.name, el.value);
      }
    });

    const submitBtn = form.querySelector("button[type=submit]");
    submitBtn.disabled = true;

    fetch(scriptURL, {
      method: "POST",
      body: formData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          document.getElementById("successMsg").style.display = "block";
          form.reset();
          setTimeout(() => {
            closeModal();
            document.getElementById("successMsg").style.display = "none";
          }, 3000);
        } else {
          alert("❌ Error: " + data.message);
        }
      })
      .catch(() => {
        alert("Error sending enquiry. Please check your internet connection.");
      })
      .finally(() => {
        submitBtn.disabled = false;
      });
  });

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).replace("-", " ");
  }

  function formatLocation(loc) {
    return loc === "midc" ? "MIDC" : "Navi Mumbai";
  }

  // Initial load
  displayProperties(properties);
});
