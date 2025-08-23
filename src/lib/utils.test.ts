import { describe, expect, it } from 'vitest'
import { formatCurrency, formatDate } from './utils'

describe('formatDate', () => {
  it('formats a Date object correctly', () => {
    const date = new Date('2023-12-25T00:00:00Z')
    // US locale, 2-digit month/day, numeric year
    // Note: Timezone may affect output, so we check for possible values
    const formatted = formatDate(date)
    expect([
      '12/25/2023', // Most common output
      '12/24/2023'  // Possible if running in a timezone behind UTC
    ]).toContain(formatted)
  })

  it('formats a date string correctly', () => {
    const formatted = formatDate('2022-01-05')
    expect(formatted).toBe('01/05/2022')
  })

  it('handles invalid date string gracefully', () => {
    const formatted = formatDate('invalid-date')
    // Invalid date will result in "Invalid Date" string
    expect(formatted).toBe('Invalid Date')
  })

  it('handles empty string as input', () => {
    const formatted = formatDate('')
    expect(formatted).toBe('Invalid Date')
  })

  it('formats with different months and days', () => {
    expect(formatDate('2024-06-01')).toBe('06/01/2024')
    expect(formatDate('2024-11-30')).toBe('11/30/2024')
  })
})

describe('formatCurrency', () => {
    it('formats positive numbers as USD currency', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56')
      expect(formatCurrency(0)).toBe('$0.00')
      expect(formatCurrency(1000000)).toBe('$1,000,000.00')
    })

    it('formats negative numbers as USD currency', () => {
      expect(formatCurrency(-50)).toBe('-$50.00')
      expect(formatCurrency(-1234.56)).toBe('-$1,234.56')
    })

    it('formats small decimal numbers correctly', () => {
      expect(formatCurrency(0.1)).toBe('$0.10')
      expect(formatCurrency(0.005)).toBe('$0.01') // rounds up
    })

    it('handles large numbers', () => {
      expect(formatCurrency(987654321.99)).toBe('$987,654,321.99')
    })
  })
