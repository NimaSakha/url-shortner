"use client"
import Image from "next/image"
import { use, useState } from "react"

export default function Home() {
  const [down, setDown] = useState(false)
  const [error, setError] = useState("")

  const [data, setData] = useState({
    result: {
      short_link: "",
    },
  })
  const [url, setUrl] = useState("")

  const handleFetch = async () => {
    if (url) {
      const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`)
      const data = await res.json()
      setData(data)
      setDown(true)

      setError("Please Enter a Valid URL")
      if (data.result.short_link === "") {
        setData({
          result: {
            short_link: "URL Not Valid",
          },
        })
      }
    } else {
      setError("Please Enter a URL")
    }
  }
  const handleCopy = (data) => {
    navigator.clipboard.writeText(data)
    setDown(false)
    setUrl("")
  }
  return (
    <div className='bg-dark h-full flex justify-center items-center'>
      <div className='w-[450px] flex flex-col items-center '>
        <div className='bg-secondary rounded-t-xl py-[50px] w-full flex flex-col gap-[20px] items-center'>
          <h1 className='text-3xl font-bold text-neutral-200  '>
            Link Shortener
          </h1>
          <div className='w-full flex items-center justify-center -mr-[50px]'>
            <input
              onChange={(e) => setUrl(e.target.value)}
              className={`bg-dark px-[20px] py-[15px] w-full rounded-lg text-neutral-200 focus:outline-none ${
                error ? "placeholder:text-red-500" : "placeholder-neutral-300"
              }`}
              type='text'
              value={url}
              placeholder={error ? error : "Enter a URL"}
            />
            <button
              onClick={() => handleFetch()}
              className='relative z-20 top-0 right-[46px] p-[10px] flex justify-center items-center bg-green-600 hover:bg-green-700 rounded-md w-[46px] h-[46px] '
            >
              <Image
                className='mt-[3.6px]'
                src='/done.png'
                alt='done'
                width={50}
                height={50}
                unoptimized={true}
              />
            </button>
          </div>
        </div>
        <div className='bg-green-600 relative w-[90px] h-[90px] rounded-full -mt-[30px] flex items-center justify-center '>
          <h1
            className={`text-[50px] transform duration-300${
              down ? " rotate-180" : " rotate-0"
            }
            
            `}
          >
            👆
          </h1>
        </div>
        <div className='bg-secondary rounded-b-xl w-full py-[50px] -mt-[30px] px-[30px] flex flex-col items-center  '>
          <div className='flex items-center w-full -mr-[50px]'>
            <h1
              className={`bg-dark py-[13px] px-[8px] text-neutral-300 text-lg rounded-md  font-semibold w-full ${
                !down && "h-[55px]"
              }

              `}
            >
              {data.result.short_link !== null ? (
                <p>{data.result.short_link}</p>
              ) : (
                <p className='text-red-500'>Url Not Valid</p>
              )}
            </h1>
            <button
              onClick={() => handleCopy(data.result.short_link)}
              className='relative z-20 top-0 right-[46px] p-[10px] bg-green-600 hover:bg-green-700 rounded-md w-[46px] h-[46px]'
            >
              <Image
                src='/copy.png'
                alt='coppy'
                width={50}
                height={50}
                unoptimized={true}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
