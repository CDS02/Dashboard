const barch=(loc,lab,nam)=>{
    console.log(loc);
    var newele=document.createElement('div');
    var tx=`
    
    <canvas id="myChart" style="width:100%"></canvas>
    `;
    newele.innerHTML=tx;
    console.log(newele);
    document.querySelector("#home_a").append(newele);
    var ctx = $("#myChart");
    var bchart=new Chart(ctx,{
        type:"bar",
        data: {
            labels: lab,
            datasets: [{
              backgroundColor: ["rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)"],
              borderWidth: 1,
              borderColor:["rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)"],
              data: loc
            }]
          },
        options: {
            legend: {display: false},
            title: {
              display: true,
              text: "Spending Score"
            }
        }
    });
}
const linech=(lab,nam)=>{
    console.log(lab);
    var newele=document.createElement('div');
    var tx=`
    
    <canvas id="myChart_line" style="width:100%"></canvas>
    `;
    newele.innerHTML=tx;
    console.log(newele);
    document.querySelector("#home_b").append(newele);
    var ctx = $("#myChart_line");
    var bchart=new Chart(ctx,{
        type:"scatter",
        data: {
            datasets: [{
                pointRadius: 2,
                pointBackgroundColor: "rgba(0,0,255,1)",
              data: lab
            }]
          },
        options: {
            legend: {display: false},
            title: {
              display: true,
              text: "Age Vs Work Experience"
            }
        }
    });
}
const bach=(loc,lab,nam)=>{
    console.log(loc);
    var newele=document.createElement('div');
    var tx=`
    
    <canvas id="myChartb" style="width:100%"></canvas>
    `;
    newele.innerHTML=tx;
    console.log(newele);
    document.querySelector("#home_a").append(newele);
    var ctx = $("#myChartb");
    var bchart=new Chart(ctx,{
        type:"pie",
        data: {
            labels: lab,
            datasets: [{
              backgroundColor: ["rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
              "rgba(75, 192, 192, 0.5)"],
              data: loc
            }]
          },
        options: {
            title: {
              display: true,
              text: "Segmentation Score"
            }
        }
    });
}
//aGE VS FAMILY SIZE
const bagfam=(loc,nam)=>{
    console.log(loc);
    yval= new Array();
    xval= new Array();
    loc.map((itm,n)=>{
        if(Math.random() >0.5 ){
        xval.push(Object.values(itm)[1]);
        yval.push(Object.values(itm)[0]);}
    });
    xval=xval.slice(0,10);
    yval=yval.slice(0,10);

    var newele=document.createElement('div');
    var tx=`
    
    <canvas id="myChartc" style="width:100%"></canvas>
    `;
    newele.innerHTML=tx;
    console.log(newele);
    document.querySelector("#home_a").append(newele);
    var ctx = $("#myChartc");
    var bchart=new Chart(ctx,{
        type:"line",
        data: {
            labels: xval,
            
            //lab=xvalues
            datasets: [{
              borderColor: "red",
              label: 'Family Size',
              data: yval
            }]
          },
        options: {
            title: {
              display: true,
              text: "Age vs Family size"
            }
        }
    });
}

const tabl=(seg,sp,d)=>{
    var newele=Document.createElement('div');
    var txt=`<table>`;


txt+=`</table>`;
}
//location 
$(document).ready(()=>{
    $.getJSON('../data/employee.json',(dat)=>{
        var obj_arr=dat["feeds"];
        var loc_data=[] ;
        obj_arr.map((item,n)=>{
            var tmp=item["location"].split(',');
            loc_data.push(tmp[tmp.length-1]);
            
        });
        //barchart
        let loc_data_unique=[...loc_data].filter((ele,ind,self)=>{
            return self.indexOf(ele)===ind;
        });
        console.log(loc_data_unique);
    });
    $.getJSON('../data/emp.json',(dat)=>{
        var obj_arr=dat;
        
        if(window.name ==""){
            console.log($('#cars').val());
            window.name=$('#cars').val();
        }
        //$('#cars').val()=window.name;
        var newel=$('#cars');
        newel.value=window.name;
        console.log(window.name);
        var nam=window.name;
        $('#cars').change(()=>{
            console.log(window.name);
            window.name=$('#cars').val();
            location.reload();
        });
        
        
        var h_spend=new Map([
            ["Average",0],["Low",0],["High",0]
        ]);
        var seg=new Map([
            ["A",0],["B",0],["C",0],["D",0]
        ]);
        var age_exp =  new Array();
        var famage=new Array();
        obj_arr.map((itm,n)=>{
            if(itm["Profession"]== nam){
                h_spend.set(itm["Spending_Score"],h_spend.get(itm["Spending_Score"])+1);
                seg.set(itm["Segmentation"],seg.get(itm["Segmentation"])+1);
                famage.push({y:itm["Family_Size"],x:itm["Age"]});

                age_exp.push({y:itm["Work_Experience"],x:itm["Age"]});
            }
        });
        console.log(h_spend);
        
        barch(Array.from(h_spend.values()),Array.from(h_spend.keys()),nam);
        bach(Array.from(seg.values()),Array.from(seg.keys()),nam);
        bagfam(famage,nam);
        linech(age_exp,nam);
        
    })

});