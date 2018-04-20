
/* day class HTML structure */
var dayDivOpen = "<div class='day'>",
      dayNumberOpen = '<span class="day-number">',
      dayNumberClose = '</span>',
      dayNameOpen = '<span class="day-name">',
      dayNameClose = '</span>',
      dayHolidayOpen = '<span class="holiday">',
      dayHolidayClose = '</span>',
    dayDivClose = "</div>";


// 4283f11a-0c36-490a-a135-7df8f7c954d4
$(document).ready(function(){

   var country = "IT";
   var startDay = "01";
   var startMonth = moment().month(0).format("MM");
   var startYear = 2017;

   var format = startYear+"-"+startMonth+"-"+startDay;

   var startDate = moment(format);

   var daysInMonth = moment(format).daysInMonth();



   $(document).on('click', '.country-select', function(){
      country = $('.country-select').val();
      console.log(country);
      $.ajax({
         url : 'https://holidayapi.com/v1/holidays',
         method : "GET",
         data : {
            key : '4283f11a-0c36-490a-a135-7df8f7c954d4',
            country : country,
            year : startYear,
            month : startMonth
         },
         success : function(data){
            console.log(data);
            $(".days").children().removeClass("red");
            for (var i = 0; i < data.holidays.length; i++){
               var hol = data.holidays[i];
               //console.log(hol);
               var holidayDayDate = moment(hol.date).format("D");
               //console.log("ciao");
               console.log(holidayDayDate);
               $('.day').each(function(){
                  var numberDay = $(this).children('.day-number').text();
                  console.log("number: " + numberDay);
                  console.log("holiday: " + holidayDayDate);
                  if (numberDay == holidayDayDate) {
                     $(this).addClass('red');
                  }
               });
            }
         },
         error : function(e){
            console.log(e);
         }
      });
   });

   printDayList(daysInMonth, startYear, startMonth);

   function ajaxCall() {
      $.ajax({
         url : 'https://holidayapi.com/v1/holidays',
         method : "GET",
         data : {
            key : '4283f11a-0c36-490a-a135-7df8f7c954d4',
            country : country,
            year : startYear,
            month : startMonth
         },
         success : function(data){
            console.log(data);
            for (var i = 0; i < data.holidays.length; i++){
               var hol = data.holidays[i];
               //console.log(hol);
               var holidayDayDate = moment(hol.date).format("D");
               //console.log("ciao");
               console.log(holidayDayDate);
               $('.day').each(function(){
                  var numberDay = $(this).children('#day-number').text();
                  console.log(numberDay);
                  console.log(holidayDayDate);
                  if (numberDay == holidayDayDate) {
                     $(this).addClass('red');
                  }
               });
            }
         },
         error : function(e){
            console.log(e);
         }
      });
   }

   function printDayList(daysInMonth, year, month){

      for (var i = 1; i <= daysInMonth; i++) {

         if (i<10) {
            i = "0"+i;
            console.log("num: " + i);
         }
         var currDay = i.toString();

         $('.days').append(
            dayDivOpen +
            dayNumberOpen + moment(year+"-"+month+"-"+currDay).format("D") + dayNumberClose  +
            " - " + dayNameOpen + moment(year+"-"+month+"-"+currDay).format("dddd") + dayNameClose +
            dayDivClose
         );
         i = parseInt(i);
      }
   }

   // for (var i = 1; i <= daysInMonth; i++) {
   //
   //    if (i<10) {
   //       i = "0"+i;
   //       console.log("num: " + i);
   //    }
   //    var currDay = i.toString();
   //
   //    $('.days').append(
   //       dayDivOpen +
   //       dayNumberOpen + moment(startYear+"-"+startMonth+"-"+currDay).format("D") + dayNumberClose  +
   //       " - " + dayNameOpen + moment(startYear+"-"+startMonth+"-"+currDay).format("dddd") + dayNameClose +
   //       dayDivClose
   //    );
   //    i = parseInt(i);
   // }


});
