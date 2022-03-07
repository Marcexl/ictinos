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
      socialAnimation(0)
   },300);
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

function socialAnimation(s){
   
   let cnt = 1;
   setTimeout(function(){
      if(s == 0){
         $(".social-item").each(function () {
            $(this).attr('id', function (index) {
               $(this).css("display","block");
               $(this).attr('id', 'item-grow-' + (cnt));
            });
            cnt++;
         });
      }
      else
      {
         $(".social-item").each(function () {
            $(this).attr('id', function (index) {
               $(this).css("display","none");
               $(this).attr('id', '');
            });
         });
        
         cnt = 1;
      }
      sectionOpen(2)//proyectos
      endStartGame()
   },500);
}

function endStartGame(){
   setTimeout(function(){
      $(".circles").css("display","block");
   },5000);
}

function sectionOpen(id){
   hamburger.removeClass('active');
   $("#sidenav-1").css("margin-left","-100%");
   h = 0;

   const section = ["","somos","proyectos","clientes","blog","contacto"];
   setTimeout(function(){
      $("#"+section[id]).css("display","block"); 
      if(section[id] == 'proyectos'){
         $("#proyectos").css("margin-left","0");
         showGalleryGrid()
      }
      if(section[id] == 'somos'){
         $(".text-1").css("display","block");
         $(".text-2").css("display","block");
      }
   },500);
}

function showGalleryGrid(){
   let cnt = 1;
   setTimeout(function(){
      $(".gallery-item").each(function () {
         $(this).attr('id', function (index) {
            $(this).css('display', 'inline-block');
            $(this).addClass('fadeIn');
            $(this).attr('id', 'item-up-' + (cnt));
         });
         cnt++;
      });
   },1000);
}

function hideGalleryGrid(){
   let cnt = 1;
   $(".gallery-item").each(function () {
      $(this).attr('id', function (index) {
         $(this).removeClass("fadeIn");
         $(this).addClass("fadeOut");
         $(this).attr('id', '');
      });
      cnt++;
   });
}

function showPresentation(id){
   if(id == 1)
   {
      hideGalleryGrid();
      $(".circles").addClass("fadeOut");

      setTimeout(function(){
         if(id == 1){
            $("#proyectos").css("display","none");
            $(".area").css("display","none");
         }
         $("#loader").css("display","block");
         setTimeout(function(){
            $(".box-area").addClass("box-area-rotate");
            setTimeout(function(){
               $(".box-area").removeClass("box-area-rotate");
               $(".box-area").addClass("smaller");
               setTimeout(function(){$("#loader").css("display","none");},300);
            },4000);
         },500);      
      },500);
   }

   
}


