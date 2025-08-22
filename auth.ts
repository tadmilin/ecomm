import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // สร้าง user ใน Payload CMS เมื่อ login สำเร็จ
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/create-user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
            image: user.image,
          }),
        })

        if (response.ok) {
          console.log('User created/updated in Payload CMS')
        }
      } catch (error) {
        console.error('Error creating user in Payload:', error)
      }

      return true
    },
    async session({ session, token }) {
      // ดึง role จาก Payload CMS และส่งไปยัง session
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/get-user-role?email=${session.user?.email}`)
        if (response.ok) {
          const userData = await response.json()
          if (userData.user) {
            (session.user as any).role = userData.user.role
          }
        }
      } catch (error) {
        console.error('Error fetching user role:', error)
      }

      return session
    },
  },
})
