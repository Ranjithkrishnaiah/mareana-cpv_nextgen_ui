const plot ={
    list : [
        {
            label: 'Scatter Plot',
            value: 'scatterPlot'
        },
  
        {
            label: 'Levey-Jennings Plot',
            value: 'leveyJenningsPlot'
        },
        {
            label: 'I-MR Plot',
            value: 'imrPlot'
        },
        {
            label: 'Trend Plot',
            value: 'trendPlot'
        },
        {
            label: 'KDE Plot',
            value: 'kdePlot'
        },
        {
            label: 'Box Plot',
            value: 'boxPlot'
        }
    ],
    dateRange: [
        {
            label: '3M',
            active: false
        },
        {
            label: '6M',
            active: false
        },
        {
            label: '1Y',
            active: false
        },
        {
            label: 'Max',
            active: true
        }
    ]
};

export default plot;