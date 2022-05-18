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
   const logos  = ['','loicas.png','piedra.png','macul.png'];
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
      
      buildContainer()
      goInside(id,1)

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
   let c    = 0;
   let d    = 0;
   let path = '';
   let skey = '';

   switch(s){
      case 1:
         path = 'loicas';
         skey = 'Loicas';
         break;
      case 2:
            path = 'piedras';
            skey = 'Piedras';
         break;
      case 3:
         path = 'macul';
         skey = 'Macul';
         break;
   }

   if(id == 1)//galeria
   {
      fetch('json/caption.json')
      .then(response => response.json())
      .then(json => {
         data += '<div id="carouselExampleCaptions" class="carousel slide" data-mdb-ride="carousel">';
         data += '<div class="carousel-inner">';

         for (var clave in json[skey]) 
         {
            c++
            if(c == 1)
            {
               data += '<div class="carousel-item active" >';
               data += '<img src="img/'+path+'/galeria/'+c+'.jpg" class="d-block w-100" alt="'+json[skey][clave]['caption']+'"/>';
               data += '<div class="carousel-caption d-none d-md-block">';
               data += '<h5 id="loicas-caption-'+c+'">'+json[skey][clave]['caption']+'</h5>';
               data += '</div>';
               data += '</div>';
            }
            else
            {
               data += '<div class="carousel-item">';
               data += '<img src="img/'+path+'/galeria/'+c+'.jpg" class="d-block w-100" alt="'+json[skey][clave]['caption']+'"/>';
               data += '<div class="carousel-caption d-none d-md-block">';
               data += '<h5 id="loicas-caption-'+c+'">'+json[skey][clave]['caption']+'</h5>';
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

   if(id == 2)//terminaciones
   {
      fetch('json/terminaciones.json')
      .then(response => response.json())
      .then(json => {
         data += '<div class="row domotica align-items-center">';
         data += '<div class="col domotica-col">';
         data += '<img src="img/'+path+'/terminaciones/1.jpg" class="domotica-back">';
         data += '<div class="dom-circle-container">';
         for(var clave in json[skey]){
            d++;
            data += '<div class="dom-circle" id="d-c-'+d+'" style="'+json[skey][clave]['style']+'" onclick="showPopover('+d+',\''+json[skey][clave]['title']+'\',\''+json[skey][clave]['description']+'\')">';
            data += '<div class="pophover '+json[skey][clave]['orientation']+'" id="p-'+d+'" style="display:none;"><div class="pophover-header"></div><p></p></div></div>';
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

   if(id == 3)//domotica
   {
      fetch('json/domotica.json')
      .then(response => response.json())
      .then(json => {
         data += '<div class="row domotica align-items-center">';
         data += '<div class="col domotica-col">';
         data += '<img src="img/'+path+'/domotica/1.jpg" class="domotica-back">';
         data += '<div class="dom-circle-container">';

         for(var clave in json[skey]){
            d++;
            data += '<div class="dom-circle" id="d-c-'+d+'" style="'+json[skey][clave]['style']+'" onclick="showPopover('+d+',\''+json[skey][clave]['title']+'\',\''+json[skey][clave]['description']+'\')">';
            data += '<div class="pophover '+json[skey][clave]['orientation']+'" id="p-'+d+'" style="display:none;"><div class="pophover-header"></div><p></p></div></div>';
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

   if(id == 4)//condominio
   {
      fetch('json/condominio.json')
      .then(response => response.json())
      .then(json => {
         
         data += '<div class="row align-items-center" style="margin:0;"><div class="col">';
         data += '<div class="row condo-row" style="flex-direction: column;justify-content:center">';
         data += '<div class="col" style="padding:0px;">';
         data += json[skey]['title'];
         data += json[skey]['subtitle'];
         data += '</div>';
         data += '<div class="line"></div>';
         data += '<div class="col" style="padding:30px 0 0 0;">';
         data += '<div class="row">';
         data += '<div class="col-6" style="padding:0 0 0 150px;"><ul class="condominio-list">';
         for(var clave in json[skey]['entorno'])
         {
            data += '<li>'+json[skey]['entorno'][clave]+'</li>';
         }
         data += '</ul></div>';
         
         data += '<div class="col-6" style="padding:0 0 0 150px;"><ul class="condominio-list">';
         for(var clave in json[skey]['seguridad'])
         {
            data += '<li>'+json[skey]['seguridad'][clave]+'</li>';
         }

         data += '</ul></div>';
         data += '</div>';
         data += '</div>';
         data += '<div class="row condo-row" style="padding-top:60px;">';
         data += '<div class="col">';
         data += '<div class="owl-carousel owl-theme">';

         for (let index = 1; index <= 6; index++) 
         {
            data += '<div class="item" onclick="openCarousel('+index+')">';
            data += '<img src="img/'+path+'/thumbs/'+index+'.jpg" alt="Table Full of Spices"/>';
            data += '</div>';               
         }  
         data += '</div>';

         /* carousel big*/
         data += '<div id="carousel-condominio"><div id="carouselBasicExample2" class="carousel slide" data-mdb-ride="carousel">';
         data += '<div class="carousel-inner">';

         for (let index = 1; index <= 6; index++) 
         {
            data += '<div class="carousel-item" id="c-i-'+index+'">';
            data += '<img src="img/'+path+'/thumbs/'+index+'.jpg" class="d-block w-100" />';
            data += '</div>';
         }

         data += '</div>';
         data += '<button class="carousel-control-prev left-100" type="button" data-mdb-target="#carouselBasicExample2" data-mdb-slide="prev">';
         data += '<span class="carousel-control-prev-icon" aria-hidden="true"></span>';
         data += '<span class="visually-hidden">Previous</span>';
         data += '</button>';
         data += '<button class="carousel-control-next right-100" type="button" data-mdb-target="#carouselBasicExample2" data-mdb-slide="next">';
         data += '<span class="carousel-control-next-icon" aria-hidden="true"></span>';
         data += '<span class="visually-hidden">Next</span>';
         data += '</button>';
         data += '</div></div>';//end of carousel
         
         data += '</div>';
         data += '</div>';
         data += '</div></div>';//end of row--col--first

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

   if(id == 5)//casas
   {
  
      fetch('json/casas.json')
      .then(response => response.json())
      .then(json => {
         data += '<div class="row align-items-center">';
         data += '<div class="col-2" style="width:15%;padding-right:0;">';
         data += '<div class="nav flex-column nav-tabs text-center" id="v-tabs-tab" role="tablist" aria-orientation="vertical">';
         data += '<a class="nav-link active" id="v-tabs-home-tab" data-mdb-toggle="tab" href="#v-tabs-0" role="tab" aria-controls="v-tabs-0" aria-selected="true" style="display:none;"></a>';

         for(var clave in json[skey])
         {
            c++
            data += '<a class="nav-link" id="v-tabs-home-tab" data-mdb-toggle="tab" href="#v-tabs-'+c+'" role="tab" aria-controls="v-tabs-'+c+'" aria-selected="true">'+json[skey][clave]['title']+'</a>';
         }

         data += '</div></div>';
         data += '<div class="col-10" style="width:85%;">';
         data += '<div class="tab-content" id="v-tabs-tabContent">';  
         data += '<div class="tab-pane fade show active" id="v-tabs-0" role="tabpanel" aria-labelledby="v-tabs-0">';
         data += '<div class="row casas-tab align-items-center">';
         data += '<div class="col" style="padding-left:90px">';  
         data += '<h3 class="title-intro-casas">Casas de 2 pisos</h3>';  
         data += '<h4 class="subtitle-intro-casas">Con espacios para toda la familia</h4>';  
         data += '<ul class="accesos">';
         data += '<li>Casas de 3 dormitorios</li>';
         data += '<li>Espacios interiores integrados (Living, comedor, cocina y terraza)</li>';
         data += '<li>Cocinas semi integradas e integradas</li>';
         data += '<li>Escritorio en Dormitorio Principal</li>';
         data += '<li>Amplias terrazas con porcelanato</li>';
         data += '<li>2 baños, principal en suite, más baño de visita</li>';
         data += '</ul>';  
         data += '</div></div></div>';  

         c = 0;
         for(var clave in json[skey])
         {
            c++
            data += '<div class="tab-pane fade '+clas+'" id="v-tabs-'+c+'" role="tabpanel" aria-labelledby="v-tabs-'+c+'">';
            data += '<div class="row casas-tab align-items-center">';
            data += '<div class="col-9">';
            data += '<img src="img/'+path+'/casas/'+c+'.jpg" class="casas">';
            data += '</div>';  
            data += '<div class="col-3">';
            data += '<h4>'+json[skey][clave]['ambientes']+'</h4>';
            data += '<h4>'+json[skey][clave]['banos']+'</h4>';
            data += '<h5>'+json[skey][clave]['subtitle']+'</h5>';
            data += '<ul>';
            for(var subclave in json[skey][clave]['superficie'])
            {
               data += '<li>'+json[skey][clave]['superficie'][subclave]+'</li>';
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
   

   if(id == 6) //entorno
   {
      fetch('json/entorno.json')
      .then(response => response.json())
      .then(json => {
         data += '<div class="row align-items-center">';
         data += '<div class="col-8">';
         data += '<img src="img/'+path+'/entorno/1.png" class="conect-img-2">';
         data += '</div>';  
         data += '<div class="col-4">';
         data += '<ul class="accesos" style="padding:60px 30px 0 0">';
         for(var clave in json[skey]['accesos'])
         {
            data += '<li>'+json[skey]['accesos'][clave]+'</li>';
         }
         data += '</ul>';
         data += '</div></div>';  
         
         setTimeout(function(){
            $("#proyectos-container").html(data);
            $("#proyectos-container").fadeIn();
         },500);
      })
   }

   if(id == 7)//video
   {
      data += '<video autoplay id="loicasvid" poster="img/play-icon.png">';
      data += '<source src="video/'+path+'/video.mp4" type="video/mp4"/>';
      data += '</video>';
      setTimeout(function(){
         $("#proyectos-container").html(data);
         $("#proyectos-container").fadeIn();
      },500);
   }

   if(id == 8)//conectividad
   {   
      fetch('json/conectividad.json')
      .then(response => response.json())
      .then(json => {
         data += '<div class="row align-items-center">';
         data += '<div class="col-6">';
         data += '<img src="img/'+path+'/conectividad/1.png" class="conect-img">';
         data += '</div>';  
         data += '<div class="col-6">';
         data += '<ul class="accesos">';
         for(var clave in json[skey]['accesos'])
         {
            data += '<li>'+json[skey]['accesos'][clave]+'</li>';
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
var loto = 0;
function openCarousel(id){
   $("#carousel-condominio").css("transform","scale(1)");
   $("#carousel-condominio").css("opacity","1");
   $("#c-i-"+id).addClass("active");
   loto = 1;
}

function closeCarousel(){
   $("#carousel-condominio").css("transform","scale(0)");
   $("#carousel-condominio").css("opacity","0");
   $("#carouselBasicExample2 .carousel-item").removeClass("active");
   loto = 0;
}

function goOutside(){
   $("#sidenav-2 ul li").removeClass("small");
   $("#sidenav-2 ul li").removeClass("expand");
   $(".arrows").css("display","none");
   $("#back").css("transform","scale(0)");
   $("#back").css("opacity","0");
   buildContainer();
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

function buildContainer(){
   $("#loicas").removeClass("fadeOut");
   $("#loicas").css("display","block");
   interaction = localStorage.setItem("interaction","inside");
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
   if(text != '')
   {
      $("#p-"+id+" p").html(text);
   }
   else
   {
      $("#p-"+id+" p").remove();
   }
}

$(document).ready(function(){
   $(document).mouseup(function(e){

      var container1 = $("#carouselBasicExample2");
      
      if(loto == 1)
      {
        if (!container1.is(e.target) && container1.has(e.target).length === 0) 
        {
            closeCarousel();
        }
      }
    });
})