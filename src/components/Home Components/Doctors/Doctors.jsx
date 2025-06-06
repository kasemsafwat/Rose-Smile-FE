import React from "react";
import Slider from "react-slick";
import {
  ChevronLeft,
  ChevronRight,
  User,
  Stethoscope,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSomeDoctors } from "../../../hooks/Doctors/useDoctor";

const DoctorsTeam = () => {
  const { doctors, loading, error } = useSomeDoctors({ page: 1, size: 5 });

  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-[-10px] md:right-[-15px] top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 transition-all duration-200 text-gray-600 rounded-full p-2 shadow-lg z-10 cursor-pointer border border-gray-200"
    >
      <ChevronRight size={20} />
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-[-10px] md:left-[-15px] top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 transition-all duration-200 text-gray-600 rounded-full p-2 shadow-lg z-10 cursor-pointer border border-gray-200"
    >
      <ChevronLeft size={20} />
    </button>
  );

  const settings = {
    dots: false,
    infinite: doctors.length > 1,
    speed: 500,
    slidesToShow: Math.min(doctors.length, 4),
    slidesToScroll: 1,
    nextArrow: doctors.length > 1 ? <NextArrow /> : null,
    prevArrow: doctors.length > 1 ? <PrevArrow /> : null,
    rtl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(doctors.length, 2),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-gray-50 py-16 px-4 md:px-8 text-right" dir="rtl">
      <div className="max-w-[90rem] mx-auto text-center px-4 lg:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          فريق الأطباء
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-pink-500 mx-auto mb-8 rounded-full"></div>

        <p className="text-gray-600 mb-12 text-lg px-4 md:px-16 leading-relaxed">
          في مجمع التسليم المورد. نحن فخورون بفريقنا الطبي المميز من أطباء
          الأسنان ذوي الخبرة والكفاءة العالية. نحرص على اختيار أفضل الكفاءات في
          مختلف تخصصات طب الأسنان، ليضمن لك كل طبيب أفضل رعاية و أفضل النتائج.
        </p>

        <div className="relative px-6">
          {loading ? (
            <p className="text-center text-gray-600">جاري تحميل البيانات...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : doctors.length === 0 ? (
            <p className="text-center text-gray-600">لا يوجد أطباء متاحون</p>
          ) : (
            <Slider {...settings} className="doctors-slider">
              {doctors.map((doctor) => (
                <div key={doctor._id} className="px-2">
                  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group">
                    <div className="p-6">
                      <div className="flex items-center justify-center mb-4">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-sm group-hover:border-blue-100 transition-colors duration-300">
                          <img
                            src={doctor.image.url}
                            alt={doctor.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <User className="w-5 h-5 text-blue-500" />
                          <h3 className="text-xl font-bold text-gray-800">
                            {doctor.name}
                          </h3>
                        </div>

                        <div className="flex items-center justify-center gap-2 mb-4">
                          <Stethoscope className="w-5 h-5 text-blue-500" />
                          <p className="text-gray-600">
                            {doctor.specialization || "غير محدد"}
                          </p>
                        </div>

                        <Link
                          to={`/doctor/${doctor._id}`}
                          className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors duration-200 font-medium"
                        >
                          <span>عرض الملف الشخصي</span>
                          <ArrowLeft className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorsTeam;
