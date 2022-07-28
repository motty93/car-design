import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './users.entities'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async create(email: string, password: string) {
    const user = this.repo.create({ email, password })

    return await this.repo.save(user)
  }

  async findOne(id: number) {
    return await this.repo.findOne({ where: { id } })
  }

  async find(email: string) {
    return await this.repo.find({ where: { email } })
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id)
    if (!user) {
      throw new Error('user not found')
    }
    Object.assign(user, attrs)

    return await this.repo.save(user)
  }

  async remove(id: number) {
    const user = await this.findOne(id)
    if (!user) {
      throw new Error('user not found')
    }

    return await this.repo.remove(user)
  }
}
