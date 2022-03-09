/*
 * mixed by Marcexl
 * version 03032022
 */ 

var interaction;
var index;
var cursor    = document.getElementById("cursor");
var h         = 0;
var hamburger = $('#square');
var logo      = $('.navbar-brand img');

/* mouse control */ 

document.onmousemove = function(e){
   cursor.style.left = (e.pageX - 25) + "px";
   cursor.style.top = (e.pageY - 25) + "px";
   cursor.style.display = "block";
}

$( document ).ready(function() {
   /* clean cache */
   if(localStorage.getItem("interaction"))
   {
      localStorage.removeItem("interaction");
   }
   
   /* menu */
   hamburger.click(function() {
      if(h == 0)
      {
         hamburger.toggleClass('active');
         $("#sidenav-1").css("margin-left","0");
         menuAnimation(h);
         h = 1;   
         return false;
      }
      else
      {
         hamburger.removeClass('active');
         $("#sidenav-1").css("margin-left","-100%");
         menuAnimation(h);
         h = 0;
         return false;
      } 
   });
   
   /* video logo intro */
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
      hamburguerShow()//menu
   },300);
}

function hamburguerShow(){
   setTimeout(function(){
      hamburger.css("transform","scale(1)");
      hamburger.css("opacity","1");
   },300);
   sectionOpen(2)//proyectos
   showBoxesBackground()
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
   if(localStorage.getItem("interaction"))
   {
      index = localStorage.getItem("interaction");
      sectionClose(index);
   }

   hamburger.removeClass('active');
   
   $(".sidenav").css("margin-left","-100%");
   $("#sidenav-2").css("display","none");
   
   h = 0;

   const section = ["","somos","proyectos","clientes","blog","contacto"];
   interaction = section[id]
   localStorage.setItem("interaction",interaction);

   setTimeout(function(){
      $("#"+interaction).css("display","block"); 
      if(section[id] == 'proyectos')
      {
         $("#proyectos").css("margin-left","0");
         showGalleryGrid()
         showBoxesBackground()
      }
      if(section[id] == 'somos')
      {
         $(".text-1").css("display","block");
         $(".text-2").css("display","block");
      }
   },500);
}

function sectionClose(index){
   $("#"+index).css("display","none");
}

function showGalleryGrid(){
   $("#proyectos h1").removeClass("fadeOut");
   let cnt = 1;
   setTimeout(function(){
      $(".gallery-item").each(function () {
         $(this).attr('id', function (index) {
            $(this).css('display', 'inline-block');
            $(this).removeClass('fadeOut');
            $(this).addClass('fadeIn');
            $(this).attr('id', 'item-up-' + (cnt));
         });
         cnt++;
      });
   },1000);
}

function hideGalleryGrid(){
   let cnt = 1;
   $("#proyectos h1").addClass("fadeOut");
   $(".gallery-item").each(function () {
      $(this).attr('id', function (index) {
         $(this).removeClass("fadeIn");
         $(this).addClass("fadeOut");
         $(this).attr('id', '');
      });
      cnt++;
   });
   setTimeout(function(){
      $("#proyectos").css("margin-left","100%");
      $(".gallery-item").css("display","none");
   },1000);
}

function showPresentation(id){

   hideGalleryGrid()
   hideBoxesBackground()

   setTimeout(function(){
      $("#proyectos").css("display","none");   
      $("#loader").css("display","block");
      setTimeout(function(){
         $(".box-area").removeClass("smaller");
         $(".box-area").addClass("box-area-rotate");
         setTimeout(function(){
            $(".box-area").removeClass("box-area-rotate");
            $(".box-area").addClass("smaller");
            setTimeout(function(){
               $("#loader").css("display","none");
               proyectShow(id);
            },300);
         },4000);
      },500);      
   },500);

}

function proyectShow(id){

   const logos  = ['','loicas.jpg','piedra.jpg','macul.jpg'];

   let menunav  = `<li class="sidenav-item"><img src="img/logos/${logos[id]}"/></li>`;
       menunav += '<li class="sidenav-item"><a href="#">Terminaciones</a></li>';
       menunav += '<li class="sidenav-item"><a href="#">Equipamiento</a></li>';
       menunav += '<li class="sidenav-item"><a href="#">Casas</a></li>';
       menunav += '<li class="sidenav-item"><a href="#">Plantas</a></li>';
       menunav += '<li class="sidenav-item"><a href="#">Piloto</a></li>';
       menunav += '<li class="sidenav-item"><a href="#">Entorno</a></li>';
       menunav += '<li class="sidenav-item"><a href="#">Cotizar</a></li>';

   let elem = document.querySelector("#sidenav-2"); 
   elem.innerHTML = '<ul class="sidenav-menu">' + menunav + '</ul>';
   elem.style.display = 'block';
   elem.classList.add("fadeLeft");
   let cnt = 1;
   setTimeout(function(){
      if(id == 1){
         $("#loicas").css("display","block");
         interaction = localStorage.setItem("interaction","loicas");
      }

      if(id == 2){
         $("#piedras").css("display","block");
         interaction = localStorage.setItem("interaction","piedras");
      }

      if(id == 3){
         $("#macul").css("display","block");
         interaction = localStorage.setItem("interaction","macul");
      }

      $("#sidenav-2 ul li a").each(function () {
         $(this).attr('id', function (index) {
            $(this).css("display","block");
            $(this).attr('id', 'item-grow-' + (cnt));
         });
         cnt++;
      });
   },500);
}

function showBoxesBackground(){
   setTimeout(function(){
      $(".area").css("display","block");
      $(".circles").removeClass("fadeOut");
      $(".circles").css("display","block");
   },5000);
}
function hideBoxesBackground(){
   $(".circles").addClass("fadeOut");
   setTimeout(function(){
      $(".area").css("display","none");
      $(".circles").css("display","none");
   },500);

}

