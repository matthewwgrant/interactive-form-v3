// global variables

const jobMenu = document.querySelector('#title');
const jobRole = document.querySelector('#other-job-role');
const colorMenu = document.querySelector('#color');
const design = document.querySelector('#design');
const activities = document.querySelector('fieldset#activities');
let totalActivityCost = 0;
const activitiesBox = document.querySelector('#activities-box');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
const credit = document.querySelector('#credit-card');
const paymentMethod = document.querySelector('#payment');
const form = document.querySelector('form');
const checkBox = document.querySelectorAll('input[type="checkbox"]');

// page load settings
document.querySelector('#name').focus();
jobRole.style.visibility = 'hidden';
colorMenu.disabled = true;
paypal.style.display = 'none';
bitcoin.style.display = 'none';


/*
	Event listener hides 'other' text field unless 'other'
	is selected for job role
*/
jobMenu.addEventListener('change', (e) => {
	const otherJob = document.querySelector('#other-job-role');
	if (e.target.value === 'other') {
		otherJob.style.visibility = 'visible';
	} else {
		otherJob.style.visibility = 'hidden';
	}
});


/*
	Event listener disables color drop down until a design is 
	chosen and then displays colors available for only that 
	design

	Note: I could have combined the display and hide for loops in each block together
	and used the array length for either since they are the same and it would
	have been less code. But I separated them in case (and I know it won't be for this
	project but out of habit) they arrays ever became different lengths as it would
	then not work properly.
*/
design.addEventListener('change', (e) => {
	const punsDesign = document.querySelectorAll('option[data-theme="js puns"]');
	const heartsDesign = document.querySelectorAll('option[data-theme="heart js"]');

	if ( design.value === 'js puns') {
		colorMenu.disabled = false;
		colorMenu.value = punsDesign[0].value;
		
		for ( let i = 0; i < heartsDesign.length; i++ ) {
			heartsDesign[i].style.display = 'none';
		}

		for ( let j = 0; j < punsDesign.length; j++ ) {
			punsDesign[j].style.display = 'block';
		}

	} else if ( design.value === 'heart js') {
		colorMenu.disabled = false;
		colorMenu.value = heartsDesign[0].value;

		for ( let i = 0; i < punsDesign.length; i++ ) {
			punsDesign[i].style.display = 'none';
			heartsDesign[i].style.display = 'block';
		}

		for ( let j = 0; j < heartsDesign.length; j++ ) {
			heartsDesign[j].style.display = 'block';
		}
	} else {
		colorMenu.disabled = true;
	}
});

/*
	Event listener disables any event at the same time as the one
	that was selected and enables the disabled event if previously
	selected event is deselected
*/

activities.addEventListener('change', (e) => {
	const checked = e.target.checked;
	const activitiesInput = document.querySelectorAll('#activities-box input');
	
	for ( let i = 0; i < activitiesInput.length; i++ ) {
		const dateTime = activitiesInput[i].getAttribute('data-day-and-time');
		if ( dateTime && activitiesInput[i] !== e.target && activitiesInput[i].getAttribute('data-day-and-time') === e.target.getAttribute('data-day-and-time')) {
			activitiesInput[i].parentNode.className = 'disabled';
			activitiesInput[i].disabled = true;
		} 

		if (!checked && e.target && activitiesInput[i].getAttribute('data-day-and-time') === e.target.getAttribute('data-day-and-time')) {
			activitiesInput[i].parentNode.className = '';
			activitiesInput[i].disabled = false;
		}
	}
});

/*
	Event listener finds the cost of the target and adds it to the
	total if the checkbox is checked and removes it from the total
	if the checkbox is unchecked, then displays the total on the page.
	This also prevents the user from selecting multiple events that
	occur at the same time by disabling any other activities at the 
	same time as one that has been selected.
*/
activities.addEventListener('change', (e) => {
	const totalDisplay = document.querySelector('p#activities-cost');
	const checked = e.target.checked;
	const activityCost = e.target.getAttribute('data-cost');

	if ( checked ) {
		totalActivityCost += parseInt(activityCost);

	} else if ( !checked ) {
		totalActivityCost -= parseInt(activityCost);

	}
	totalDisplay.textContent = `Total: $${totalActivityCost}`;
});

/*
	Event listener checks to see which payment method is selected 
	and displays the information for that one and hides the others.
*/
paymentMethod.addEventListener('change', (e) => {
	if ( paymentMethod.value === 'paypal' ) {
		paypal.style.display = 'block';
		bitcoin.style.display = 'none';
		credit.style.display = 'none';
	} else if ( paymentMethod.value === 'bitcoin' ) {
		paypal.style.display = 'none';
		bitcoin.style.display = 'block';
		credit.style.display = 'none';
	} else {
		paypal.style.display = 'none';
		bitcoin.style.display = 'none';
		credit.style.display = 'block';
	}
});

// Form validation

