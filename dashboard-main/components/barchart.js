const barch=(loc,lab)=>{
    console.log("hi");
    var newele=document.createElement('canvas');
    var tx=`
    <canvas id="myChart" style="width:100%;max-width:700px"></canvas>
    `;
    newele.innerHTML=tx;
    var bchart=new Chart("myChart",{
        type:"horizontalBar",
        data: {
            labels: lab,
            datasets: [{
              backgroundColor: barColors,
              data: loc
            }]
          },
        options: {
            legend: {display: false},
            title: {
              display: true,
              text: "Customer Locations"
            }
        }
    });
}

//location 
$(document).ready(()=>{
    $.getJSON('../data/employee.json',(dat)=>{
        var obj_arr=dat["feeds"];
        var loc_data=[] ;
        obj_arr.map((item,n)=>{
            var tmp=item["location"].split(',');
            console.log(tmp);
            loc_data.push(tmp[tmp.length-1]);
            
        });
        //barchart
        let loc_data_unique=[...loc_data];
        loc_data_unique.filter((ele,ind,self)=>{
            return self.indexOf(ele)===ind;
        });
        console.log(loc_data_unique);
    })

})