'use client'
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { CardCom } from './components/CardCom';

function Search() {

  const search = useSearchParams();
  const location = search.get('location');
  const cabs = search.get('cabs');
  const adType = search.get('adtype');  

  useEffect(() => {
    searchInDB();
  }, [])


  async function searchInDB(){
    const url = 'http://localhost:3000/api/search-cabs'
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({location, cabs, adType}),
    });

    const {data} = await res.json();
    console.log(data);
  }

  return (
    <div>
      <CardCom />
    </div>
  )
}

export default Search