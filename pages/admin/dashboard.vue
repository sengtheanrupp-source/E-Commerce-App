<script setup>
import { ref } from 'vue'

definePageMeta({
    layout: "admin" // <-- The fix is here
})

// ... other script logic ...

</script>
<template>
    <div class="bg-slate-200 h-screen">
      Dashborad 2  
    </div>
</template>