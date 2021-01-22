var weekday = new Array(7)
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
var Jan_19 = {
    dow: "Tuesday"
}
/*var Wednesday = [
    {
        startTime: "1300",
        duration: 1,
        interval: [5,10,13], //in seconds
        resources: ["./kangaroo.jpg","./tiger.jpeg","./sample.mp4"]
        //["https://images.unsplash.com/photo-1546182990-dffeafbe841d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8YW5pbWFsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
       // "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8YW5pbWFsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60"]
     },
     {
        startTime: "1123",
        duration: 1,
        interval: [5,10],
        month: 0,
        day: 12,
        resources: ["./giraffe.png","panda.jpg"]
        //["https://images.unsplash.com/photo-1475809913362-28a064062ccd?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8YW5pbWFsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
        //"https://images.unsplash.com/photo-1501706362039-c06b2d715385?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8YW5pbWFsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60"]
     }
]
*/
function startDay(data){
    var d = new Date;
    console.log()
    var dom = d.getDate();
    var month = d.getMonth();
    var dow = d.getDay().toString();//if (dow==0){data.Sunday}
    var Wednesday = data.Wednesday
    newDay(Wednesday,dom,month);
    var tmp = new Date(d.getFullYear(),d.getMonth(),d.getDate()+1,5);
    var delay = tmp.getTime() - d.getTime()
    
    setTimeout(startDay,delay,data);
}
function newDay(Wednesday,dom,month){
     //dow = weekday[dow];
       // console.log(Tuesday)
     findCurrentDOM(Wednesday,dom,month);
}
function findCurrentDOM(dayTry,dom,month){
    var k= 0;
    console.log("dayTry "+dayTry[0].day)
    console.log("dom "+dom)
    console.log("month "+dayTry[0].month)
    console.log("month "+month)
    for(var i = 0; i<dayTry.length; i++){//may need to be asyncrhonous
        if(dayTry[i].day==dom&&dayTry[i].month==month){
            loadCurrentDOW(dayTry,dom,i,k);
            console.log("in")
        }
        else if(dayTry[i].day==null)
        {
            console.log("NULL")
            loadCurrentDOW(dayTry,dom,i,k);
        }
    }
    console.log("Out")
}
function loadCurrentDOW(dow,dom,i,k){
    var d = new Date();
    console.log("HOUR"+d.getHours())
    var schedHour;
    var schedMin = dow[i].startTime.substring(2);
    schedMin = parseInt(schedMin);
    if(dow[i].startTime.substring(0,1)=="0")
    {
        schedHour = dow[i].startTime.substring(1,2);
        schedHour = parseInt(schedHour)
        
    }
    else{
        schedHour = dow[i].startTime.substring(0,2);
        schedHour = parseInt(schedHour)
        console.log("schedHour"+schedHour)
    }
    console.log("getHours "+d.getHours())
    console.log("schedMin"+schedMin)
    console.log("d.getMinues"+d.getMinutes())
    if (schedHour==d.getHours()&&schedMin==d.getMinutes())
    {
        var j = 0;
        var base=0;
        var time=0;
        console.log("runMediaNext")
        clearTimeout(loadTimeout);
        runMedia(dow,dom,i,k,j,base,time)
        
    }
    else{
        var tmpD = new Date(d.getFullYear(),d.getMonth(),d.getDate(),schedHour,schedMin)
        //console.log("d.getTime "+d.getTime)
        //console.log("tmpD.getTime "+)
        var delay=tmpD.getTime()-d.getTime();
        
        var loadTimeout=setTimeout(loadCurrentDOW,delay,dow,dom,i,k);
    }
    
}
/*
function loadCurrentDOW(dow,dom,i,k){
    var d = new Date();
    console.log("HOUR"+d.getHours())
    var schedHour;
    var schedMin = dow[i].startTime[k].substring(2);
    schedMin = parseInt(schedMin);
    if(dow[i].startTime[k].substring(0,1)=="0")
    {
        schedHour = dow[i].startTime[k].substring(1,2);
        schedHour = parseInt(schedHour)
        
    }
    else{
        schedHour = dow[i].startTime[k].substring(0,2);
        schedHour = parseInt(schedHour)
        console.log("schedHour"+schedHour)
    }
    console.log("getHours "+d.getHours())
    console.log("schedMin"+schedMin)
    console.log("d.getMinues"+d.getMinutes())
    if (schedHour==d.getHours()&&schedMin==d.getMinutes())
    {
        var j = 0;
        var base=0;
        console.log("runMediaNext")
        runMedia(dow,dom,i,k,j,base)
        k++;
        loadCurrentDOW(dow,dom,i,k);
    }
    else if (k<dow[i].startTime.length){
        var tmpD = new Date(d.getFullYear(),d.getMonth(),d.getDate(),schedHour,schedMin)
        var delay=d.getTime()-tmpD.getTime();
        
        var loadTimeout=setTimeout(loadCurrentDOW,delay,dow,dom,i,k);
    }
    else{
        clearTimeout(loadTimeout);
    }
}*/
function runMedia(dow,dom,i,k,j,base,time){
    var url= dow[i].resources[j]
    var ext = url.substring(url.length-3)
    var duration=(dow[i].duration*60);///dow[i].interval;
    if(time==duration){
        console.log("IN RETURN")
        var vid =document.getElementById("autoplay")
        vid.style.display = 'none';
        document.pic.style.display = 'none';
        vid.pause();
        vid.currentTime=0;
        clearTimeout(mediaTimeout)
        return;
    }
    if(ext=='jpg'||ext=='png'||ext=='gif'||ext=='peg')
    {
        document.pic.src = dow[i].resources[j]
        document.pic.style.display ='block'
        var vid =document.getElementById("autoplay")
        vid.style.display ='none'
        
    }
    else{
        var vid =document.getElementById("autoplay");
        vid.src = dow[i].resources[j]
        document.pic.style.display = 'none'
        vid.style.display = 'block'
        vid.play();
        
    }
    //document.pic.src = dow[i].resources[j];
    //document.pic.style.display = 'block';
    //var duration=(dow[i].duration*60);///dow[i].interval;
    
    if(j<dow[i].resources.length-1)
    {
        k=j;
        j++;
    }
    else{
        k=j;
        j=0;
    }
    if(((dow[i].interval[k])+time)<=duration)
    //if(base==duration)
    {
        time+=(dow[i].interval[k]);
        var mediaTimeout =setTimeout(runMedia,dow[i].interval[k]*1000,dow,dom,i,k,j,base,time)
        //clearTimeout(mediaTimeout);
        //vid.style.display = 'none';
        //document.pic.style.display = 'none';
    }
    else{
        console.log((dow[i].interval[k]))
        console.log(time)
        console.log(duration)
    var tmp = duration -time;
    time +=tmp
    console.log("in else")
    console.log("Time"+time)
    var mediaTimeout =setTimeout(runMedia,tmp,dow,dom,i,k,j,base,time)
    //base++;
    //time+=dow[i].interval[j]*1000
    //var mediaTimeout =setTimeout(runMedia,dow[i].interval[j]*1000,dow,dom,i,k,j,base)
    }
}/*
function runMedia(dow,dom,i,k,j,base){
    /*var url= dow[i].resources[k][j]
    var ext = url.substring(url.length-3)
    if(ext=='jpg'||ext=='png'||ext=='gif'||ext=='peg)
    {
        document.pic.src = dow[i].resources[k][j]
        document.pic.style.display ='block'
        document.vid.style.display ='none'
    }
    else{
        var vid =document.getElementbyId("autoplay");
        vid.src = dow[i].resources[k][j]
        vid.style.display = 'block'
        document.pic.style.display = 'none'
        document.getElementbyId("autoplay")
    }
    document.pic.src = dow[i].resources[k][j];
    document.pic.style.display = 'block';
    var duration=(dow[i].duration[k]*60)/dow[i].interval[k];
    
    if(j<dow[i].resources[k].length-1)
    {
        j++;
    }
    else{
        j=0;
    }
    if(base==duration)
    {
        clearTimeout(mediaTimeout);
        document.pic.style.display = 'none';
    }
    else{
    base++;
    var mediaTimeout =setTimeout(runMedia,dow[i].interval[k]*1000,dow,dom,i,k,j,base)
    }
}*/

