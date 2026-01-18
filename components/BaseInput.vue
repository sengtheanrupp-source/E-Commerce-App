<script setup>
// Fixed the typo from 'erros' to 'errors'
const props = defineProps(['type','placeholder','modelValue']);
const emit = defineEmits(['update:modelValue']);

function updateInput(event){
  const val=event.target.value;
  emit('update:modelValue',event.target.value);
}
</script>

<template>
 <input @input="updateInput"
                    :value="modelValue"
                     :type="typeof type=='undefined'?type:'text'"
                     name=""
                     placeholder="placeholder"
                     id=""
                     class="focus:bg-focus-900 h-11 w-full rounded-lg border
                     border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800
                     placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden 
                     focus: focus:border-brand-800">
</template>