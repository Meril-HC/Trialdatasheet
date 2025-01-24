<script>    
am5.ready(function() {

  // Create root element
  var root = am5.Root.new("globe-container");

  // Set themes
  root.setThemes([
    am5themes_Animated.new(root)
  ]);

  // Create the map chart
  var chart = root.container.children.push(am5map.MapChart.new(root, {
    panX: "rotateX",
    panY: "rotateY",
    projection: am5map.geoOrthographic(),
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20
  }));

// Define the auto-rotation animation
let autoRotate;

function startAutoRotation() {
    autoRotate = chart.animate({
        key: "rotationX",
        to: chart.get("rotationX") + 360, // Continue rotation from current position
        duration: 10000, // 30 seconds for a full rotation
        loops: Infinity, // Infinite loops
        easing: am5.ease.linear // Smooth, constant speed
    });
}

function stopAutoRotation() {
    if (autoRotate) {
        autoRotate.stop(); // Stop the animation
        autoRotate = null;
    }
}

// Attach mouse events to control auto-rotation
chart.chartContainer.events.on("pointerover", function() {
    stopAutoRotation(); // Stop rotation when the mouse is over the globe
});

chart.chartContainer.events.on("pointerout", function() {
    startAutoRotation(); // Start rotation when the mouse leaves the globe
});

// Start auto-rotation by default
startAutoRotation();

  // Enable globe rotation on drag
  chart.set("wheelX", "rotateX");
  chart.set("wheelY", "rotateY");
  chart.set("panBehavior", "rotateLongLat");
  
  // Create main polygon series for countries
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow
}));

