<script>
let contacts = [
	{ "name": "John", "age": 12 },
	{ "name": "Jane", "age": 22 },
	{ "name": "Mary", "age": 32 },
	{ "name": "Joan", "age": 42 },
	{ "name": "Jett", "age": 52 },
	{ "name": "Jimm", "age": 6 },
];
console.log(contacts);
</script>

<div class="contact" on:click="{() => contacts = [...contacts.slice(0, contacts.length -1)]}">
	<slot {contacts} />
</div>