"use client";

import { motion } from "motion/react";
import { Settings2 } from "lucide-react";
import { FLEXIBLE_BENEFITS } from "@/constants";
import React from "react";
import Image from "next/image";
import { HomeImages } from "../../../../public/statics/images";

const FlexibleLearning = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-2xl font-semibold lg:text-4xl"
        >
          VÌ SAO NÊN CHỌN STEMKey ĐỂ TRẺ PHÁT TRIỂN TƯ DUY TOÀN DIỆN
        </motion.h2>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
          {/* Left — Benefit cards */}
          <div className="flex w-full flex-col gap-4 lg:w-1/2">
            {FLEXIBLE_BENEFITS.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 rounded-2xl border border-slate-200 px-5 py-4"
              >
                <div className="mt-0.5 flex shrink-0 items-center justify-center rounded-full bg-blue-100 p-2">
                  <Settings2 size={18} className="text-blue-500" />
                </div>
                <p className="text-sm leading-relaxed text-slate-700 lg:text-base">
                  {benefit.title}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right — Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative w-full overflow-hidden rounded-2xl aspect-video">
              <Image
                src={HomeImages.shoudImage}
                alt="Lớp học STEMKey"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(FlexibleLearning);
