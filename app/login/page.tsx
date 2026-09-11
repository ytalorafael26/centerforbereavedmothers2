export default function Login() {
  return <AuthCard title="Welcome back" subtitle="Sign in to your private space." button="Sign in" />;
}
function AuthCard({title,subtitle,button}:{title:string;subtitle:string;button:string}) {
  return <div className="min-h-[70vh] bg-slate-50 px-6 py-16"><div className="mx-auto max-w-md rounded-4xl border border-slate-200 bg-white p-8 shadow-soft"><h1 className="text-3xl font-semibold">{title}</h1><p className="mt-2 text-slate-600">{subtitle}</p><form className="mt-8 space-y-4"><input type="email" required placeholder="Email address" className="w-full rounded-2xl border border-slate-200 px-4 py-3"/><input type="password" required placeholder="Password" className="w-full rounded-2xl border border-slate-200 px-4 py-3"/><button className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-white">{button}</button></form></div></div>;
}
