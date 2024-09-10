

import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useState } from 'react';
import { Modal } from './Modal';


export function CardCom() {

    const search = useSearchParams();
    const location = search.get('location');
    const cabs = search.get('cabs') || '1';
    const adType = search.get('adtype');
    const [open, setOpen] = useState(false)
    const [sPrice, setSPrice] = useState(0);
  
    const img = 'https://images.unsplash.com/photo-1512978748615-0bfcbdc57bc3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  
    const ad = (adType == "static_ads") ? "Static Ad" : (adType == "led_screen") ? 'LED Screen Ad' : "Full Wrap";
  
    const price = (adType == "static_ads") ? 10 : (adType == "led_screen") ? 50 : 90;
  
  
    async function handlePayment(price: number){
      setSPrice(price);
      setOpen(true);
    }
  
    return (
      <div className="w-full flex justify-center">
        <div className="w-[70vw]">
        <h1 className="text-black text-center py-5 mb-5 text-4xl font-bold tracking-tighter text-primary-foreground">
              Explore the best plans
            </h1>
          <div className="grid grid-cols-3 gap-4">
            {
              [3, 6, 12].map((month, ind)=> {
                return <Card key={ind} className="w-[300px] overflow-hidden shadow-lg border-2 cursor-pointer" onClick={() => handlePayment(parseInt(cabs)*price*month)}>
                <img
                  src={img}
                  alt="Product image"
                  className="w-full h-[200px] object-cover"
                />
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold mb-2">Month: {month}</h2>
                  <h2 className="text-md font-semibold mb-2">Ad Type: {ad}</h2>
                  <h2 className="text-md font-semibold mb-2">Cabs: {cabs}</h2>
                  <h2 className="text-md font-semibold mb-2">Location: {location}</h2>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <span className="text-lg font-bold">₹{parseInt(cabs)*price*month}</span>
                </CardFooter>
              </Card>
              })
            }
          <Modal open={open} setOpen={setOpen} price={sPrice}/>
          </div>
        </div>
      </div>
    )
  }