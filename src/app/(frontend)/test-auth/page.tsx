import SignIn from "@/components/SignIn"

export default function TestAuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            ทดสอบระบบ OAuth
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            คลิกปุ่มด้านล่างเพื่อทดสอบการล็อกอินผ่าน Google
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <SignIn />
        </div>
      </div>
    </div>
  )
}
