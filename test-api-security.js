// API Security Test Script
// สำหรับทดสอบหลัง deploy

// Test 1: ทดสอบ API โดยไม่มี secret (ควรได้ 401)
fetch('https://ecomm-ten-neon.vercel.app/api/auth/create-user', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'test@test.com', name: 'Test' }),
})

// Test 2: ทดสอบ API ด้วย secret ผิด (ควรได้ 401)
fetch('https://ecomm-ten-neon.vercel.app/api/auth/create-user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-internal-secret': 'wrong-secret',
  },
  body: JSON.stringify({ email: 'test@test.com', name: 'Test' }),
})

// Test 3: get-user-role โดยไม่มี secret (ควรได้ 401)
fetch('https://ecomm-ten-neon.vercel.app/api/auth/get-user-role?email=test@test.com')

// Test 4: profile API ยังใช้ได้ปกติ (ต้อง login ก่อน)
fetch('https://ecomm-ten-neon.vercel.app/api/profile')
