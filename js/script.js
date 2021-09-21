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
	} 

	// else {
	// 	colorMenu.disabled = true;
	// }
})


