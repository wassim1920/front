import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import exporting from 'highcharts/modules/exporting';
import exportData from 'highcharts/modules/export-data';
import accessibility from 'highcharts/modules/accessibility';

// Initialize the additional Highcharts modules
exporting(Highcharts);
exportData(Highcharts);
accessibility(Highcharts);

const Featured = () => {
  useEffect(() => {
    // Set custom colors for gradients
    Highcharts.setOptions({
      colors: Highcharts.map(Highcharts.getOptions().colors, function(color) {
        return {
          radialGradient: {
            cx: 0.5,
            cy: 0.3,
            r: 0.7,
          },
          stops: [
            [0, color],
            [1, Highcharts.color(color).brighten(-0.3).get('rgb')], // darken
          ],
        };
      }),
    });

    // Build the chart
    Highcharts.chart('container', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      title: {
        text: 'Contrats Draft',
        align: 'left',
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format:
              '<span style="font-size: 1.2em"><b>{point.name}</b></span><br>' +
              '<span style="opacity: 0.6">{point.percentage:.1f} %</span>',
            connectorColor: 'rgba(128,128,128,0.5)',
          },
        },
      },
      series: [
        {
          name: 'Share',
          data: [
            { name: 'Validé', y: 938899 },
            { name: 'A valide', y: 1229600 },
            // { name: 'Electricity', y: 325251 },
            { name: 'Other', y: 238751 },
          ],
        },
      ],
    });
  }, []);
  return (
    <figure className="highcharts-figure" style={{width : 600}} >
    <div id="container"  ></div>
    <p className="highcharts-description">
      All color options in Highcharts can be defined as gradients or patterns.
    </p>
  </figure>
  );
};

export default Featured;
