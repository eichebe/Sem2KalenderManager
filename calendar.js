function main () {
    let strDebug ="";
    let datToday = new Date ();
    strDebug += "datToday: " + datToday.toDateString() + "<br/>";
    let datTodayGerman = getDateGerman(datToday);
    strDebug += "datTodayGerman:" + datTodayGerman + "<br/>";


    let weekday = datToday.getDate();

    strDebug += "weekday: " + weekday + "<br/>";
    let weekdayGerman = getWeekdayGerman(weekday);
    strDebug += "weekdayGerman: " + weekdayGerman + "<br/>";
    
    
    let elDebug = document.getElementById("debug");
    if(elDebug != null){
        elDebug.innerHTML = strDebug;
    }else{
        console.log("Debug-Elemen nicht gefunden")
    }
        }
        dateGerman = day + "." + month + "." + year;
        return dateGerman;
    }


    function getWeekdayGerman (weekdayIndex) {
        switch(weekdayIndex){

        case 0: return "Montag"
        case 1: return "Dienstag"
        case 2: return "Mittwoch"
        case 3: return "Donnerstag"
        case 4: return "Freitag"
        case 5: return "Samstag"
        case 6: return "Sonntag"
  
        }
    }
}
main();