form.addEventListener('submit', (e) => {
	const name = document.querySelector('input#name');
	const email = document.querySelector('input#email');
	const emailRegex = /^\w+[.]?\w+@\w+[.](com)$/i;
	const ccNum = document.querySelector('input#cc-num');
	const ccNumRegex = /^[0-9]{13,16}$/;
	const zip = document.querySelector('input#zip');
	const zipRegex = /^[0-9]{5}$/;
	const cvv = document.querySelector('input#cvv');
	const cvvRegex = /^[0-9]{3}$/;
	const nameHint = document.querySelector('#name-hint');
	const emailHint = document.querySelector('#email-hint');
	const activitiesInput = document.querySelectorAll('#activities-box input');
	const ccNumHint = document.querySelector('#cc-hint');
	const zipHint = document.querySelector('#zip-hint');
	const cvvHint = document.querySelector('#cvv-hint');
	const activitiesHint = document.querySelector('#activities-hint');

	let checked  = 0;

	if ( name.value === '') {
		e.preventDefault();
		nameHint.style.display = 'block';
		name.parentNode.className = 'error-border not-valid';
	} else {
		nameHint.style.display = 'none';
		name.parentNode.className = 'valid';
	}

	if ( emailRegex.test(email.value) === false ) {
		e.preventDefault();
		emailHint.style.display = 'block';
		email.parentNode.className = 'error-border not-valid';
	} else {
		emailHint.style.display = 'none';
		email.parentNode.className = 'valid';
	}

	for ( let i = 0; i < activitiesInput.length; i++ ) {
		
		if ( activitiesInput[i].checked ) {
			checked += 1;
		}
	}

	if ( checked === 0 ) {
		e.preventDefault();
		activities.lastElementChild.style.display = 'block';
		activities.className = 'activities error-border not-valid';
	} else if (checked !== 0 ) {
		activities.lastElementChild.style.display = 'none';
		activities.className = 'activities valid';
	}

	if ( paymentMethod.value === 'credit-card' && ccNumRegex.test(ccNum.value) === false ) {
		e.preventDefault();
		ccNumHint.style.display = 'block';
		ccNum.parentNode.className = 'error-border not-valid';
	} else if ( paymentMethod.value === 'credit-card' && ccNumRegex.test(ccNum.value) === true ) {
		ccNumHint.style.display = 'none';
		ccNum.parentNode.className = 'valid';
	}

	if ( paymentMethod.value === 'credit-card' && zipRegex.test(zip.value) === false ) {
		e.preventDefault();
		zipHint.style.display = 'block';
		zip.parentNode.className = 'error-border not-valid';
	} else if ( paymentMethod.value === 'credit-card' && zipRegex.test(zip.value) === true ) {
		zipHint.style.display = 'none';
		zip.parentNode.className = 'valid';
	}

	if ( paymentMethod.value === 'credit-card' && cvvRegex.test(cvv.value) === false ) {
		e.preventDefault();
		cvvHint.style.display = 'block';
		cvv.parentNode.className = 'error-border not-valid';
	} else if ( paymentMethod.value === 'credit-card' && cvvRegex.test(cvv.value) === true ){
		cvvHint.style.display = 'none';
		cvv.parentNode.className = 'valid';
	}
});

/*	
	Focus and blur do not bubble so had to use
	forEach to loop over checkbox inputs
	and add event listeners to each item that way
*/
checkBox.forEach( item => {
	item.addEventListener('focus', () => {
		item.parentNode.className = 'focus';
	})
});

checkBox.forEach( item => {
	item.addEventListener('blur', () => {
		item.parentNode.className = '';
	})
});


/*
	Event listener that updates on keyup to 
	determine if the email address is valid.
	Only goes into effect if the email field
	is the active input
*/
form.addEventListener('keyup', (e) => {
	const email = document.querySelector('input#email');
	const emailRegex = /^\w+[.]?\w+@\w+[.](com)$/i;


	if ( document.activeElement === email ) {
		if ( emailRegex.test(email.value) === false ) {
			e.preventDefault();
			email.nextElementSibling.style.display = 'block';
			email.parentNode.className = 'error-border not-valid';
		} else {
			email.nextElementSibling.style.display = 'none';
			email.parentNode.className = 'valid';
		}
	} 
});

/*
	Event listener lets the user know what is 
	wrong with the name field
*/
form.addEventListener('keyup', (e) => {
	const name = document.querySelector('input#name');
	const nameRegex = /^[A-Z]+ ?[A-Z]*/i;
	const checkNum = /\d/;

	if ( nameRegex.test(name.value) === false ) {
		if (checkNum.test(name.value) === true ) {
			e.preventDefault();
			name.nextElementSibling.textContent = 'Name may not contain any numbers';
			name.nextElementSibling.style.display = 'block';
			name.parentNode.className = 'error-border not-valid';
		} else if ( name.value !== '' && checkNum.test(name.value) === false ) {
			e.preventDefault();
			name.nextElementSibling.textContent = 'Name may not contain any special characters';
			name.nextElementSibling.style.display = 'block';
			name.parentNode.className = 'error-border not-valid';
		} else if (name.value === '') {
			e.preventDefault();
			name.nextElementSibling.style.display = 'block';
			name.parentNode.className = 'error-border not-valid';
		}
	} else {
		name.nextElementSibling.style.display = 'none';
		name.parentNode.className = 'valid';
	}
});
