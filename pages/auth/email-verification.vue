<script setup lang="ts">
import { ref } from "vue";
// Import the component if not using auto-imports
import VOtpInput from "vue3-otp-input";
import { useSignUpStore } from "~/stores/signup-store";
import { FetchError } from 'ofetch';

// 1. Define the reactive variable
const bindValue = ref<string>("");

// 2. Define the template ref for the component to use its methods
const otpInput = ref<InstanceType<typeof VOtpInput> | null>(null);

const signUpStore = useSignUpStore()
const {registerInput}=storeToRefs(signUpStore)  

const handleOnComplete = (value: string) => {
  registerInput.value.otpCode = value;
  console.log("OTP completed:", value);
};

const handleOnChange = (value: string) => {
  console.log("OTP changed:", value);
  bindValue.value = value;
};



const clearInput = () => {
  // Use the template ref to call the component's internal method
  otpInput.value?.clearInput();
  bindValue.value = "";
};

const fillInput = (value: string) => {
  bindValue.value = value;
};

const loading = ref(false);
const router = useRouter();
// const signUpStore = useSignUpStore()
// const {registerInput}=storeToRefs(signUpStore)

async function verifyEmail() {
  try {
    loading.value = true;
    const res = await $fetch("/api/auth/email-verification", {
      method: "POST",
      // Note: $fetch automatically stringifies objects, 
      // so you usually don't need JSON.stringify()
      body: registerInput.value, 
    });
    
    loading.value = false;
    successMsg(res?.message || "Email verified successfully");
    router.push('/auth/signin');
  } catch (error) {
    loading.value = false;

    // Check if it's a FetchError
    if (error instanceof FetchError) {
      const errors = error.data?.data?.fieldErrors;
      console.log("Validation errors:", errors);
    } else {
      console.error("An unexpected error occurred:", error);
    }
  }
}
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <div class="text-center">
      {{ 
          registerInput
      }}
      <h1 class="text-2xl font-bold mb-6">Email Verification</h1>
      <p class="mb-4">Enter the OTP sent to your email</p>
      <div class="flex justify-center mb-4">
        <v-otp-input
          ref="otpInput"
          input-classes="otp-input"
          :conditionalClass="['one', 'two', 'three', 'four']"
          separator="-"
          inputType="letter-numeric"
          :num-inputs="6"
          v-model:value="bindValue"
          :should-auto-focus="true"
          :should-focus-order="true"
          @on-change="handleOnChange"
          @on-complete="handleOnComplete"
          :placeholder="['*', '*', '*', '*', '*', '*']"
        />
      </div>
      <div class="space-x-2">
        <BaseBtn
          class="w-[100%]"
          @click="verifyEmail"
          :loading="loading"
          label="Verify your email address"
        ></BaseBtn>
      </div>
    </div>
  </div>
</template>

<style>
.otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}
/* Background colour of an input field with value */
.otp-input.is-complete {
  background-color: #e4e4e4;
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input::placeholder {
  font-size: 15px;
  text-align: center;
  font-weight: 600;
}
</style>
