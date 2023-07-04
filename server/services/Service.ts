import type { PrismaClient } from '@prisma/client'
import type { H3Event } from 'h3'

export class Service {
  protected readonly prisma: PrismaClient

  constructor (event: H3Event) {
    this.prisma = event.context.prisma
  }
}
