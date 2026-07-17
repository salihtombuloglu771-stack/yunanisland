import { UserRoleSelect } from '@/components/admin/UserRoleSelect'
import { createClient } from '@/lib/supabase/server'

export default async function AdminUsersPage() {
  const supabase = await createClient()
  const { data: { user: currentUser } } = await supabase.auth.getUser()
  const { data: users } = await supabase
    .from('users')
    .select('id, email, full_name, role, created_at')
    .order('created_at', { ascending: false })

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Kullanıcılar</h1>
        <p className="mt-1 text-sm text-neutral-500">{users?.length ?? 0} kayıtlı kullanıcı</p>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-neutral-950 text-left text-xs uppercase tracking-wider text-neutral-400">
            <tr>
              <th className="px-5 py-3">Ad Soyad</th>
              <th className="px-5 py-3">E-posta</th>
              <th className="px-5 py-3">Kayıt Tarihi</th>
              <th className="px-5 py-3">Rol</th>
            </tr>
          </thead>
          <tbody>
            {(users ?? []).map((u) => (
              <tr key={u.id} className="border-t border-slate-100 dark:border-neutral-800">
                <td className="px-5 py-3 font-medium text-neutral-800 dark:text-neutral-200">
                  {u.full_name || '—'} {u.id === currentUser?.id && <span className="text-xs text-sky-600">(sen)</span>}
                </td>
                <td className="px-5 py-3 text-neutral-500">{u.email}</td>
                <td className="px-5 py-3 text-neutral-500">{new Date(u.created_at).toLocaleDateString('tr-TR')}</td>
                <td className="px-5 py-3">
                  <UserRoleSelect userId={u.id} currentRole={u.role} disabled={u.id === currentUser?.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
