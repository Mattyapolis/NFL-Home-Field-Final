let chart = new frappe.Chart( "#schart", { // or DOM element
    data: {
      labels: ["2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010", "2009" ],

      datasets: [
        {
          name: "Success Home", chartType: 'bar',
          values: [0.443795,	0.417937,	0.431258,	0.424317,	0.426649,	0.424209,	0.429615,	0.41759,	0.410078,	0.41866]
        },
		{
          name: "Success Away", chartType: 'bar',
          values: [0.434277,	0.405883,	0.422051,	0.417413,	0.416864,	0.408646,	0.415477,	0.413258,	0.406773,	0.40425]
        }
        
      ],

      yMarkers: [{ label: "", value: .5,
        options: { labelPos: 'left' }}],
      yRegions: [{ label: "", start: 0, end: .5,
        options: { labelPos: 'right' }}]
    },

    title: "Mean Success Home vs Away",
    type: 'axis-mixed', // or 'bar', 'mixed', 'pie', 'percentage'
    height: 300,
    colors: ['#4F2683', '#FFC62F'],

    tooltipOptions: {
      formatTooltipX: d => (d + '').toUpperCase(),
      formatTooltipY: d => d + ' pts',
    }
  });