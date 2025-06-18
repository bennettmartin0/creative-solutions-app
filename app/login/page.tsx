import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <form className="mx-auto max-w-sm items-center gap-x-4 rounded-xl text-wrap: wrap-break-word p-6 shadow-lg outline-black/5 dark: bg-slate-200 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
     <table>
        <tbody>
        <tr>
            <td>
                <label htmlFor="email">Email:</label>
            </td>
        </tr>
        <tr>
            <td>
                <input className='bg-slate-100 border-b-gray-900' id="email" name="email" type="email" required />
            </td>
        </tr>
        <tr>
            <td>
                <label htmlFor="password">Password:</label>
            </td>
        </tr>
        <tr>
            <td>
                <input className='bg-slate-100 border-b-gray-900' id="password" name="password" type="password" required />
            </td>
        </tr>
        </tbody>
     </table>
    
    
    <table>
        <tbody>
        <tr>
            <td>
                <button formAction={login}>Log in</button>
            </td>
            <td>
                <button formAction={signup}>Sign up</button>
            </td>
        </tr> 
        </tbody>       
     </table>


      
    </form>
  )
}