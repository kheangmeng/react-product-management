import { Button } from '@/components/ui/button'
import { Link, createFileRoute } from '@tanstack/react-router'
import logo from '../logo.svg'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+1vmin)]">
        <img
          src={logo}
          className="h-[12vmin] pointer-events-none animate-[spin_20s_linear_infinite]"
          alt="logo"
        />
        <p className="mb-4">Welcome to React Product Management</p>
        <Link to="/admin/products" search={{ skip: 1 }} className="mb-4">
          <Button size={'lg'}>Go to Product Page</Button>
        </Link>
      </header>
    </div>
  )
}
