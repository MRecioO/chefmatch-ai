import { ChefHeader } from '@/components/chef-header'
import { ChefMatchApp } from '@/components/chefmatch-app'

export default function Page() {
  return (
    <main className="min-h-dvh bg-background">
      <ChefHeader />
      <ChefMatchApp />
    </main>
  )
}
