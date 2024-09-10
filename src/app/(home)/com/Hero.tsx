'use client'
import { AdCampaignForm } from "./AdCampaignForm";


export default function Hero() {

  return (
    <section className="w-full h-[90vh] relative">

      <div className="absolute top-0 inset-0 bg-[url('https://images.unsplash.com/photo-1512978748615-0bfcbdc57bc3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center w-full h-[100%] -z-20 brightness-50"></div>

      <div className="container mx-auto px-4 md:px-6 mt-10">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tighter text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Search Cabs for Personalized Ad Campaign
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/80 sm:text-xl md:text-2xl">
            Discover all kinds of cabs for you ad campaign
          </p>

          <div>
            <AdCampaignForm />
          </div>
        </div>
      </div>
    </section>
  )
}

