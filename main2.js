$(document).ready(function(){

   var country = $('.country-select').val("IT");
   var mese = "01";
   var year = 2017;

   genDays(mese, year);

   $('#forward-btn').click(function(){
      mese = parseInt(mese) + 1;
      if (mese == 13) {
         mese = 1;
         year++;
      }
      console.log("::" + mese);
      console.log("::" + year);
      genDays(mese, year);
   });

   $('#back-btn').click(function(){
      mese = parseInt(mese) - 1;
      if (mese == 0) {
         mese = 12;
         year--;
      }
      console.log("::" + mese);
      console.log("::" + year);
      genDays(mese, year);
   });

   $('.country-select *').click(function(){
      genDays(mese, year);
   });

   function genDays(mese, year){
      var date = moment(year+"-"+mese+"-01");
      var giorni_mese = date.daysInMonth();
      meseInLettere = date.format("MMMM");

      console.log(":");
      console.log($('.country-select').val());
      $('#day-list').html('');

      for (var i = 1; i <= giorni_mese; i++) {
         var day = moment(year+"-"+mese+"-"+i)
         $('#day-list').append("<div class='data-item' dateymd=" + day.format("YYYY-MM-DD") + ">" + i + " " + meseInLettere + " " + year + "</div>");
      }

      $.ajax({
         url : 'https://holidayapi.com/v1/holidays',
         method : "GET",
         data : {
            key : '4283f11a-0c36-490a-a135-7df8f7c954d4',
            country : $('.country-select').val(),
            year : year,
            month : mese
         },
         success : function(data){
            console.log(data);
            console.log(data.holidays.length);
            for (var i = 0; i < data.holidays.length; i++) {
               $('.data-item').each(function(){
                  if ( data.holidays[i].date == $(this).attr('dateymd') ){
                     $(this).addClass('red');
                  }
               });
            }
         },

         error : function(error){
            
         }

      });


   }

});
