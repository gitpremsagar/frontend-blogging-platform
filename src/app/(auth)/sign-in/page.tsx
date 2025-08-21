export default function SignInPage() {
  return <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-3xl font-bold mb-5">Sign In</h1>
    <form>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" />
      </div>
    </form>
  </div>;
}   