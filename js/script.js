// global variables

const jobMenu = document.querySelector('#title');
const jobRole = document.querySelector('#other-job-role');
const colorMenu = document.querySelector('#color');
const design = document.querySelector('#design');
const activities = document.querySelector('fieldset#activities');
let totalActivityCost = 0;
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
const credit = document.querySelector('#credit-card');
const paymentMethod = document.querySelector('#payment');
const form = document.querySelector('form');

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
	Event listener finds the cost of the target and adds it to the
	total if the checkbox is checked and removes it from the total
	if the checkbox is unchecked, then displays the total on the page.
*/
activities.addEventListener('change', (e) => {
	const totalDisplay = document.querySelector('p#activities-cost');
	if ( e.target.checked ) {
		totalActivityCost += parseInt(e.target.getAttribute('data-cost'));
	} else if ( !e.target.checked ) {
		totalActivityCost -= parseInt(e.target.getAttribute('data-cost'));

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

	if ( name.value === '') {
		e.preventDefault();
		alert('name missing')
	} else if ( emailRegex.test(email.value) === false ) {
		e.preventDefault();
		alert('invalid email')
	} else if ( paymentMethod.value === 'credit-card' && ccNumRegex.test(ccNum.value) === false ) {
		e.preventDefault();
		alert('invalid cc')
	} else if ( paymentMethod.value === 'credit-card' && zipRegex.test(zip.value) === false ) {
		e.preventDefault();
		alert('invalid zip')
	} else if ( paymentMethod.value === 'credit-card' && cvvRegex.test(cvv.value) === false ) {
		e.preventDefault();
		alert('invalid cvv')
	}
});

