import Image from "next/image"
import backgroundImg from "@/assets/background.png"
import logoImg from "@/assets/logo.svg"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="-mt-10 flex max-h-[952px] flex-1 px-6 py-5 lg:mt-0">
      <div className="relative hidden w-fit overflow-hidden rounded-[10px] lg:block">
        <Image
          className="object-cover"
          src={backgroundImg}
          alt=""
          height={912}
          width={598}
          quality={100}
          priority
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <Image src={logoImg} alt="" className="w-[232px]" />
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center">
        {children}
      </div>
    </div>
  )
}
