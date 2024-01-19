export const actions = {
	askQuestion: async ({ request }) => {
		const formData = await request.formData();
		const question = formData.get('question');
		console.log(`user asked "${question}"`)
	}
}