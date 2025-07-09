import { login, signup } from './actions'

export default function LoginPage() {
    return (
        <>
            <div className='w-full text-center text-9xl mb-8'>
                <h1 className='font-[signature]  pt-8'>Bennett Martin</h1>
                <h2 className='font-[Montserrat] font-thin  text-5xl'>CREATIVE SOLUTIONS</h2>
                <br />
                <p className='font-[Montserrat] font-light  text-2xl'>Let's Talk:</p>
                <p className='font-[Montserrat] font-light  text-xl '>
                    <a className='' href='mailto:bennett@bennettmartincreativesolutions.com'>bennett@bennettmartincreativesolutions.com</a>
                </p>
            </div>

        </>
    )
}