let trainNo = document.querySelector(".train");
let searchBtn = document.querySelector(".search");
let date = document.querySelector(".date");
let showTime = document.querySelector(".show-time");
let trainDetails = document.querySelector(".train-detail");
let formInput = document.querySelector(".train-input");
const main = document.querySelector("main")


formInput.addEventListener("submit",(e)=>{
	e.preventDefault();
	if(e.target.train.value.length == 5){
		getInfo();
		searchBtn.disabled = true;
	} else{
		alert("Invalid Train Number..Train No. Must Have 5 Digits")
	}
	setTimeout(()=>{
		e.target.train.value = "";
	e.target.date.value = "";
	searchBtn.disabled = false;
	},3000)
})

const options1 = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '531378d63dmsh7b5e0f910051020p121199jsn1c325f672fea',
		'X-RapidAPI-Host': 'indian-railway-irctc.p.rapidapi.com'
	}
};

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '531378d63dmsh7b5e0f910051020p121199jsn1c325f672fea',
		'X-RapidAPI-Host': 'indian-railway-irctc.p.rapidapi.com'
	}
};
let getInfo =  async () =>{
    let data = await fetch(`https://indian-railway-irctc.p.rapidapi.com/getTrainId?trainno=${trainNo.value}`, options1);
    let data2 = await data.json();

	if(data2[0] == undefined){
		alert("Invalid Train Number / Service Unavailable");
		return;
	} 

    let search = data2["0"]["id"];

    let train1 = await fetch(`https://indian-railway-irctc.p.rapidapi.com/getTrainLiveStatusById?id=${search}&date=${date.value}`, options)

    let train2 = await train1.json();

    console.log(train2);

	trainDetails.innerHTML = "";
		trainDetails.innerHTML += `<div class="train-name">
										<p>${train2.details.name} (${train2.details.number})</p>
										<p>${train2.details.source} To ${train2.details.destination}</p>
			                       </div>`

	showTime.innerHTML = "";
	train2.stations.forEach(ele => {
		// if(!ele) error = "System Is Busy..Try Again";
		showTime.innerHTML += `<div class="stoppage">
								<p class="station-name">${ele.source_name} (${ele.source_code})</p>
								<p class="time-table arr">Arrival :${ele.arrival}</p>
								<p class="time-table dep">Departure :${ele.departure}</p>
							   </div>`					   
	})
	if(showTime.innerHTML == ""){
		alert("Service Unavailable..Try Again Later")
	}
}

	





// fetch('https://indian-railway-irctc.p.rapidapi.com/getTrainLiveStatusById?id=743&date=20Jan%2023', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));


