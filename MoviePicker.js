var showtimes = require('showtimes');
var colors = require('colors');
var s = showtimes(55121, {date:1});

var movie1 = "The Hundred-Foot Journey";
var movie2 = "Guardians of the Galaxy";
var timeGap = 10;
var movie1_TimeArray = new Array();
var movie2_TimeArray = new Array();

//things to do
//- convert the time to 24 hour
//- 

s.getTheaters(function (err, theaters) {
	// console.log(theaters);
	// console.log(theaters.length);

	//Looping through the theaters
	for(var theaterIndex = 0; theaterIndex < theaters.length; theaterIndex++){
		var theaterString = 'Theater: '+theaters[theaterIndex].name;
	  	console.log(theaterString.magenta);

	  	//Looping through the movives
	  	for (var movieIndex = 0; movieIndex < theaters[theaterIndex].movies.length; movieIndex++) {
	  		var movieTitle = theaters[theaterIndex].movies[movieIndex].name;

	  		//Checking for the two movies
	  		if (movieTitle == movie1 || movieTitle == movie2) {
	  			// console.log('   Movie: '+theaters[theaterIndex].movies[movieIndex].name);
	  			// console.log('      Showtimes: ');
	  		
	  			//Looping through the showtimes
		  		for (var showtimeIndex = 0; showtimeIndex < theaters[theaterIndex].movies[movieIndex].showtimes.length; showtimeIndex++) {
		  			var time = theaters[theaterIndex].movies[movieIndex].showtimes[showtimeIndex];
		  			var hours = Number(time.match(/^(\d+)/)[1]);
					var minutes = Number(time.match(/:(\d+)/)[1]);
					var AMPM = time.slice(-2);
					if(AMPM == "pm" && hours<12) hours = hours+12;
					if(AMPM == "am" && hours==12) hours = hours-12;
					var sHours = hours.toString();
					var sMinutes = minutes.toString();
					if(hours<10) sHours = "0" + sHours;
					if(minutes<10) sMinutes = "0" + sMinutes;
					// console.log('         '+theaters[theaterIndex].movies[movieIndex].showtimes[showtimeIndex]);
					// console.log('         hour: '+hours+', '+'minutes: '+minutes);

					//Saving the 24 hour movie time into the arrays
					if(movieTitle == movie1){
						movie1_TimeArray.push([hours, minutes]);
					}
					if(movieTitle == movie2){
						movie2_TimeArray.push([hours, minutes]);
					}
		  		}

		  		//Checking for the showtimes that are within the gap
		  		for(var movie1ShowtimeIndex = 0; movie1ShowtimeIndex < movie1_TimeArray.length; movie1ShowtimeIndex++){
		  			for(var movie2ShowtimeIndex = 0; movie2ShowtimeIndex < movie2_TimeArray.length; movie2ShowtimeIndex++){
		  				//Calculating the gap between the showtimes
		  				var actualGap = Math.abs(((movie1_TimeArray[movie1ShowtimeIndex][0]*60) + movie1_TimeArray[movie1ShowtimeIndex][1]) - 
		  									((movie2_TimeArray[movie2ShowtimeIndex][0]*60) + movie2_TimeArray[movie2ShowtimeIndex][1]));

		  				if(actualGap <= timeGap){
		  					// console.log('Found One!');
		  					// console.log('Actual Gap: '+actualGap);
		  					var movie1String = '   Movie 1: '+movie1+' @ '+movie1_TimeArray[movie1ShowtimeIndex][0]+':'+movie1_TimeArray[movie1ShowtimeIndex][1];
		  					var movie2String = '   Movie 2: '+movie2+' @ '+movie2_TimeArray[movie2ShowtimeIndex][0]+':'+movie2_TimeArray[movie2ShowtimeIndex][1];
		  					console.log(movie1String.green);
		  					console.log(movie2String.green);
		  					console.log('');
		  				}
		  			}
		  		}
	  		}
	  	}

	  	//Reseting the movie showtime arrays for the next theater
	  	movie1_TimeArray = new Array();
	  	movie2_TimeArray = new Array();
  	}
  // console.log(theaters[0].movies.length);
  // for (var i = theaters[0].length - 1; i >= 0; i--) {
  // 	theaters[0][i]
  // }
});