var backgroundSeries = chart.series.unshift(
        am5map.MapPolygonSeries.new(root, {})
      );

      backgroundSeries.mapPolygons.template.setAll({
        fill: am5.color(0x5d97e7), // Light blue ocean color
        stroke: am5.color(0x5d97e7),
      });

      backgroundSeries.data.push({
        geometry: am5map.getGeoRectangle(90, 180, -90, -180),
      });

  // Add lighting effect
  chart.seriesContainer.set("background", am5.Rectangle.new(root, {
    fill: am5.color(0x4682B4),
    fillOpacity: 1
  }));
  chart.seriesContainer.set("shadow", am5.Rectangle.new(root, {
    fill: am5.color(0xcccccc),
    fillOpacity: 0.4,
    blur: 10,
    dx: 5,
    dy: 5
  }));

  // Country-specific product registration data
  var countryData = {
   AD: { name: "Andorra", registered: 15, underRegistration: 5, flag: "https://flagcdn.com/w40/ad.png" },
    AE: { name: "United Arab Emirates", registered: 120, underRegistration: 25, flag: "https://flagcdn.com/w40/ae.png" },
    AF: { name: "Afghanistan", registered: 80, underRegistration: 20, flag: "https://flagcdn.com/w40/af.png" },
    AG: { name: "Antigua and Barbuda", registered: 35, underRegistration: 10, flag: "https://flagcdn.com/w40/ag.png" },
    AI: { name: "Anguilla", registered: 10, underRegistration: 2, flag: "https://flagcdn.com/w40/ai.png" },
    AL: { name: "Albania", registered: 50, underRegistration: 15, flag: "https://flagcdn.com/w40/al.png" },
    AM: { name: "Armenia", registered: 60, underRegistration: 20, flag: "https://flagcdn.com/w40/am.png" },
    AO: { name: "Angola", registered: 70, underRegistration: 30, flag: "https://flagcdn.com/w40/ao.png" },
    AR: { name: "Argentina", registered: 500, underRegistration: 100, flag: "https://flagcdn.com/w40/ar.png" },
    AT: { name: "Austria", registered: 300, underRegistration: 50, flag: "https://flagcdn.com/w40/at.png" },
    AU: { name: "Australia", registered: 700, underRegistration: 150, flag: "https://flagcdn.com/w40/au.png" },
    AZ: { name: "Azerbaijan", registered: 90, underRegistration: 20, flag: "https://flagcdn.com/w40/az.png" },
    BA: { name: "Bosnia and Herzegovina", registered: 85, underRegistration: 25, flag: "https://flagcdn.com/w40/ba.png" },
    BB: { name: "Barbados", registered: 40, underRegistration: 10, flag: "https://flagcdn.com/w40/bb.png" },
    BD: { name: "Bangladesh", registered: 80, underRegistration: 200, flag: "https://flagcdn.com/w40/bd.png" },
    BE: { name: "Belgium", registered: 450, underRegistration: 70, flag: "https://flagcdn.com/w40/be.png" },
    BF: { name: "Burkina Faso", registered: 60, underRegistration: 15, flag: "https://flagcdn.com/w40/bf.png" },
    BG: { name: "Bulgaria", registered: 150, underRegistration: 40, flag: "https://flagcdn.com/w40/bg.png" },
    BH: { name: "Bahrain", registered: 90, underRegistration: 25, flag: "https://flagcdn.com/w40/bh.png" },
    BI: { name: "Burundi", registered: 50, underRegistration: 10, flag: "https://flagcdn.com/w40/bi.png" },
    BJ: { name: "Benin", registered: 65, underRegistration: 20, flag: "https://flagcdn.com/w40/bj.png" },
    BN: { name: "Brunei", registered: 55, underRegistration: 15, flag: "https://flagcdn.com/w40/bn.png" },
    BO: { name: "Bolivia", registered: 95, underRegistration: 25, flag: "https://flagcdn.com/w40/bo.png" },
    BR: { name: "Brazil", registered: 150, underRegistration: 300, flag: "https://flagcdn.com/w40/br.png" },
    BS: { name: "Bahamas", registered: 30, underRegistration: 10, flag: "https://flagcdn.com/w40/bs.png" },
    BT: { name: "Bhutan", registered: 20, underRegistration: 5, flag: "https://flagcdn.com/w40/bt.png" },
    BW: { name: "Botswana", registered: 70, underRegistration: 20, flag: "https://flagcdn.com/w40/bw.png" },
    BY: { name: "Belarus", registered: 200, underRegistration: 40, flag: "https://flagcdn.com/w40/by.png" },
    BZ: { name: "Belize", registered: 35, underRegistration: 10, flag: "https://flagcdn.com/w40/bz.png" },
    CA: { name: "Canada", registered: 1300, underRegistration: 250, flag: "https://flagcdn.com/w40/ca.png" },
    CD: { name: "Democratic Republic of the Congo", registered: 110, underRegistration: 30, flag: "https://flagcdn.com/w40/cd.png" },
    CF: { name: "Central African Republic", registered: 40, underRegistration: 15, flag: "https://flagcdn.com/w40/cf.png" },
    CG: { name: "Republic of the Congo", registered: 70, underRegistration: 20, flag: "https://flagcdn.com/w40/cg.png" },
    CH: { name: "Switzerland", registered: 60, underRegistration: 100, flag: "https://flagcdn.com/w40/ch.png" },
    CI: { name: "Ivory Coast", registered: 120, underRegistration: 35, flag: "https://flagcdn.com/w40/ci.png" },
    CL: { name: "Chile", registered: 400, underRegistration: 80, flag: "https://flagcdn.com/w40/cl.png" },
    CM: { name: "Cameroon", registered: 100, underRegistration: 25, flag: "https://flagcdn.com/w40/cm.png" },
    CN: { name: "China", registered: 50, underRegistration: 800, flag: "https://flagcdn.com/w40/cn.png" },
    CO: { name: "Colombia", registered: 700, underRegistration: 150, flag: "https://flagcdn.com/w40/co.png" },
    CR: { name: "Costa Rica", registered: 180, underRegistration: 50, flag: "https://flagcdn.com/w40/cr.png" },
    CU: { name: "Cuba", registered: 95, underRegistration: 25, flag: "https://flagcdn.com/w40/cu.png" },
    CV: { name: "Cape Verde", registered: 20, underRegistration: 5, flag: "https://flagcdn.com/w40/cv.png" },
    CY: { name: "Cyprus", registered: 150, underRegistration: 40, flag: "https://flagcdn.com/w40/cy.png" },
    CZ: { name: "Czech Republic", registered: 500, underRegistration: 90, flag: "https://flagcdn.com/w40/cz.png" },
    DE: { name: "Germany", registered: 200, underRegistration: 300, flag: "https://flagcdn.com/w40/de.png" },
    DJ: { name: "Djibouti", registered: 25, underRegistration: 5, flag: "https://flagcdn.com/w40/dj.png" },
    DK: { name: "Denmark", registered: 400, underRegistration: 70, flag: "https://flagcdn.com/w40/dk.png" },
    DM: { name: "Dominica", registered: 15, underRegistration: 5, flag: "https://flagcdn.com/w40/dm.png" },
    DO: { name: "Dominican Republic", registered: 300, underRegistration: 60, flag: "https://flagcdn.com/w40/do.png" },
    DZ: { name: "Algeria", registered: 400, underRegistration: 100, flag: "https://flagcdn.com/w40/dz.png" },
    EC: { name: "Ecuador", registered: 300, underRegistration: 70, flag: "https://flagcdn.com/w40/ec.png" },
    EE: { name: "Estonia", registered: 150, underRegistration: 30, flag: "https://flagcdn.com/w40/ee.png" },
    EG: { name: "Egypt", registered: 120, underRegistration: 250, flag: "https://flagcdn.com/w40/eg.png" },
    ER: { name: "Eritrea", registered: 50, underRegistration: 10, flag: "https://flagcdn.com/w40/er.png" },
    ES: { name: "Spain", registered: 140, underRegistration: 200, flag: "https://flagcdn.com/w40/es.png" },
    ET: { name: "Ethiopia", registered: 700, underRegistration: 150, flag: "https://flagcdn.com/w40/et.png" },
    FI: { name: "Finland", registered: 400, underRegistration: 80, flag: "https://flagcdn.com/w40/fi.png" },
    FJ: { name: "Fiji", registered: 50, underRegistration: 20, flag: "https://flagcdn.com/w40/fj.png" },
    FM: { name: "Micronesia", registered: 30, underRegistration: 10, flag: "https://flagcdn.com/w40/fm.png" },
    FR: { name: "France", registered: 1800, underRegistration: 300, flag: "https://flagcdn.com/w40/fr.png" },
    GA: { name: "Gabon", registered: 50, underRegistration: 15, flag: "https://flagcdn.com/w40/ga.png" },
    GB: { name: "United Kingdom", registered: 2200, underRegistration: 400, flag: "https://flagcdn.com/w40/gb.png" },
    GD: { name: "Grenada", registered: 20, underRegistration: 5, flag: "https://flagcdn.com/w40/gd.png" },
    GE: { name: "Georgia", registered: 70, underRegistration: 20, flag: "https://flagcdn.com/w40/ge.png" },
    GH: { name: "Ghana", registered: 300, underRegistration: 80, flag: "https://flagcdn.com/w40/gh.png" },
    GM: { name: "Gambia", registered: 40, underRegistration: 10, flag: "https://flagcdn.com/w40/gm.png" },
    GN: { name: "Guinea", registered: 70, underRegistration: 20, flag: "https://flagcdn.com/w40/gn.png" },
    GQ: { name: "Equatorial Guinea", registered: 50, underRegistration: 10, flag: "https://flagcdn.com/w40/gq.png" },
    GR: { name: "Greece", registered: 500, underRegistration: 100, flag: "https://flagcdn.com/w40/gr.png" },
    GT: { name: "Guatemala", registered: 200, underRegistration: 50, flag: "https://flagcdn.com/w40/gt.png" },
    GW: { name: "Guinea-Bissau", registered: 30, underRegistration: 5, flag: "https://flagcdn.com/w40/gw.png" },
    GY: { name: "Guyana", registered: 40, underRegistration: 10, flag: "https://flagcdn.com/w40/gy.png" },
    HN: { name: "Honduras", registered: 150, underRegistration: 40, flag: "https://flagcdn.com/w40/hn.png" },
    HR: { name: "Croatia", registered: 300, underRegistration: 60, flag: "https://flagcdn.com/w40/hr.png" },
    HT: { name: "Haiti", registered: 100, underRegistration: 30, flag: "https://flagcdn.com/w40/ht.png" },
    HU: { name: "Hungary", registered: 450, underRegistration: 90, flag: "https://flagcdn.com/w40/hu.png" },
    ID: { name: "Indonesia", registered: 180, underRegistration: 400, flag: "https://flagcdn.com/w40/id.png" },
    IE: { name: "Ireland", registered: 600, underRegistration: 120, flag: "https://flagcdn.com/w40/ie.png" },
    IL: { name: "Israel", registered: 700, underRegistration: 150, flag: "https://flagcdn.com/w40/il.png" },
    IN: { name: "India", registered: 1700, underRegistration: 600, flag: "https://flagcdn.com/w40/in.png" },
    IQ: { name: "Iraq", registered: 300, underRegistration: 70, flag: "https://flagcdn.com/w40/iq.png" },
    IR: { name: "Iran", registered: 500, underRegistration: 120, flag: "https://flagcdn.com/w40/ir.png" },
    IS: { name: "Iceland", registered: 50, underRegistration: 10, flag: "https://flagcdn.com/w40/is.png" },
    IT: { name: "Italy", registered: 200, underRegistration: 300, flag: "https://flagcdn.com/w40/it.png" },
    JM: { name: "Jamaica", registered: 70, underRegistration: 20, flag: "https://flagcdn.com/w40/jm.png" },
    JO: { name: "Jordan", registered: 150, underRegistration: 40, flag: "https://flagcdn.com/w40/jo.png" },
    JP: { name: "Japan", registered: 85, underRegistration: 350, flag: "https://flagcdn.com/w40/jp.png" },
    KE: { name: "Kenya", registered: 800, underRegistration: 200, flag: "https://flagcdn.com/w40/ke.png" },
    KG: { name: "Kyrgyzstan", registered: 90, underRegistration: 20, flag: "https://flagcdn.com/w40/kg.png" },
    KH: { name: "Cambodia", registered: 150, underRegistration: 40, flag: "https://flagcdn.com/w40/kh.png" },
    KI: { name: "Kiribati", registered: 20, underRegistration: 5, flag: "https://flagcdn.com/w40/ki.png" },
    KM: { name: "Comoros", registered: 20, underRegistration: 5, flag: "https://flagcdn.com/w40/km.png" },
    KN: { name: "Saint Kitts and Nevis", registered: 10, underRegistration: 2, flag: "https://flagcdn.com/w40/kn.png" },
    KP: { name: "North Korea", registered: 50, underRegistration: 10, flag: "https://flagcdn.com/w40/kp.png" },
    KR: { name: "South Korea", registered: 90, underRegistration: 200, flag: "https://flagcdn.com/w40/kr.png" },
    KW: { name: "Kuwait", registered: 150, underRegistration: 30, flag: "https://flagcdn.com/w40/kw.png" },
    KZ: { name: "Kazakhstan", registered: 500, underRegistration: 100, flag: "https://flagcdn.com/w40/kz.png" },
    LA: { name: "Laos", registered: 70, underRegistration: 20, flag: "https://flagcdn.com/w40/la.png" },
    LB: { name: "Lebanon", registered: 200, underRegistration: 50, flag: "https://flagcdn.com/w40/lb.png" },
    LC: { name: "Saint Lucia", registered: 20, underRegistration: 5, flag: "https://flagcdn.com/w40/lc.png" },
    LI: { name: "Liechtenstein", registered: 10, underRegistration: 2, flag: "https://flagcdn.com/w40/li.png" },
    LK: { name: "Sri Lanka", registered: 700, underRegistration: 150, flag: "https://flagcdn.com/w40/lk.png" },
    LR: { name: "Liberia", registered: 40, underRegistration: 10, flag: "https://flagcdn.com/w40/lr.png" },
    LS: { name: "Lesotho", registered: 30, underRegistration: 10, flag: "https://flagcdn.com/w40/ls.png" },
    LT: { name: "Lithuania", registered: 200, underRegistration: 40, flag: "https://flagcdn.com/w40/lt.png" },
    LU: { name: "Luxembourg", registered: 100, underRegistration: 20, flag: "https://flagcdn.com/w40/lu.png" },
    LV: { name: "Latvia", registered: 150, underRegistration: 30, flag: "https://flagcdn.com/w40/lv.png" },
    LY: { name: "Libya", registered: 80, underRegistration: 25, flag: "https://flagcdn.com/w40/ly.png" },
    MA: { name: "Morocco", registered: 500, underRegistration: 100, flag: "https://flagcdn.com/w40/ma.png" },
    MC: { name: "Monaco", registered: 30, underRegistration: 5, flag: "https://flagcdn.com/w40/mc.png" },
    MD: { name: "Moldova", registered: 90, underRegistration: 20, flag: "https://flagcdn.com/w40/md.png" },
    ME: { name: "Montenegro", registered: 40, underRegistration: 10, flag: "https://flagcdn.com/w40/me.png" },
    MG: { name: "Madagascar", registered: 100, underRegistration: 25, flag: "https://flagcdn.com/w40/mg.png" },
    MH: { name: "Marshall Islands", registered: 20, underRegistration: 5, flag: "https://flagcdn.com/w40/mh.png" },
    MK: { name: "North Macedonia", registered: 150, underRegistration: 40, flag: "https://flagcdn.com/w40/mk.png" },
    ML: { name: "Mali", registered: 70, underRegistration: 20, flag: "https://flagcdn.com/w40/ml.png" },
    MM: { name: "Myanmar", registered: 300, underRegistration: 60, flag: "https://flagcdn.com/w40/mm.png" },
    MN: { name: "Mongolia", registered: 80, underRegistration: 25, flag: "https://flagcdn.com/w40/mn.png" },
    MR: { name: "Mauritania", registered: 50, underRegistration: 15, flag: "https://flagcdn.com/w40/mr.png" },
    MT: { name: "Malta", registered: 120, underRegistration: 30, flag: "https://flagcdn.com/w40/mt.png" },
    MU: { name: "Mauritius", registered: 70, underRegistration: 20, flag: "https://flagcdn.com/w40/mu.png" },
    MV: { name: "Maldives", registered: 70, underRegistration: 25, flag: "https://flagcdn.com/w40/mv.png" },
    MW: { name: "Malawi", registered: 60, underRegistration: 15, flag: "https://flagcdn.com/w40/mw.png" },
    MX: { name: "Mexico", registered: 100, underRegistration: 200, flag: "https://flagcdn.com/w40/mx.png" },
    MY: { name: "Malaysia", registered: 10, underRegistration: 300, flag: "https://flagcdn.com/w40/my.png" },
    MZ: { name: "Mozambique", registered: 70, underRegistration: 20, flag: "https://flagcdn.com/w40/mz.png" },
    NA: { name: "Namibia", registered: 70, underRegistration: 20, flag: "https://flagcdn.com/w40/na.png" },
    NE: { name: "Niger", registered: 50, underRegistration: 15, flag: "https://flagcdn.com/w40/ne.png" },
    NG: { name: "Nigeria", registered: 80, underRegistration: 200, flag: "https://flagcdn.com/w40/ng.png" },
    NI: { name: "Nicaragua", registered: 10, underRegistration: 30, flag: "https://flagcdn.com/w40/ni.png" },
    NL: { name: "Netherlands", registered: 14, underRegistration: 300, flag: "https://flagcdn.com/w40/nl.png" },
    NO: { name: "Norway", registered: 600, underRegistration: 120, flag: "https://flagcdn.com/w40/no.png" },
    NP: { name: "Nepal", registered: 300, underRegistration: 70, flag: "https://flagcdn.com/w40/np.png" },
    NR: { name: "Nauru", registered: 10, underRegistration: 2, flag: "https://flagcdn.com/w40/nr.png" },
    NU: { name: "Niue", registered: 5, underRegistration: 1, flag: "https://flagcdn.com/w40/nu.png" },
    NZ: { name: "New Zealand", registered: 800, underRegistration: 150, flag: "https://flagcdn.com/w40/nz.png" },
    OM: { name: "Oman", registered: 150, underRegistration: 30, flag: "https://flagcdn.com/w40/om.png" },
    PA: { name: "Panama", registered: 200, underRegistration: 50, flag: "https://flagcdn.com/w40/pa.png" },
    PE: { name: "Peru", registered: 700, underRegistration: 150, flag: "https://flagcdn.com/w40/pe.png" },
    PG: { name: "Papua New Guinea", registered: 80, underRegistration: 20, flag: "https://flagcdn.com/w40/pg.png" },
    PH: { name: "Philippines", registered: 150, underRegistration: 300, flag: "https://flagcdn.com/w40/ph.png" },
    PK: { name: "Pakistan", registered: 19, underRegistration: 500, flag: "https://flagcdn.com/w40/pk.png" },
    PL: { name: "Poland", registered: 100, underRegistration: 250, flag: "https://flagcdn.com/w40/pl.png" },
    PT: { name: "Portugal", registered: 800, underRegistration: 150, flag: "https://flagcdn.com/w40/pt.png" },
    PW: { name: "Palau", registered: 10, underRegistration: 2, flag: "https://flagcdn.com/w40/pw.png" },
    PY: { name: "Paraguay", registered: 100, underRegistration: 25, flag: "https://flagcdn.com/w40/py.png" },
    QA: { name: "Qatar", registered: 300, underRegistration: 70, flag: "https://flagcdn.com/w40/qa.png" },
    RO: { name: "Romania", registered: 700, underRegistration: 150, flag: "https://flagcdn.com/w40/ro.png" },
    RS: { name: "Serbia", registered: 300, underRegistration: 70, flag: "https://flagcdn.com/w40/rs.png" },
    RU: { name: "Russia", registered: 200, underRegistration: 500, flag: "https://flagcdn.com/w40/ru.png" },
    RW: { name: "Rwanda", registered: 100, underRegistration: 25, flag: "https://flagcdn.com/w40/rw.png" },
    SA: { name: "Saudi Arabia", registered: 100, underRegistration: 300, flag: "https://flagcdn.com/w40/sa.png" },
    SB: { name: "Solomon Islands", registered: 50, underRegistration: 15, flag: "https://flagcdn.com/w40/sb.png" },
    SC: { name: "Seychelles", registered: 20, underRegistration: 5, flag: "https://flagcdn.com/w40/sc.png" },
    SD: { name: "Sudan", registered: 300, underRegistration: 70, flag: "https://flagcdn.com/w40/sd.png" },
    SE: { name: "Sweden", registered: 800, underRegistration: 150, flag: "https://flagcdn.com/w40/se.png" },
    SG: { name: "Singapore", registered: 900, underRegistration: 200, flag: "https://flagcdn.com/w40/sg.png" },
    SI: { name: "Slovenia", registered: 300, underRegistration: 60, flag: "https://flagcdn.com/w40/si.png" },
    SK: { name: "Slovakia", registered: 500, underRegistration: 100, flag: "https://flagcdn.com/w40/sk.png" },
    SL: { name: "Sierra Leone", registered: 50, underRegistration: 15, flag: "https://flagcdn.com/w40/sl.png" },
    SM: { name: "San Marino", registered: 10, underRegistration: 2, flag: "https://flagcdn.com/w40/sm.png" },
    SN: { name: "Senegal", registered: 100, underRegistration: 25, flag: "https://flagcdn.com/w40/sn.png" },
    SO: { name: "Somalia", registered: 50, underRegistration: 10, flag: "https://flagcdn.com/w40/so.png" },
    SR: { name: "Suriname", registered: 40, underRegistration: 10, flag: "https://flagcdn.com/w40/sr.png" },
    ST: { name: "São Tomé and Príncipe", registered: 10, underRegistration: 2, flag: "https://flagcdn.com/w40/st.png" },
    SV: { name: "El Salvador", registered: 200, underRegistration: 50, flag: "https://flagcdn.com/w40/sv.png" },
    SY: { name: "Syria", registered: 300, underRegistration: 70, flag: "https://flagcdn.com/w40/sy.png" },
    SZ: { name: "Eswatini", registered: 50, underRegistration: 10, flag: "https://flagcdn.com/w40/sz.png" },
    TD: { name: "Chad", registered: 70, underRegistration: 20, flag: "https://flagcdn.com/w40/td.png" },
    TG: { name: "Togo", registered: 80, underRegistration: 20, flag: "https://flagcdn.com/w40/tg.png" },
    TH: { name: "Thailand", registered: 120, underRegistration: 300, flag: "https://flagcdn.com/w40/th.png" },
    TJ: { name: "Tajikistan", registered: 70, underRegistration: 20, flag: "https://flagcdn.com/w40/tj.png" },
    TL: { name: "Timor-Leste", registered: 20, underRegistration: 5, flag: "https://flagcdn.com/w40/tl.png" },
    TM: { name: "Turkmenistan", registered: 90, underRegistration: 20, flag: "https://flagcdn.com/w40/tm.png" },
    TN: { name: "Tunisia", registered: 300, underRegistration: 70, flag: "https://flagcdn.com/w40/tn.png" },
    TO: { name: "Tonga", registered: 20, underRegistration: 5, flag: "https://flagcdn.com/w40/to.png" },
    TR: { name: "Turkey", registered: 1800, underRegistration: 400, flag: "https://flagcdn.com/w40/tr.png" },
    TT: { name: "Trinidad and Tobago", registered: 100, underRegistration: 25, flag: "https://flagcdn.com/w40/tt.png" },
    TV: { name: "Tuvalu", registered: 10, underRegistration: 2, flag: "https://flagcdn.com/w40/tv.png" },
    TZ: { name: "Tanzania", registered: 300, underRegistration: 70, flag: "https://flagcdn.com/w40/tz.png" },
    UA: { name: "Ukraine", registered: 1200, underRegistration: 300, flag: "https://flagcdn.com/w40/ua.png" },
    UG: { name: "Uganda", registered: 500, underRegistration: 120, flag: "https://flagcdn.com/w40/ug.png" },
    US: { name: "United States", registered: 90, underRegistration: 200, flag: "https://flagcdn.com/w40/us.png" },
    UY: { name: "Uruguay", registered: 300, underRegistration: 70, flag: "https://flagcdn.com/w40/uy.png" },
    UZ: { name: "Uzbekistan", registered: 500, underRegistration: 100, flag: "https://flagcdn.com/w40/uz.png" },
    VC: { name: "Saint Vincent and the Grenadines", registered: 20, underRegistration: 5, flag: "https://flagcdn.com/w40/vc.png" },
    VE: { name: "Venezuela", registered: 700, underRegistration: 150, flag: "https://flagcdn.com/w40/ve.png" },
    VN: { name: "Vietnam", registered: 2000, underRegistration: 500, flag: "https://flagcdn.com/w40/vn.png" },
    VU: { name: "Vanuatu", registered: 20, underRegistration: 5, flag: "https://flagcdn.com/w40/vu.png" },
    WS: { name: "Samoa", registered: 30, underRegistration: 10, flag: "https://flagcdn.com/w40/ws.png" },
    YE: { name: "Yemen", registered: 300, underRegistration: 70, flag: "https://flagcdn.com/w40/ye.png" },
    ZA: { name: "South Africa", registered: 100, underRegistration: 250, flag: "https://flagcdn.com/w40/za.png" },
    ZM: { name: "Zambia", registered: 300, underRegistration: 70, flag: "https://flagcdn.com/w40/zm.png" },
    ZW: { name: "Zimbabwe", registered: 200, underRegistration: 50, flag: "https://flagcdn.com/w40/zw.png" },
  };

  // Create main polygon series for countries
  var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow
  }));

  // Default settings for polygons
  polygonSeries.mapPolygons.template.setAll({
    tooltipText: "",
    toggleKey: "active",
    interactive: true,
    stroke: am5.color(0x000000), // Default black border
    strokeWidth: 1, // Default border width
    strokeOpacity: 0.8 // Border opacity
  });

  // Hover state for polygons
  polygonSeries.mapPolygons.template.states.create("hover", {
    stroke: am5.color(0xffd700), // Gold color for hover
    strokeWidth: 2 // Thicker border on hover
  });

  // Active state for polygons
  polygonSeries.mapPolygons.template.states.create("active", {
    stroke: am5.color(0xff4500), // Orange-red color for active
    strokeWidth: 3 // Even thicker border for active
  });

  // Set country colors based on data
  polygonSeries.mapPolygons.template.adapters.add("fill", function(fill, target) {
    var id = target.dataItem.get("id");
    var data = countryData[id];
    if (id === "AQ") {
      return am5.color(0xffffff); // White color for Antarctica
    }
    if (data) {
      var value = data.registered; // Use 'registered' for gradient
      if (value > 1800) {
        return am5.color(0x54649c); // Dark Blue
      } else if (value > 1600) {
        return am5.color(0x545f84); // Gray Blue
      } else if (value > 1400) {
        return am5.color(0x8c7269); // Brown
      } else if (value > 1200) {
        return am5.color(0x644e52); // Dark Brown
      } else if (value > 1000) {
        return am5.color(0xc9bd96); // Light Beige
      } else if (value > 800) {
        return am5.color(0xbabc71); // Yellow-Green
      } else if (value > 600) {
        return am5.color(0x728c52); // Green
      } else if (value > 400) {
        return am5.color(0x845c42); // Brown
      } else if (value > 200) {
        return am5.color(0xbe887e); // Soft Red
      } else if (value > 100) {
        return am5.color(0xabb8c2); // Soft Blue
      } else {
        return am5.color(0x3a8183); // Teal
      }
    }
    return fill;
  });

  // Adjust tooltips dynamically
  polygonSeries.mapPolygons.template.adapters.add("tooltipHTML", function(_, target) {
    var id = target.dataItem.get("id");
    var data = countryData[id];
    if (data) {
      return `
        <div style='text-align: center; background-color: rgba(255, 255, 255, 0.9); padding: 10px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); font-family: Arial, sans-serif; font-size: 12px; color: black;'>
          <strong style='font-size: 14px;'>${data.name}</strong><br>
          <img src='${data.flag}' alt='flag' style='width: 30px; height: 20px; margin-top: 5px;'><br>
          <div style='margin-top: 5px;'>
            No. of Registered Products: <strong>${data.registered}</strong><br>
            No. of Under Registration Products: <strong>${data.underRegistration}</strong>
          </div>
        </div>`;
    }
    return "<div style='background-color: rgba(255, 255, 255, 0.8); padding: 10px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); font-family: Arial, sans-serif; color: black;'>No data available</div>";
  });

  // Adjust interactivity
  polygonSeries.mapPolygons.template.adapters.add("interactive", function(interactive, target) {
    var id = target.dataItem.get("id");
    return id !== "AQ"; // Make Antarctica non-interactive
  });

  // Smooth rotation and centering on active country
  polygonSeries.mapPolygons.template.events.on("active", function(active, target) {
    if (target.get("active")) {
      selectCountry(target.dataItem.get("id"));
    } else {
      chart.set("panBehavior", "rotateLongLat");
    }
  });

