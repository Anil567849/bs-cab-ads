
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { useRouter } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



export function AdCampaignForm() {
    const [location, setLocation] = useState("")
    const [cabs, setCabs] = useState("")
    const [adType, setAdType] = useState("")
    const router = useRouter()
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      // console.log({ location, cabs, adType })
      router.push(`http://localhost:3000/search?location=${location}&cabs=${cabs}&adtype=${adType}`)
    }
  
    return (
      <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto p-4 rounded-lg mt-[2rem] bg-gradient-to-r from-slate-800 to-gray-900">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            type="text"
            value={location}
            onChange={(e: any) => setLocation(e.target.value)}
            className="w-full placeholder:text-white text-white"
            placeholder="Location"
          />
          <Select value={cabs} onValueChange={setCabs}>
            <SelectTrigger className="text-white">
              <SelectValue placeholder="Number of Cabs"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 Cabs</SelectItem>
              <SelectItem value="25">25 Cabs</SelectItem>
              <SelectItem value="50">50 Cabs</SelectItem>
              <SelectItem value="100">100 Cabs</SelectItem>
            </SelectContent>
          </Select>
          <Select value={adType} onValueChange={setAdType}>
            <SelectTrigger className="text-white">
              <SelectValue placeholder="Ad Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full_wrap">Full Wrap</SelectItem>
              <SelectItem value="static_ads">Static Ads</SelectItem>
              <SelectItem value="led_screen">LED Screen</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" className="w-full">Submit</Button>
        </div>
      </form>
    )
  }