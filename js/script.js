// global variables

const jobMenu = document.querySelector('#title');
const jobRole = document.querySelector('#other-job-role');
const colorMenu = document.querySelector('#color');
const design = document.querySelector('#design');

// page load settings
document.querySelector('#name').focus();
jobRole.style.visibility = 'hidden';
colorMenu.disabled = true;


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
})


/*
	Event listener disables color drop down until a design is 
	chosen and then displays colors available for only that 
	design
*/

design.addEventListener('change', (e) => {
	const punsDesign = document.querySelectorAll('option[data-theme="js puns"]');
	const heartsDesign = document.querySelectorAll('option[data-theme="heart js"]');

	if ( design.value = 'js puns') {
		colorMenu.disabled = false;
		punsDesign[0].selected = true;
		
		for ( let i = 0; i < heartsDesign.length; i++ ) {
			heartsDesign[i].style.display = 'none';
		}

	} else if ( design.value = 'heart js') {
		colorMenu.disabled = false;
		heartsDesign[0].selected = true;

		for ( let i = 0; i < punsDesign.length; i++ ) {
			punsDesign[i].style.display = 'none';
		}

	} else {
		colorMenu.disabled = true;
	}
})


