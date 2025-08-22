import { googleSignIn } from "@/lib/auth-actions"

export default function SignIn() {
  return (
    <form action={googleSignIn}>
      <button type="submit">Signin with Google</button>
    </form>
  )
}
