'use client'
import Hero from "./com/Hero";


declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Home() {

  return (
    <main className="flex flex-col items-center justify-start">
      <Hero />    
    </main>
  )


}