// Add click event to navigate to country-specific page
polygonSeries.mapPolygons.template.events.on("click", function(ev) {
  var id = ev.target.dataItem.get("id"); // Get the country ID
  if (id) {
    var countryName = getCountryFileName(id); // Map ID to file name
    if (countryName) {
      window.location.href = `${countryName}.html`; // Redirect to the HTML file
    } else {
      console.error(`No file mapping found for country ID: ${id}`);
    }
  }
});

// Helper function to map country ID to file names
function getCountryFileName(id) {
  // Map of country IDs to file names
  const countryFileMap = {
    IN: "india", // India
    US: "united-states", // United States
    CN: "china", // China
    FR: "france", // France
    // Add other country mappings as needed
  };

  return countryFileMap[id] || null; // Return mapped file name or null
}

  function selectCountry(id) {
    var dataItem = polygonSeries.getDataItemById(id);
    var target = dataItem.get("mapPolygon");
    if (target) {
      var centroid = target.geoCentroid();
      if (centroid) {
        chart.set("panBehavior", "none");
        chart.animate({ key: "rotationX", to: -centroid.longitude, duration: 1500, easing: am5.ease.inOut(am5.ease.cubic) });
        chart.animate({ key: "rotationY", to: -centroid.latitude, duration: 1500, easing: am5.ease.inOut(am5.ease.cubic) }).events.on("animationended", function() {
          chart.set("panBehavior", "rotateLongLat");
        });
      }
    }
  }

  // Make stuff animate on load
  chart.appear(1000, 100);

}); // end am5.ready()
</script>

<!-- HTML -->
<div id="chartdiv"></div>