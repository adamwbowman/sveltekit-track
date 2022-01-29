<script>
	const contacts = [
		{ "name": "John", "age": 12 },
		{ "name": "Jane", "age": 22 },
		{ "name": "Mary", "age": 32 },
		{ "name": "Joan", "age": 42 },
		{ "name": "Jett", "age": 52 },
		{ "name": "Jimm", "age": 6 },
	];
	console.log(contacts);
</script>

<div class="contact">
	<slot {contacts} />
</div>