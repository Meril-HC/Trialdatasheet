<script>
am5.ready(function () {
  // Create root
  var root = am5.Root.new("piechartdiv");
  root.setThemes([am5themes_Animated.new(root)]);
// Create a container for both pie charts with horizontal layout
  var container = root.container.children.push(
    am5.Container.new(root, {
      width: am5.p100,
      height: am5.p100,
      layout: root.horizontalLayout, // Align charts horizontally
      paddingTop: 20,
      paddingBottom: 20,
      paddingLeft: 40, // Added space on the left
      paddingRight: 40, // Added space on the right
      spacing: 80, // Space between the two charts
    })
  );

  // First Pie Chart: Continents or Countries
  var chart = container.children.push(
    am5percent.PieChart.new(root, {
      tooltip: am5.Tooltip.new(root, {}),
      width: am5.percent(60), // Allocate 60% of container width
      height: am5.percent(100),
    })
  );

  var series = chart.series.push(
    am5percent.PieSeries.new(root, {
      valueField: "value",
      categoryField: "category",
    })
  );

  // Adjust labels for the first chart to prevent overlapping
  series.labels.template.setAll({
    textType: "circular", // Align text around the circle
    radius: 0, // Push labels outside the pie chart
    maxWidth: 140, // Limit label width
    oversizedBehavior: "wrap", // Wrap long text
    fontSize: "12px", // Adjust font size for better readability
    textAlign: "middle", // Center-align text
  });
  // Enable and style straight leader lines (ticks) for the first chart
  series.ticks.template.setAll({
    stroke: am5.color(0x000000), // Dark gray color for lines
    strokeWidth: 2, // Line thickness
    strokeDasharray: [], // Solid line
    visible: true, // Ensure the ticks are visible
    length: 20, // Length of the straight lines
  });

  series.slices.template.set("toggleKey", "none");

  // Second Pie Chart: Companies
  var subChart = container.children.push(
    am5percent.PieChart.new(root, {
      tooltip: am5.Tooltip.new(root, {}),
      width: am5.percent(40), // Allocate 40% of container width
      height: am5.percent(70), // Make the second pie chart smaller
    })
  );

  var subSeries = subChart.series.push(
    am5percent.PieSeries.new(root, {
      valueField: "value",
      categoryField: "category",
    })
  );

  // Adjust labels for the second chart to prevent overlapping
  subSeries.labels.template.setAll({
    textType: "circular", // Align text around the circle
    radius: -10, // Push labels further outside the pie chart
    maxWidth: 100, // Limit label width for smaller chart
    oversizedBehavior: "wrap", // Wrap long text
    fontSize: "11px", // Adjust font size for readability
    textAlign: "middle", // Center-align text
  });
  
  // Enable and style straight leader lines (ticks) for the second chart
  subSeries.ticks.template.setAll({
    stroke: am5.color(0x000000), // Dark gray color for lines
    strokeWidth: 2, // Line thickness
    strokeDasharray: [], // Solid line
    visible: true, // Ensure the ticks are visible
    length: 20, // Length of the straight lines
  });

  // Data
  var data = {
    all: {
    continents: [
      { category: "Europe", value: 15000, companies: { "Meril Healthcare": 5000, "Meril Life-Science": 5000, "Meril Endo-Surgery": 5000 } },
      { category: "Africa", value: 12000, companies: { "Meril Healthcare": 4000, "Meril Life-Science": 4000, "Meril Endo-Surgery": 4000 } },
      { category: "North America", value: 18000, companies: { "Meril Healthcare": 6000, "Meril Life-Science": 6000, "Meril Endo-Surgery": 6000 } },
      { category: "Asia", value: 22000, companies: { "Meril Healthcare": 8000, "Meril Life-Science": 7000, "Meril Endo-Surgery": 6000 } },
      { category: "Australia", value: 8000, companies: { "Meril Healthcare": 3000, "Meril Life-Science": 3000, "Meril Endo-Surgery": 2000 } },
      { category: "South America", value: 14000, companies: { "Meril Healthcare": 5000, "Meril Life-Science": 5000, "Meril Endo-Surgery": 4000 } },
    ],
  },
  Europe: [
    { category: "Germany", value: 2000, companies: { "Meril Healthcare": 800, "Meril Life-Science": 600, "Meril Endo-Surgery": 600 } },
    { category: "France", value: 1800, companies: { "Meril Healthcare": 700, "Meril Life-Science": 600, "Meril Endo-Surgery": 500 } },
    { category: "Italy", value: 1500, companies: { "Meril Healthcare": 600, "Meril Life-Science": 500, "Meril Endo-Surgery": 400 } },
    { category: "Spain", value: 1400, companies: { "Meril Healthcare": 500, "Meril Life-Science": 500, "Meril Endo-Surgery": 400 } },
    { category: "Netherlands", value: 1200, companies: { "Meril Healthcare": 500, "Meril Life-Science": 400, "Meril Endo-Surgery": 300 } },
    { category: "Poland", value: 1100, companies: { "Meril Healthcare": 400, "Meril Life-Science": 400, "Meril Endo-Surgery": 300 } },
    { category: "Sweden", value: 1000, companies: { "Meril Healthcare": 400, "Meril Life-Science": 300, "Meril Endo-Surgery": 300 } },
    { category: "Norway", value: 900, companies: { "Meril Healthcare": 350, "Meril Life-Science": 300, "Meril Endo-Surgery": 250 } },
    { category: "Belgium", value: 850, companies: { "Meril Healthcare": 300, "Meril Life-Science": 300, "Meril Endo-Surgery": 250 } },
    { category: "Austria", value: 800, companies: { "Meril Healthcare": 300, "Meril Life-Science": 250, "Meril Endo-Surgery": 250 } },
    { category: "Switzerland", value: 750, companies: { "Meril Healthcare": 250, "Meril Life-Science": 250, "Meril Endo-Surgery": 250 } },
    { category: "Portugal", value: 700, companies: { "Meril Healthcare": 250, "Meril Life-Science": 250, "Meril Endo-Surgery": 200 } },
  ],
  Africa: [
    { category: "Nigeria", value: 2000, companies: { "Meril Healthcare": 700, "Meril Life-Science": 700, "Meril Endo-Surgery": 600 } },
    { category: "South Africa", value: 1800, companies: { "Meril Healthcare": 600, "Meril Life-Science": 600, "Meril Endo-Surgery": 600 } },
    { category: "Egypt", value: 1500, companies: { "Meril Healthcare": 500, "Meril Life-Science": 500, "Meril Endo-Surgery": 500 } },
    { category: "Kenya", value: 1400, companies: { "Meril Healthcare": 500, "Meril Life-Science": 500, "Meril Endo-Surgery": 400 } },
    { category: "Ethiopia", value: 1300, companies: { "Meril Healthcare": 400, "Meril Life-Science": 450, "Meril Endo-Surgery": 450 } },
    { category: "Ghana", value: 1200, companies: { "Meril Healthcare": 400, "Meril Life-Science": 400, "Meril Endo-Surgery": 400 } },
    { category: "Morocco", value: 1100, companies: { "Meril Healthcare": 350, "Meril Life-Science": 400, "Meril Endo-Surgery": 350 } },
    { category: "Tanzania", value: 1000, companies: { "Meril Healthcare": 350, "Meril Life-Science": 350, "Meril Endo-Surgery": 300 } },
    { category: "Uganda", value: 900, companies: { "Meril Healthcare": 300, "Meril Life-Science": 300, "Meril Endo-Surgery": 300 } },
    { category: "Algeria", value: 850, companies: { "Meril Healthcare": 300, "Meril Life-Science": 300, "Meril Endo-Surgery": 250 } },
    { category: "Sudan", value: 800, companies: { "Meril Healthcare": 250, "Meril Life-Science": 300, "Meril Endo-Surgery": 250 } },
    { category: "Ivory Coast", value: 750, companies: { "Meril Healthcare": 250, "Meril Life-Science": 250, "Meril Endo-Surgery": 250 } },
  ],
  NorthAmerica: [
    { category: "USA", value: 8000, companies: { "Meril Healthcare": 3000, "Meril Life-Science": 2500, "Meril Endo-Surgery": 2500 } },
    { category: "Canada", value: 5000, companies: { "Meril Healthcare": 2000, "Meril Life-Science": 1500, "Meril Endo-Surgery": 1500 } },
    { category: "Mexico", value: 5000, companies: { "Meril Healthcare": 1500, "Meril Life-Science": 1500, "Meril Endo-Surgery": 2000 } },
  ],
  SouthAmerica: [
    { category: "Brazil", value: 6000, companies: { "Meril Healthcare": 2000, "Meril Life-Science": 2000, "Meril Endo-Surgery": 2000 } },
    { category: "Argentina", value: 5000, companies: { "Meril Healthcare": 1500, "Meril Life-Science": 1500, "Meril Endo-Surgery": 2000 } },
    { category: "Chile", value: 4000, companies: { "Meril Healthcare": 1500, "Meril Life-Science": 1500, "Meril Endo-Surgery": 1000 } },
    { category: "Colombia", value: 3000, companies: { "Meril Healthcare": 1000, "Meril Life-Science": 1000, "Meril Endo-Surgery": 1000 } },
  ],
  Asia: [
    { category: "India", value: 8000, companies: { "Meril Healthcare": 3000, "Meril Life-Science": 3000, "Meril Endo-Surgery": 2000 } },
    { category: "China", value: 7000, companies: { "Meril Healthcare": 2500, "Meril Life-Science": 2500, "Meril Endo-Surgery": 2000 } },
    { category: "Japan", value: 6000, companies: { "Meril Healthcare": 2000, "Meril Life-Science": 2000, "Meril Endo-Surgery": 2000 } },
  ],
  Australia: [
    { category: "Australia", value: 8000, companies: { "Meril Healthcare": 3000, "Meril Life-Science": 3000, "Meril Endo-Surgery": 2000 } },
    ],
  };

  var continentSelect = document.getElementById("continent");
  var companySelect = document.getElementById("company");

  // Function to animate the charts
  function animateChart(chart) {
    chart.series.each((series) => {
      series.appear(1000, 100); // Smooth circular animation
    });
  }

  // Function to update charts
  function updateCharts() {
    var selectedContinent = continentSelect.value;
    var selectedCompany = companySelect.value;

    // First Chart: Update based on the selected company
    if (selectedCompany === "all") {
      if (selectedContinent === "all") {
        series.data.setAll(data.all.continents);
      } else {
        series.data.setAll(data[selectedContinent] || []);
      }
    } else {
      if (selectedContinent === "all") {
        // Filter continents for the selected company
        var filteredContinents = data.all.continents.map((continent) => ({
          category: continent.category,
          value: continent.companies[selectedCompany] || 0,
        }));
        series.data.setAll(filteredContinents);
      } else {
        // Filter countries for the selected company
        var filteredCountries = (data[selectedContinent] || []).map((country) => ({
          category: country.category,
          value: country.companies[selectedCompany] || 0,
        }));
        series.data.setAll(filteredCountries);
      }
    }

    // Second Chart: Update based on the selected company
    if (selectedCompany === "all") {
      if (selectedContinent === "all") {
        var globalCompanies = {};
        data.all.continents.forEach((continent) => {
          Object.entries(continent.companies).forEach(([company, value]) => {
            globalCompanies[company] = (globalCompanies[company] || 0) + value;
          });
        });
        subSeries.data.setAll(
          Object.entries(globalCompanies).map(([category, value]) => ({ category, value }))
        );
      } else {
        var continentCompanies = {};
        (data[selectedContinent] || []).forEach((country) => {
          Object.entries(country.companies).forEach(([company, value]) => {
            continentCompanies[company] = (continentCompanies[company] || 0) + value;
          });
        });
        subSeries.data.setAll(
          Object.entries(continentCompanies).map(([category, value]) => ({ category, value }))
        );
      }
    } else {
      subSeries.data.setAll([{ category: selectedCompany, value: 100 }]);
    }

    // Trigger animations
    animateChart(chart);
    animateChart(subChart);
  }

  continentSelect.addEventListener("change", updateCharts);
  companySelect.addEventListener("change", updateCharts);

  // Initial setup
  series.data.setAll(data.all.continents);
  updateCharts();
});
</script>