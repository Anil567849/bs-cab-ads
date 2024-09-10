'use client'
import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegisterCab() {
  const [ownerName, setOwnerName] = useState('')
  const [cabName, setCabName] = useState('')
  const [cabNumber, setCabNumber] = useState('')
  const [cabType, setCabType] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [isValidNumber, setIsValidNumber] = useState(true)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateContactNumber = (number: string) => {
    const regex = /^[0-9]{10}$/
    return regex.test(number)
  }

  const handleContactNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = e.target.value
    setContactNumber(number)
    setIsValidNumber(validateContactNumber(number))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setImagePreview(null)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValidNumber) {
      console.log('Form submitted')

      // console.log(ownerName, cabName, cabNumber, cabType, contactNumber);

      saveInDB();

    }
  }


async function saveInDB() {
    // Get the file from input ref
    if(!fileInputRef || !fileInputRef.current  || !fileInputRef.current.files){
      alert('insert image');
      return;
    }

    const file = fileInputRef.current.files[0];
  
    // Create a new FormData instance
    const formData = new FormData();
    formData.append('ownerName', ownerName);
    formData.append('cabName', cabName);
    formData.append('cabNumber', cabNumber);
    formData.append('cabType', cabType);
    formData.append('contactNumber', contactNumber);
    formData.append('image', file);
  
    const url = 'http://localhost:3000/api/register-cab';
  
    
    const res = await fetch(url, {
      method: "POST",
      body: formData
    });
  
    
    const data = await res.json();
    console.log(data);
}
  

  return (
    <section className='w-full h-full relative'>
    
    <div className="absolute top-0 inset-0 bg-[url('https://images.unsplash.com/photo-1512978748615-0bfcbdc57bc3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center w-full h-[100%] -z-20 brightness-50"></div>

    <Card className="w-full max-w-md mx-auto bg-transparent text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Cab Registration</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="owner-name">Owner Name</Label>
            <Input id="owner-name" placeholder="Enter owner's name" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cab-name">Cab Name</Label>
            <Input id="cab-name" placeholder="Enter cab name" value={cabName} onChange={(e) => setCabName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cab-number">Cab Number</Label>
            <Input id="cab-number" placeholder="Enter cab number"  value={cabNumber} onChange={(e) => setCabNumber(e.target.value)}required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cab-type">Cab Type</Label>
            <Select required onValueChange={(value) => setCabType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select cab type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hatchback">Hatchback</SelectItem>
                <SelectItem value="sedan">Sedan</SelectItem>
                <SelectItem value="suv">SUV</SelectItem>
                <SelectItem value="tempo">Tempo</SelectItem>
                <SelectItem value="bus">Bus</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-number">Contact Number</Label>
            <Input 
              id="contact-number" 
              placeholder="Enter 10-digit contact number" 
              value={contactNumber}
              onChange={handleContactNumberChange}
              required 
            />
            {!isValidNumber && contactNumber !== '' && (
              <p className="text-sm text-red-500">Please enter a valid 10-digit number</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="cab-image">Cab Image</Label>
            <div className="flex items-center">
              <Input
                id="cab-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                Choose Image
              </Button>
              <span className="text-sm text-muted-foreground">
                {fileInputRef.current?.files?.[0]?.name || "No file chosen"}
              </span>
            </div>
            {imagePreview && (
              <div className="mt-2">
                <img src={imagePreview} alt="Cab preview" className="max-w-full h-auto rounded-md" />
              </div>
            )}
          </div>
          <Button type="submit" className="w-full">Register Cab</Button>
        </form>
      </CardContent>
    </Card>
    </section>
  )
}