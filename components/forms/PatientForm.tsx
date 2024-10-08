"use client"
import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import CustomFormFiled from "../CustomFormFiled"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actons/patient.actions"
 

export enum FormFieldType{
    INPUT= 'input',
    TEXTAREA='textarea',
    PHONE_INPUT= 'phoneinput',
    CHECKBOX = 'checkbox',
    DATE_PICKER='datePicker',
    SELECT='select',
    SKELETON='skeleton'
}
 
const PatientForm = ()=>  {
    const router = useRouter();
   const[isLoading,setIsLoading] =   useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email:"",
      phone:""

    },
  })

  async function onSubmit(values: z.infer<typeof UserFormValidation>) {

    setIsLoading(true);
    try{
        const user = {
            name: values.name,
            email: values.email,
            phone: values.phone,
          };
        console.log(user)
        const newuser=await createUser(user);
        if(newuser) router.push(`/patients/${newuser.$id}/register`)

    }catch(error){
        console.log(error);
    }
    setIsLoading(false);
  }          
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
            <h1 className="header">Hi there 👋</h1>
            <p className="text-dark-700">Schedule your first appointment.</p>

        </section>
     <CustomFormFiled 
     fieldType={FormFieldType.INPUT}
      control = {form.control}
      name="name"
      label="Full name"
      placeholder="John doe"
      iconSrc="/assets/icons/user.svg"
      iconAlt="user"
      />
     <CustomFormFiled 
     fieldType={FormFieldType.INPUT}
      control = {form.control}
      name="email"
      label="Email"
      placeholder="johndoe@gmail.com"
      iconSrc="/assets/icons/email.svg"
      iconAlt="email"
      />
     <CustomFormFiled 
     fieldType={FormFieldType.PHONE_INPUT}
      control = {form.control}
      name="phone"
      label="phone number"
      placeholder="(555) 123-4567"
      iconSrc="/assets/icons/user.svg"
      iconAlt="user"
      />
     <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
    </form>
  </Form>
  )
}

export default PatientForm
