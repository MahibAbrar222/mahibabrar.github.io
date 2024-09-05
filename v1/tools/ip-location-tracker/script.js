const form = document.querySelector('#form');

function checkIP(ip){
	// Check if the IP is valid.

	const ipv4Pattern = 
        /^(\d{1,3}\.){3}\d{1,3}$/;
    const ipv6Pattern = 
        /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    return ipv4Pattern.test(ip) || ipv6Pattern.test(ip); // result
}
async function getInfo(ip){
	var url = 'http://ip-api.com/json/' + ip;
	await fetch(url)
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error('Error:', error);
		});
}

form.addEventListener("submit", (e) => {
	e.preventDefault();
	let ip = form.ip.value;
	if (checkIP(ip)){
		var url = 'http://ip-api.com/json/' + ip;

		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(e) {
			if (this.readyState == 4 && this.status == 200){
				var data = JSON.parse(xhr.responseText);
				
				if (data['status'] == 'success'){
					var lang = data['lat'];
					var long = data['lon'];

					var map = L.map('map').setView([lang, long], 13);
					L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
						maxZoom: 19,
						attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
					}).addTo(map);

					var marker = L.marker([lang,long]).addTo(map);
					marker.bindPopup("<b>Device Info</b><br>ISP: " + data['isp'] + "<br>Country: " + data['country']+ "<br>City: " + data['city']).openPopup();
				}
			}
		
		};

		xhr.open("GET", url, true);
		xhr.send();

	}else{
		alert("Invalid IP address");
	}
});