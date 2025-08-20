import type { ProductResponse } from '@/types'
import { faker } from '@faker-js/faker'

const range = (len: number) => {
  const arr: number[] = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newProduct = (num: number): ProductResponse => {
  return {
    id: num,
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price()),
    discountPercentage: faker.number.int(100),
    sku: faker.finance.accountNumber(5),
    stock: faker.number.int(100),
    added: faker.date.past(),
    category: faker.commerce.department(),
    variant: faker.number.int(3),
  }
}

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): ProductResponse[] => {
    const len = lens[depth]!
    return range(len).map((index): ProductResponse => {
      return {
        ...newProduct(index),
      }
    })
  }

  return makeDataLevel()
}
