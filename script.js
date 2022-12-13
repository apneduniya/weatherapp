const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b1d24163cfmsh72ff872fc06f7e1p178ec3jsnf2270e65bd20',
		'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
	}
};

const data = async(city) => {

	const dateTime = new Date();

	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
	const weekDay = days[dateTime.getDay()];

	const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const monthName = months[dateTime.getMonth()]

	document.getElementById('data-date-time').innerHTML = dateTime.getHours() + ':' + dateTime.getMinutes() + ' - ' + weekDay + ', ' + dateTime.getDate() + ' ' + monthName + " '" + dateTime.getFullYear().toString().slice(-2);

	

	const bgImg = document.getElementById('bg-img');

	// 4am - 12pm

	if (dateTime.getHours() > 4 && dateTime.getHours() < 12){
		bgImg.src = 'assets/morningSvg.svg'
	}

	// 12pm - 3pm

	else if (dateTime.getHours() > 11 && dateTime.getHours() < 15){
		bgImg.src = 'https://oshiprint.in/image/data/poster/new/mqp1230.jpeg'
	}

	// 3pm - 4pm

	else if (dateTime.getHours() > 14 && dateTime.getHours() < 16){
		bgImg.src = 'https://images.unsplash.com/photo-1601786776487-5530c3a6287a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXRpZnVsJTIwc2t5fGVufDB8fDB8fA%3D%3D&w=1000&q=80'
	}

	// 4pm - 6pm

	else if (dateTime.getHours() > 15 && dateTime.getHours() < 18){
		bgImg.src = 'assets/eveningImg.jpg'
	}

	// 6pm - 4am

	else if (dateTime.getHours() > 17 || dateTime.getHours() < 4){
		bgImg.src = 'assets/nightImg.jpg';
	}



	document.getElementById('data-celcius').innerHTML = '--';
	document.getElementById('data-cloudy').innerHTML = '--';
	document.getElementById('data-humidity').innerHTML = '--';
	document.getElementById('data-wind-speed').innerHTML = '--';
	document.getElementById('data-city').innerHTML = city.charAt(0).toUpperCase() + city.slice(1);

    const loading = document.getElementById('loading');

    loading.style.display = 'flex';

    await fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city, options)
	.then(response => response.json())
	.then(response => {
		if (response.temp !== undefined){
			document.getElementById('data-celcius').innerHTML = response.temp;
			document.getElementById('data-cloudy').innerHTML = response.wind_speed + '%';
			document.getElementById('data-humidity').innerHTML = response.humidity + '%';
			document.getElementById('data-wind-speed').innerHTML = response.wind_speed + 'km/h';
		}
		console.log(response);
	})
	.catch(err => {
		console.error(err);
		alert('Something went wrong!');
	});

    loading.style.display = 'none';

	console.log(data);
	document.getElementById('input-location').value = '';


}

const delay = (delayInms) => {
	return new Promise(resolve => setTimeout(resolve, delayInms));
}

const startApp = async () => {
	data('Kolkata');
	const dateTime = new Date();
	const currentSeconds = dateTime.getSeconds();
	const remainingSeconds = 60 -currentSeconds;
	await delay(remainingSeconds*1000);
	window.setInterval(data(document.getElementById('data-city').innerHTML), 60000);
}

window.onload = startApp();


