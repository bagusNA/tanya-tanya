import * as argon2 from 'argon2'
import type { H3Event } from 'h3'
import type { PrismaClient } from '@prisma/client'
import { Service } from '~/server/services/Service'

export class UserService extends Service {
  private readonly user: PrismaClient['user']

  constructor (event: H3Event) {
    super(event)

    this.user = this.prisma.user
  }

  async getAll () {
    return await this.user.findMany()
  }

  async create (name: string, email: string, password: string) {
    const existingUser = await this.isUserExists(email)

    if (existingUser) {
      throw new Error('Email has been already registered!')
    }

    const { password: _, ...user } = await this.user.create({
      data: {
        name,
        email,
        password: await argon2.hash(password)
      }
    })

    return user
  }

  async isUserExists (email: string) {
    const userCount = await this.user.count({
      where: {
        email
      }
    })

    return !!(userCount)
  }
}
