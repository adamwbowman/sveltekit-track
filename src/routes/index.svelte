<script>
// import { db } from '../lib/firebase'
// import { collection, query, orderBy, onSnapshot, addDoc, doc, deleteDoc } from "firebase/firestore"; 
// 
// let expenses = [];
// 
// // firestore entire get collection
// const expensesCol = collection(db, 'expenses');
// const queryAll = query(expensesCol,
// 	orderBy("createdAt", "asc")
// );
// 
// // listener for collection reactivity
// const listenCol = onSnapshot(queryAll, (querySnapshot) => {
// 	expenses = querySnapshot.docs.map(doc => {
// 		return { id: doc.id, ...doc.data() }
// 	});
// console.log(expenses);
// });

import Contacts from "./contacts.svelte";
import { slide } from 'svelte/transition';
import { fade } from 'svelte/transition';
</script>

<h1>Home</h1>

<Contacts let:contacts>
	{#each contacts as contact}
		<div in:slide out:fade>{contact.name}, {contact.age}</div>
	{/each}
</Contacts>