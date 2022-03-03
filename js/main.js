var cursor = document.getElementById("cursor");
document.onmousemove = function(e){
   cursor.style.left = (e.pageX - 25) + "px";
   cursor.style.top = (e.pageY - 25) + "px";
   cursor.style.display = "block";
}

$( document ).ready(function() {
    var h = 0;
    var hamburger = $('#hamburger-icon');
    hamburger.click(function() {
      if(h == 0){
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
});

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