<script>
export let tag;
</script>

<slot {tag} ></slot>

<svg height="400" width="400">
	<circle r="20" x="20" y="20" fill="red" />
	<text x="50" y="50">{tag}</text>
</svg>