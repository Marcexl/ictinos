/*
 * mixed by Marcexl
 * version 03032022
 */ 

var cursor    = document.getElementById("cursor");
var h         = 0;
var hamburger = $('#hamburger-icon');
var logo      = $('.navbar-brand img');

document.onmousemove = function(e){
   cursor.style.left = (e.pageX - 25) + "px";
   cursor.style.top = (e.pageY - 25) + "px";
   cursor.style.display = "block";
}

$( document ).ready(function() {
     hamburger.click(function() {
      if(h == 0)
      {
         hamburger.toggleClass('active');
         $("#sidenav-1").css("margin-left","0");
         menuAnimation(h);
         h = 1;   
         return false;
      }else{
         hamburger.removeClass('active');
         $("#sidenav-1").css("margin-left","-100%");
         menuAnimation(h);
         h = 0;
         return false;
      } 
   });
 
   document.getElementById('myVideo').play();
   document.getElementById('myVideo').addEventListener('ended',myHandler,false);
   function myHandler(e) {
      startGame(); 
   }
});


function startGame(){
   let elem = document.getElementById("main");
   elem.style.opacity = 0;
   setTimeout(function(){
      $("#proyectos").css("display","block");
      logoShow()
   },1000);
}

function logoShow(){
   setTimeout(function(){
      logo.css("margin-top","0");
      logo.css("opacity","1");
      hamburguerShow()
   },300);
}

function hamburguerShow(){
   setTimeout(function(){
      hamburger.css("transform","scale(1)");
      hamburger.css("opacity","1");
   },300);
   sectionOpen(1)
}

function menuAnimation(h){
   let cnt = 1;
   if(h == 0){
      $(".sidenav-link").each(function () {
         $(this).attr('id', function (index) {
            $(this).css("display","block");
            $(this).attr('id', 'item-grow-' + (cnt));
         });
         cnt++;
      });
   }
   else
   {
      $(".sidenav-link").each(function () {
         $(this).attr('id', function (index) {
            $(this).css("display","none");
            $(this).attr('id', '');
         });
      });
     
      cnt = 1;
   }
}

function sectionOpen(id){
   hamburger.removeClass('active');
   $("#sidenav-1").css("margin-left","-100%");
   menuAnimation(h);
   h = 0;

  const section = ["","proyectos","somos","clientes","blog","contacto"];

  $(".section").addClass("hidesection");
   setTimeout(function(){
      $("#"+section[id]).removeClass("hidesection"); 
      $("#"+section[id]).css("display","block"); 
      if(section[id] == 'proyectos'){
         $("#proyectos").css("margin-left","0");
         showGalleryGrid()
      }
   },500);
}

function showGalleryGrid(){
   let cnt = 1;
   setTimeout(function(){
      $(".gallery-item").each(function () {
         $(this).attr('id', function (index) {
            $(this).css('display', 'inline-block');
            $(this).attr('id', 'item-up-' + (cnt));
         });
         cnt++;
      });
   },1000);
}

