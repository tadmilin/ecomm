import { googleSignIn } from "@/lib/auth-actions"

interface SignInProps {
  buttonText: string
}

export default function SignIn({ buttonText }: SignInProps) {
  return (
    <form action={googleSignIn}>
      <button type="submit">{buttonText}</button>
    </form>
  )
}
