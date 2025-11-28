interface WhyRerouteCardProps {
  title: string;
  description: string;
}

export function WhyRerouteCard({ title, description }: WhyRerouteCardProps) {
  return (
    <div className="relative flex flex-col items-center">
      {/* 상단 흰색 카드 - 타이틀만 */}
      <div className="relative z-10 w-full rounded-[20px] md:rounded-[24px] lg:rounded-[28px] xl:rounded-[34px] 2xl:rounded-[40px] bg-white px-3 py-6 md:px-3 md:py-8 lg:px-3.5 lg:py-9 xl:px-3.5 xl:py-10 2xl:px-4 2xl:py-12 flex justify-center items-center">
        <span className="text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] leading-[20px] md:leading-[24px] lg:leading-[28px] xl:leading-[34px] 2xl:leading-[40px] text-center font-bold text-black whitespace-pre-line">
          {title}
        </span>
      </div>

      {/* 연결선 */}
      <div className="h-[40px] md:h-[50px] lg:h-[60px] xl:h-[70px] 2xl:h-[80px] w-[1.5px] md:w-[2px] bg-white/40"></div>

      {/* 하단 테두리 박스 - 설명 */}
      <div className="flex w-full items-center justify-center border md:border-[1.5px] lg:border-[2px] border-white/40 bg-transparent h-[120px] md:h-[140px] lg:h-[160px] xl:h-[190px] 2xl:h-[220px] py-3 px-3.5 md:py-4 md:px-4 lg:py-4 lg:px-5">
        <span className="text-center text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] leading-[20px] md:leading-[24px] lg:leading-[28px] xl:leading-[34px] 2xl:leading-[40px] font-medium text-white whitespace-pre-line">
          {description}
        </span>
      </div>
    </div>
  );
}
