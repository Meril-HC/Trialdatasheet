<script>
        am5.ready(function () {
            // Data for all continents and their respective countries
            const companyData = {
                "Meril Healthcare": {
                    default: [
                        { country: "Europe", value: 120 },
                        { country: "Africa", value: 95 },
                        { country: "North America", value: 140 },
                        { country: "Asia", value: 110 },
                        { country: "Australia", value: 90 },
                        { country: "South America", value: 100 }
                    ],
                    Europe: [
                        { country: "Germany", value: 60 },
                        { country: "France", value: 55 },
                        { country: "UK", value: 70 },
                        { country: "Spain", value: 50 },
                        { country: "Italy", value: 45 },
                        { country: "Netherlands", value: 40 },
                        { country: "Sweden", value: 30 },
                        { country: "Norway", value: 25 },
                        { country: "Denmark", value: 20 },
                        { country: "Poland", value: 35 },
                        { country: "Greece", value: 15 },
                        { country: "Finland", value: 10 },
                        { country: "Switzerland", value: 20 }
                    ],
                    Africa: [
                        { country: "South Africa", value: 40 },
                        { country: "Nigeria", value: 35 },
                        { country: "Kenya", value: 20 },
                        { country: "Egypt", value: 25 },
                        { country: "Ethiopia", value: 30 },
                        { country: "Algeria", value: 15 },
                        { country: "Morocco", value: 10 },
                        { country: "Sudan", value: 5 },
                        { country: "Ghana", value: 12 },
                        { country: "Cameroon", value: 14 },
                        { country: "Ivory Coast", value: 18 },
                        { country: "Tunisia", value: 8 },
                        { country: "Libya", value: 6 }
                    ],
                    "North America": [
                        { country: "USA", value: 95 },
                        { country: "Canada", value: 60 },
                        { country: "Mexico", value: 45 },
                        { country: "Cuba", value: 30 },
                        { country: "Honduras", value: 25 },
                        { country: "Panama", value: 35 },
                        { country: "Guatemala", value: 20 },
                        { country: "El Salvador", value: 15 },
                        { country: "Jamaica", value: 10 },
                        { country: "Haiti", value: 12 },
                        { country: "Costa Rica", value: 20 },
                        { country: "Belize", value: 8 },
                        { country: "Bahamas", value: 6 }
                    ],
                    Asia: [
                        { country: "China", value: 80 },
                        { country: "India", value: 75 },
                        { country: "Japan", value: 85 },
                        { country: "South Korea", value: 70 },
                        { country: "Thailand", value: 60 },
                        { country: "Vietnam", value: 50 },
                        { country: "Singapore", value: 45 },
                        { country: "Malaysia", value: 40 },
                        { country: "Philippines", value: 30 },
                        { country: "Bangladesh", value: 25 },
                        { country: "Pakistan", value: 20 },
                        { country: "Sri Lanka", value: 15 },
                        { country: "Indonesia", value: 35 }
                    ],
                    Australia: [
                        { country: "Australia", value: 110 },
                        { country: "New Zealand", value: 90 },
                        { country: "Fiji", value: 45 },
                        { country: "Papua New Guinea", value: 30 },
                        { country: "Samoa", value: 25 },
                        { country: "Vanuatu", value: 20 },
                        { country: "Solomon Islands", value: 15 },
                        { country: "Kiribati", value: 10 }
                    ],
                    "South America": [
                        { country: "Brazil", value: 95 },
                        { country: "Argentina", value: 80 },
                        { country: "Chile", value: 60 },
                        { country: "Colombia", value: 50 },
                        { country: "Peru", value: 40 },
                        { country: "Venezuela", value: 35 },
                        { country: "Ecuador", value: 30 },
                        { country: "Paraguay", value: 25 },
                        { country: "Uruguay", value: 20 },
                        { country: "Bolivia", value: 15 },
                        { country: "Guyana", value: 10 },
                        { country: "Suriname", value: 12 }
                    ]
                }
            };

            // Create root element
            var root = am5.Root.new("chartdiv");

            // Set themes
            root.setThemes([am5themes_Animated.new(root)]);

            // Create chart
            var chart = root.container.children.push(
                am5xy.XYChart.new(root, {
                    panX: true,
                    panY: true,
                    wheelX: "panX",
                    wheelY: "zoomX",
                    pinchZoomX: true
                })
            );

            // Add cursor
            var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
            cursor.lineY.set("visible", false);

            // Create X-axis (categories)
            var xAxis = chart.xAxes.push(
                am5xy.CategoryAxis.new(root, {
                    categoryField: "country",
                    renderer: am5xy.AxisRendererX.new(root, {
                        minGridDistance: 30,
                        cellStartLocation: 0.2,
                        cellEndLocation: 0.8
                    }),
                    tooltip: am5.Tooltip.new(root, {})
                })
            );

            // Create Y-axis (values)
            var yAxis = chart.yAxes.push(
                am5xy.ValueAxis.new(root, {
                    renderer: am5xy.AxisRendererY.new(root, {})
                })
            );

            // Create series
            var series = chart.series.push(
                am5xy.ColumnSeries.new(root, {
                    name: "Series 1",
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: "value",
                    categoryXField: "country",
                    tooltip: am5.Tooltip.new(root, {
                        labelText: "{valueY} products registered"
                    }) // Tooltip showing custom message
                })
            );

            // Style for columns
            series.columns.template.setAll({
                cornerRadiusTL: 5,
                cornerRadiusTR: 5,
                width: am5.percent(80),
                tooltipY: 0
            });

            series.columns.template.adapters.add("fill", function (fill, target) {
                return chart.get("colors").getIndex(series.columns.indexOf(target));
            });

            series.columns.template.adapters.add("stroke", function (stroke, target) {
                return chart.get("colors").getIndex(series.columns.indexOf(target));
            });

            // Dropdown Elements
            const continentDropdown = document.getElementById("continent-dropdown");
            const companyDropdown = document.getElementById("company-dropdown");

            // Function to update chart based on selected continent and company
            function updateChart(selectedContinent, selectedCompany) {
                if (!selectedCompany || selectedCompany === "all") {
                    selectedCompany = "Meril Healthcare";
                }

                const companyDataset = companyData[selectedCompany];

                let data;
                if (selectedContinent === "all") {
                    data = companyDataset.default;
                } else {
                    data = companyDataset[selectedContinent] || [];
                }

                xAxis.data.setAll(data);
                series.data.setAll(data);
            }

            // Handle dropdown changes
            continentDropdown.addEventListener("change", function () {
                const selectedContinent = continentDropdown.value;
                const selectedCompany = companyDropdown.value;
                updateChart(selectedContinent, selectedCompany);
            });

            companyDropdown.addEventListener("change", function () {
                const selectedContinent = continentDropdown.value;
                const selectedCompany = companyDropdown.value;
                updateChart(selectedContinent, selectedCompany);
            });

            // Set default data (All Continents & Default Company)
            updateChart("all", "Meril Healthcare");

            // Animate chart on load
            series.appear(1000);
            chart.appear(1000, 100);
        });
    </script>