//let json = require('./schedule.json')
//var obj = JSON.parse(json)
//console.log(obj)
fetch("./schedule.json")
.then(response => {
   return response.json();
})
.then(data => startDay(data));
//startDay();
function getImages(){
    document.pic.src = images[i];
    document.pic.style.display = 'block'
    
    if(i<=images.length -1)
    {
        i++;
    }
    else{
        i=-1;
       // i=0;
        document.pic.style.display = 'none';
        clearInterval(intervalFirst);
        getPdf2();
        //intervalSecond =setInterval(getPdf,2000);
    }
}
var current = []
function base(){
    var boo = true
    while(boo){
        var rules = getActiveRules();
        current = merge(current,rules)
        if(current.length==0)
        {
            setTimeout(base)
        }
    }
}
function base2(){
    var rules = getActiveRules();
    current = merge(current,rules);
    if(current.length==0)
    {
        setTimeout(base2,60000)
    }
    else{
        
        display (current[0]) # This thread will sleep for however many seconds in interval the display is on
    current = current[1:] + current[0]
    }
    setTimeout(base2,60000)
}
display(current[0]){
    var clear = 0
    if(clear==1)
    {

    }
    if(image)
    document.src = resource
    if(video)

}


forever {
    rules = getactiverules (now)
    current = merge (current, rules)
    if current.length == 0 {
      sleep 1 minute
      continue
    }
    display (current[0]) # This thread will sleep for however many seconds in interval the display is on
    current = current[1:] + current[0]
  }
