async function runTestRoute (ctx, next) {
	ctx.set('Content-Type','application/javascript');
	ctx.body = `
		let note = document.querySelector('body');
		note.insertAdjacentHTML("afterbegin",\`
			
		<div class="container">

    	<div id="Timer"></div>
    
		</div>
			<style>
			*{
				margin: 0px;
				padding: 0px;
			}
			@import url("https://fonts.googleapis.com/css?family=Lato:400,700|Montserrat:900");

.container {
    background: linear-gradient(170deg, rgba(49, 57, 73, 0.8) 20%, rgba(49, 57, 73, 0.5) 20%, rgba(49, 57, 73, 0.5) 35%, rgba(41, 48, 61, 0.6) 35%, rgba(41, 48, 61, 0.8) 45%, rgba(31, 36, 46, 0.5) 45%, rgba(31, 36, 46, 0.8) 75%, rgba(49, 57, 73, 0.5) 75%), linear-gradient(45deg, rgba(20, 24, 31, 0.8) 0%, rgba(41, 48, 61, 0.8) 50%, rgba(82, 95, 122, 0.8) 50%, rgba(133, 146, 173, 0.8) 100%);
    position: relative;
    margin: auto;
    overflow: hidden;
    width: 100%;
}

#Timer {
    display: grid;
    grid-template-columns: 1fr max-content 1fr;
    color: #f6f4f3;
    text-align: center;
    text-transform: uppercase;
    font-family: "Lato", sans-serif;
    font-size: 16px;
    letter-spacing: 4px;

}


.days,
.hours,
.minutes,
.seconds {
    display: inline-block;
    padding: 8px;
    min-width: 120px;
    margin: 4px;
    border-radius: 4px;
}

.message {
    padding-right: 48px;
    line-height: 98px;
    font-weight: 600;
    text-align: right;
}

.days {
    background: #ef2f3c;
}

.hours {
    background: #f6f4f3;
    color: #183059;
}

.minutes {
    background: #276fbf;
}

.seconds {
    background: #f0a202;
}

.numbers {
    font-family: "Montserrat", sans-serif;
    color: #183059;
    font-weight: 900;
    font-size: 40px;
}

.message {
    font-size: 20px;
    font-weight: 650;
}


.buyNowBtn {
    
    border: none;
    color: inherit;
    background: none;
    cursor: pointer;
    padding: 16px 32px;
    display: inline-block;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;
    height: 82px;
    top: 4px;
    border-radius: 4px;
    box-sizing: border-box;
    margin: 4px 8px;
    outline: none;
    position: relative;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
  }
  
  .buyNowBtn:after {
      
    content: '';
    position: absolute;
    z-index: -1;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
  }
  
  .buyNowBtn:before {
    font-family: 'FontAwesome';
    speak: none;
    text-transform: none;
    line-height: 1;
    position: relative;
    -webkit-font-smoothing: antialiased;
  }


.buyNowBtn {
    font-family: "Montserrat", sans-serif;
    color: #183059;
    font-weight: 900;
    font-size: 24px;
    background: #ef2f3c;
    transition: .3s;
  }
  
  .buyNowBtn:hover {
    font-size: 28px;
  }

  
  .buyNowBtn:before {
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
    line-height: 3;
    font-size: 140%;
    width: 60px;
  }
  
  .animated {
    -webkit-animation-duration: 10s;
    animation-duration: 10s;
    animation-delay: 2s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
  }
  
  @-webkit-keyframes tada {
    0% {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }
  
    1%, 2% {
      -webkit-transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
      transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
    }
  
    3%, 5%, 7%, 9% {
      -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
      transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
    }
  
    4%, 6%, 8% {
      -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
      transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
    }
  
    10%, 100% {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }
  }
  
  @keyframes tada {
    0% {
      -webkit-transform: scale3d(1, 1, 1);
      -ms-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }
  
    1%, 2% {
      -webkit-transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
      -ms-transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
      transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
    }
  
    3%, 5%, 7%, 9% {
      -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
      -ms-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
      transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
    }
  
    4%, 6%, 8% {
      -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
      -ms-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
      transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
    }
  
    10%, 100% {
      -webkit-transform: scale3d(1, 1, 1);
      -ms-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }
  }
  
  .tada {
    -webkit-animation-name: tada;
    animation-name: tada;
  }
  
  
			
			</style>
			
		\`)
		const config = {
			endTime: null,
			sizeSchema: 1,
			positionSchema: 0,
			messageText: "a new special offer!",
			buyNowBtnText: "buy now",
			daysText: "days",
			hoursText: "hours",
			minutesText: "minutes",
			secondsText: "seconds",
			messageTextColor: "yellow",
			buyNowBtnTextColor: "red",
			daysCountTextColor: "red",
			hoursCountTextColor: "red",
			minutesCountTextColor: "red",
			secondsCountTextColor: "red",
			daysLabelTextColor: "red",
			hoursLabelTextColor: "red",
			minutesLabelTextColor: "red",
			secondsLabelTextColor: "red",
			backgroundColor: "red",
			daysBackgroundColor: "yellow",
			hoursBackgroundColor: "yellow",
			minutesBackgroundColor: "yellow",
			secondsBackgroundColor: "yellow",
			buyNowBtnBackgroundColor: "yellow",
			daysBackgroundTemplate: null,
			hoursBackgroundTemplate: null,
			minutesBackgroundTemplate: null,
			secondsBackgroundTemplate: null,
			backgroundTemplate: null,
			buyNowBtnBackgroundTemplate: null
	}
	
	const year = new Date().getFullYear();
	let endTime = config.endTime ? config.endTime : new Date(year, 5, 4).getTime();
	let today = new Date().getTime();
	let diff = endTime - today;
	let days = Math.floor(diff / (1000 * 60 * 60 * 24));
	let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
	let seconds = Math.floor((diff % (1000 * 60)) / 1000);
	
	document.getElementById("Timer").insertAdjacentHTML('beforeend', "<div class='message' id='Message'>Special offer ends soon!</div>");
	document.getElementById("Timer").insertAdjacentHTML('beforeend', "<div><div class='days'><div class='numbers' id='TimerDays'>" + days + "</div><span id='DaysText'>days</span></div><div class='hours'><div class='numbers' id='TimerHours'>" + hours + "</div><span id='HoursText'>hours</span></div><div class='minutes'><div class='numbers'  id='TimerMinutes'>" + minutes + "</div><span id='MinutesText'>minutes</span></div><div class='seconds'><div class='numbers' id='TimerSeconds'>" + seconds + "</div><span id='SecondsText'>seconds</span></div></div>");
	document.getElementById("Timer").insertAdjacentHTML('beforeend', "<div><button class='buyNowBtn animated tada' id='BuyNowButton'>Buy Now</button></div>");
	
	const containerRef = document.querySelector('.container');
	const TimerRef = document.querySelector('#Timer');
	const messageTextRef = document.querySelector('#Message');
	const buyNowButtonTextRef = document.querySelector('#BuyNowButton');
	const daysCountingTextRef = document.querySelector('#TimerDays');
	const hoursCountingTextRef = document.querySelector('#TimerHours');
	const minutesCountingTextRef = document.querySelector('#TimerMinutes');
	const secondsCountingTextRef = document.querySelector('#TimerSeconds');
	const daysLabelTextRef = document.querySelector('#DaysText');
	const hoursLabelTextRef = document.querySelector('#HoursText');
	const minutesLabelTextRef = document.querySelector('#MinutesText');
	const secondsLabelTextRef = document.querySelector('#SecondsText');
	const daysBackgroundRef = document.querySelector('.days');
	const hoursBackgroundRef = document.querySelector('.hours');
	const minutesBackgroundRef = document.querySelector('.minutes');
	const secondsBackgroundRef = document.querySelector('.seconds');
	const buyNowButtonBackgroundRef = document.querySelector('.buyNowBtn');
	const allCountingNumbersRef = document.querySelectorAll('.numbers');
	
	applyConfigurations();
	
	let Timer = setInterval(function () {
			today = new Date().getTime();
			diff = endTime - today;
			days = Math.floor(diff / (1000 * 60 * 60 * 24));
			hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
			seconds = Math.floor((diff % (1000 * 60)) / 1000);
			daysCountingTextRef.innerHTML = days;
			hoursCountingTextRef.innerHTML = hours;
			minutesCountingTextRef.innerHTML = minutes;
			secondsCountingTextRef.innerHTML = seconds;
	
	
	}, 1000);
	
	function applyConfigurations() {
			applyBackgroundColors();
			applyTextColors();
			applyText();
			applySizeSchema();
	}
	
	function applyText() {
			config.messageText ? messageTextRef.innerHTML = config.messageText : null;
			config.buyNowBtnText ? buyNowButtonTextRef.innerHTML = config.buyNowBtnText : null;
			config.daysText ? daysLabelTextRef.innerHTML = config.daysText : null;
			config.hoursText ? hoursLabelTextRef.innerHTML = config.hoursText : null;
			config.minutesText ? minutesLabelTextRef.innerHTML = config.minutesText : null;
			config.secondsText ? secondsLabelTextRef.innerHTML = config.secondsText : null;
	}
	
	function applyBackgroundColors() {
			config.daysBackgroundTemplate ? daysBackgroundRef.style.background = config.daysBackgroundTemplate : null;
			config.daysBackgroundColor ? daysBackgroundRef.style.backgroundColor = config.daysBackgroundColor : null;
			config.hoursBackgroundTemplate ? hoursBackgroundRef.style.background = config.hoursBackgroundTemplate : null;
			config.hoursBackgroundColor ? hoursBackgroundRef.style.backgroundColor = config.hoursBackgroundColor : null;
			config.minutesBackgroundTemplate ? minutesBackgroundRef.style.background = config.minutesBackgroundTemplate : null;
			config.minutesBackgroundColor ? minutesBackgroundRef.style.backgroundColor = config.minutesBackgroundColor : null;
			config.secondsBackgroundTemplate ? secondsBackgroundRef.style.background = config.secondsBackgroundTemplate : null;
			config.secondsBackgroundColor ? secondsBackgroundRef.style.backgroundColor = config.secondsBackgroundColor : null;
			config.buyNowBtnBackgroundTemplate ? buyNowButtonBackgroundRef.style.background = config.buyNowBtnBackgroundTemplate : null;
			config.buyNowBtnBackgroundColor ? buyNowButtonBackgroundRef.style.backgroundColor = config.buyNowBtnBackgroundColor : null;
			config.backgroundTemplate ? containerRef.style.background = config.backgroundTemplate : null;
			config.backgroundColor ? containerRef.style.backgroundColor = config.backgroundColor : null;
			
	}
	
	function applyTextColors() {
			config.messageTextColor ? messageTextRef.style.color = config.messageTextColor : null;
			config.buyNowBtnTextColor ? buyNowButtonTextRef.style.color = config.buyNowBtnTextColor : null;
			config.daysLabelTextColor ? daysLabelTextRef.style.color = config.daysLabelTextColor : null;
			config.hoursLabelTextColor ? hoursLabelTextRef.style.color = config.hoursLabelTextColor : null;
			config.minutesLabelTextColor ? minutesLabelTextRef.style.color = config.minutesLabelTextColor : null;
			config.secondsLabelTextColor ? secondsLabelTextRef.style.color = config.secondsLabelTextColor : null;
			config.daysCountTextColor ? daysCountingTextRef.style.color = config.daysCountTextColor : null;
			config.hoursCountTextColor ? hoursCountingTextRef.style.color = config.hoursCountTextColor : null;
			config.minutesCountTextColor ? minutesCountingTextRef.style.color = config.minutesCountTextColor : null;
			config.secondsCountTextColor ? secondsCountingTextRef.style.color = config.secondsCountTextColor : null;
	}
	
	function applySizeSchema(){
			if(config.sizeSchema != 0){
				switch (config.sizeSchema){
					case 1:
							//tiny size
							Array.from(allCountingNumbersRef).map(note => note.style.fontSize = "24px");
							Array.from(allCountingNumbersRef).map(note => note.style.lineHeight = "30px");
							Array.from(allCountingNumbersRef).map(note => note.nextSibling.style.fontSize = "14px");
							messageTextRef.style.fontSize = "18px"
							messageTextRef.style.lineHeight = "78px";
							buyNowButtonTextRef.style.fontSize = "18px"
							buyNowButtonTextRef.style.height = "63px"
							
							break;
					case 2:
							//small size
							Array.from(allCountingNumbersRef).map(note => note.style.fontSize = "30px");
							Array.from(allCountingNumbersRef).map(note => note.style.lineHeight = "38px");
							messageTextRef.style.fontSize = "18px"
							messageTextRef.style.lineHeight = "86px";
							buyNowButtonTextRef.style.fontSize = "20px"
							buyNowButtonTextRef.style.height = "70px"
							break;
					case 3:
							Array.from(allCountingNumbersRef).map(note => note.style.fontSize = "44px");
							Array.from(allCountingNumbersRef).map(note => note.style.lineHeight = "56px");
							Array.from(allCountingNumbersRef).map(note => note.nextSibling.style.fontSize = "18px");
							messageTextRef.style.fontSize = "22px";
							messageTextRef.style.lineHeight = "107px";
							buyNowButtonTextRef.style.fontSize = "26px";
							buyNowButtonTextRef.style.height = "84px";
							buyNowButtonTextRef.style.top = "8px";
							break;
					default:
							//normal size
							return -1;
				}
			}
	}
	`;

	

};

module.exports = runTestRoute;