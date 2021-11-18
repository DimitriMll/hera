import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ConsumerApiProvider } from '../context/ConsumerApi'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConsumerApiProvider>
      <Component {...pageProps} />
    </ConsumerApiProvider>
  )
}

export default MyApp
