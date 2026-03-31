import Image from "next/image";
import { HomeImages } from "../../../../public/statics/images/home";

const ThinkingSection = () => {
  return (
    <section className="relative overflow-hidden max-w-7xl mx-auto pt-20">
      <div className="relative aspect-1064/393">
        <Image
          src={HomeImages.banner}
          alt="STEMKey - 3 loại hình tư duy quan trọng nhất"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
    </section>
  );
};

export default ThinkingSection;
