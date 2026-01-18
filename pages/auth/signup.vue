<script setup>
   import { useVuelidate } from '@vuelidate/core'
   import { required, email } from '@vuelidate/validators'
   import FormError from '~/components/FormError.vue'
   
   definePageMeta({
       layout: "auth"
   
   })
   
   const rules = {
       name: { required }, // Matches state.name
       email: { required,email }, // Matches state.email
       password: { required }, // Matches state.password
       
   }
   
   // const registerInput = ref({
   //   email: "ben@gmail.com",
   //   password: ""
   
   // })
    const signUpStore = useSignUpStore()
    const {registerInput}=storeToRefs(signUpStore)

    const v$ = useVuelidate(rules, registerInput)
    const loading=ref(false)
    const router = useRouter()

    
   async function SubmitInput(){
    const isValid=v$.value.$validate()
    if(!isValid) return
    
   try{
    loading.value=true;
    const res=await $fetch('/api/auth/register',{
      method:'POST',
      body:JSON.stringify(registerInput.value)
    })
    loading.value=false;
    router.push('/auth/email-verification')
    console.log(res)
   }catch(error){
      loading.value=false;
      const erros=error?.data?.data?.fieldErrors
      for (const inputFieldName in errors){
        for(const inputErrorMessage of errors[inputFieldName]){
          showError(inputErrorMessage)
        }
      }
   }
}
   
</script>
<template>
   <div class="bg-white h-screen">
      <div class="flex justify-between">
         <div></div>
         <div class="w-[300px] mt-20">
            <div class="flex flex-col gap-2">
               <h1 class="text-2xl mb-3">Sign Up</h1>
               {{ registerInput }}
               <FormError :errors="v$.email.$errors">
                  <BaseInput v-model="registerInput.email" :type="'text'" :placeholder="'info@gmail.com'"/>
               </FormError>
               <FormError :errors="v$.password.$errors">
                  <BaseInput v-model="registerInput.password" :type="'password'" :placeholder="'password'"/>
               </FormError>
               loading
               <BaseBtn @click="SubmitInput" :loading="loading" label="Sign up"></BaseBtn>
               <!-- <button 
                  @click="submitInput"
                  class="rounded-md mb-2 text-white py-2 bg-indigo-500 text-sm font-semibold">Sign Up</button> -->
               <p class="text-sm font-normal text-penter text-gray-700 dark:text-gray-500">
                  Don't have an account?
                  <NuxtLink to="/auth/signup" class="text-indigo-500 hover:text-brand-600 font-semibold"
                     >Sign In</NuxtLink>
               </p>
            </div>
         </div>
         <div></div>
      </div>
   </div>
</template>