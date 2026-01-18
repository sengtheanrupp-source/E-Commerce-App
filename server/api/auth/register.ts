import { hash } from "node:crypto";
import { hashPassword } from "./modules/bcrypt";
import prisma from "~/lib/prisma";
import { loginSchema } from "./modules/validateUser";
import { generateOTP } from "./modules/generateOTPcode";
import { sendEmailVerification } from "./modules/sent-mail-verification";
import { USER_EMAIL_TYPE } from "./modules/user.constant";

export default  defineEventHandler(async(event) => {
    const {email,password}=await readBody(event);

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      throw createError({ 
        statusCode: 400, 
        message: 'Validation Failed',
        data: result.error.flatten(),
      })
    }


    const userExist=await prisma.user.findUnique({
        where:{email:email

        }
    })
    if(userExist){
      throw createError({statusCode:400,message:"User already exists"})
    }

    const otpCode=generateOTP();
    const hashPwd = await hashPassword(password)
    const user=await prisma.user.create({
        data:{
            email:email,
            isValidEmail: USER_EMAIL_TYPE.INVALID_EMAIL,
            otpCode:otpCode,
            password:hashPwd
        }
    })

    await sendEmailVerification(email,otpCode);

    return { message: 'User Created successfully', user, redirect: true };
  })

