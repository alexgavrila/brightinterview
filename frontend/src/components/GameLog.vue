<template>
	<div>

    <p class="name"> Log</p>
		<div v-for="value in data" :key="value">
			<div>
				{{ value }}
			</div>
		</div>
	</div>
</template>

<script>

export default {
	props: ['data']
}
</script>

<style scoped>
  .name {
    font-weight:bold;
    font-size:1.5em;
    margin:0;
  }
</style>
