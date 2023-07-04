import { z } from 'zod'

interface UnvalidatedRegisterForm {
  name?: string
  email?: string
  password?: string
}

const registerFormValidation = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6)
})

type RegisterForm = z.infer<typeof registerFormValidation>

export {
  registerFormValidation,
  RegisterForm,
  UnvalidatedRegisterForm
}
