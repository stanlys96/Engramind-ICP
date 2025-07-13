export const SearchBar = () => (
  <div className="flex gap-3 w-full flex-wrap mb-6">
    <input
      type="text"
      placeholder="Search Persona..."
      className="flex-1 px-4 focus-visible:outline-none py-2 border rounded-md dark:bg-neutral-700 border-zinc-400 dark:text-neutral-100 dark:border-zinc-700"
    />
    <select className="border rounded-md px-3 py-2 dark:bg-neutral-700 dark:border-zinc-700 border-zinc-400 dark:text-neutral-100 appearance-none">
      <option>Sort by Role</option>
    </select>
  </div>
);
