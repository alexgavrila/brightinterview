<template>
	<div>
    <p class="name">{{data.name}}</p>
		<div v-for="(value, name) in data.stats" :key="value">
			<div>
				<p class="stat-name">{{ name }}</p> : {{ value }}
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
  .stat-name {
    font-weight:bold;
    display:inline;
  }

  .name {
    font-weight:bold;
    font-size:2em;
    margin:0;
  }
</style>