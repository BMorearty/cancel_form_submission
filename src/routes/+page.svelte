<script>
	import { enhance } from '$app/forms';
	let myForm;
	let question;
	$: canAsk = question?.length >= 3;

	function keydown(event) {
		// ⌘ + Enter submits the parent form
		if (event.key === 'Enter' && event.metaKey) {
			event.preventDefault();
			event.stopPropagation();
			submitForm();
		}
	}

	function submitForm() {
		myForm.requestSubmit();
	}

	// Can I prevent programmatic form submission if my
	// conditions aren't met?
	function maybePrevent(event) {
		if (!canAsk) {
			event.preventDefault();
			event.stopPropagation();
			return false;
		}
	}
</script>

<form bind:this={myForm} action="?/askQuestion" method="post" on:submit={maybePrevent} use:enhance>
	<label for="question">What is your question? (3 chars or more)</label>
	<textarea name="question" bind:value={question} on:keydown={keydown} />
	<input type="submit" value="Submit" disabled={!canAsk} />
</form>

<p>
	<b>Instructions</b>: I'm disabling the submit button if the question length is less than 3 chars.
	But programmatically submitting the form with
	<code>myForm.requestSubmit()</code> still submits it. E.g., try typing a 1-2 char question and then
	hitting Cmd+Enter (Mac) or Ctrl+Enter (Windows). Watch the server log panel.
</p>
<p>Question: how to prevent programmatically submitting the form?</p>

<style>
	label,
	textarea,
	input {
		display: block;
	}
</style>
