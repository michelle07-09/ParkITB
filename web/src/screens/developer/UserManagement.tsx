export function UserManagement() {
  const mockUsers = [
    { name: 'Dr. Ahmad Faisal', email: 'ahmad@itb.ac.id', role: 'Staff', plate: 'B 1234 ITB', status: 'Active', statusColor: 'bg-emerald-100 text-emerald-800' },
    { name: 'Siti Aminah', email: 'siti@students.itb.ac.id', role: 'Student', plate: 'D 8888 PL', status: 'Active', statusColor: 'bg-emerald-100 text-emerald-800' },
    { name: 'Budi Santoso', email: 'budi@security.itb.ac.id', role: 'Petugas', plate: '-', status: 'Active', statusColor: 'bg-emerald-100 text-emerald-800' },
    { name: 'Rizki Pratama', email: 'rizki@students.itb.ac.id', role: 'Student', plate: 'F 4422 GH', status: 'Suspended', statusColor: 'bg-error-container text-error' },
    { name: 'Vendor JNE', email: 'ops@jne.co.id', role: 'Guest', plate: 'B 9000 XYZ', status: 'Temporary', statusColor: 'bg-secondary-container text-on-secondary-container' },
  ];

  return (
    <>
      <header className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-4xl font-headline font-extrabold text-primary tracking-tight">User Management</h2>
          <p className="text-on-surface-variant font-medium">Manage registered vehicle owners and access permissions.</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-br from-primary to-primary-container text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined">person_add</span>
          Add New User
        </button>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Users', value: '3,482', icon: 'group', border: 'border-primary' },
          { label: 'Staff', value: '892', icon: 'badge', border: 'border-primary-container' },
          { label: 'Students', value: '2,140', icon: 'school', border: 'border-secondary-container' },
          { label: 'Guests', value: '450', icon: 'person', border: 'border-surface-tint' },
        ].map(s => (
          <div key={s.label} className={`bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_24px_rgba(0,42,88,0.04)] border-l-4 ${s.border}`}>
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">{s.label}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-headline font-bold text-on-surface">{s.value}</h3>
              <span className="material-symbols-outlined text-primary text-lg">{s.icon}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Search */}
      <div className="bg-surface-container-low p-4 rounded-xl flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface-container-lowest border-none ring-1 ring-outline-variant focus:ring-2 focus:ring-primary outline-none text-sm" placeholder="Search by name, email, or plate..." type="text"/>
        </div>
        <select className="bg-surface-container-lowest border-none rounded-lg px-4 py-2.5 text-sm ring-1 ring-outline-variant focus:ring-2 focus:ring-primary outline-none">
          <option>All Roles</option><option>Staff</option><option>Student</option><option>Petugas</option><option>Guest</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.1em] text-on-surface-variant">Name</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.1em] text-on-surface-variant">Email</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.1em] text-on-surface-variant">Role</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.1em] text-on-surface-variant">Plate</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.1em] text-on-surface-variant">Status</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.1em] text-on-surface-variant">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            {mockUsers.map((u, idx) => (
              <tr key={u.email} className={`${idx % 2 !== 0 ? 'bg-surface-container-low/30' : ''} hover:bg-surface-container-low transition-colors`}>
                <td className="px-6 py-5 font-semibold text-sm">{u.name}</td>
                <td className="px-6 py-5 text-sm text-on-surface-variant">{u.email}</td>
                <td className="px-6 py-5 text-sm font-medium">{u.role}</td>
                <td className="px-6 py-5 text-sm font-mono font-bold text-primary">{u.plate}</td>
                <td className="px-6 py-5"><span className={`px-3 py-1 rounded-full text-xs font-bold ${u.statusColor}`}>{u.status}</span></td>
                <td className="px-6 py-5 flex gap-2">
                  <button className="p-2 hover:bg-primary/10 rounded-full text-primary"><span className="material-symbols-outlined text-sm">edit</span></button>
                  <button className="p-2 hover:bg-error/10 rounded-full text-error"><span className="material-symbols-outlined text-sm">delete</span></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
