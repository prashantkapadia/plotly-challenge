// load up dropdown list with id's and call out main function

d3.json("samples.json").then((data)=> {
    
    var dropDown = d3.selectAll("#selDataset")
        data.names.forEach(element => {
            dropDown.append("option").text(element).property("value", element)
        });
        mydashboard(data.names[0])
})  
// Option change fuction to call main fuction with new id's
function optionChanged(id){
    mydashboard(id)
}

function mydashboard(id) {

    // loading data first
    d3.json("samples.json").then((data) => {

        console.log(data)
        console.log("Data Connected Testing Message")

        // filtering data based on id
        var paneldata = data.metadata.filter(dm => dm.id == id)[0]
        var demo_info = d3.selectAll("#sample-metadata")
        
        // cleaning previous data if already selected

        demo_info.html(" ")

        Object.entries(paneldata).forEach(([key,value]) => {
            demo_info.append("h5").text(key+ ":" +value)
        })
        
        // Bar Chart and Bubble Chart Coding 

        var sampledata = data.samples.filter(dm => dm.id == id)[0]

            //to make sure it pring on console to check keys and values
            console.log(sampledata)

        // for x , y values, pick top 10 value from slice functions   
        // slicing and attaching OUT tag along with help of arrow function
        var otu_ids = sampledata.otu_ids.slice(0,10).map(oi => "OTU"+ oi);
        // all data needs to be same size, top values
        var otu_labels = sampledata.otu_labels.slice(0,10)
        var sample_values = sampledata.sample_values.slice(0,10)
        

        var trace = {
            type: 'bar',
            x: sample_values.reverse(),
            y: otu_ids.reverse(),
            orientation: 'h',
            text : otu_labels.reverse(),
            marker: {
                color: 'rgba(55,128,191,0.6)',
                width: 1
              },
          };
        var layout = {
            // title and margins 
            title: "Top 10 OTU",
            margin: {
                l: 100,
                r: 100,
                t: 40,
                b: 20
            }

        } 
        data = [trace]

          Plotly.newPlot('bar', data,layout);
        
        // Bubble chart code

        var trace2 = {
            x:sampledata.otu_ids, 
            y:sampledata.sample_values,
            text:sampledata.otu_labels,
            marker:{
                color: sampledata.otu_ids,
                size:sampledata.sample_values,
            },
            mode:"markers"
        }
        var layout2 = {
            title: "Bacterya Cultures"
        }

        //   var layout1 = {
        //     title: 'Bacterya cultures',
        //     //showlegend: false,
        Plotly.newPlot("bubble", [trace2], layout2)

        })


    }
