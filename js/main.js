/*
 * mixed by Marcexl
 * version 03032022
 */ 

var interaction;
var index;
var pophover = 0;
var cursor    = document.getElementById("cursor");
var h         = 0;
var hamburger = $('#square');
var logo      = $('.navbar-brand img');
var logocenter = document.getElementById("logo-center");
/* mouse control */ 

document.onmousemove = function(e){

   cursor.style.left = (e.pageX - 25) + "px";
   cursor.style.top = (e.pageY - 25) + "px";
   cursor.style.display = "block";
}

$(document).ready(function() {

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
         //$("video").css('margin-top','-45px');
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
        // $("video").css('margin-top','0');
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
   //hideBoxesBackground()
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
   const logos  = ['','loicas.png','piedra.jpg','macul.jpg'];
   logocenter.innerHTML = `<img src="img/logos/${logos[id]}"/>`;

   let menunav  = '<li class="sidenav-item s-i-1" onclick="goInside('+id+',1)"><a href="#">Galeria</a></li>';
       menunav += '<li class="sidenav-item s-i-2" onclick="goInside('+id+',2)"><a href="#">Terminaciones</a></li>';
       menunav += '<li class="sidenav-item s-i-3" onclick="goInside('+id+',3)"><a href="#">Domotica</a></li>';
       menunav += '<li class="sidenav-item s-i-4" onclick="goInside('+id+',4)"><a href="#">Condominio</a></li>';
       menunav += '<li class="sidenav-item s-i-5" onclick="goInside('+id+',5)"><a href="#">Casas</a></li>';
       menunav += '<li class="sidenav-item s-i-6" onclick="goInside('+id+',6)"><a href="#">Entorno</a></li>';
       menunav += '<li class="sidenav-item s-i-8" onclick="goInside('+id+',8)"><a href="#">Conectividad</a></li>';
       menunav += '<li class="sidenav-item s-i-7" onclick="goInside('+id+',7)"><a href="#">Video</a></li>';

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


function goInside(s,id){
   //showArrows();
   $(".sidenav-item").removeClass("active");
   $(".s-i-"+id).addClass("active");
   $("#proyectos-container").fadeOut();
   $("#proyectos-container").html('');

   let data    = '';
   let proyect = '';
   let caption = '';
   let clas = '';
   let c = 0;
   let d = 0;

   if(id == 1)//galeria
   {
      if(s == 1)
      {

         fetch('json/caption.json')
         .then(response => response.json())
         .then(json => {
            data += '<div id="carouselExampleCaptions" class="carousel slide" data-mdb-ride="carousel">';
            data += '<div class="carousel-inner">';

            for (var clave in json['Loicas']) 
            {
               c++
               if(c == 1)
               {
                  data += '<div class="carousel-item active" >';
                  data += '<img src="img/loicas/galeria/'+c+'.jpg" class="d-block w-100" alt="'+json['Loicas'][clave]['caption']+'"/>';
                  data += '<div class="carousel-caption d-none d-md-block">';
                  data += '<h5 id="loicas-caption-'+c+'">'+json['Loicas'][clave]['caption']+'</h5>';
                  data += '</div>';
                  data += '</div>';
               }
               else
               {
                  data += '<div class="carousel-item">';
                  data += '<img src="img/loicas/galeria/'+c+'.jpg" class="d-block w-100" alt="'+json['Loicas'][clave]['caption']+'"/>';
                  data += '<div class="carousel-caption d-none d-md-block">';
                  data += '<h5 id="loicas-caption-'+c+'">'+json['Loicas'][clave]['caption']+'</h5>';
                  data += '</div>';
                  data += '</div>';
               }
            }
   
            data += '</div>';
            data += '<button class="carousel-control-prev" type="button" data-mdb-target="#carouselExampleCaptions" data-mdb-slide="prev">';
            data += '<span class="carousel-control-prev-icon" aria-hidden="true"></span>';
            data += '<span class="visually-hidden">Previous</span>';
            data += '</button>';
            data += '<button class="carousel-control-next" type="button" data-mdb-target="#carouselExampleCaptions" data-mdb-slide="next">';
            data += '<span class="carousel-control-next-icon" aria-hidden="true"></span>';
            data += '<span class="visually-hidden">Next</span>';
            data += '</button>';
            data += '</div>';
            
            setTimeout(function(){
               $("#proyectos-container").html(data);
               $("#proyectos-container").fadeIn();
            },500);
         })
      }
   }

   if(id == 2)//terminaciones
   {
      if(s == 1)
      { 

         fetch('json/terminaciones.json')
         .then(response => response.json())
         .then(json => {
            data += '<div class="row">';
            data += '<div class="col">';
            data += '<div class="card" style="margin:30px">';
            data += "<h4>TERMINACIONES</h4>";
            for(var clave in json['Loicas']['terminaciones'])
            {
               data += '<p>'+json['Loicas']['terminaciones'][clave]+'</p>';
            }
            data += '</div>';
            data += '</div>';
            
            data += '<div class="col">';
            data += '<div class="card" style="margin:30px">';
            data += "<h4>ESPACIOS INTEGRADOS</h4>";

            for(var clave in json['Loicas']['espacios'])
            {
               data += '<p>'+json['Loicas']['espacios'][clave]+'</p>';
            }

            data += "</div>";
            data += "</div>";
            data += "</div>";

            setTimeout(function(){
               $("#proyectos-container").html(data);
               $("#proyectos-container").fadeIn();
            },500);
         })
      }
   }

   if(id == 3)//domotica
   {
      if(s == 1)
      { 

         fetch('json/domotica.json')
         .then(response => response.json())
         .then(json => {
            data += '<div class="row domotica">';
            data += '<div class="col domotica-col">';
            data += '<img src="img/loicas/domotica/1.png" class="domotica-back">';
            data += '<div class="dom-circle-container">';
            for(var clave in json['Loicas']){
               d++;
               data += '<div class="dom-circle" id="d-c-'+d+'" style="'+json['Loicas'][clave]['style']+'" onclick="showPopover('+d+',\''+json['Loicas'][clave]['title']+'\',\''+json['Loicas'][clave]['description']+'\')">';
               data += '<div class="pophover '+json['Loicas'][clave]['orientation']+'" id="p-'+d+'" style="display:none;"><div class="pophover-header"></div><p></p></div></div>';
               
            }
            data += '</div>';
            data += '</div>';
            data += '</div>';
            setTimeout(function(){
               $("#proyectos-container").html(data);
               $("#proyectos-container").fadeIn();
            },500);
         })
      }
   }

   if(id == 4)//condominio
   {
      if(s == 1)
      { 

         fetch('json/condominio.json')
         .then(response => response.json())
         .then(json => {
            data += '<div class="row condo-row" style="padding-top:250px;">';
            data += '<div class="col-6" style="padding:30px;text-align: center;">';
            data += json['Loicas']['title'];
            data += '<div class="line"></div>';
            data += json['Loicas']['subtitle'];
            data += '</div>';
            data += '<div class="col-6" style="padding:30px;">';
            data += '<ul class="condominio-list">';
            for(var clave in json['Loicas']['entorno'])
            {
               data += '<li>'+json['Loicas']['entorno'][clave]+'</li>';
            }
            data += '</ul>';

            data += '<h5>SEGURIDAD</h5>';
            data += '<ul class="condominio-list">';
            for(var clave in json['Loicas']['seguridad'])
            {
               data += '<li>'+json['Loicas']['seguridad'][clave]+'</li>';
            }

            data += '</ul>';
            data += '</div>';
            data += '</div>';
            data += '<div class="row condo-row" style="padding-top:60px;">';
            data += '<div class="col">';
            data += '<div class="owl-carousel owl-theme">';

            for (let index = 1; index <= 6; index++) 
            {
               data += '<div class="item">';
               data += '<img src="img/loicas/thumbs/'+index+'.jpg" alt="Table Full of Spices"/>';
               data += '</div>';               
            }  
            data += '</div>';
            data += '</div>';
            data += '</div>';

            setTimeout(function(){
               $("#proyectos-container").html(data);
               $("#proyectos-container").fadeIn();
               $('.owl-carousel').owlCarousel({
                  loop:true,
                  margin:10,
                  nav:true,
                  autoplay:true,
                  autoplayTimeout:5000,
                  autoplayHoverPause:true,
                  responsive:{
                      0:{
                          items:1
                      },
                      600:{
                          items:3
                      },
                      1000:{
                          items:5
                      }
                  }
              })
            },500);
         })
      }
   }

   if(id == 5)//casas
   {
      if(s == 1)
      {    
         fetch('json/casas.json')
         .then(response => response.json())
         .then(json => {
            data += '<div class="row casas-row">';
            data += '<div class="col-2" style="width:15%;padding-right:0;">';
            data += '<div class="nav flex-column nav-tabs text-center" id="v-tabs-tab" role="tablist" aria-orientation="vertical">';
            for(var clave in json['Loicas'])
            {
               c++
               if(c == 1)
               {
                  data += '<a class="nav-link active" id="v-tabs-home-tab" data-mdb-toggle="tab" href="#v-tabs-'+c+'" role="tab" aria-controls="v-tabs-'+c+'" aria-selected="true">'+json['Loicas'][clave]['title']+'</a>';
               }
               else
               {
                  data += '<a class="nav-link" id="v-tabs-home-tab" data-mdb-toggle="tab" href="#v-tabs-'+c+'" role="tab" aria-controls="v-tabs-'+c+'" aria-selected="true">'+json['Loicas'][clave]['title']+'</a>';
               }
            }
            data += '</div></div>';
            data += '<div class="col-10" style="width:85%;">';
            data += '<div class="tab-content" id="v-tabs-tabContent">';  
            c = 0;
            for(var clave in json['Loicas'])
            {
               c++
               if(c == 1)
               {
                  clas = 'show active'; 
               }
               else
               {
                  clas = '';
               }

               data += '<div class="tab-pane fade '+clas+'" id="v-tabs-'+c+'" role="tabpanel" aria-labelledby="v-tabs-'+c+'">';
               data += '<div class="row casas-tab">';
               data += '<div class="col-9">';
               data += '<img src="img/loicas/casas/'+c+'.jpg" class="casas">';
               data += '</div>';  
               data += '<div class="col-3">';
               data += '<h4>'+json['Loicas'][clave]['ambientes']+'</h4>';
               data += '<h4>'+json['Loicas'][clave]['banos']+'</h4>';
               data += '<h5>'+json['Loicas'][clave]['subtitle']+'</h5>';
               data += '<ul>';
               for(var subclave in json['Loicas'][clave]['superficie'])
               {
                  data += '<li>'+json['Loicas'][clave]['superficie'][subclave]+'</li>';
               }
               data += '</ul>';
               data += '</div></div></div>';  
            }

            data +='</div></div></div>';
            setTimeout(function(){
               $("#proyectos-container").html(data);
               $("#proyectos-container").fadeIn();
            },500);
         })
         
      }
   }

   if(id == 6) //entorno
   {
      if(s == 1)
      {    
         fetch('json/entorno.json')
         .then(response => response.json())
         .then(json => {
            data += '<div class="row">';
            data += '<div class="col-8">';
            data += '<img src="img/loicas/entorno/1.jpg" class="conect-img-2">';
            data += '</div>';  
            data += '<div class="col-4">';
            data += '<ul class="accesos" style="padding:60px 30px 0 0">';
            for(var clave in json['Loicas']['accesos'])
            {
               data += '<li>'+json['Loicas']['accesos'][clave]+'</li>';
            }
            data += '</ul>';
            data += '</div></div>';  
            
            setTimeout(function(){
               $("#proyectos-container").html(data);
               $("#proyectos-container").fadeIn();
            },500);
         })
      }
   }

   if(id == 7)//video
   {
      if(s == 1)
      {    
         data += '<video autoplay id="loicasvid" poster="img/play-icon.png">';
         data += '<source src="video/loicas.mp4" type="video/mp4"/>';
         data += '</video>';
         setTimeout(function(){
            $("#proyectos-container").html(data);
            $("#proyectos-container").fadeIn();
         },500);
      }
   }

   if(id == 8)//conectividad
   {
      if(s == 1)
      {    
         fetch('json/conectividad.json')
         .then(response => response.json())
         .then(json => {
            data += '<div class="row">';
            data += '<div class="col-6">';
            data += '<img src="img/loicas/conectividad/1.jpg" class="conect-img">';
            data += '</div>';  
            data += '<div class="col-6">';
            data += '<ul class="accesos">';
            for(var clave in json['Loicas']['accesos'])
            {
               data += '<li>'+json['Loicas']['accesos'][clave]+'</li>';
            }
            data += '</ul>';
            data += '</div></div>';  
            
            setTimeout(function(){
               $("#proyectos-container").html(data);
               $("#proyectos-container").fadeIn();
            },500);
         })
      }
   }
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

function hideSideNav(){
   $("#sidenav-1").css("margin-left","-100%");
   $("#sidenav-2").removeClass("fadeLeft");
   $("#sidenav-2").addClass("fadeLeftOut");
   $("#proyectos-container").fadeOut();
   $("#proyectos-container").html("");
   logocenter.innerHTML = '';
   setTimeout(function(){
      $("#sidenav-2").css("display","none");
   },1000);
}

function buildLoicas(){
   $("#loicas").removeClass("fadeOut");
   $("#loicas").css("display","block");
   interaction = localStorage.setItem("interaction","loicasinside");
   goInside(1,1);
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

function showPopover(id,title,text)
{
   $(".pophover").fadeOut();
   $("#p-"+id).css("display","block");
   $("#p-"+id+" .pophover-header").html(title);
   $("#p-"+id+" p").html(text);
}
 