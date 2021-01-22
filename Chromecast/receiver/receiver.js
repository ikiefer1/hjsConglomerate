var i = 0;
var images = [];
var time =5000;
var intervalSecond;
var intervalFirst;
var timeout;
var pdf1 = document.getElementById("pdf1")
var pdf2 = document.getElementById("pdf2")
images[0] = "https://images.unsplash.com/photo-1546182990-dffeafbe841d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8YW5pbWFsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60";
images[1] ="https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8YW5pbWFsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60";
images[2] ="https://images.unsplash.com/photo-1475809913362-28a064062ccd?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8YW5pbWFsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60";
images[3] ="https://images.unsplash.com/photo-1501706362039-c06b2d715385?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8YW5pbWFsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60";

//This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
     height: '100%',
     width: '100%',
     videoId: 'M7lc1UVf-VE'
        });
    }

function startVideo(){
    player.mute();
    player.playVideo();
    }
 
function begin(){
    document.pic.src = images[i];
    document.pic.style.display = 'block'
    i++;
}

function getImages(){
    document.pic.src = images[i];
    //document.pic.style.display = 'block'
    
    if(i<=images.length -1)
    {
        i++;
    }
    else{
        i=-1;
        //i=0;
        document.pic.style.display = 'none';
        clearInterval(intervalFirst);
        getPdf2();
        //intervalSecond =setInterval(getPdf,2000);
    }
}
function getPdf2(){
    i++;
    if (i%2==0)
    {
        getPdfSecond(pdf1);
    }
    else if (i < 6) {
        getPdfSecond(pdf2);
    }
    else{
        //img2.style.display='none'
        clearTimeout(timeout);
        var myCanvas = document.getElementById("my_canvas")
        myCanvas.style.display = 'none'
        
        var video = document.getElementById("player")
        video.style.display = 'block'
        if (video.style.display=='block')
        {
            startVideo();
        }
    }
}
function getPdfSecond(use){
    pdfjsLib.getDocument(use.src).promise.then(doc => {
    
        doc.getPage(1).then(page => {
          var myCanvas = document.getElementById("my_canvas");
          var context = myCanvas.getContext("2d");
          var viewport = page.getViewport(.95);
          myCanvas.width = viewport.width;
          myCanvas.height = viewport.height;
    
          page.render({
            canvasContext: context,
            viewport:viewport
            
          })
          
          //img2.src = myCanvas.toDataURL();
          //img2.style.display = 'block';
          
          timeout=setTimeout(getPdf2,4000);
          /*var img = document.createElement('img');
          img.src = myCanvas.toDataURL();
          img.style.width = "100%"
          img.style.height = "100%"
          document.getElementById('body').appendChild(img);*/
        })
        
      });
}
begin();
//getImages;
intervalFirst =setInterval(getImages,time);


/*var i = 0;
var images = [];
var time = 10000;
images[0] = "https://images.unsplash.com/photo-1546182990-dffeafbe841d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8YW5pbWFsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60";
images[1] ="https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8YW5pbWFsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60";
images[2] ="https://images.unsplash.com/photo-1475809913362-28a064062ccd?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8YW5pbWFsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60";
images[3] ="https://images.unsplash.com/photo-1501706362039-c06b2d715385?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8YW5pbWFsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60";

function oscillate(){
    document.pic.src = images[i];
    if(i<images.length -1)
    {
        i++;
    }
    else{
        i=0;
    }
    setTimeout("oscillate()",time);
}
window.onload= oscillate;*/
/*
function getPdf(){
    var pdf1 = document.getElementById("pdf1")
    var pdf2 = document.getElementById("pdf2")
    i++;
    if (i%2==0)
    {
        pdf1.style.display='block'
        pdf2.style.display ='none'
    }
    else if (i < 6) {
        pdf1.style.display='none'
        pdf2.style.display='block'
    }
    else{
        pdf1.style.display='none'
        pdf2.style.display='none'
        clearInterval(intervalSecond);
        var video = document.getElementById("player")
        video.style.display = 'block'
        if (video.style.display=='block')
        {
            startVideo();
        }
    }
}*/