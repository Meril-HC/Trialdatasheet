<script>
    // ------------------------------------------
    // Table Functionality
    // ------------------------------------------
    const products = {
        mixed: [
            "Destiknee™ Total Knee System",
            "Opulent™ Total Knee System",
            "Freedom® Total Knee System",
            "Mitsu AB",
            "Biomine",
        ],
        healthcare: [
            "Destiknee™ Total Knee System",
            "Opulent™ Total Knee System",
            "Freedom® Total Knee System",
        ],
        endo: [
            "Mitsu AB",
            "Circular Stapler",
        ],
        "life-sciences": ["Biomine"],
    };

    const countries = ["USA", "Germany", "India", "Canada", "Japan"];
    const companySelect = document.getElementById("company-select");
    const productSelect = document.getElementById("product-select");
    const countrySelect = document.getElementById("country-select");
    const tableBody = document.getElementById("table-body");
    const dropdownSection = document.getElementById("dropdown-section");

    function updateTable(data) {
        tableBody.innerHTML = data
            .map(
                ({ country, product, status }, index) =>
                    `<tr>
                        <td>${index + 1}</td>
                        <td>
                            <div style="display: flex; align-items: center;">
                                <div class="flag" style="background-image: url('https://flagcdn.com/w40/${getCountryCode(
                                    country
                                )}.png'); background-size: cover;"></div>
                                <span>${country}</span>
                            </div>
                        </td>
                        <td>${product}</td>
                        <td>${status}</td>
                    </tr>`
            )
            .join("");
    }

    function getCountryCode(country) {
        const countryCodes = {
            USA: "us",
            Germany: "de",
            India: "in",
            Canada: "ca",
            Japan: "jp",
        };
        return countryCodes[country] || "xx";
    }

    function populateDropdown(select, items) {
        select.innerHTML = `<option>Select Product</option>`;
        items.forEach((item) => {
            const option = document.createElement("option");
            option.value = item;
            option.textContent = item;
            select.appendChild(option);
        });
    }

    function generateData(products, selectedCountry, selectedProduct) {
        const data = [];
        products.forEach((product) => {
            countries.forEach((country) => {
                if (
                    (!selectedCountry || selectedCountry === country) &&
                    (!selectedProduct || selectedProduct === product)
                ) {
                    data.push({
                        country,
                        product,
                        status: Math.random() > 0.5 ? "Reg." : "Not Reg.",
                    });
                }
            });
        });
        return data;
    }

    function filterTable() {
        const selectedCompany = companySelect.value;
        const selectedProduct =
            productSelect.value === "Select Product" ? null : productSelect.value;
        const selectedCountry =
            countrySelect.value === "Select Country" ? null : countrySelect.value;

        const availableProducts = products[selectedCompany] || products.mixed;
        const filteredData = generateData(
            availableProducts,
            selectedCountry,
            selectedProduct
        );

        updateTable(filteredData);
    }

    companySelect.addEventListener("change", () => {
        const selectedCompany = companySelect.value;
        const availableProducts = products[selectedCompany] || products.mixed;
        populateDropdown(productSelect, availableProducts);
        filterTable();
    });

    productSelect.addEventListener("change", filterTable);
    countrySelect.addEventListener("change", filterTable);

    document.querySelectorAll(".tab-button").forEach((button) =>
        button.addEventListener("click", () => {
            document
                .querySelectorAll(".tab-button")
                .forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");

            const tabId = button.dataset.tab;
            document
                .querySelectorAll(".tab-content")
                .forEach((tab) => tab.classList.remove("active"));
            document.getElementById(tabId).classList.add("active");

            // Show dropdowns and export buttons only on Table tab
            if (tabId === "table") {
                dropdownSection.classList.remove("hidden");
            } else {
                dropdownSection.classList.add("hidden");
            }
        })
    );

    // Initial Setup
    populateDropdown(productSelect, products.mixed);
    updateTable(generateData(products.mixed));
</script>