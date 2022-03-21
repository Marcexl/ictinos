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
         $("video").css('margin-top','-45px');
         var elem = document.documentElement;
         if (elem.requestFullscreen) {
            elem.requestFullscreen();
         } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
         } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
         } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
         }
         h = 1;   
         return false;
      }
      else
      {
         $("video").css('margin-top','0');
         hamburger.removeClass('active');
         document.exitFullscreen()
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

function sectionOpen(id){
   if(localStorage.getItem("interaction"))
   {
      index = localStorage.getItem("interaction");
      sectionClose(index);
   }

   hideSideNav()

   const section = ["","somos","proyectos","clientes","blog","contacto"];
   interaction = section[id]
   localStorage.setItem("interaction",interaction);

   setTimeout(function(){
      $("#"+interaction).css("display","block"); 
      if(section[id] == 'proyectos')
      {
         $("#proyectos").removeClass("fadeOut");
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
   hideSideNav();
   hideGalleryGrid()
   hideBoxesBackground()
   /* hide this */
   let index = localStorage.getItem("interaction");
   $("#"+index).addClass("fadeOut");

   setTimeout(function(){
      $("#proyectos").css("display","none");   
      $(".progress").css("display","block");
      setTimeout(function(){
         $("#progress-bar").addClass("loading");
         setTimeout(function(){
            setTimeout(function(){
               $(".progress").css("display","none");
               $("#progress-bar").removeClass("loading");
               $("#"+index).css("display","none");
               proyectShow(id);
            },300);
         },4000);
      },500);      
   },500);

}

function proyectShow(id)
{
 
   const logos  = ['','loicas.jpg','piedra.jpg','macul.jpg'];

   let menunav  = `<li class="sidenav-item s-i-1"><img src="img/logos/${logos[id]}"/></li>`;
       menunav += '<li class="sidenav-item s-i-2" onclick="goInside(1,2)"><a href="#">Terminaciones</a></li>';
       menunav += '<li class="sidenav-item s-i-3" onclick="goInside(1,3)"><a href="#">Galeria</a></li>';
       menunav += '<li class="sidenav-item s-i-4" onclick="goInside(1,4)"><a href="#">Condominio</a></li>';
       menunav += '<li class="sidenav-item s-i-5" onclick="goInside(1,5)"><a href="#">Domotica</a></li>';
       menunav += '<li class="sidenav-item s-i-6" onclick="goInside(1,6)"><a href="#">Casas</a></li>';
       menunav += '<li class="sidenav-item s-i-7" onclick="goInside(1,7)"><a href="#">Entorno</a></li>';
       menunav += '<li class="sidenav-item s-i-8" onclick="goInside(1,8)"><a href="#">Adress</a></li>';
       menunav += '<li class="sidenav-item s-i-9" onclick="goInside(1,9)"><a href="#">Video</a></li>';
       menunav += '<li class="sidenav-item s-i-10" onclick="goInside(10)"><a href="#"></a></li>';

   let elem = document.querySelector("#sidenav-2"); 
   elem.innerHTML = '<ul class="sidenav-menu">' + menunav + '</ul>';
   elem.style.display = 'block';
   elem.classList.remove("fadeLeftOut");
   elem.classList.add("fadeLeft");
   let cnt = 1;
      
   setTimeout(function(){
      if(id == 1)
      {
        buildLoicas()
      }

      $("#sidenav-2 ul li a").each(function () {
         $(this).attr('id', function (index) {
            $(this).css("display","flex");
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

function hideSideNav(){
   $("#sidenav-1").css("margin-left","-100%");
   $("#sidenav-2").removeClass("fadeLeft");
   $("#sidenav-2").addClass("fadeLeftOut");
   setTimeout(function(){
      $("#sidenav-2").css("display","none");
   },1000);
}

function goInside(s,id){
   let video = '';

   showArrows();
   $("#sidenav-2 ul li").removeClass("expand");
   $("#sidenav-2 ul li").addClass("small");
   
   setTimeout(function(){
      $("#sidenav-2 ul li.s-i-"+id).addClass("expand");
   },100);

   if(id == 9)
   {

      if(s == 1)
      {
         setTimeout(function(){
            $(".s-i-9").html(video);
            video += '<video controls id="loicasvid" poster="images/">';
            video += '<source src="video/loicas.mp4" type="video/mp4"/>';
            video += '</video>';
            $(".s-i-9").html(video);
         },500);

      }
   }

    /*setTimeout(function(){
      $(".s-i-"+id).addClass("expand");
   },1000);*/
}

function goOutside(){
   $("#sidenav-2 ul li").removeClass("small");
   $("#sidenav-2 ul li").removeClass("expand");
   $(".arrows").css("display","none");
   $("#back").css("transform","scale(0)");
   $("#back").css("opacity","0");
   buildLoicas();
   interaction = localStorage.setItem("interaction","loicas");
}

function buildLoicas(){
   
   let maps = '';
   maps += '<img src="img/icons-maps.png">';
   maps += '<h4>Av. Santa Elena 200</h4>';
   maps += '<h5>Barrio Santa Elena Chicureo</h5>';

   $("#loicas").removeClass("fadeOut");
   $("#loicas").css("display","block");
   $(".s-i-2 a").css('background-image','url(img/loicas/thumbs/terminaciones.jpg)');
   $(".s-i-3 a").css('background-image','url(img/loicas/thumbs/galeria.jpg');
   $(".s-i-4 a").css('background-image','url(img/loicas/thumbs/condominio.jpg');
   $(".s-i-6 a").css('background-image','url(img/loicas/thumbs/casas.jpg');
   $(".s-i-10 a").css('background-image','url(img/loicas/thumbs/patio.jpg');
  
   $(".s-i-9").html('');
   $(".s-i-9").html('<a href="#">Video</a>');
   $(".s-i-9 a").css('display','flex');
   $(".s-i-9 a").css('background-image','url(img/loicas/thumbs/entrada.jpg');

   $(".s-i-8 a").html(maps);
   interaction = localStorage.setItem("interaction","loicasinside");
   showHome();
}

function showArrows(){
   setTimeout(function(){
      $("#back").css("transform","scale(1)");
      $("#back").css("opacity","1");
      $(".arrows").css("display","block");
   },300);
}

function showHome(){
   setTimeout(function(){
      $("#home").css("transform","scale(1)");
      $("#home").css("opacity","1");
   },300);
}

