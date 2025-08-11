const Contact = () => {
  return (
    <div className='mt-16 flex flex-col'>
        <div className='flex flex-col items-end w-max'>
            <p className='text-2xl font-medium uppercase'>
                Contact Us
            </p>
            <div className='w-16 h-0.5 bg-primary rounded-full'></div>
        </div>
        <div className='grid grid-rows-2 sm:grid-cols-2 sm:grid-rows-1 gap-2'>
            <div className=''>
                <p className='mt-10'>บริษัท ตะกร้าเขียว จำกัด</p>
                <p className='mt-4'>บ้านเลขที่ 90/90 ซอย 99/77 ถนนสาธร</p>
                <p className='mt-4'>แขวงพระโขนง เขตทองหล่อ </p>
                <p className='mt-4'>กรุงเทพมหานคร</p>
                <p className='mt-4'>รหัสไปรษณีย์ 99875</p>
                <p className='mt-4'>เบอร์โทรศัพท์ : 063-564-8524</p>
                <p className='mt-4'>E-mail : bird12@windowslive.com</p>
            </div>
            <iframe
                className='mt-10 '
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.903511722707!2d100.57355868445963!3d13.724291163562844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29fa91e8c9df3%3A0x9fc38fcefb352959!2z4LiX4Lit4LiH4Lir4Lil4LmI4Lit!5e0!3m2!1sth!2sth!4v1754728696615!5m2!1sth!2sth"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map">
            </iframe>
            <button 
                type="button" 
                className="mt-10 w-40 py-3 active:scale-95 transition text-sm text-white rounded-full bg-primary"
                onClick={()=>window.open("https://www.google.com/maps/dir//%E0%B8%97%E0%B8%AD%E0%B8%87%E0%B8%AB%E0%B8%A5%E0%B9%88%E0%B8%AD+%E0%B9%81%E0%B8%82%E0%B8%A7%E0%B8%87%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B9%82%E0%B8%82%E0%B8%99%E0%B8%87+%E0%B9%80%E0%B8%82%E0%B8%95%E0%B8%84%E0%B8%A5%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%95%E0%B8%A2+%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%9E%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%99%E0%B8%84%E0%B8%A3+10110/@13.7242912,100.5735587,17z/data=!3m1!5s0x30e29fa91cd711c3:0xb825fcec8a7e1300!4m17!1m7!3m6!1s0x30e29fa91e8c9df3:0x9fc38fcefb352959!2z4LiX4Lit4LiH4Lir4Lil4LmI4Lit!8m2!3d13.724286!4d100.5784296!16s%2Fm%2F05f4r9_!4m8!1m0!1m5!1m1!1s0x30e29fa91e8c9df3:0x9fc38fcefb352959!2m2!1d100.5784296!2d13.724286!3e2?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D")}>
                    <p className="mb-0.5 cursor-pointer">ตรวจสอบเส้นทาง</p>
            </button>
        </div>        
    </div>
  )
}
export default Contact