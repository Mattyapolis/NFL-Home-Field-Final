let chart1 = new frappe.Chart( "#epachart", { // or DOM element
    data: {
      labels: ["2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010", "2009" ],

      datasets: [
        {
          name: "epa Home", chartType: 'line',
          values: [0.054734,	0.004835,	0.04377,	0.025444,	0.025827, 0.016775, 0.01341, 0.0098, -0.014845,	-0.011214]
        },
		{
          name: "epa Away", chartType: 'line',
          values: [0.014927,	0.034662,	-0.002322,	-0.000498,	-0.00465,	-0.029169,	-0.013916,	-0.031931,	-0.042282,	-0.054435]
    
        }
        
      ],

      yMarkers: [{ label: "", value: .1,
        options: { labelPos: 'left' }}],
      yRegions: [{ label: "", start: -.1, end: .1,
        options: { labelPos: 'right' }}]
    },

    title: "Mean epa Home vs Away",
    type: 'axis-mixed', // or 'bar', 'line', 'pie', 'percentage'
    height: 300,
    colors: ['#4F2683', '#FFC62F'],

    tooltipOptions: {
      formatTooltipX: d => (d + '').toUpperCase(),
      formatTooltipY: d => d + ' pts',
    }
  });