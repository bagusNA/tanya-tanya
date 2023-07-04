import { StatusCodes } from 'http-status-codes'
import type { ZodError } from 'zod'
import { UserService } from '~/server/services/UserService'
import { registerFormValidation } from '~/server/validations/RegisterFormValidation'
import type { RegisterForm, UnvalidatedRegisterForm } from '~/server/validations/RegisterFormValidation'
import type { UserWithoutPassword } from '~/types/User'

export default eventHandler(async (event) => {
  const userService = new UserService(event)
  const unvalidatedRegisterForm = await readBody(event) as UnvalidatedRegisterForm
  let form: RegisterForm
  let user: UserWithoutPassword

  try {
    form = registerFormValidation.parse(unvalidatedRegisterForm)
  } catch (e) {
    throw createError({
      statusCode: StatusCodes.BAD_REQUEST,
      statusMessage: 'Bad Request',
      message: 'Invalid form!',
      data: {
        errors: (e as ZodError).flatten()
      }
    })
  }

  try {
    user = await userService.create(form.name, form.email, form.password)
  } catch (e) {
    throw createError({
      statusCode: StatusCodes.BAD_REQUEST,
      statusMessage: 'Bad Request',
      message: (e as Error).message
    })
  }

  return {
    message: 'User registered successfully!',
    data: {
      user
    }
  }
})
