<script setup>
// Fixed the typo from 'erros' to 'errors'
const props = defineProps(['errors']);
</script>

<template>
  <div :class="{ error: props.errors?.length }">
    
    <slot></slot>

    <div class="input-errors" v-for="error of props.errors" :key="error.$uid">
      <div class="error-msg text-red-800">{{ error.$message }}</div>
    </div>
  </div>
</template>