/**
 * API Security utilities for internal endpoints
 */

export function validateInternalRequest(request: Request): boolean {
  const apiSecret = request.headers.get('x-internal-secret')

  if (!apiSecret) {
    return false
  }

  if (!process.env.INTERNAL_API_SECRET) {
    console.error('INTERNAL_API_SECRET not configured')
    return false
  }

  return apiSecret === process.env.INTERNAL_API_SECRET
}

export function createInternalHeaders(): HeadersInit {
  if (!process.env.INTERNAL_API_SECRET) {
    throw new Error('INTERNAL_API_SECRET not configured')
  }

  return {
    'Content-Type': 'application/json',
    'x-internal-secret': process.env.INTERNAL_API_SECRET,
  }
}
