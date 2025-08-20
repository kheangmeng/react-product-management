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
        {/* <p className="mb-4">
          This app is built with <code className="bg-gray-700 p-1 rounded">React</code> and <code className="bg-gray-700 p-1 rounded">TanStack Router</code>.
        </p> */}
        <Link to="/admin/products" className="mb-4">
          <Button size={'lg'}>Go to Product Page</Button>
        </Link>
        {/* <p>
          Edit <code>src/routes/index.tsx</code> and save to reload.
        </p>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://tanstack.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn TanStack
        </a> */}
      </header>
    </div>
  )
}
