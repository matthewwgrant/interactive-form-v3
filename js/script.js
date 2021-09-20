const jobMenu = document.querySelector('#title');
const jobRole = document.querySelector('#other-job-role');
document.querySelector('#name').focus();
jobRole.style.visibility = 'hidden';

jobMenu.addEventListener('change', (e) => {
	const otherJob = document.querySelector('#other-job-role');
	if (e.target.value === 'other') {
		otherJob.style.visibility = 'visible';
	} else {
		otherJob.style.visibility = 'hidden';
	}
})