function getActiveRules(){
    var d = new Date()
    var rules = [];
        
        for(var i = 0; i<data.length; i++)
        {
            if(data[i].weekdays!==null)
            {
                for(var j = 0; j<data[i].weekdays.length; j++)
                {
                    if (data[i].weekdays[j]==d.getDay())
                    {
                        for(var k =0; k<data.interval.length;k++){
                        rules.push([data.interval[k],data.resource[k]])
                        }
                    }
                }
            }
            if(data[i].month==d.getMonth()&&data[i].day==d.getDate())
            {
                for(var k =0; k<data[i].interval.length;k++){
                rules.push([data[i].interval[k],data[i].resource[k]])
                }
            }
        }
        return rules;
    
}
function merge(current,rules){
    var count=0;
    var tmp =rules
    //if(current.length>rules.length)
      for(var i = 0; i<current.length;i++){
            for(var j = 0; j<tmp.length;j++)
            {
                if(tmp[j][1]==current[i][1])
                {
                    current[i][0]=tmp[j][0]
                    rules.splice(j,1)
                    break;
                }
                else if(tmp[j][1]!=current[i][1])
                {
                    count++
                }
                
            }
            if(count==tmp.length)
            {
                current.splice(i,1)
            }
            count=0;
    }
    if(rules.length>0)
    {
        for(var k =0; k<rules.length;k++)
        {
            current.push(rules[k])
        }
    }
return current;
}
function runMedia2(dow,dom,i,k,j,base,time){
    var url= dow[i].resources[j]
    var ext = url.substring(url.length-3)
    var duration=(dow[i].duration*60);///dow[i].interval;
    
    if(ext=='jpg'||ext=='png'||ext=='gif'||ext=='peg')
    {
        document.pic.src = dow[i].resources[j]
        document.pic.style.display ='block'
        var vid =document.getElementById("autoplay")
        vid.style.display ='none'
        
    }
    else{
        var vid =document.getElementById("autoplay");
        vid.src = dow[i].resources[j]
        document.pic.style.display = 'none'
        vid.style.display = 'block'
        vid.play();
        
    }
    //document.pic.src = dow[i].resources[j];
    //document.pic.style.display = 'block';
    //var duration=(dow[i].duration*60);///dow[i].interval;
    
    if(j<dow[i].resources.length-1)
    {
        k=j;
        j++;
    }
    else{
        k=j;
        j=0;
    }
    if(((dow[i].interval[k])+time)<=duration)
    //if(base==duration)
    {
        time+=(dow[i].interval[k]);
        var mediaTimeout =setTimeout(runMedia,dow[i].interval[k]*1000,dow,dom,i,k,j,base,time)
        //clearTimeout(mediaTimeout);
        //vid.style.display = 'none';
        //document.pic.style.display = 'none';
    }
    else{
        console.log((dow[i].interval[k]))
        console.log(time)
        console.log(duration)
    var tmp = duration -time;
    time +=tmp
    console.log("in else")
    console.log("Time"+time)
    var mediaTimeout =setTimeout(runMedia,tmp,dow,dom,i,k,j,base,time)
    //base++;
    //time+=dow[i].interval[j]*1000
    //var mediaTimeout =setTimeout(runMedia,dow[i].interval[j]*1000,dow,dom,i,k,j,base)
    }
}

/*
if(data[i].weekdays!=null&&
            d.getHours() >= startHour &&
            d.getHours() <= endHour)
            {
                console.log(d.getHours())
                console.log(endHour)
                console.log(d.getMinutes())
                console.log(endMin)
                if((d.getHours()==endHour&&
                    //d.getMinutes()>=startMin&&
                    d.getMinutes()<endMin)
                    ||d.getHours()!=endHour)
                {
                    console.log(d.getHours())
                    console.log(d.getMinutes())
                    console.log(endHour)
                    console.log(startMin)
                    console.log(endMin)
                    if(d.getMinutes()<endMin)
                    {
                        console.log("INSANTIY")
                    }
                    for(var j = 0; j<data[i].weekdays.length; j++)
                    {
                        if (data[i].weekdays[j]==d.getDay())
                        {
                            console.log(d.getDay())
                            console.log(data[i].weekdays[j])
                            for(var k =0; k<data[i].interval.length;k++){
                                var tmp = new Date(d.getFullYear(),d.getMonth(),d.getDate(),endHour,endMin)
                                if((d.getTime()+(data[i].interval[k]*1000))>tmp.getTime())
                                {
                                    console.log("IN FIRST")
                                    var time=d.getTime()+(data[i].interval[k]*1000) -tmp.getTime();
                                    time=data[i].interval[k]-(time/1000)
                                    rules.push([time,data[i].resources[k]])
                                }
                                else{
                                    rules.push([data[i].interval[k],data[i].resources[k]])
                                    console.log("IN")
                                }
                            }
                        }
                        
                    }
                }
            }
             */